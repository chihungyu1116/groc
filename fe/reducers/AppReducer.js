import {
  OPEN_GROCERY_HELPER_ACT,
  CLOSE_GROCERY_HELPER_ACT
} from '../actions/AppAction'


const defaultState = {
  groceryHelperOpen: window.location.hash.match(/^\w+/) ? false : true
}

export default function AppReducer(state = defaultState, action) {
  if(action.type === OPEN_GROCERY_HELPER_ACT) {
    return Object.assign({}, state, {
      groceryHelperOpen: true
    });
  } else if(action.type === CLOSE_GROCERY_HELPER_ACT) {
    return Object.assign({}, state, {
      groceryHelperOpen: false
    });
  }

  return state;
}