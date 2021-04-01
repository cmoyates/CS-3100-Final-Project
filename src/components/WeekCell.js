import React from 'react'
import Button from '@material-ui/core/Button';
import Availability from '../Availability';

const WeekCell = (props) => {

    let text = (Availability.getAvailability(props.colPos, props.rowPos)) ? "green" : "red";

    return (
        <div style={{height:'100%'}}>
            <Button style={{width:'100%', height:'100%', backgroundColor: text}}>help</Button>
        </div>
    )
}

export default WeekCell
