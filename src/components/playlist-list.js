import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import API  from '../api-service';


function PlaylistList(props) {

    const playlistClicked = playlist => event => {
        props.playlistClicked(playlist)
    }

    const editClicked = playlist => {
        props.editClicked(playlist);
    }

    const removeClicked = playlist => {
        API.deletePlaylist(playlist.id)
        .then( () => props.removeClicked(playlist))
        .catch(error => console.log())
    }

    return (
          <div>
            <h1>Playlists</h1>
            { props.playlists && props.playlists.body.map( playlist => { 
              return (
                <div key={playlist.id} className="playlist-item">
                    <h2 onClick={playlistClicked(playlist)}>{playlist.name}</h2>
                    <FontAwesomeIcon icon={faUser} onClick={() => editClicked(playlist)}/>
                    <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(playlist)}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(playlist)}/>
                </div>
              )
            })}
          </div>
    )
}

export default PlaylistList