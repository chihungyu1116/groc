import fetch from 'isomorphic-fetch'

function composeRequestData(json = {}){
  return {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(json)
  }
}

export const ADD_TO_SHOPPING_LIST_ACT = 'ADD_TO_SHOPPING_LIST_ACT';

export function addToShoppingListAct(itemName) {
  return {
    type: ADD_TO_SHOPPING_LIST_ACT,
    itemName 
  }
}

export const REMOVE_FROM_SHOPPING_LIST_ACT = 'REMOVE_FROM_SHOPPING_LIST_ACT';

export function removeFromShoppingListAct(index) {
  return {
    type: REMOVE_FROM_SHOPPING_LIST_ACT,
    index
  }
}

export const ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT = 'ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT';

export function itemIsAlreadyInShoppingListAct() {
  return {
    type: ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT
  }
}

export const SHOPPING_LIST_IS_EMPTY_ACT = 'SHOPPING_LIST_IS_EMPTY_ACT';

export function shoppingListIsEmptyAct() {
  return {
    type: SHOPPING_LIST_IS_EMPTY_ACT
  }
}

export const PROCESS_SHOPPING_LIST_ACT = 'PROCESS_SHOPPING_LIST_ACT';

export function processShoppingListAct(list) {
  const data = composeRequestData({ list });

  return dispatch => {
    fetch('/data/process_shopping_list', data)
      .then(response => response.json())
      .then(json => {
        dispatch(completedProcessingShoppingListAct(json.shopping_list))
      });
  }
}

export const COMPLETED_PROCESSING_SHOPPING_LIST_ACT = 'COMPLETED_PROCESSING_SHOPPING_LIST_ACT';

export function completedProcessingShoppingListAct(shoppingList) {
  return {
    type: COMPLETED_PROCESSING_SHOPPING_LIST_ACT,
    shoppingList
  }
}