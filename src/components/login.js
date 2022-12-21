import React from 'react';
import API  from '../api-service';

import googleButton from '../assets/signinGooglebutton.png';
import musicLogo from '../assets/musicLogo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faMusic, faPlus} from '@fortawesome/free-solid-svg-icons';


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
                    <div id="playlistProLogo"><img src={ musicLogo } alt="Playlist Pro Logo" /></div>
                    <h1><FontAwesomeIcon icon={faMusic} /> Welcome to Playlist Pro! <FontAwesomeIcon icon={faMusic} /></h1>
                    <p>You are not signed in... please sign in with the button below to access.</p>
                </header>
                <div className="horizontal-rule"></div>
                <div className="login-button">
                    <div id="googleButton" onClick={loginClicked}><img src={ googleButton } alt="Sign in with Google" /></div>
                </div>
            </div>
        </div>
    )
}

export default Login