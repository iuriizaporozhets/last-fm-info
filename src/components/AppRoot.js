import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { artistsActions } from '../store/artists/artists.actions';
import Header from './Header';
import ArtistsGrid from './ArtistsGrid';
import ArtistInfo from './ArtistInfo';
import AlbumsGrid from './AlbumsGrid';

class AppRoot extends Component {
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
            <div className="AppRoot">
                <Header {...artists} {...callbacks} />
                <Switch>
                    <Route path="/artists" component={ArtistsGrid} exact/>
                    <Route path="/artists/:name" component={ArtistInfo} exact/>
                    <Route path="/artists/:name/albums" component={AlbumsGrid} exact/>
                    <Redirect to="/artists"/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        artistsList: state.artists.list,
        artistInfo: state.artists.info,
        albumsList: state.artists.albums,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArtistsList: dispatch(artistsActions.fetchArtistsList)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);