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
import TutoreeCalendarSwitch from '../components/TutoreeCalendarSwitch'
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

const Tutoree = (props) => {

    const classes = useStyles();

    const logout = () => {
        props.setIsAuth(false);
        props.setAccountType(-1);
        props.setEmail("");
        Availability.setAvailabilities([]);
        Session.setSessions([]);
        props.history.push("/");
    } 

    const [monthView, setMonthView] = useState(false);

    return (
        <div className={classes.root}>
        <AppBar position="static" style={{height: "7vh", background:'#6479E9', display: "flex"}}>
        <Toolbar style={{height: "7vh"}}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Tutoree Dashboard
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
            <p style={{fontSize: 30, fontWeight: 600}}>{props.tutoree.firstName} {props.tutoree.lastName}</p>
            <img src={props.profileImg} alt=""/>
            <h3>Phone Number</h3>
            <p>{props.tutoree.phoneNumber}</p>
            <h3>Grade Level</h3>
            <p>{props.tutoree.gradeLevel}</p>
            </Grid>
            <Grid item xs={8} style={{backgroundColor: "white"}}>
                <TutoreeCalendarSwitch monthView={monthView} setMonthView={setMonthView} sessions={props.sessions} setSessions={props.setSessions} tutoree={props.tutoree} allTutors={props.allTutors}/>
            </Grid>
        </Grid>
        </div>
    )
}

export default Tutoree;