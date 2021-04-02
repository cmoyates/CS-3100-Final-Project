import React from 'react'
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import Availability from '../Availability';
import Session from '../Session';

const TutoreeWeekCell = (props) => {

    let isSessionBooked = false;
    let currSession;

    const [newAvail, setNewAvail] = useState();

    let count = Availability.getAvailabilityCount();
    console.log(count);
    let avail = (count > 0) ? Availability.getAvailability(props.colPos, props.rowPos) : false;
    let cellColor = (isSessionBooked) ? "#B0E6B0" : ((avail) ? "#FFF0BF" : "inherit");
    let cellText = (isSessionBooked) ? "Booked" : ((avail) ? "Available" : "");

    return (
        <div style={{height:'100%'}}>
            <Button onClick={() => {
                if(isSessionBooked) {
                    alert("Session booked with Tutor " + currSession.tutorId + " at " + currSession.location);
                }
                setNewAvail(!newAvail);
            }} style={{width:'100%', height:'100%', backgroundColor: cellColor}}>{cellText}</Button>
        </div>
    )

}

export default TutoreeWeekCell