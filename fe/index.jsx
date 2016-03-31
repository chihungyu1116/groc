import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';
import thunk from 'redux-thunk';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';

const initialState = window.__INITIAL_STATE__ || {};
const reducer = combineReducers(reducers || {});
const store   = applyMiddleware(thunk)(createStore)(reducer, initialState);

render(
  <Provider store={ store }>
    <Router children={ routes } history={ hashHistory } />
  </Provider>,
  document.getElementById('react-view')
);