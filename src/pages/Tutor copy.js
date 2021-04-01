import auth from '../auth'
import { GoogleLogout } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Popup from '../components/Popup';
import {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import WeekCalendar from 'react-week-calendar';
import './WeekCalendar.css';
import ComponentSwitch from '../components/ComponentSwitch';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    grid: {
        flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Tutor = (props) => {

    const logout = () => {
        auth.logout(() => {
            props.history.push("/")
        });
    } 

    const classes = useStyles();

    
    const [rating, setRating] = useState(props.tutor.feedback)
    const [monthView, setMonthView] = useState(false);

    return (
        <div className={classes.root}>
        <AppBar position="static" style={{height: "7vh", background:'#6479E9', display: "flex"}}>
        <Toolbar style={{height: "7vh"}}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Tutoring Dashboard
            </Typography>
            
            <GoogleLogout
                clientId="813957842713-jk53tal3b8636a4mgk5gahnceimnmhsh.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            />
        </Toolbar>
        </AppBar>
        <Grid container spacing={0} alignItems="stretch" style={{height: "93vh"}}>
            <Grid className="Info" item xs={4} style={{backgroundColor: "gainsboro"}}>
            <p style={{fontSize: 30, fontWeight: 600}}>{props.name}</p>
            <img src={props.profileImg} alt="Profile Picture"/>
            <p>{}</p>
            <h3>Rating</h3>
            <Rating name="read-only" value={rating} precision={0.5} size="large" readOnly/>
            <div>{rating}/5</div>
            <h3>Subjects</h3>
            {props.subjects.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <button onClick={() => {props.setButtonPopup(true)}}>Open Popup</button>
            <Popup trigger={props.buttonPopup} setButtonPopup={props.setButtonPopup}>
              <h3>Tutors</h3>
            </Popup>
            </Grid>
            <Grid item xs={8} style={{backgroundColor: "white"}}>
              <ComponentSwitch monthView={monthView} setMonthView={setMonthView}/>
            </Grid>
        </Grid>
            
        </div>
    )
}
export default Tutor
