import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tutor from "./pages/Tutor";
import ProtectedRoute from "./components/protected.route";
import {useState, useEffect} from 'react'

function App() {

  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [tutorees, setTutorees] = useState([]);

  useEffect(() => {
    const getStuff = async () => {
      const stuffFromServer = await fetchStuff();
      console.log(stuffFromServer)
      setTutorees(stuffFromServer);
    }

    getStuff();
  }, [])

  const fetchStuff = async () => {
    const tutor = {id: 1,
          firstName: "Cristopher",
          lastName: "Yates",
          email: 'cmoyates@gmail.com',
          description:        'Pretty bad at tutoring tbh',
          phoneNumber:        '1234567890',
          availabilities:     [true, false],
          subjects:           ["compsci"],
          feedback:           2.5}
    const res = await fetch('/tutors', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(tutor)
    });
    const data = await res.json();
    return data;
  }

  return (
    <Router>
      <div className="App" style={{height: "100%"}}>
        <Switch>
          <ProtectedRoute path="/tutor" component={(props) => <Tutor {...props} name={name} profileImg={profileImg} tutorees={tutorees}/>}/>
          <Route path="/about" component={About}/>
          <Route exact path="/" component={(props) => <Home {...props} setName={setName} setProfileImg={setProfileImg}/>}/>
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
