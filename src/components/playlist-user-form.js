import React, { useState } from 'react';
import API from '../api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function PlaylistUserForm(props) {

    const [name, setName] = useState('');

    const addUserPressed = () => {
        console.log("Update pressed")
        API.addUsertoPlaylist(props.playlist.id, name, props.postPlaylistAccessLink)
         .then( resp => {
             console.log("success resp:", resp)
             document.getElementById("addUserResultP").innerHTML = "User name: " + name + ". Access granted? = " + resp
         })
         .catch( error => console.log(error))
    }

    return (
    <React.Fragment>
        { props.playlist ? (
            <div id="playlistUserFormDiv" className="form-div">
                <label htmlFor="name"><h1>Enter User to Add to Playlist {props.playlist.name}</h1></label><br/>
                <input id="name" type="text" placeholder="Username" value={name}
                    onChange={ event => setName(event.target.value) }
                />
                <br/>
                    <div className="App-button" onClick={addUserPressed}><FontAwesomeIcon icon={faPlus}/> Add User</div>
                <p id="addUserResultP"></p>
            </div>
        ) : null}
     </React.Fragment>
    )
}

export default PlaylistUserForm;