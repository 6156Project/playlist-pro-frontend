import React from 'react';
import API  from '../api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faArrowsTurnRight,
    faMusic,
    faPlus,
    faTentArrowLeftRight
} from "@fortawesome/free-solid-svg-icons";
import PlaylistList from "./playlist-list";
import PlaylistDetails from "./playlist-details";
import PlaylistForm from "./playlist-form";


function Login(props) {
    const loginClicked = () => {
        API.login()
            .then()
            .catch(error => console.log())
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