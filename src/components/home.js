import React, { useState, useEffect } from 'react';
import '../App.css';
import PlaylistList from './playlist-list';
import PlaylistDetails from './playlist-details';
import PlaylistForm from './playlist-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faMusic, faPlus} from '@fortawesome/free-solid-svg-icons';
import API from '../api-service';
import Login from "./login";

function Home() {
    // Can use these variables for testing purposes locally
    const [playlists, setPlaylists] = useState(null) //useState([{"id":123, "name":"Jesse's Playlist"},{"id":123, "name":"Jesse's Playlist"},{"id":123, "name":"Jesse's Playlist"}]);
    const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([])//useState([{"song_id": "75697225","song_name": "Hello","artist_id": "313922","artist_name": "harumi","album_id": "19882314","album_name": "Harumi - Remastered"}])//useState([])//useState([{"songId":1},{"songId":2},{"songId":3}]);

    // const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    // const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);
    const [editedPlaylist, setEditedPlaylist] = useState(null);
    const [songPageNumber, setSongPageNumber] = useState(1);
    const [token, setToken] = useState(false);

    useEffect(()=> {
        // get up-to-date playlists from microservice
        API.getPlaylists()
        .then( resp => setPlaylists(resp))
        .catch( error => console.log(error))

        // TODO: delete me if we end up using L41 pagination pattern
        // WITHOUT using pagination, get songs from the selected playlist
        // API.getSongs(selectedPlaylistId)
        // .then( resp => setSelectedPlaylistSongs(resp))
        // .catch( error => console.log(error))
    }, [selectedPlaylistId])

    const playlistClicked = async playlist => {
        console.log(playlist)
        setSelectedPlaylist(playlist);
        setSelectedPlaylistId(playlist.id);
        setEditedPlaylist(null);
        console.log(selectedPlaylistId)

        // using pagination, get songs from the selected playlist
        if (selectedPlaylistId !== null) {
        setSongPageNumber(1) // reset page num to 1
            API.getSongsWithPagination(selectedPlaylistId, songPageNumber)
                .then( resp => addMoreSongs(resp.body))
                .catch( error => console.log(error))
        }
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

    const addMoreSongs = song => {
        console.log(song)
        console.log(song.songs)
        const newSongs = song.songs;
        setSelectedPlaylistSongs(newSongs)
        console.log(newSongs)
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

    const logoutClicked = () => {
        API.logout()
            .then(() => setToken(false))
            .catch(() => console.log())
    }


    if(!token) {
       return <Login setToken={setToken} />
    }

    return (
        <div className="App-background">
            <div className="App">
                <header className="App-header">
                    <div className="header-content">
                        <h1><FontAwesomeIcon icon={faMusic} /> Playlist Pro</h1>
                        <div className="logout-button"> <div className="App-button" onClick={ logoutClicked }><FontAwesomeIcon icon={faArrowRight}/> Logout</div> </div>
                    </div>
                </header>
                <div className="horizontal-rule"></div>
                <div className="layout">
                    <div className="layout-left">
                        <div className="App-button" onClick={ newPlaylist }><FontAwesomeIcon icon={faPlus}/> New Playlist</div>
                        <PlaylistList playlists={playlists} playlistClicked={playlistClicked} editClicked={editClicked} removeClicked={removeClicked}/>
                    </div>
                    <div className="layout-right">
                        <PlaylistDetails playlist={selectedPlaylist} playlistSongs={selectedPlaylistSongs} songPageNumber={songPageNumber} setSongPageNumber={setSongPageNumber} />
                        { editedPlaylist ?
                            <PlaylistForm playlist={editedPlaylist} playlists={playlists} updatedPlaylist={updatedPlaylist} playlistCreated={playlistCreated}/>
                            : null }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;
