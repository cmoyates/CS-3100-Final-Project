import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tutoree from './pages/Tutoree';
import Admin from './pages/Admin';
import SignUp from './pages/SignUp';
import MockData from "./pages/MockData";
import Tutor from "./pages/Tutor";
import ProtectedRoute from "./components/protected.route";
import {useState, useEffect} from 'react';
import Availability from './Availability';
import Session from './Session';
//import { PostAdd } from '@material-ui/icons';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [tutor, setTutor] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [accountType, setAccountType] = useState(-1);

  useEffect(() => {
    const getAccount = async () => {
      if (email !== "" && isAuth === false) {
        setIsAuth(true);
        try {
          const tutorFromServer = await fetchTutor();
          console.log(tutorFromServer);
          setTutor(tutorFromServer);
          const tutorSessionsFromServer = await fetchTutorSessions(tutorFromServer.id);
          console.log(tutorSessionsFromServer);
          setSessions(tutorSessionsFromServer);
          setSubjects(tutorFromServer.subjects);
          setAvailabilities(tutorFromServer.availabilities);
          Availability.setAvailabilities(tutorFromServer.availabilities);
          console.log(tutorFromServer);
          setAccountType(1);
          return;
        } 
        catch (err) {}
        try {
          const tutoreeFromServer = await fetchTutoree();
          console.log(tutoreeFromServer);
          setAccountType(2);
          return;
        } 
        catch (err) {}
        try {
          const adminFromServer = await fetchAdmin();
          console.log(adminFromServer);
          setAccountType(3);
          return;
        }
        catch (err) {}
        console.log("No Account")
        setAccountType(0);
      }
    }
    
    getAccount();
  }, [email])

  const fetchTutor = async () => {
    const res = await fetch('/tutors/email/' + email, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    });
    const data = await res.json();
    return data;
  }
  const fetchTutoree = async () => {
    const res = await fetch('/tutorees/email/' + email, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    });
    const data = await res.json();
    return data;
  }
  const fetchAdmin = async () => {
    const res = await fetch('/admins/email/' + email, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    });
    const data = await res.json();
    return data;
  }

  const fetchTutorSessions = async (id) => {
    const res = await fetch('/sessions/tutor/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const data = await res.json();
    return data;
  }

  return (
    <Router>
      <div className="App" style={{height: "100%"}}>
        <Switch>
          <ProtectedRoute path="/tutor" isAuth={isAuth} component={(props) => <Tutor {...props} name={name} profileImg={profileImg} buttonPopup={buttonPopup} email={email} setButtonPopup={setButtonPopup} tutor={tutor} subjects={subjects} sessions={sessions} availabilities={availabilities} setAvailabilities={setAvailabilities} setIsAuth={setIsAuth} setAccountType={setAccountType} setEmail={setEmail}/>}/>
          <ProtectedRoute path="/tutoree" isAuth={isAuth} component={(props) => <Tutoree/>}/>
          <ProtectedRoute path="/admin" isAuth={isAuth} component={(props) => <Admin/>}/>
          <ProtectedRoute path="/signup" isAuth={isAuth} component={(props) => <SignUp {...props} email={email} setEmail={setEmail} setIsAuth={setIsAuth} setAccountType={setAccountType}/>}/>
          <Route path="/about" component={MockData}/>
          <Route exact path="/" component={(props) => <Home {...props} setName={setName} setProfileImg={setProfileImg} setEmail={setEmail} accountType={accountType} isAuth={isAuth}/>}/>
          <Route path="*" component={() => "404 No."}/>
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
