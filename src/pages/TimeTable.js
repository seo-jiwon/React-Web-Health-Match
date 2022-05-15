import * as React from 'react';
import Navbar from './Navbar';
import Paper from '@mui/material/Paper';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@material-ui/core';
import {useState} from 'react';
import Popup from './Popup';

const currentDate = '2022-05-14';
const schedulerData = [{
  title: 'Meeting',
  startDate: '2022-05-14 9:45', 
  endDate: '2022-05-14 13:00',
  id: 1,
   },
];

export default function TimeTable() {
    const [openPopup, setOpenPopup] = useState(false)

    const saveAppointment = (data) => {
      console.log('appointment saved');
    }

  return (
    <div>
      <Navbar/>
        <Scheduler
        data={schedulerData}
        >
        <ViewState
            currentDate={currentDate}
        />
        <EditingState onCommitChanges={saveAppointment}/>
        <IntegratedEditing />
        <WeekView
            startDayHour={9}
            endDayHour={17}
        />
        <Appointments />
        <AppointmentForm />
        </Scheduler>
    <Button
        variant="outlined"
        color="primary"
        size="small"
        type="submit"
        onClick = {() => setOpenPopup(true)}
    >
            수정
    </Button>
    
    <Popup
    title = "새로운 스케줄 추가"
    openPopup = {openPopup}
    setOpenPopup = {setOpenPopup}
    >

    </Popup>
    <Button variant="outlined" color="primary" size="small" type="submit">완료</Button>
    </div>
  );
}
