import React from 'react'
import auth from '../auth'
import { GoogleLogout } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid, Paper} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import ComponentSwitch from '../components/ComponentSwitch';
import {useState} from 'react'

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
            </Grid>
            <Grid item xs={8} style={{backgroundColor: "white"}}>
              <ComponentSwitch monthView={monthView}/>
              <Button onClick = {() => {setMonthView(!monthView)}}>Month View</Button>
            </Grid>
        </Grid>
            
        </div>
    )
}
export default Tutor
