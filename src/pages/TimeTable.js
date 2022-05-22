import * as React from 'react';
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import LocationOn from '@mui/icons-material/LocationOn';
import Notes from '@mui/icons-material/Notes';
import Close from '@mui/icons-material/Close';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Create from '@mui/icons-material/Create';
import PaidIcon from '@mui/icons-material/Paid';
import FaceIcon from '@mui/icons-material/Face';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio } from '@mui/material';

import { appointments } from './test';


import axios from 'axios';
import Paid from '@mui/icons-material/Paid';

const AREA_SELECT = ['대구광역시', '경산시']
const DAY_SELECT = ['월', '화', '수', '목', '금', '토', '일']
const TIME_SELECT = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

const PREFIX = 'Demo';
const classes = {
  content: `${PREFIX}-content`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  button: `${PREFIX}-button`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  textField: `${PREFIX}-textField`,
  addButton: `${PREFIX}-addButton`,
  formControl: `${PREFIX}-formControl`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(3, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: '100%',
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: 'right',
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  [`& .${classes.wrapper}`]: {
    display: 'flex',
    // justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
  [`& .${classes.formControl}`]: {
    marginRight: theme.spacing(5),
    minWidth: 150,
  },
}));
const StyledFab = styled(Fab)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      openPopup: {},
      setOpenPopup: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.openPopup = () => {
      const {openPopup} = false
      return openPopup;
    }

    this.setOpenPopup = () => {
      const { setOpenPopup } = false;
      return setOpenPopup
    }

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    //title, notes 수정 시 입력 값 그대로
    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    //날짜 및 시간 수정
    const pickerEditorProps = field => ({
      // keyboard: true,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      ampm: false,
      inputFormat: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const startDatePickerProps = pickerEditorProps('startDate');
    const endDatePickerProps = pickerEditorProps('endDate');
    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

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
        }
      }).catch(function(error){
        alert("강사 매칭 조건 설정 실패!" + error);
      });
  }

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <form onSubmit={matchSubmit}>
        <StyledDiv /*일정추가팝업창 디자인*/>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges} size="large">
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
               id="title"
               name="title"
                {...textEditorProps('Title')}
                >
              </TextField>
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Start Date"
                  renderInput={
                    props => <TextField className={classes.picker} {...props} />
                  }
                  {...startDatePickerProps}
                />
                <DateTimePicker
                  label="End Date"
                  renderInput={
                    props => <TextField className={classes.picker} {...props} />
                  }
                  {...endDatePickerProps}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.wrapper}>
              <FaceIcon className={classes.icon} color="action"/>
              <RadioGroup row>
                <FormControlLabel
                    value="1"
                    control={<Radio />}
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
                    control={<Radio />}
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
            </div>
            <div>
              <LocationOn className={classes.icon} color="action" />
              <FormControl className={classes.formControl}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    지역
                </InputLabel>
                <NativeSelect
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
            </div>
            <div className={classes.wrapper}>
              <PaidIcon className={classes.icon} color="action" />
              <RadioGroup row>
                  <FormControlLabel
                      value="0"
                      control={<Radio />}
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
                      control={<Radio />}
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
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('notes')}
                multiline
                rows="3"
              />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
                // 편집 시 delete 버튼
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
            )}
            <Button
            // 새로운 일정 추가 시 Create 아니면 Save
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
              type="submit"
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </StyledDiv>
        </form>
      </AppointmentForm.Overlay>

    );
  }
}

/* eslint-disable-next-line react/no-multi-comp */
export default class Curriculum extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2022-05-22',
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  // 모든 수정 할 경우
  componentDidUpdate() {
    this.appointmentForm.update();
  }

  // 연필, + 아이콘 눌렀을 경우
  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  // 새로운 일정 추가 버튼 눌렀을 경우
  onAddedAppointmentChange(addedAppointment) {
    console.log('appointment added');
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  // 휴지통 아이콘 눌렀을 경우
  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  // 연필 아이콘 누르고 편집창 닫을 경우
  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  // 휴지통 아이콘 눌렀을 경우 알림 문구 확인
  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  // 일정 삭제 시키는 곳
  commitDeletedAppointment() {
    console.log('appointment deleted');
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }
 
  // 추가, 수정, 삭제 시키는 곳
  commitChanges({ added, changed, deleted }) {
    console.log('appointment saved');
    
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;

    return (
        <div>
            <Navbar/>
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <MonthView />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <Toolbar />
          <ViewSwitcher />
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <StyledFab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </StyledFab>
      </Paper>
      </div>
    );
  }
}
