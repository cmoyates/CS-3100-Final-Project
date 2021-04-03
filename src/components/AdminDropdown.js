import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Session from '../Session';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

const AdminDropdown = (props) => {

    const fetchSessionsOfTutoree = async (id) => {
        const res = await fetch('/sessions/tutoree/' + id, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
        });
        const data = await res.json();
        return data;
      }

    const fetchSessionsOfTutor = async (id) => {
    const res = await fetch('/sessions/tutor/' + id, {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    });
    const data = await res.json();
    return data;
    }

    const classes = useStyles();

    switch(props.accountType){
        case("tutor") :
            return(
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={props.accountType}
                            onChange={async (event) => {
                                const sessionsFromServer = await fetchSessionsOfTutor(event.target.value);
                                Session.setSessions(sessionsFromServer);
                                props.setMonthView(true);
                            }}
                            label="Tutor"
                            >
                            {props.allTutors.map((tutor) => (
                                <MenuItem value={tutor.id}>{tutor.firstName} {tutor.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )
        case("tutoree"):
            return(
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={props.accountType}
                            onChange={async (event) => {
                                const sessionsFromServer = await fetchSessionsOfTutoree(event.target.value);
                                Session.setSessions(sessionsFromServer);
                                props.setMonthView(true);
                                }}
                            label="Tutoree"
                            >
                            {props.allTutorees.map((tutoree) => (
                                <MenuItem value={tutoree.id}>{tutoree.firstName} {tutoree.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )
        default:
            return(
                <div></div>
            )
    }
}

export default AdminDropdown
