import React, { useState, useEffect } from 'react';
import '../App.css';
import PlaylistList from './playlist-list';
import PlaylistDetails from './playlist-details';
import PlaylistForm from './playlist-form';
import PlaylistUserForm from './playlist-user-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faMusic, faPlus} from '@fortawesome/free-solid-svg-icons';
import API from '../api-service';
//import Login from "./login";

function Home() {
    // Can use these variables for testing purposes locally
    const [playlists, setPlaylists] = useState(null) //useState([{"id":123, "name":"Jesse's Playlist"},{"id":123, "name":"Jesse's Playlist"},{"id":123, "name":"Jesse's Playlist"}]);
    const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([])//useState([{"song_id": "75697225","song_name": "Hello","artist_id": "313922","artist_name": "harumi","album_id": "19882314","album_name": "Harumi - Remastered"}])//useState([])//useState([{"songId":1},{"songId":2},{"songId":3}]);

    // const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    const [addUserVar, setAddUserVar] = useState(null);
    const [addUserPlaylist, setAddUserPlaylist] = useState(null);

    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(0);
    const [maxPlaylistLength, setMaxPlaylistLength] = useState(0);

    // const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);
    const [editedPlaylist, setEditedPlaylist] = useState(null);
    const [songPageNumber, setSongPageNumber] = useState(1);
    //const [token, setToken] = useState(false);

    // Set this to true whenever useEffect needs to be called so page gets refreshed
    const [useEffectFlag, setUseEffectFlag] = useState(false);

    useEffect(()=> {
        setUseEffectFlag(false)

        console.log(page)
        console.log(offset)
        console.log(maxPlaylistLength)

        // Logic so that buttons are greyed out if not clickable.
        let pageLeftButton = document.getElementById("pageLeftButton")
        if (offset > 0) {
            pageLeftButton.style.pointerEvents = "auto";
            pageLeftButton.style.backgroundColor = "green";
            pageLeftButton.style.textDecoration = "none";
        } else {
            pageLeftButton.style.pointerEvents = "none";
            pageLeftButton.style.backgroundColor = "gray";
            pageLeftButton.style.textDecoration = "line-through";
        }
        let pageRightButton = document.getElementById("pageRightButton")
        // This first part of the if statement is needed for when DOM is just initialized
        // Otherwise button will be greyed out at first render
        if ((page == 0 && offset == 0 && maxPlaylistLength == 0) || (offset < (maxPlaylistLength - limit))) {
            pageRightButton.style.pointerEvents = "auto";
            pageRightButton.style.backgroundColor = "green";
            pageRightButton.style.textDecoration = "none";
        } else {
            pageRightButton.style.pointerEvents = "none";
            pageRightButton.style.backgroundColor = "gray";
            pageRightButton.style.textDecoration = "line-through";
        }

        // get up-to-date playlists from microservice
        API.getPlaylistsWithPagination(limit, offset)
        .then( resp => setPlaylists(resp))
        .catch( error => console.log(error))

        API.getPlaylists()
        .then( resp => setMaxPlaylistLength(resp.body.length))

        // TODO: delete me if we end up using L41 pagination pattern
        // WITHOUT using pagination, get songs from the selected playlist
        // API.getSongs(selectedPlaylistId)
        // .then( resp => setSelectedPlaylistSongs(resp))
        // .catch( error => console.log(error))
    }, [selectedPlaylistId, offset, page, maxPlaylistLength, useEffectFlag, selectedPlaylist])

    const addUser = playlist => {
        console.log(playlist)
        console.log("Add User Clicked")
        setSelectedPlaylist(null);
        setEditedPlaylist(null);
        setAddUserVar("Yes");
        setAddUserPlaylist(playlist);
    }

    const addPage = () => {
        console.log("addPage")
        if (offset < (maxPlaylistLength - limit)) {
            setPage(page + 1)
            setOffset((page + 1) * limit)
        }
        console.log("addPage done")
    }

    const subtractPage = () => {
        console.log("Subtract page")
        if (offset > 0) {
            setPage( page - 1)
            setOffset((page - 1) * limit)
        }
        console.log("Subtract page done")
    }

    const playlistClicked = async playlist => {
        console.log(playlist)
        setSelectedPlaylist(playlist);
        setSelectedPlaylistId(playlist.id);
        setEditedPlaylist(null);
        setAddUserVar(null);
        console.log(playlist.id)

        // using pagination, get songs from the selected playlist
        if (playlist.id !== null) {
        setSongPageNumber(1) // reset page num to 1
            API.getSongsWithPagination(playlist.id, songPageNumber)
                .then( resp => addMoreSongs(resp.body))
                .catch( error => console.log(error))
        }
    }

    const editClicked = playlist => {
        console.log(playlist)
        console.log("Edit Clicked")
        setSelectedPlaylist(null);
        setEditedPlaylist(playlist);
        setAddUserVar(null);
    }

    const updatedPlaylist = playlist => {
        // Modify one of the useEffect state vars
        // so that useEffect gets called and grabs all the playlists again
        setUseEffectFlag(true)
    }

    const newPlaylist = () => {
        setSelectedPlaylist(null);
        setAddUserVar(null);
        setEditedPlaylist({name: ''});
    }

    const playlistCreated = playlist => {
        // Modify one of the useEffect state vars
        // so that useEffect gets called and grabs all the playlists again
        setUseEffectFlag(true)
    }

    const addMoreSongs = song => {
        console.log(song)
        console.log(song.songs)
        const newSongs = song.songs;
        setSelectedPlaylistSongs(newSongs)
        console.log(newSongs)
    }

    const removeClicked = playlist => {
        // Modify one of the useEffect state vars
        // so that useEffect gets called and grabs all the playlists again
        setMaxPlaylistLength(maxPlaylistLength - 1)
    }

    const logoutClicked = () => {
        API.logout()
            //.then(() => setToken(false))
            .catch(() => console.log())
    }


    //if(!token) {
    //    return <Login setToken={setToken} />
    //}

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
                        <div id="numberOfPlaylists"><h2>Number of playlists: {maxPlaylistLength}</h2></div>
                        <div className="App-button" onClick={ newPlaylist }><FontAwesomeIcon icon={faPlus}/> New Playlist</div>
                        <PlaylistList playlists={playlists} addUser={addUser} playlistClicked={playlistClicked} editClicked={editClicked} removeClicked={removeClicked}/>
                        <div className="horizontal-rule"></div>
                        <div className="pageButtonHolder">
                            <div id="pageLeftButton" className="App-button" onClick={ () => subtractPage() }><FontAwesomeIcon icon={faArrowLeft}/> Page Left</div>
                            <div id="pageRightButton" className="App-button" onClick={ () => addPage() }><FontAwesomeIcon icon={faArrowRight}/> Page Right</div>
                            <div id="pageNumber"><h3>Page {page+1}</h3></div>
                        </div>
                    </div>
                    <div className="layout-right">
                        <PlaylistDetails playlist={selectedPlaylist} playlistSongs={selectedPlaylistSongs}
                                         songPageNumber={songPageNumber} setSongPageNumber={setSongPageNumber}
                                         setUseEffectFlag={setUseEffectFlag} playlistClicked={playlistClicked}/>
                        { editedPlaylist ?
                            <PlaylistForm playlist={editedPlaylist} playlists={playlists} updatedPlaylist={updatedPlaylist} playlistCreated={playlistCreated}/>
                            : null }
                        { addUserVar ?
                            <PlaylistUserForm playlist={addUserPlaylist} playlists={playlists}/>
                            : null }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;
