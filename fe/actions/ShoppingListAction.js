export const ADD_TO_SHOPPING_LIST_ACT = 'ADD_TO_SHOPPING_LIST_ACT';

export function addToShoppingListAct(itemName) {
  return {
    type: ADD_TO_SHOPPING_LIST_ACT,
    itemName 
  }
}

export const ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT = 'ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT'

export function itemIsAlreadyInShoppingListAct() {
  return {
    type: ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT
  }
}