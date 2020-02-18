import React from 'react'
import './SearchResults.css'

import TrackList from '../TrackList/TrackList'

class SearchResults extends React.Component{
    render(){
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />  {/* renders the TrackList components 
                                                                                                                and sets tracks which contains the props from the 
                                                                                                                searchResults component which inturn contains the
                                                                                                                hardcoded values and the onAdd method which is again 
                                                                                                                the props from searchResults and set the isRemoval state to false */}
            </div>
        )
    }
}

export default SearchResults