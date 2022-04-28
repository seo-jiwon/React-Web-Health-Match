import * as React from 'react';
import Navbar from './Navbar';
import FormGroup from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Button } from '@material-ui/core';
import {useState, useCallback} from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AREA_SELECT = ['대구광역시', '경산시']
const DAY_SELECT = ['월','화', '수', '목', '금', '토', '일']
const TIME_SELECT = [6, 7, 8, 9, 10, 11, 12, 13]

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin:theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default function Matching() {
    const classes = useStyles();

    const [ searchArea, setSearchArea ] = useState('');
    const [ searchDay, setSearchDay ] = useState('');
    const [ searchTime, setSearchTime ] = useState('');

    const handleChange = (e, type) => {
    const value = e.target.value;
        if (type === 'area') {
            setSearchArea(value);
            console.log('지역 선택 완료');
        } else if (type === 'day') {
            setSearchDay(value);
            console.log('요일 선택 완료');
        } else {
            setSearchTime(value);
            console.log('시간 선택 완료');
        }
    };

    const getData = useCallback(() => {
        const date = `${searchArea} ${searchDay} ${searchTime}`
        console.log(date)
      }, [searchArea, searchDay, searchTime])




      const navigate = useNavigate();
    
      const matchSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id : "no",
            face : "no",
            area : e.target.area.value,
            day : e.target.day.value,
            time : e.target.time.value,
            free : "no",
        }
    
        axios.post("http://localhost:5000/user_match/matching", data)
        .then(function(response){
          console.log(response);
          if(response.data.success){
            alert("매칭 설정을 성공하였습니다.");
            navigate('/');
          }
        }).catch(function(error){
          alert("매칭 설정 실패!" + error);
        });
    }
      
    return (
        <div>
            <Navbar />
            <form onSubmit={matchSubmit}>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="대면" />
                <FormControlLabel control={<Checkbox />} label="비대면" />
            </FormGroup>
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
                {
                TIME_SELECT.map((time, idx) => {
                    return <option key={idx} value={time}>{time}시</option>
                })
                }
            </NativeSelect>
            </FormControl>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="무료"/>
                <FormControlLabel control={<Checkbox />} label="유료" />
            </FormGroup>
            <Box>
                <Button className={classes.tab} onClick={getData} type="submit">완료</Button>
            </Box>
            </form>
        </div>
    );
}