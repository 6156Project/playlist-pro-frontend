import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import API from "../api-service";

function PlaylistDetails(props) {
    const getMoreSongs = () => {
        let newPageNumber = props.songPageNumber + 1
        console.log("getMoreSongs with page num: " + newPageNumber)

        props.setSongPageNumber(newPageNumber)
        API.getSongsWithPagination(props.playlist.id, newPageNumber)
        .then( resp => props.addMoreSongs(resp))
        .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            {props.playlist ? (
            <div>
                <h1>Selected Playlist:<br/>{props.playlist.name}</h1>
                    { props.playlistSongs && props.playlistSongs.map( song => {
                      return (
                        <div key={song.songId}>
                            <h2>{song.songId}</h2>
                        </div>
                      )
                    })}
                    <br/>
                <div className="App-button" onClick={getMoreSongs}><FontAwesomeIcon icon={faPlus}/> Fetch more songs</div>
            </div>
            ): null}
        </React.Fragment >
    )
}

export default PlaylistDetails