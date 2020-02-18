import React from 'react'

import './TrackList.css'
import Track from '../Track/Track'

class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} key={track.id} 
                                                    onAdd={this.props.onAdd} 
                                                    onRemove={this.props.onRemove} 
                                                    isRemoval={this.props.isRemoval} />; {/* renders the track component and 
                                                                                        sets track id and name and the methods onAdd and onRemove as props 
                                                                                        which are sent to the Track component */}
                    })
                }
            </div>
        )
    }
}

export default TrackList