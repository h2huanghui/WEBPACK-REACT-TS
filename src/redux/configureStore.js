import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createCombineReducers from '@/reducer';

export const history = createBrowserHistory({ basename: '/v' });

export default function configureStore(preloadedState) {
  //eslint-disable-next-line
  const isDev = process.env.NODE_ENV === 'development';
  const composeEnhancers = isDev ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
  const store = createStore(
    createCombineReducers(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history)
        , thunk
      )
    )
  );

  return store;
}