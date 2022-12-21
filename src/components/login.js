import React from 'react';
import API  from '../api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight
} from "@fortawesome/free-solid-svg-icons";


function Login() {
    const loginClicked = () => {
        API.login()
            .then(function(json) {
                // This function takes the redirect URL from the given callback
                // and replaces it with the frontend URL so that it redirects correctly
                // after login...
                console.log(json)
                console.log("Login clicked...")
                window.location.replace(json.request_uri)
                var host = window.location.host
                console.log(host)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="App-background">
            <div className="App">
                <header className="App-header">
                    <h1>Login Page</h1>
                </header>
                <div className="horizontal-rule"></div>
                <div className="login-button">
                    <div className="App-button" onClick={loginClicked}><FontAwesomeIcon icon={faArrowRight}/> Login in with Google</div>
                </div>
            </div>
        </div>
    )
}

export default Login