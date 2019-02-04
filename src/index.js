import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import AppRoot from './components/AppRoot';

import { configureStore } from './store';
const {store, history} = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppRoot />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);