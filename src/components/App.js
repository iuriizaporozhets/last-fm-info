import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchArtistsList} from '../store/artists/artists.thunk';

import Header from './Header';
import ArtistsGrid from './ArtistsGrid';
import ArtistInfo from './ArtistInfo';
import AlbumsGrid from './AlbumsGrid';

class App extends Component {
    componentDidMount() {
        this.props.fetchArtistsList();
    }

    fetchArtistInfo(artistName) {
        this.props.fetchArtistInfo(artistName);
    }

    fetchArtistAlbums(artistName) {
        this.props.fetchArtistAlbums(artistName);
    }

    render() {
        const {artists} = this.props.artistsList;
        const callbacks = {
            onArtistSelect: this.fetchArtistInfo.bind(this),
            onAlbumsListRequest: this.fetchArtistAlbums.bind(this)
        };

        return (
            <div className="App">
                <Header {...artists} {...callbacks} />
                <Switch>
                    <Route path="/artists" component={ArtistsGrid} exact />
                    <Route path="/artists/:name" component={ArtistInfo} exact />
                    <Route path="/artists/:name/albums" component={AlbumsGrid} exact />
                    <Redirect to="/artists"/>
                </Switch>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        artistsList: state.artists.list,
        artistInfo: state.artists.info,
        albumsList: state.artists.albums,
    }),
    (dispatch) => ({
        fetchArtistsList: dispatch(fetchArtistsList)
    })
)(App);