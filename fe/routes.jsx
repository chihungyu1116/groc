import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute
} from 'react-router';

import AppContainer from './containers/AppContainer';
import GroceryHelperContainer from './containers/GroceryHelperContainer';
import ShoppingListContainer from './containers/ShoppingListContainer';
import OnboardingContainer from './containers/OnboardingContainer';
export default (
  <Route component={ AppContainer } path='/'>
    <Route path='/grocery-helper' component={ GroceryHelperContainer }></Route>
    <Route path='/shopping-list' component={ ShoppingListContainer }></Route>
    <Route path="/onboarding" component= {OnboardingContainer}></Route>
  </Route>
);