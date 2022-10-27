import React, { useState, useEffect } from 'react';
import './App.css';
import PlaylistList from './components/playlist-list';
import PlaylistDetails from './components/playlist-details';
import PlaylistForm from './components/playlist-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  // Can use these variables for testing purposes locally
  // const [playlists, setPlaylists] = useState([{"id":123, "name":"Jesse's Playlist"},{"id":123, "name":"Jesse's Playlist"},{"id":123, "name":"Jesse's Playlist"}]);
  // const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([{"songId":1},{"songId":2},{"songId":3}]);

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);
  const [editedPlaylist, setEditedPlaylist] = useState(null);

  const baseUrl = "http://127.0.0.1:5011/" //Needs to be changed depending on what microservice is being called/where it is being called

  useEffect(()=> {
    fetch(`${baseUrl}api/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( resp => resp.json())
    .then( resp => setPlaylists(resp))
    .catch( error => console.log(error))

    fetch(`${baseUrl}api/playlists/${selectedPlaylistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( resp => resp.json())
    .then( resp => setSelectedPlaylistSongs(resp))
    .catch( error => console.log(error))

    
  }, [selectedPlaylistId])

  const playlistClicked = playlist => {
    setSelectedPlaylist(playlist);
    setSelectedPlaylistId(playlist.id);
    setEditedPlaylist(null);
  }

  const editClicked = playlist => {
    console.log(playlist)
    console.log("Edit Clicked")
    setSelectedPlaylist(null);
    setEditedPlaylist(playlist);
}

  const updatedPlaylist = playlist => {
    const newPlaylists = playlists.map( play => {
      if (play.id === playlist.id) {
        return playlist;
      }
      return play
    })
    setPlaylists(newPlaylists)
  }

  const newPlaylist = () => {
    setSelectedPlaylist(null);
    setEditedPlaylist({name: ''});
  }

  const playlistCreated = playlist => {
    const newPlaylists = [...playlists, playlist];
    setPlaylists(newPlaylists);
  }

  const removeClicked = playlist => {
    const newPlaylists = playlists.filter( play => {
      if (play.id === playlist.id) {
        return false;
      }
      return true;
    })
    setPlaylists(newPlaylists);
  }

  return (
      <div className="App-background">
        <div className="App">
          <header className="App-header">
            <h1><FontAwesomeIcon icon={faMusic} /> Playlist Pro</h1>
          </header>
          <div className="horizontal-rule"></div>
          <div className="layout">
            <div className="layout-left">
              <div className="App-button" onClick={ newPlaylist }><FontAwesomeIcon icon={faPlus}/> New Playlist</div>
              <PlaylistList playlists={playlists} playlistClicked={playlistClicked} editClicked={editClicked} removeClicked={removeClicked}/>
            </div>
            <div className="layout-right">
              <PlaylistDetails playlist={selectedPlaylist} playlistSongs={selectedPlaylistSongs} />
              { editedPlaylist ?
                  <PlaylistForm playlist={editedPlaylist} updatedPlaylist={updatedPlaylist} playlistCreated={playlistCreated}/>
                  : null }
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
