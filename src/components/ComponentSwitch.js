import moment from 'moment';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import Button from '@material-ui/core/Button';
import {useState} from 'react'

function ComponentSwitch(props) {

    const [startDay, setStartDay] = useState(moment());

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
        />) :
        <div>
            <WeekCalendar
            firstDay = {startDay}
            startTime = { moment({ h: 8, m: 0 }) }
            endTime = { moment({ h: 17, m: 30 }) }
            scaleUnit = { 30 }
            cellHeight = {50}
            dayFormat = {'ddd, DD'}
            />
            <Button onClick = {() => {props.setMonthView(!props.monthView)}}>Month View</Button>
        </div>
}

export default ComponentSwitch;