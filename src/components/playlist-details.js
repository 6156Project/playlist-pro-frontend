import React from 'react'

function PlaylistDetails(props) {

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
            </div>
            ): null}
        </React.Fragment >
    )
}

export default PlaylistDetails