import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {useState} from 'react';
import Rating from '@material-ui/lab/Rating';

const emails = ['username@gmail.com', 'user02@gmail.com'];

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function Popup(props) {

    const [subject, setSubject] = useState("");

    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Select a Tutor to View Sessions</DialogTitle>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={subject}
            onChange={(event) => {setSubject(event.target.value)}}
            label="Subject"
            >
            <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
            <MenuItem value={"English"}>English</MenuItem>
            <MenuItem value={"French"}>French</MenuItem>
            <MenuItem value={"History"}>History</MenuItem>
            <MenuItem value={"Math"}>Math</MenuItem>
            </Select>
        </FormControl>
        <List>
            {props.allTutors.filter((tutor) => {
                return tutor.subjects.includes(subject)
            }).map((tutor) => (
            <ListItem button onClick={() => handleListItemClick(tutor)} key={tutor.email}>
                <ListItemAvatar>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={tutor.firstName + " " + tutor.lastName} />
                <Rating name="read-only" value={tutor.feedback} precision={0.5} size="small" readOnly/>
            </ListItem>
            ))}
        </List>
        </Dialog>
    );
}

    Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    };

    export default Popup;