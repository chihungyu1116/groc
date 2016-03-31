import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute
} from 'react-router';

import AppContainer from './containers/AppContainer';
import GroceryHelperContainer from './containers/GroceryHelperContainer';

export default (
  <Route component={ AppContainer } path='/'>
    <Route path='/grocery-helper' component={ GroceryHelperContainer }></Route>
  </Route>
);