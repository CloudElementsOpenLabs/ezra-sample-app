// External dependencies
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import db from 'store2';

// Internal dependencies
import reducers from './reducers';

export const history = createBrowserHistory();

const getPersistedState = () => db.get(process.env.REACT_APP_LOCALSTORAGE_KEY);

export default(initialState) => {
  return createStore(
    combineReducers({
      ...reducers,
      router: connectRouter(history),
    }),
    Object.assign({}, getPersistedState(), initialState),
    compose(
      applyMiddleware(
        thunk,
        createLogger({
          duration: true,
          predicate: () => process.env.NODE_ENV !== 'production',
          actionTransformer: action => ({
            ...action,
            type: String(action.type),
          }),
        }),
      ),
    ),
  );
};

