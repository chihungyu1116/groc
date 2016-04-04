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

export const PROCESS_ONBOARDING_DATA_ACT = 'PROCESS_ONBOARDING_DATA_ACT';

export function processOnboardingDataAct(data) {
  return dispatch => {
    fetch('/data/process_suggestion_list', composeRequestData(data))
      .then(response => response.json())
      .then(json => {
        console.log('json? ', json);
        if(json.found) {
          dispatch(completedProcessingOnboardingAct(json.results));
        } else {
          dispatch(failedProcessingOnboardingAct());
        }
      });
  }
}

export const COMPLETED_PROCESSING_ONBOARDING_ACT = 'COMPLETED_PROCESSING_ONBOARDING_ACT';

export function completedProcessingOnboardingAct(shoppingList) {
  return {
    type: COMPLETED_PROCESSING_ONBOARDING_ACT,
    shoppingList
  }
}


export const FAILED_PROCESSING_ONBOARDING_ACT = 'FAILED_PROCESSING_ONBOARDING_ACT';

export function failedProcessingOnboardingAct() {
  return {
    type: FAILED_PROCESSING_ONBOARDING_ACT
  }
}