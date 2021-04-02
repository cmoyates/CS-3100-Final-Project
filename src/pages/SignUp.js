import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SignupSwitch from '../components/SignupSwitch';


const SignUp = (props) => {

const [accType, setAccType] = useState('tutor');

const selectAccountType = (event) => {
    setAccType(event.target.value);
};

    return (
        <div>
            <h1>Tutoring Dashboard</h1>
            <h2>Sign Up</h2>
            <RadioGroup aria-label="Account Type" name="accountType" value={accType} onChange={selectAccountType}>
                <span>
                    <FormControlLabel style={{justifyContent: 'center'}} value="tutor" control={<Radio />} label="Tutor" />
                    <FormControlLabel style={{justifyContent: 'center'}} value="tutoree" control={<Radio />} label="Tutoree" />
                    <FormControlLabel style={{justifyContent: 'center'}} value="admin" control={<Radio />} label="Admin" />
                </span>
            </RadioGroup>
            <SignupSwitch accountType={accType} email={props.email} history={props.history} setEmail={props.setEmail} setIsAuth={props.setIsAuth} setAccountType={props.setAccountType}/>
        </div>
    )
}

export default SignUp