import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

import {rootReducer} from '../reducers';

export const configureStore = () => {
    const history = createBrowserHistory();
    const store = createStore(
        rootReducer(history),
        applyMiddleware(routerMiddleware(history), thunk)
    );

    return {
        store,
        history
    };
};
