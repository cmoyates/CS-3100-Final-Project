import { GoogleLogout } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {useState} from 'react';
import TutorCalendarSwitch from '../components/TutorCalendarSwitch';
import Session from '../Session';
import Availability from '../Availability';

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
        props.setIsAuth(false);
        props.setAccountType(-1);
        props.setEmail("");
        Availability.setAvailabilities([]);
        Session.setSessions([]);
        props.history.push("/");
    } 

    const classes = useStyles();
    
    const [rating, setRating] = useState(props.tutor.feedback)
    const [monthView, setMonthView] = useState(false);

    return (
        <div className={classes.root}>
        <AppBar position="static" style={{height: "7vh", background:'#BF5E5E', display: "flex"}}>
        <Toolbar style={{height: "7vh"}}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Tutor Dashboard
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
            <p style={{fontSize: 30, fontWeight: 600}}>{props.tutor.firstName} {props.tutor.lastName}</p>
            <img src={props.profileImg} alt=""/>
            <h3>Description</h3>
            <p>{props.tutor.description}</p>
            <h3>Phone Number</h3>
            <p>{props.tutor.phoneNumber}</p>
            <h3>Rating</h3>
            <Rating name="read-only" value={rating} precision={0.5} size="large" readOnly/>
            <div>{rating}/5</div>
            <h3>Subjects</h3>
            {props.subjects.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            </Grid>
            <Grid item xs={8} style={{backgroundColor: "white"}}>
              <TutorCalendarSwitch monthView={monthView} setMonthView={setMonthView} availabilities={props.availabilities} setAvailabilities={props.setAvailabilities} sessions={props.sessions} tutor={props.tutor}/>
            </Grid>
        </Grid>
            
        </div>
    )
}

export default Tutor