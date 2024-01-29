import {
    GET_REFERRAL_START,
    GET_REFERRAL_SUCCESS,
    GET_REFERRAL_FAILURE,
  } from "../actions/ActionConstant";
  
  const initialState = {
    referralDetails: {
      data: {},
      loading: true,
      error: false,
    },
    buttonDisable: false,
    loadingButtonContent: null,
  };
  
  const ReferralReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REFERRAL_START:
        return {
          ...state,
          referralDetails: {
            data: {},
            loading: true,
            error: false,
          },
        };
      case GET_REFERRAL_SUCCESS:
        return {
          ...state,
          referralDetails: {
            data: action.data,
            loading: false,
            error: false,
          },
        };
      case GET_REFERRAL_FAILURE:
        return {
          ...state,
          referralDetails: {
            data: {},
            loading: true,
            error: action.error,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default ReferralReducer;
  