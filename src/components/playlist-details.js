import React,  { useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import API from "../api-service";

function PlaylistDetails(props) {

    const [songName, setsongName] = useState('');


    const getMoreSongs = () => {
        //let newPageNumber = props.songPageNumber + 1
        //console.log("getMoreSongs with page num: " + newPageNumber)

        //props.setSongPageNumber(newPageNumber)
        API.getSongs(songName)
        //.then( resp => console.log(resp.at(0)))
        //.then( resp => props.addMoreSongs(resp))
        .then( resp => addSongToPlaylist(resp))
        .catch( error => console.log(error))
    }

    const addSongToPlaylist = (resp) => {
        var song = resp.at(0)
        console.log(song)
        API.addSongtoPlaylist(props.playlist.id, song)
        .then( resp => console.log(resp))
        .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            {props.playlist ? (
            <div>
                <h1>Selected Playlist:<br/>{props.playlist.name}</h1><br/>
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
                <input id="songName" type="text" placeholder="Song Name to Fetch" value={songName}
                    onChange={ event => setsongName(event.target.value) }
                />
                <div className="App-button" onClick={getMoreSongs}><FontAwesomeIcon icon={faPlus}/> Fetch more songs</div>
            </div>
            ): null}
        </React.Fragment >
    )
}

export default PlaylistDetails