import {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignupSwitch = (props) => {

    const [selectedSubjects, setSelectedSubjects] = useState([false, false, false, false, false]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const selectSubjects = (event) => {
        let tempSelections = selectedSubjects;
        tempSelections[parseInt(event.target.name)] = event.target.checked;
        setSelectedSubjects(tempSelections);
    };

    const subjectStrings = ["Computer Science", "English", "French", "History", "Math"];

    const {compsci, english, french, history, math} = selectedSubjects;
    const error = [compsci, english, french, history, math].filter((v) => v).length < 1;

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
                    <Button onClick={() => {
                        let outputSubjects = [];
                        for(let i=0; i<selectedSubjects.length; i++) {
                            if(selectedSubjects[i]) {
                                outputSubjects.push(subjectStrings[i]);
                            }
                        }

                    }}>Submit</Button>
                </div>
            )
        case 'tutoree':
            return(
                <div>
                    <h1>tutoree</h1>
                </div>
            )
        case 'admin':
            return(
                <div>
                    <h1>admin</h1>
                </div>
            )
        default:
            return(
                <div></div>
            )
    } 
}

export default SignupSwitch
