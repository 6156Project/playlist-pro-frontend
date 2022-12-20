import React, { useState } from 'react';
import API from '../api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function PlaylistUserForm(props) {

    const [name, setName] = useState('');


    const addUserPressed = () => {
        console.log("Update pressed")
        API.addUsertoPlaylist(props.playlist.id, name, props.postPlaylistAccessLink)
         .then( resp => console.log("success resp:", resp))
         .catch( error => console.log(error))
    }

    /*
    const createClicked = () => {
        console.log("Create pressed")
        console.log(name)
        console.log(props.playlists.length)
        API.addPlaylist({
            id: props.playlists.length + 1,
            name: name
        })
         .then( resp => props.playlistCreated(resp))
         .catch( error => console.log(error))
    }
    */

    return (
    <React.Fragment>
        { props.playlist ? (
            <div className="form-div">
                <label htmlFor="name"><h1>Enter User to Add to Playlist {props.playlist.name}</h1></label><br/>
                <input id="name" type="text" placeholder="Username" value={name}
                    onChange={ event => setName(event.target.value) }
                />
                <br/>
                    <div className="App-button" onClick={addUserPressed}><FontAwesomeIcon icon={faPlus}/> Add User</div>
            </div>
        ) : null}
     </React.Fragment>
    )
}

export default PlaylistUserForm;