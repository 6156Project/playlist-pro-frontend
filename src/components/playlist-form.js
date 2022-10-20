import React, { useState, useEffect } from 'react';
import API from '../api-service';

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
        API.addPlaylist({name})
         .then( resp => props.playlistCreated(resp))
         .catch( error => console.log(error))
    }

    return (
    <React.Fragment>
        { props.playlist ? (
            <div>
            <label htmlFor="name">Name</label><br/>
            <input id ="name" type="text" placeholder="name" value={name}
                onChange={ event => setName(event.target.value)}
            /><br/>
            { props.playlist.id ? 
                <button onClick={updateClicked}>Update</button> :
                <button onClick={createClicked}>Create</button>
            }
            </div>
        ) : null}
     </React.Fragment>
    )
}

export default PlaylistForm;