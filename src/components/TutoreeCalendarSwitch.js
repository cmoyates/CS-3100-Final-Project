import moment from 'moment';
import React from 'react';
import Calendar from 'react-calendar';
import '../pages/Calendar.css';
import WeekCalendar from 'react-week-calendar';
import '../pages/WeekCalendar.css';
import Tutor from '../pages/Tutor'
import Button from '@material-ui/core/Button';
import {useState} from 'react'
import Availability from '../Availability';
import Session from '../Session';
import TutoreeWeekCell from './TutoreeWeekCell'
import Popup from './Popup';
import ButtonSwitch from './ButtonSwitch';

function TutoreeCalendarSwitch(props) {

    //determine availability of a given weekcell
    let cells = document.getElementsByClassName('calendarBody__cell');

    let today = moment();
    let weekStart = parseInt(today.day().toString());
    today.subtract(weekStart-1, "days");
    Session.monday = today;
    Session.tutoreeId = props.tutoree.id;

    const [startDay, setStartDay] = useState(today);
    const [open, setOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState([]);
    const [tutorSessions, setTutorSessions] = useState([]);

      for(let i=0; i<Session.getSessionCount(); i++){
          let currSession = Session.getSession(i);
          let isSame = currSession.monday.isSame(startDay, 'day');
          Session.setIsThisWeek(i, isSame);
      }

    const handleClose = (value) => {
        setOpen(false);
        if(value != undefined) {
            displayTutorInfo(value);
        }
    };

    const displayTutorInfo = async (tutor) => {
        const sessionsFromServer = await fetchTutorSessions(tutor.id);
        console.log(sessionsFromServer);
        setTutorSessions(sessionsFromServer);
        Session.setSessions(sessionsFromServer);
        console.log(Session.sessions);
        Availability.setAvailabilities(tutor.availabilities);
        setSelectedTutor(tutor);
        props.setMonthView(true);
        Session.tutorId = tutor.id;
    }

    const fetchTutorSessions = async (id) => {
        const res = await fetch('/sessions/tutor/' + id, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        const data = await res.json();
        return data;
      }

    console.log(Session.sessions);

    return (props.monthView) ? ( 
        <Calendar onClickDay = {
                (value, event) => {
                    let year = parseInt(value.getFullYear().toString());
                    let month = parseInt(value.getMonth().toString());
                    let day = parseInt(value.getDate().toString());
                    let start = parseInt(value.getDay().toString());
                    let tempStartDay = moment([year, month, day]).subtract(start-1, "days");
                    setStartDay(tempStartDay);
                    Session.currMonday = tempStartDay;
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
            dayCellComponent = {TutoreeWeekCell}
            />
            <span>
                <Button variant='contained' onClick = {() => {props.setMonthView(!props.monthView)}}>Month View</Button>
                <ButtonSwitch tutor={selectedTutor} setTutor={setSelectedTutor} tutoree={props.tutoree} sessions={props.sessions} setOpen={setOpen} setMonthView={props.setMonthView} tutorSession={tutorSessions} setTutorSessions={setTutorSessions} setTutoreeSessions={props.setSessions}/>
            </span>
            <Popup open={open} onClose={handleClose} setSelectedTutor={setSelectedTutor} allTutors={props.allTutors} setSelectedTutor={setSelectedTutor} />
        </div>
}

export default TutoreeCalendarSwitch;