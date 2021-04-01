import React from 'react'
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import Availability from '../Availability';

const WeekCell = (props) => {

    const [newAvail, setNewAvail] = useState();

    let avail = Availability.getAvailability(props.colPos, props.rowPos);
    let text = (avail) ? "green" : "red";

    return (
        <div style={{height:'100%'}}>
            <Button onClick={() => {updateAvailabilities(avail, props.colPos, props.rowPos); setNewAvail(!avail);}} style={{width:'100%', height:'100%', backgroundColor: text}}>help</Button>
        </div>
    )

}

const updateAvailabilities = (avail, colPos, rowPos) => {
    Availability.setAvailability(colPos, rowPos, !avail);
}

export default WeekCell

//<Button onClick={() => {updateAvailabilities()}} style={{width:'100%', height:'100%', backgroundColor: text}}>help</Button>
