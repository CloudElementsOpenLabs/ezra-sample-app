// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import db from 'store2';

// Internal dependencies
import App from './App';
import Store, { history } from './store';
import * as serviceWorker from './serviceWorker';
import './index.css';

const storeInstance = Store();

// Subscribe to changes and preserve them in the local storage
storeInstance.subscribe(() => {
  db.set(process.env.REACT_APP_LOCALSTORAGE_KEY, storeInstance.getState())
});

ReactDOM.render(
  <Provider store={storeInstance}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
