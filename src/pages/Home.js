import { GoogleLogin } from 'react-google-login';
import auth from "../auth"

const Home = (props) => {

    const responseGoogleSuccess = (response) => {
        console.log(response);
        props.setName(response.profileObj.name)
        props.setProfileImg(response.profileObj.imageUrl)
        const emailPromise = new Promise((resolve, reject) => {
            props.setEmail(response.profileObj.email)
        }).then(
            auth.login(() => {
            props.history.push("/tutor");
        })
        )
        
        
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
