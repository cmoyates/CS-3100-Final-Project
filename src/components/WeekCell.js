import React from 'react'
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import Availability from '../Availability';
import Session from '../Session';

const WeekCell = (props) => {

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

    const [newAvail, setNewAvail] = useState();

    let avail = Availability.getAvailability(props.colPos, props.rowPos);
    let cellColor = (isSessionBooked) ? "#B0E6B0" : ((avail) ? "#FFF0BF" : "inherit");
    let cellText = (isSessionBooked) ? "Booked" : ((avail) ? "Available" : "");

    return (
        <div style={{height:'100%'}}>
            <Button onClick={() => {
                if(isSessionBooked) {
                    alert("Session booked with Tutoree " + currSession.tutoreeId + " at " + currSession.location);
                }
                else {
                    updateAvailabilities(avail, props.colPos, props.rowPos); 
                    setNewAvail(!avail);
                }
            }} style={{width:'100%', height:'100%', backgroundColor: cellColor}}>{cellText}</Button>
        </div>
    )

}

const updateAvailabilities = (avail, colPos, rowPos) => {
    Availability.setAvailability(colPos, rowPos, !avail);
}

export default WeekCell
