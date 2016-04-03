import fetch from 'isomorphic-fetch';

export function fetchAlternativeItemsAct(itemIndex, query, count) {
  const data = composeRequestData({query: query, count: count})
  return dispatch => {
    fetch('/data/get_items_by_query', data)
      .then(response => response.json())
      .then(json => {
        dispatch(receivedAlternativeItemsAct(json.items, itemIndex, query, count))
      });
  }
}

export function receivedAlternativeItemsAct(items, itemIndex, query, count) {
  return {
    type: 'RECEIVED_ALTERNATIVE_ITEMS_ACT',
    alternativeItems: {
      items: items, 
      index: itemIndex, 
      query, 
      count
    }
  }
}

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

export function suggestionListChangedAct(suggestionList) {
  return {
    type: 'SUGGESTION_LIST_CHANGED_ACT',
    suggestionList: suggestionList
  }
}