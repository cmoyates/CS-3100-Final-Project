import React from 'react'
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import Availability from '../Availability';

const WeekCell = (props) => {

    const [newAvail, setNewAvail] = useState();

    let avail = Availability.getAvailability(props.colPos, props.rowPos);
    let cellColor = (avail) ? "#FFF0BF" : "inherit";
    let cellText = (avail) ? "Available" : "";

    return (
        <div style={{height:'100%'}}>
            <Button onClick={() => {updateAvailabilities(avail, props.colPos, props.rowPos); setNewAvail(!avail);}} style={{width:'100%', height:'100%', backgroundColor: cellColor}}>{cellText}</Button>
        </div>
    )

}

const updateAvailabilities = (avail, colPos, rowPos) => {
    Availability.setAvailability(colPos, rowPos, !avail);
}

export default WeekCell
