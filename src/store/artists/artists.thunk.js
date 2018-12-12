import axios from 'axios';
import { artistsActions } from './artists.actions';

const LAST_FM_API_ROOT = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
const GET_TOP_ARTISTS = 'chart.gettopartists';
const GET_ARTIST_INFO = 'artist.getinfo';
const GET_ARTIST_ALBUMS = 'artist.gettopalbums';

export function fetchArtistsList(dispatch) {
    return function() {
        return axios.get(`${ LAST_FM_API_ROOT }?method=${ GET_TOP_ARTISTS }&api_key=${ API_KEY }&format=json`)
            .then(({ data }) => {
                dispatch(artistsActions.getListsComplete(data.artists.artist));
            });
    };
}

export function fetchArtistInfo(artistName) {
    return function(dispatch) {
        return axios.get(`${ LAST_FM_API_ROOT }?method=${ GET_ARTIST_INFO }&artist=${ artistName }&api_key=${ API_KEY }&format=json`)
            .then(({ data }) => {
                dispatch(artistsActions.setArtistInfo(data));
            });
    };
}

export function fetchArtistAlbums(artistName) {
    return function(dispatch) {
        return axios.get(`${ LAST_FM_API_ROOT }?method=${ GET_ARTIST_ALBUMS }&artist=${ artistName }&api_key=${ API_KEY }&format=json`)
            .then(({ data }) => {
                dispatch(artistsActions.setArtistAlbums(data));
            });
    };
}