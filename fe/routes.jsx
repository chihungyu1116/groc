import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute
} from 'react-router';

import AppContainer from './containers/AppContainer';
import GroceryHelperContainer from './containers/GroceryHelperContainer';
import ShoppingListContainer from './containers/ShoppingListContainer';

export default (
  <Route component={ AppContainer } path='/'>
    <Route path='/grocery-helper' component={ GroceryHelperContainer }></Route>
    <Route path='/shopping-list' component={ ShoppingListContainer }></Route>
  </Route>
);