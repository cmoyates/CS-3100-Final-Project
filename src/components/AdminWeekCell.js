import React from 'react'
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import Availability from '../Availability';
import Session from '../Session';

const AdminWeekCell = (props) => {

    let isSessionBooked = false;
    let currSession;

    for(let i=0; i<Session.getSessionCount(); i++) {
        currSession = Session.getSession(i);
        if(currSession.isThisWeek) {
            if(currSession.x == props.colPos && currSession.y == props.rowPos) {
                isSessionBooked = true;
                break;
            }
        }
    }
    let cellColor = (isSessionBooked) ? "#B0E6B0" : "inherit";
    let cellText = (isSessionBooked) ? "Booked" : "";

    return (
        <div style={{height:'100%'}}>
            <Button onClick={() => {
                if(isSessionBooked) {
                    alert("Session booked with Tutoree " + currSession.tutoreeId + " and Tutor " + currSession.tutorId + " at " + currSession.location);
                }
            }} style={{width:'100%', height:'100%', backgroundColor: cellColor}}>{cellText}</Button>
        </div>
    )

}

export default AdminWeekCell