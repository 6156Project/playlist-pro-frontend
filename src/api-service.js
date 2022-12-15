// Needs to be changed depending on what microservice is being called/where it is being called

//const baseUrl = "http://127.0.0.1:5011/" //Local Dev
const baseUrl = "https://80exsb2z98.execute-api.us-east-1.amazonaws.com/dev/"  //Dev API gateway

export default class API {
    // HELPER FUNCTIONS
    // Show the spinner before API call
    // then, hide the spinner after the API call is completed
    static showSpinner() {
        let spinner = document.getElementById("spinnerContainer");
        spinner.style.display = "flex";
    }

    static hideSpinner() {
        let spinner = document.getElementById("spinnerContainer");
        spinner.style.display = "none";
    }

    static async getPlaylists() {
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }


    static async getPlaylistsWithPagination(page) {
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlists?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async getSongs(songName) {
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/songs/search?song_name=${songName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async getSongsWithPagination(selectedPlaylistId, page) {
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlistsongs/${selectedPlaylistId}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async updatePlaylist(selectedPlaylistId, body) {
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlists/${selectedPlaylistId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async addPlaylist(body) {
        console.log(body)
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlists`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async addSongtoPlaylist(playlistId, body) {
        console.log(body)
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlistsongs/${playlistId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async deletePlaylist(playlistId) {
        API.showSpinner();
        const response = await fetch(`${baseUrl}api/playlists/${playlistId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async login() {
        API.showSpinner();
        const response = await fetch(`${baseUrl}login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }

    static async logout() {
        API.showSpinner();
        const response = await fetch(`${baseUrl}logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        API.hideSpinner();
        return json;
    }


}
