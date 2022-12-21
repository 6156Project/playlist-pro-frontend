import React from 'react';
import { useLocation } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Logout() {
    const location = useLocation()

    return (
        <div className="App-background">
            <div className="App">
                <header className="App-header">
                    <h1>Logged out!</h1>
                    <div className="header-content">
                        <h2 className="textClass">Thanks for visiting PlaylistPro <div className="importantText">{location.state.nameState.name}.</div></h2>
                        <h2 className="textClass">Email <div className="importantText">{location.state.emailState.email}</div> has been logged out.</h2>
                        <h2 className="textClass">User ID: <div className="importantText">{location.state.userIDState.userID}</div></h2>
                    </div>
                </header>
                <div className="horizontal-rule"></div>
                <div className="login-button">
                    <h2>Click here to login again <FontAwesomeIcon icon={faArrowRight}/></h2>
                    <div className="logout-button">
                        <div className="App-button" >
                            <Link id="logoutLink" to="/login"><FontAwesomeIcon icon={faArrowRight}/> Go to login page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout
