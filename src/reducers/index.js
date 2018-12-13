import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import {artistsReducer} from '../store/artists/artists.reducer';

export const rootReducer = (history) => combineReducers({
    artists: artistsReducer,
    router: connectRouter(history)
});