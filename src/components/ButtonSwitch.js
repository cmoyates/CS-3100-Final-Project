import React from 'react'
import Button from '@material-ui/core/Button';
import Session from '../Session';
import Availability from '../Availability';

const ButtonSwitch = (props) => {

    const uploadNewSession = async (session) => {
        const res = await fetch('/sessions/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: session.id,
            tutorId: session.tutorId,
            tutoreeId: session.tutoreeId,
            location: session.location,
            time: session.time,
            date: session.date
          })
        });
        const data = await res.json();
        return data;
      }

    return (Array.isArray(props.tutor)) ?
        <div>
            <Button variant='contained' onClick = {() => {props.setOpen(true)}}>Book a session</Button>
        </div>
        :
        <div>
            <Button variant='contained' onClick = {() => {
                props.setMonthView(true);
                console.log(props);
                Session.setSessions(props.tutorSession);
            }}>Reset</Button>
            <Button variant='contained' onClick = {() => {
                props.setTutor([]);
                Availability.setAvailabilities([]);
                let newSessions = Session.getFormattedSessions();
                let sessionIds = [];
                let currentTutoreeSessions = props.sessions;
                for(let i=0; i<props.sessions.length; i++) {
                    sessionIds.push(props.sessions[i].id);
                    console.log(props.sessions[i]);
                }
                for(let i=0; i<newSessions.length; i++) {
                    if(!sessionIds.includes(newSessions[i].id) && (props.tutoree.id == newSessions[i].tutoreeId)) {
                        const sessionUpload = newSessions[i];
                        console.log(sessionUpload);
                        uploadNewSession(sessionUpload);
                        currentTutoreeSessions.push(newSessions[i]);
                    }
                }
                props.setTutoreeSessions(currentTutoreeSessions);
                Session.setSessions(currentTutoreeSessions);
                console.log(currentTutoreeSessions);
                props.setMonthView(true);
            }}>Save</Button>
        </div>
}

export default ButtonSwitch
