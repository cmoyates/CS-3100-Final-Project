import React from 'react'
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import Availability from '../Availability';
import Session from '../Session';

const TutoreeWeekCell = (props) => {

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

    const [tempSession, setTempSession] = useState(false);

    let count = Availability.getAvailabilityCount();
    let avail = (count > 0) ? Availability.getAvailability(props.colPos, props.rowPos) : false;

    let cellColor = (tempSession) ? "#FFA5A5" : ((isSessionBooked) ? "#B0E6B0" : ((avail) ? "#FFF0BF" : "inherit"));
    let cellText = (tempSession) ? "Not Saved" : ((isSessionBooked) ? "Booked" : ((avail) ? "Available" : ""));

    return (
        <div style={{height:'100%'}}>
            <Button onClick={() => {
                if(avail) {
                    let location = prompt("Location of session: ");
                    if(location != "") {
                        Session.addSession(location, props.colPos, props.rowPos);
                    setTempSession(true);
                    }
                } 
            }} style={{width:'100%', height:'100%', backgroundColor: cellColor}}>{cellText}</Button>
        </div>
    )

}

export default TutoreeWeekCell