import moment from 'moment';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

function ComponentSwitch(props) {
    return (props.monthView) ? ( <
            Calendar onClickDay = {
                () => {
                    console.log('test');
                }
            }
            />
        ) :
        <
        WeekCalendar
    startTime = { moment({ h: 8, m: 0 }) }
    endTime = { moment({ h: 17, m: 30 }) }
    scaleUnit = { 30 }
    cellHeight = {50}
    />
}

export default ComponentSwitch;