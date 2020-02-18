import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import Spotify from '../src/util/Spotify.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],                                                 //hardcoded values for displaying the searchresults
      playlistName: 'itsamix',                                        //playlistname and playlisttracks are hardcoded info to display
      playlistTracks: []                                               //on the results section
    }
    this.addTrack = this.addTrack.bind(this);                         //binding the this to addTrack method which adds track from results the playlist
    this.removeTrack = this.removeTrack.bind(this);                   //binding the this to removeTrack method which removes track from playlist
    this.updatePlaylistName = this.updatePlaylistName.bind(this);     //binding the this to updatePlaylistName method which updates the playlist name
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack(track){                                                    //method checks if track is present if not it pushes to playlistTracks
    let tracks = this.state.playlistTracks; 
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track); 
    this.setState({playlistTracks: tracks})                           //updates this.playlistTracks to new array which includes the newly added track
  }

  removeTrack(track){                                                 //checks if the current track exists and filters it out using .filter method
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    this.setState( {playlistTracks: tracks} );                        //updates this.playlistTracks after removal of a track from the playlist
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'itsanewmix',
        playlistTracks: []
      })
    })
  }

  

  render(){
    return(
      <div className="htm"> 
        <div className="App-playlist">
          <h1 className="Heading">itsa<span className="highlight">mix</span></h1>
        </div>
        <div className="App">
          <SearchBar onSearch={this.search}/>                                                {/* renders the searchbar and button */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />   {/*renders the results sets searchReults which carries the 
                                                                                                state of the hardcoded values and onAdd method which is 
                                                                                                used to add tracks from searchResults to playlist as 
                                                                                                props for the searchResults component*/}
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} /> {/*renders the playlist
                                                     components and sets playlistName and playlistTracks
                                                      and onRemove as props */} 
          </div>
        </div>
      </div>
    )
  }
}

export default App;


{/* 
Pressing enter triggers a search
Include preview samples for each track
Only display songs not currently present in the playlist in the search results
Add a loading screen while playlist is saving
Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
After user redirect on login, restoring the search term from before the redirect
Ensure playlist information doesn’t get cleared if a user has to refresh their access token
Provide a way to fetch and see all your existing playlists 

*/}