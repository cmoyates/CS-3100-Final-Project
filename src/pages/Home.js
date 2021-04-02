import { GoogleLogin } from 'react-google-login';
import {useEffect, useState} from 'react'

const Home = (props) => {

    useEffect(() => {
        if (props.accountType !== -1 && props.isAuth) {
            switch (props.accountType) {
                case 0: props.history.push("/signup"); break;
                case 1: props.history.push("/tutor"); break;
                case 2: props.history.push("/tutoree"); break;
                case 3: props.history.push("/admin"); break;
            }
        }
    }, [props.accountType, props.isAuth])

    const responseGoogleSuccess = (response) => {
        props.setName(response.profileObj.name)
        props.setProfileImg(response.profileObj.imageUrl)
        props.setEmail(response.profileObj.email)       
    }

    const responseGoogleFailure = (response) => {
        console.log(response);
    }

    return (
        <div>
            <h1>TUTORING<br/>DASHBOARD</h1>
            <GoogleLogin
                clientId="813957842713-jk53tal3b8636a4mgk5gahnceimnmhsh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Home
