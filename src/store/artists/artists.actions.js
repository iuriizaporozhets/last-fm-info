export const Actions = {
    ARTISTS_FETCH_LIST: 'ARTISTS_FETCH_LIST',
    ARTISTS_FETCH_LIST_COMPLETE: 'ARTISTS_FETCH_LIST_COMPLETE',
    ARTISTS_FETCH_LIST_FAIL: 'ARTISTS_FETCH_LIST_FAIL',

    ARTIST_SET_INFO: 'ARTIST_SET_INFO',
    ARTIST_SET_ALBUMS: 'ARTIST_SET_ALBUMS'
};

export const artistsActions = {
    getLists: () => ({type: Actions.ARTISTS_FETCH_LIST}),
    getListsComplete: (data) => ({type: Actions.ARTISTS_FETCH_LIST_COMPLETE, payload: data}),
    getListsFail: (error) => ({type: Actions.ARTISTS_FETCH_LIST_FAIL, error}),

    setArtistInfo: (data) => ({type: Actions.ARTIST_SET_INFO, payload: data}),
    setArtistAlbums: (data) => ({type: Actions.ARTIST_SET_ALBUMS, payload: data}),
};