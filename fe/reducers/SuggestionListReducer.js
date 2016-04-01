import {
  COMPLETED_PROCESSING_SHOPPING_LIST_ACT
} from '../actions/ShoppingListAction';

const defaultState = {
  suggestionList: []
}

export default function SuggestionListReducer(state = defaultState, action) {
  if(action.type === COMPLETED_PROCESSING_SHOPPING_LIST_ACT) {
    return Object.assign({}, state, {
      suggestionList: action.shoppingList
    })
  }

  return state;
}