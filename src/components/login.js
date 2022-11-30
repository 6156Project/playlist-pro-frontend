import React from 'react';
import API  from '../api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight
} from "@fortawesome/free-solid-svg-icons";


function Login() {
    const loginClicked = () => {
        API.login()
            .then()
            .catch(() => console.log())
    }

    return (
        <div className="App-background">
            <div className="App">
                <header className="App-header">
                    <h1>Login </h1>
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