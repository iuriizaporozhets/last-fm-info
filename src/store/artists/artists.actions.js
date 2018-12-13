import axios from 'axios';

export const Actions = {
    ARTISTS_FETCH_LIST: 'ARTISTS_FETCH_LIST',
    ARTISTS_FETCH_LIST_COMPLETE: 'ARTISTS_FETCH_LIST_COMPLETE',
    ARTISTS_FETCH_LIST_FAIL: 'ARTISTS_FETCH_LIST_FAIL',

    ARTIST_SET_INFO: 'ARTIST_SET_INFO',
    ARTIST_SET_ALBUMS: 'ARTIST_SET_ALBUMS'
};

const LAST_FM_API_ROOT = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
const GET_TOP_ARTISTS = 'chart.gettopartists';
const GET_ARTIST_INFO = 'artist.getinfo';
const GET_ARTIST_ALBUMS = 'artist.gettopalbums';

export const artistsActions = {
    fetchLists: () => ({type: Actions.ARTISTS_FETCH_LIST}),
    fetchListsComplete: (data) => ({type: Actions.ARTISTS_FETCH_LIST_COMPLETE, payload: data}),
    fetchListsFail: (error) => ({type: Actions.ARTISTS_FETCH_LIST_FAIL, error}),

    setArtistInfo: (data) => ({type: Actions.ARTIST_SET_INFO, payload: data}),
    setArtistAlbums: (data) => ({type: Actions.ARTIST_SET_ALBUMS, payload: data}),

    fetchArtistAlbums,
    fetchArtistInfo,
    fetchArtistsList
};

function fetchArtistsList(dispatch) {
    return function () {
        return axios.get(`${ LAST_FM_API_ROOT }?method=${ GET_TOP_ARTISTS }&api_key=${ API_KEY }&format=json`)
            .then(({data}) => {
                dispatch(artistsActions.fetchListsComplete(data.artists.artist));
            });
    };
}

function fetchArtistInfo(artistName) {
    return function (dispatch) {
        return axios.get(`${ LAST_FM_API_ROOT }?method=${ GET_ARTIST_INFO }&artist=${ artistName }&api_key=${ API_KEY }&format=json`)
            .then(({data}) => {
                dispatch(artistsActions.setArtistInfo(data));
            });
    };
}

function fetchArtistAlbums(artistName) {
    return function (dispatch) {
        return axios.get(`${ LAST_FM_API_ROOT }?method=${ GET_ARTIST_ALBUMS }&artist=${ artistName }&api_key=${ API_KEY }&format=json`)
            .then(({data}) => {
                dispatch(artistsActions.setArtistAlbums(data));
            });
    };
}