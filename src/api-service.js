// Needs to be changed depending on what microservice is being called/where it is being called

const baseUrl = "http://127.0.0.1:5011/" //Local Dev
//sconst baseUrl = "https://80exsb2z98.execute-api.us-east-1.amazonaws.com/dev"  //Dev API gateway

export default class API {
    static getPlaylists() {
        return fetch(`${baseUrl}api/playlists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( resp => resp.json())
    }

    static getPlaylistsWithPagination(page) {
        return fetch(`${baseUrl}api/playlists&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( resp => resp.json())
    }

    static getSongs(selectedPlaylistId) {
        return fetch(`${baseUrl}api/playlists/${selectedPlaylistId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( resp => resp.json())
    }

    static getSongsWithPagination(selectedPlaylistId, page) {
        return fetch(`${baseUrl}api/playlists/${selectedPlaylistId}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( resp => resp.json())
    }

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
