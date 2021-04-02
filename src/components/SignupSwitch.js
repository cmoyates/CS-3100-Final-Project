import {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const SignupSwitch = (props) => {

    const [selectedSubjects, setSelectedSubjects] = useState([false, false, false, false, false]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [gradeLevel, setGradeLevel] = useState(1);

    const selectSubjects = (event) => {
        let tempSelections = selectedSubjects;
        tempSelections[parseInt(event.target.name)] = event.target.checked;
        setSelectedSubjects(tempSelections);
    };

    const subjectStrings = ["Computer Science", "English", "French", "History", "Math"];

    const {compsci, english, french, history, math} = selectedSubjects;
    const error = [compsci, english, french, history, math].filter((v) => v).length < 1;

    const createId = (email) => {
        let id = "";
        for(let i=0; i<email.length; i++) {
            id = id.concat(email.charCodeAt(i).toString());
        }
        if(id.length > 20) {
            id = id.slice(0, 19);
        }
        parseInt(id);
        return id;
    }

    let idFromEmail = createId(props.email);

    let outputSubjects = [];

    const availabilities = 
    [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]];

    const selectGradeLevel = (event) => {
        setGradeLevel(event.target.value);
        console.log(event);
    };

    const uploadTutor = async () => {
        const res = await fetch('/tutors/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: idFromEmail,
            firstName: firstName,
            lastName: lastName,
            email: props.email,
            description: description,
            phoneNumber: phoneNumber,
            availabilities: availabilities,
            subjects: outputSubjects,
            feedback: 2.5
        })
        });
        const data = await res.json();
        return data;
      }

      const uploadTutoree = async () => {
        const res = await fetch('/tutorees/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: idFromEmail,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: props.email,
            gradeLevel: gradeLevel
        })
        });
        const data = await res.json();
        return data;
      }

      const uploadAdmin = async () => {
        const res = await fetch('/admins/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: idFromEmail,
            firstName: firstName,
            lastName: lastName,
            email: props.email
        })
        });
        const data = await res.json();
        return data;
      }

    switch(props.accountType) {
        case 'tutor':
            return(
                <div>
                    <span>
                        <TextField style = {{margin: '10px'}} id="firstName" label="First Name" variant="outlined" value={firstName} onInput={e=>setFirstName(e.target.value)} />
                        <TextField style = {{margin: '10px'}} id="lastName" label="Last Name" variant="outlined" value={lastName} onInput={e=>setLastName(e.target.value)} />
                    </span>
                    <br></br>
                    <TextField style = {{margin: '10px'}}
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onInput={e=>setDescription(e.target.value)}
                    />
                    <br></br>
                    <TextField
                        id="phoneNumber"
                        label="Phone Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={phoneNumber}
                        onInput={e=>setPhoneNumber(parseInt(e.target.value))}
                    />
                    <br></br>
                    <FormControl required error={error}>
                        <FormLabel style = {{margin: '10px'}}>Choose Subjects (At least one)</FormLabel>
                        <FormGroup>
                            <span>
                                <FormControlLabel
                                    control={<Checkbox checked={compsci} onChange={selectSubjects} name="0"/>}
                                    label = "Computer Science"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={english} onChange={selectSubjects} name="1"/>}
                                    label = "English"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={french} onChange={selectSubjects} name="2"/>}
                                    label = "French"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={history} onChange={selectSubjects} name="3"/>}
                                    label = "History"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={math} onChange={selectSubjects} name="4"/>}
                                    label = "Math"
                                />
                            </span>
                        </FormGroup>
                    </FormControl>
                    <br></br>
                    <Button variant="contained" onClick={async () => {
                        for(let i=0; i<selectedSubjects.length; i++) {
                            if(selectedSubjects[i]) {
                                outputSubjects.push(subjectStrings[i]);
                            }
                        }
                        try {
                            const tutorUploaded = await uploadTutor();
                        }
                        catch(err) {
                            props.setEmail("");
                            props.setIsAuth(false);
                            props.setAccountType(-1);
                            props.history.push('/');
                        }
                    }}>Submit</Button>
                </div>
            )
        case 'tutoree':
            return(
                <div>
                    <span>
                        <TextField style = {{margin: '10px'}} id="firstName" label="First Name" variant="outlined" value={firstName} onInput={e=>setFirstName(e.target.value)} />
                        <TextField style = {{margin: '10px'}} id="lastName" label="Last Name" variant="outlined" value={lastName} onInput={e=>setLastName(e.target.value)} />
                    </span>
                    <br></br>
                    <TextField
                        id="phoneNumber"
                        label="Phone Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={phoneNumber}
                        onInput={e=>setPhoneNumber(parseInt(e.target.value))}
                    />
                    <br></br>
                    <FormControl variant="outlined">
                        <InputLabel id="gradeLevel">Grade Level</InputLabel>
                        <Select 
                            style = {{margin: '10px'}}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={gradeLevel}
                            onChange={selectGradeLevel}
                            label="Age"
                        >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br>
                    <Button variant="contained" onClick={async () => {
                        try {
                            const tutoreeUploaded = await uploadTutoree();
                        }
                        catch(err) {
                            props.setEmail("");
                            props.setIsAuth(false);
                            props.setAccountType(-1);
                            props.history.push('/');
                        }
                    }}>Submit</Button>
                </div>
            )
        case 'admin':
            return(
                <div>
                    <span>
                        <TextField style = {{margin: '10px'}} id="firstName" label="First Name" variant="outlined" value={firstName} onInput={e=>setFirstName(e.target.value)} />
                        <TextField style = {{margin: '10px'}} id="lastName" label="Last Name" variant="outlined" value={lastName} onInput={e=>setLastName(e.target.value)} />
                    </span>
                    <br></br>
                    <Button variant="contained" onClick={async () => {
                        try {
                            const adminUploaded = await uploadAdmin();
                        }
                        catch(err) {
                            props.setEmail("");
                            props.setIsAuth(false);
                            props.setAccountType(-1);
                            props.history.push('/');
                        }
                    }}>Submit</Button>
                </div>
            )
        default:
            return(
                <div></div>
            )
    } 
}

export default SignupSwitch
