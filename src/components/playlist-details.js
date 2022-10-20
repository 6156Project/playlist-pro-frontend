import React from 'react'

function PlaylistDetails(props) {

    return (
        <React.Fragment>
            {props.playlist ? (
            <div>
            <h1>Seleted Playlist: {props.playlist.name}</h1>
                <h1></h1>
                { props.playlistSongs && props.playlistSongs.map( songs => { 
                  return (
                    <div key={songs.songId}>
                        <h2>{songs.songId}</h2>
                    </div>
                  )
                })}
            </div>
            ): null}
        </React.Fragment >
    )
}

export default PlaylistDetails