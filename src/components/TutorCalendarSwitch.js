import moment from 'moment';
import React from 'react';
import Calendar from 'react-calendar';
import '../pages/Calendar.css';
import WeekCalendar from 'react-week-calendar';
import '../pages/WeekCalendar.css';
import Tutor from '../pages/Tutor'
import Button from '@material-ui/core/Button';
import {useState} from 'react'
import TutorWeekCell from './TutorWeekCell'
import Availability from '../Availability';
import Session from '../Session';

function TutorCalendarSwitch(props) {

    //determine availability of a given weekcell
    let cells = document.getElementsByClassName('calendarBody__cell');

    let today = moment();
    let weekStart = parseInt(today.day().toString());
    today.subtract(weekStart-1, "days");

    const [startDay, setStartDay] = useState(today);

    const updateAvailability = async () => {
        const res = await fetch('/tutors/' + props.tutor.id, {
            method: "PUT",
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: props.tutor.id,
                firstName: props.tutor.firstName,
                lastName: props.tutor.lastName,
                email: props.tutor.email,
                description: props.tutor.description,
                phoneNumber: props.tutor.phoneNumber,
                availabilities: Availability.getAvailabilities(),
                subjects: props.tutor.subjects,
                feedback: props.tutor.feedback
            })
        });
        const data = await res.json();
        return data;
      }

      for(let i=0; i<Session.getSessionCount(); i++){
          let currSession = Session.getSession(i);
          let isSame = currSession.monday.isSame(startDay, 'day');
          Session.setIsThisWeek(i, isSame);
          console.log(isSame);
      }

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
            dayCellComponent = {TutorWeekCell}
            />
            <Button variant='contained' onClick = {() => {props.setMonthView(!props.monthView)}}>Month View</Button>
            <Button variant='contained' onClick = {() => {
                props.setAvailabilities(Availability.getAvailabilities());
                updateAvailability();
                }}>Save Changes</Button>
        </div>
}

export default TutorCalendarSwitch;