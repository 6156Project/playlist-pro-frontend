import React,  { useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import API from "../api-service";

function PlaylistDetails(props) {

    const [songName, setSongName] = useState('');
    const [userNameAccess, setUserNameAccess] = useState('');
    const [userNameDeletion, setUserNameDeletion] = useState('');

    const addingSongsLogic = (event) => {
        let songName = event.target.value
        let addSongButton = document.getElementById("getMoreSongsButton")
        setSongName(songName)

        if (songName.length <= 0) {
            console.log("Song name not long enough");
            addSongButton.style.pointerEvents = "none";
            addSongButton.style.backgroundColor = "gray";
            addSongButton.style.textDecoration = "line-through";
        } else {
            console.log("Song name valid.");
            addSongButton.style.pointerEvents = "auto";
            addSongButton.style.backgroundColor = "green";
            addSongButton.style.textDecoration = "none";
        }
        console.log("Done.");
    }

    const userAccessCheckLogic = (event) => {
        let userNameAccess = event.target.value
        let checkUserAccessButton = document.getElementById("checkUserAccessButton")
        setUserNameAccess(userNameAccess)

        if (userNameAccess.length <= 0) {
            console.log("User name not long enough");
            checkUserAccessButton.style.pointerEvents = "none";
            checkUserAccessButton.style.backgroundColor = "gray";
            checkUserAccessButton.style.textDecoration = "line-through";
        } else {
            console.log("User name valid.");
            checkUserAccessButton.style.pointerEvents = "auto";
            checkUserAccessButton.style.backgroundColor = "green";
            checkUserAccessButton.style.textDecoration = "none";
        }
        console.log("Done.");
    }

    const userNameDeletionLogic = (event) => {
        let userNameDeletion = event.target.value
        let userNameDeletionButton = document.getElementById("userNameDeletionButton")
        setUserNameDeletion(userNameDeletion)

        if (userNameDeletion.length <= 0) {
            console.log("User name not long enough");
            userNameDeletionButton.style.pointerEvents = "none";
            userNameDeletionButton.style.backgroundColor = "gray";
            userNameDeletionButton.style.textDecoration = "line-through";
        } else {
            console.log("User name valid.");
            userNameDeletionButton.style.pointerEvents = "auto";
            userNameDeletionButton.style.backgroundColor = "green";
            userNameDeletionButton.style.textDecoration = "none";
        }
        console.log("Done.");
    }

    const getMoreSongs = () => {
        //let newPageNumber = props.songPageNumber + 1
        //console.log("getMoreSongs with page num: " + newPageNumber)

        //props.setSongPageNumber(newPageNumber)
        API.getSongs(songName, props.getSongsLink)
        //.then( resp => console.log(resp.at(0)))
        //.then( resp => props.addMoreSongs(resp))
        .then( resp => addSongToPlaylist(resp))
        .catch( error => console.log(error))
    }

    const addSongToPlaylist = (resp) => {
        var song = resp.at(0)
        console.log(song)
        API.addSongtoPlaylist(props.playlist.id, song, props.postPlaylistSongsLink)
        .then( resp => {
            console.log(resp)
            props.setUseEffectFlag(true)
            // After adding song to playlist, need to reclick the playlist so it displays new songs
            console.log("Clicking playlist")
            console.log(props.playlist)
            props.playlistClicked(props.playlist)
        })
        .catch( error => console.log(error))
    }

    const checkUserAccess = (resp) => {
        API.checkUserAccessOnPlaylist(props.playlist.id, userNameAccess, props.postPlaylistAccessLink)
            .then( resp => {
                console.log("success resp:", resp)
                document.getElementById("checkUserAccessP").innerHTML = "User name: " + userNameAccess + " has access? = " + resp
                // don't need to call anything since its not modifying anything. just checking access
            })
            .catch( error => console.log(error))
    }

    const userNameDeletionCall = (resp) => {
        API.deleteUserAccessOnPlaylist(props.playlist.id, userNameDeletion, props.postPlaylistAccessLink)
            .then( resp => {
                console.log("success resp:", resp)
                document.getElementById("userNameDeletionP").innerHTML = "User name: " + userNameDeletion + " was deleted? = " + resp
                console.log(resp)
                props.setUseEffectFlag(true)
                // After adding song to playlist, need to reclick the playlist so it displays new songs
                console.log("Clicking playlist")
                console.log(props.playlist)
                props.playlistClicked(props.playlist)
            })
            .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            {props.playlist ? (
            <div id="playlistDetailsDiv">
                <h1>Selected Playlist:<br/>{props.playlist.name}</h1><br/>
                <h2>Song List</h2>
                    { props.playlistSongs && props.playlistSongs.map( song => {
                      return (
                        <div key={song.song_id}>
                            <p>
                                <b>Song: {song.song_name}</b> <br/>
                                by: {song.artist_name} <br/>
                                on album: {song.album_name}
                            </p>
                        </div>
                      )
                    })}
                    <br/><br/>
                <h2>User Access List</h2>
                { props.playlistUsers && props.playlistUsers.map( user => {
                    return (
                        <div key={user.userId}>
                            <p><b>User: {user.userId}</b></p>
                        </div>
                    )
                })}
                <br/><br/>

                <h2>Buttons</h2>
                <input id="songName" type="text" placeholder="Song Name to Fetch" value={songName}
                    onChange={ event => addingSongsLogic(event) }
                />
                <div id="getMoreSongsButton" className="App-button" onClick={getMoreSongs}><FontAwesomeIcon icon={faPlus}/> Fetch more songs</div>
                <br/>
                <br/>
                <br/>


                <input id="userNameAccess" type="text" placeholder="User Name To Check" value={userNameAccess}
                       onChange={ event => userAccessCheckLogic(event) }
                />
                <div id="checkUserAccessButton" className="App-button" onClick={checkUserAccess}><FontAwesomeIcon icon={faPlus}/> Check User Access</div>
                <p id="checkUserAccessP"></p>
                <br/>
                <br/>


                <input id="userNameDeletion" type="text" placeholder="User Name To Delete" value={userNameDeletion}
                       onChange={ event => userNameDeletionLogic(event) }
                />
                <div id="userNameDeletionButton" className="App-button" onClick={userNameDeletionCall}><FontAwesomeIcon icon={faPlus}/> Remove User Access</div>
                <p id="userNameDeletionP"></p>
                <br/>
                <br/>
            </div>
            ): null}
        </React.Fragment >
    )
}

export default PlaylistDetails