import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tutor from "./pages/Tutor";
import ProtectedRoute from "./components/protected.route";
import {useState, useEffect} from 'react'
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

  useEffect(() => {
    const getStuff = async () => {
      const tutorFromServer = await fetchTutor();
      setTutor(tutorFromServer);
      setSubjects(tutorFromServer.subjects);
      setAvailabilities(tutorFromServer.availabilities);
      const sessionsFromServer = await fetchSessions();
      setSessions(sessionsFromServer);
      console.log(sessions)
    }
    
    getStuff();
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

  const fetchSessions = async () => {
    const res = await fetch('/sessions/tutor/' + tutor.id, {
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
          <ProtectedRoute path="/tutor" component={(props) => <Tutor {...props} name={name} profileImg={profileImg} buttonPopup={buttonPopup} email={email} setButtonPopup={setButtonPopup} tutor={tutor} subjects={subjects} sessions={sessions} availabilities={availabilities}/>}/>
          <Route path="/about" component={About}/>
          <Route exact path="/" component={(props) => <Home {...props} setName={setName} setProfileImg={setProfileImg} setEmail={setEmail}/>}/>
          <Route path="*" component={() => "404 No."}/>
        </Switch>
      </div>
      
    </Router>
  );
}


/*
  <header className="App-header">
        
        </header>
*/
export default App;
