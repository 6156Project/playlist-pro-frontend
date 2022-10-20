const baseUrl = "http://127.0.0.1:5011/" 


export default class API {

    static updatePlaylist(selectedPlaylistId, body) {
        return fetch(`${baseUrl}api/playlists/${selectedPlaylistId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
          })
          .then( resp => resp.json())
    }

    static addPlaylist(body) {
        return fetch(`${baseUrl}api/playlists`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
          })
          .then( resp => resp.json())
    }

    static deletePlaylist(playlistId) {
        return fetch(`${baseUrl}api/playlists/${playlistId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          })
    }

}