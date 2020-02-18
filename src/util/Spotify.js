const clientId = 'a94939ac170e4c9588be0199ba2bab89';
const redirectUri = 'http://localhost:3000';  
let accessToken;

const Spotify = {
    getAccessToken(){                                         //obtains an access token
        if(accessToken){                                                    
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);                  //check for an access token match
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);                      //checks for the token and tries 
                                                                                                      //to match with exisiteing token and also checks for its ex
                                                                                                      //piration time after which the user should login again
        if(accessTokenMatch && expiresInMatch){                                                        
            accessToken = accessTokenMatch[1];                                                         //if a match is found the token is used and 
                                                                                                       //the token and expiration time is inherited or set from the existing one
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken= '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;                                                               //if there was no token that was set or token has expired then the user will
                                                                                                       //have to login again and the accessUrl uses the authorize endpoint to authorize the user.
        }
    },

    search(term) {                                                                                      //this section is the working if the search method which accesses the search endpoint of the
    const accessToken = Spotify.getAccessToken();                                                       //spotify API
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {                                                                               
      return response.json();                                                                           
      console.log(response)                                                                             
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      //console.log(jsonResponse)                                                                       //logs the jsonResponse in the console.
      return jsonResponse.tracks.items.map(track => ({                                                  //the response for the search results will be in a json format 
        id: track.id,                                                                                   //and this 'promise' returns the json file and the tracks are mapped to 
        name: track.name,                                                                               //their respective id, album name, artist and song name
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

    savePlaylist(name, trackUris){
        if(!name||!trackUris.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()).then(jsonResponse => {
            userId = jsonResponse.id;                                                                     //this section saves the songs to the spotify playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {                        //by using the users endpoint of the spotify API by using the POST method and using their userId
                headers : headers,
                method : 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {       //sets the playlist name using the POST method
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });

            })
        }) 
    }


}

export default Spotify;