import React from 'react'

import './Playlist.css'
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component{
    constructor(props){
        super(props);

        this.handleNameChange=this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render(){
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} 
                           onRemove={this.props.onRemove} 
                           isRemoval={true}/> {/* renders the tracklist components and displays the tracks in the 
                                                playlist and also sets the onRemove method and isRemoval method */}
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;