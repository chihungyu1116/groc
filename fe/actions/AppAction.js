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

export const OPEN_GROCERY_HELPER_ACT = 'OPEN_GROCERY_HELPER_ACT';

export function openGroceryHelperAct() {
  return {
    type: OPEN_GROCERY_HELPER_ACT
  }
}

export const CLOSE_GROCERY_HELPER_ACT = 'CLOSE_GROCERY_HELPER_ACT'

export function closeGroceryHelperAct() {
  return {
    type: CLOSE_GROCERY_HELPER_ACT
  }
}