import React, { useState, useEffect } from 'react';
import API from '../api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function PlaylistForm(props) {

    const [name, setName] = useState('');


    useEffect(()=> {
        setName(props.playlist.name)
    },[props.playlist])

    const updateClicked = () => {
        console.log("Update pressed")
        API.updatePlaylist(props.playlist.id, {name})
         .then( resp => props.updatedPlaylist(resp))
         .catch( error => console.log(error))
    }

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

    return (
    <React.Fragment>
        { props.playlist ? (
            <div className="form-div">
                <label htmlFor="name"><h1>Enter Playlist Name</h1></label><br/>
                <input id="name" type="text" placeholder="name" value={name}
                    onChange={ event => setName(event.target.value) }
                />
                <br/>
                { props.playlist.id ?
                    <div className="App-button" onClick={updateClicked}><FontAwesomeIcon icon={faPlus}/> Update</div> :
                    <div className="App-button" onClick={createClicked}><FontAwesomeIcon icon={faPlus}/> Create</div>
                }
            </div>
        ) : null}
     </React.Fragment>
    )
}

export default PlaylistForm;