import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import {useState, useCallback} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import RadioGroup from '@mui/material/RadioGroup';
import { Radio, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin:theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(5),
    },
    dialogWrapper : {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}));

const AREA_SELECT = ['대구광역시', '경산시']
const DAY_SELECT = ['월', '화', '수', '목', '금', '토', '일']
const TIME_SELECT = ['2022-05-14T09:45', 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]


export default function Popup(props) {
    const { title, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    const [ checkedFace, setCheckedFace ] = useState('');  
    const [ searchArea, setSearchArea ] = useState('');
    const [ searchDay, setSearchDay ] = useState('');
    const [ searchTime, setSearchTime ] = useState('');
    const [ checkedPay, setCheckedPay ] = useState('');  

    const handleChange = (e, type) => {
        const value = e.target.value;
            if (type === 'area') {
                setSearchArea(value);
                console.log('지역 선택 완료');
            } else if (type === 'day') {
                setSearchDay(value);
                console.log('요일 선택 완료');
            } else if (type === 'time') {
                setSearchTime(value);
                console.log('시간 선택 완료');
            } else if (type === 'facetoface') {
                setCheckedFace(value);
                console.log('대면 선택 완료');
            } else if (type === 'nonfacetoface') {
                setCheckedFace(value);
                console.log('비대면 선택 완료');
            } else if (type === 'free') {
                setCheckedPay(value);
                console.log('무료 선택 완료');
            } else if (type === 'nofree') {
                setCheckedPay(value);
                console.log('유료 선택 완료');
            }
        };

        const getData = useCallback(() => {
              const date = `${checkedFace} ${searchArea} ${searchDay} ${searchTime} ${checkedPay}`
              console.log(date)
            }, [checkedFace, searchArea, searchDay, searchTime, checkedPay])
      
      
            const navigate = useNavigate();
          
            const matchSubmit = (e) => {
              e.preventDefault();
              const data = {
                  t_id : "no",
                  title: e.target.title.value,
                  face : e.target.face.value,
                  area : e.target.area.value,
                  day : e.target.day.value,
                  time : e.target.time.value,
                  free : e.target.pay.value,
              }
          
              axios.post("http://localhost:5000/t_match/timetable", data)
              .then(function(response){
                console.log(response);
                if(response.data.success){
                  alert("강사 매칭 조건 설정을 성공하였습니다.");
                  navigate('/');
                }
              }).catch(function(error){
                alert("강사 매칭 조건 설정 실패!" + error);
              });
      
        
          }

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper : classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                <Typography variant="h6" component="div" style={{flexGrow:1, marginTop:20}}>
                    {title}
                </Typography>
                <Button
                color="secondary"
                onClick={()=>{setOpenPopup(false)}}>X</Button>
                </div>
            </DialogTitle>
            <form onSubmit={matchSubmit}>
            <DialogContent>
                <div>
                    <TextField fullWidth id="title" name="title" label="제목" variant="outlined"/>
                    <RadioGroup row>
                        <FormControlLabel
                            value="1"
                            defaultValue={checkedFace}
                            control={<Radio />}
                            onChange={(e) => handleChange(e, 'facetoface')}
                            id="facetoface"
                            name="face"
                            label="대면">
                            {
                                AREA_SELECT.map((facetoface, idx) => {
                                return <option key={idx} value={facetoface}>{facetoface}</option>
                            })
                        }
                        </FormControlLabel>
                        <FormControlLabel
                            value="0"
                            defaultValue={checkedFace}
                            control={<Radio />}
                            onChange={(e) => handleChange(e, 'nonfacetoface')}
                            id="nonfacetoface"
                            name="face"
                            label="비대면">
                            {
                                AREA_SELECT.map((nonfacetoface, idx) => {
                                return <option key={idx} value={nonfacetoface}>{nonfacetoface}</option>
                            })
                        }
                        </FormControlLabel>
                    </RadioGroup>
                    <FormControl className={classes.formControl}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        지역
                    </InputLabel>
                    <NativeSelect
                        className={classes.selectEmpty}
                        defaultValue={searchArea}
                        value={searchArea}
                        onChange={(e) => handleChange(e, 'area')}
                        id="area"
                        name="area"
                    >
                        <option value=''></option>
                        {
                        AREA_SELECT.map((area, idx) => {
                            return <option key={idx} value={area}>{area}</option>
                        })
                        }
                    </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        요일
                    </InputLabel>
                    <NativeSelect
                        className={classes.selectEmpty}
                        defaultValue={searchDay}
                        value={searchDay}
                        onChange={(e) => handleChange(e, 'day')}
                        id="day"
                        name="day"
                    >
                        <option value=''></option>
                        {
                        DAY_SELECT.map((day, idx) => {
                            return <option key={idx} value={day}>{day}요일</option>
                        })
                        }
                    </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        시간
                    </InputLabel>
                    <NativeSelect
                        className={classes.selectEmpty}
                        defaultValue={searchTime}
                        value={searchTime}
                        onChange={(e) => handleChange(e, 'time')}
                        id="time"
                        name="time"
                    >
                        <option value=''></option>
                        {
                        TIME_SELECT.map((time, idx) => {
                            return <option key={idx} value={time}>{time}시</option>
                        })
                        }
                    </NativeSelect>
                    </FormControl>
                    <RadioGroup row>
                <FormControlLabel
                    value="0"
                    defaultValue={checkedPay}
                    control={<Radio />}
                    onChange={(e) => handleChange(e, 'free')}
                    id="free"
                    name="pay"
                    label="무료">
                    {
                        AREA_SELECT.map((free, idx) => {
                        return <option key={idx} value={free}>{free}</option>
                    })
                }
                </FormControlLabel>
                <FormControlLabel
                    value="1"
                    defaultValue={checkedPay}
                    control={<Radio />}
                    onChange={(e) => handleChange(e, 'nofree')}
                    id="nofree"
                    name="pay"
                    label="유료">
                    {
                        AREA_SELECT.map((nofree, idx) => {
                        return <option key={idx} value={nofree}>{nofree}</option>
                    })
                }
                </FormControlLabel>
            </RadioGroup>
                    <Box>
                    <Button variant="outlined" color="primary" size="small" onClick={getData} type="submit">완료</Button>
                    </Box> 
                </div>
            </DialogContent>
            </form>
        </Dialog>
    )
}