import React from 'react'

import './Track.css'

class Track extends React.Component{
    constructor(props){
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTracks = this.removeTracks.bind(this)
    }
    renderAction() {                                                            //method to remove and add tracks from results to the playlist 
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTracks}>-</button> 
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track); //checks if the track is already existing else it adds using the addTrack method recieved as a prop with the name onAdd
    }

    removeTracks(){
        this.props.onRemove(this.props.track);//checks if the track is already removed else it removes using the removeTrack method recieved as a prop with the name onRemove
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>  {/*displays the track name by accessing the props from trackList*/}
                    <p>{this.props.track.artist} | {this.props.track.album}</p> {/* displays artist and album by accessing the props from the TrackList components */}
                </div>
                {this.renderAction()} {/* this adds the + and - buttons and performs the respective actions */}
            </div>
        )
    }
}

export default Track