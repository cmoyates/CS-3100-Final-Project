import moment from 'moment';
import React from 'react';
import Calendar from 'react-calendar';
import '../pages/Calendar.css';
import WeekCalendar from 'react-week-calendar';
import '../pages/WeekCalendar.css';
import Tutor from '../pages/Tutor'
import Button from '@material-ui/core/Button';
import {useState} from 'react'
import AdminWeekCell from './AdminWeekCell'
import Availability from '../Availability';
import Session from '../Session';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AdminDropdown from './AdminDropdown';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

function AdminCalendarSwitch(props) {

    let today = moment();
    let weekStart = parseInt(today.day().toString());
    today.subtract(weekStart-1, "days");

    const [startDay, setStartDay] = useState(today);
    const [accountType, setAccountType] = useState("");

      for(let i=0; i<Session.getSessionCount(); i++){
          let currSession = Session.getSession(i);
          let isSame = currSession.monday.isSame(startDay, 'day');
          Session.setIsThisWeek(i, isSame);
          console.log(isSame);
      }

      const classes = useStyles();

    return (props.monthView) ? ( 
        <Calendar onClickDay = {
                (value, event) => {
                    let year = parseInt(value.getFullYear().toString());
                    let month = parseInt(value.getMonth().toString());
                    let day = parseInt(value.getDate().toString());
                    let start = parseInt(value.getDay().toString());
                    setStartDay(moment([year, month, day]).subtract(start-1, "days"));
                    props.setMonthView(!props.monthView);
                }
            }
            style={{width: "500px"}}
        />) :
        <div>
            <WeekCalendar
            firstDay = {startDay}
            startTime = { moment({ h: 8, m: 0 }) }
            endTime = { moment({ h: 17, m: 30 }) }
            scaleUnit = { 30 }
            cellHeight = {50}
            dayFormat = {'ddd, DD'}
            dayCellComponent = {AdminWeekCell}
            />
            <Button variant='contained' onClick = {() => {props.setMonthView(!props.monthView)}}>Month View</Button>
            <br></br>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Tutor or Tutoree</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={accountType}
                    onChange={(event) => {setAccountType(event.target.value)}}
                    label="Subject"
                    >
                    <MenuItem value={'tutor'}>Tutor</MenuItem>
                    <MenuItem value={'tutoree'}>Tutoree</MenuItem>
                </Select>
            </FormControl>
            <br></br>
            <AdminDropdown accountType={accountType} allTutors={props.allTutors} allTutorees={props.allTutorees} setMonthView={props.setMonthView}/>
        </div>
}

export default AdminCalendarSwitch;