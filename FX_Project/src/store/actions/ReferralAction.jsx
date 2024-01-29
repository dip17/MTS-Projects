import {
    GET_REFERRAL_START,
    GET_REFERRAL_SUCCESS,
    GET_REFERRAL_FAILURE,
  } from "./ActionConstant";
  
  // Get kyc document actions.
  
  export function getReferralStart(data) {
    return {
      type: GET_REFERRAL_START,
      data,
    };
  }
  
  export function getReferralSuccess(data) {
    return {
      type: GET_REFERRAL_SUCCESS,
      data,
    };
  }
  
  export function getReferralFailure(error) {
    return {
      type: GET_REFERRAL_FAILURE,
      error,
    };
  }
