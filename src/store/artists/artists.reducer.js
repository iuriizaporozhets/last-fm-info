import {Actions} from './artists.actions';

const initialState = {
    list: [],
    info: {
        artist: {}
    },
    albums: {
        topalbums: {
            album: []
        }
    }
};

export function artistsReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.ARTISTS_FETCH_LIST_COMPLETE:
            return {
                ...state,
                list: action.payload
            };
        case Actions.ARTIST_SET_INFO:
            return {
                ...state,
                info: action.payload
            };
        case Actions.ARTIST_SET_ALBUMS:
            return {
                ...state,
                albums: action.payload
            };
        default:
            return state;
    }
}
