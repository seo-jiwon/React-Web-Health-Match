import * as React from 'react';
import Navbar from './Navbar';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@material-ui/core';
import {useState} from 'react';
import Popup from './Popup';

const currentDate = '2022-05-14';
const schedulerData = [
  { startDate: '2022-05-14T09:45', endDate: '2022-05-14T11:00', title: 'Meeting' },
];

export default function TimeTable() {
    const [openPopup, setOpenPopup] = useState(false)
  return (
    <div>
      <Navbar/>
      <Paper>
        <Scheduler
        data={schedulerData}
        >
        <ViewState
            currentDate={currentDate}
        />
        <DayView
            startDayHour={9}
            endDayHour={14}
        />
        <Appointments />
        </Scheduler>
    </Paper>
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
