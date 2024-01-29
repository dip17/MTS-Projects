import {
    REQUEST_CALL_START,
    REQUEST_CALL_SUCCESS,
    REQUEST_CALL_FAILURE,
    ACCEPT_CALL_START,
    ACCEPT_CALL_SUCCESS,
    ACCEPT_CALL_FAILURE,
    REJECT_CALL_START,
    REJECT_CALL_SUCCESS,
    REJECT_CALL_FAILURE,
    PAY_BY_STRIPE_START,
    PAY_BY_STRIPE_SUCCESS,
    PAY_BY_STRIPE_FAILURE,
    PAY_BY_PAYPAL_START,
    PAY_BY_PAYPAL_SUCCESS,
    PAY_BY_PAYPAL_FAILURE,
    JOIN_VIDEO_CALL_START,
    JOIN_VIDEO_CALL_SUCCESS,
    JOIN_VIDEO_CALL_FAILURE,
    END_VIDEO_CALL_START,
    END_VIDEO_CALL_SUCCESS,
    END_VIDEO_CALL_FAILURE,
    CALL_REQUEST_SENT_USER_START,
    CALL_REQUEST_SENT_USER_SUCCESS,
    CALL_REQUEST_SENT_USER_FAILURE,
    FETCH_AUDIO_CALL_REQUESTS_FAILURE,
    FETCH_AUDIO_CALL_REQUESTS_START,
    FETCH_MORE_AUDIO_CALL_REQUESTS_START,
    FETCH_AUDIO_CALL_REQUESTS_SUCCESS,
    CALL_HISTORY_USER_START,
    CALL_HISTORY_USER_SUCCESS,
    CALL_HISTORY_USER_FAILURE,
    CALL_HISTORY_MODEL_START,
    CALL_HISTORY_MODEL_SUCCESS,
    CALL_HISTORY_MODEL_FAILURE,
    CALL_REQUEST_RECEIVED_MODEL_START,
    CALL_REQUEST_RECEIVED_MODEL_SUCCESS,
    CALL_REQUEST_RECEIVED_MODEL_FAILURE,
    CALL_AUDIO_REQUEST_RECEIVED_MODEL_START,
    CALL_MORE_AUDIO_REQUEST_RECEIVED_MODEL_START,
    CALL_AUDIO_REQUEST_RECEIVED_MODEL_SUCCESS,
    CALL_AUDIO_REQUEST_RECEIVED_MODEL_FAILURE,
    FETCH_SINGLE_VIDEO_CALL_START,
    FETCH_SINGLE_VIDEO_CALL_SUCCESS,
    FETCH_SINGLE_VIDEO_CALL_FAILURE,
    ACCEPT_AUDIO_CALL_START,
    ACCEPT_AUDIO_CALL_SUCCESS,
    ACCEPT_AUDIO_CALL_FAILURE,
    AUDIO_CALL_HISTORY_USER_START,
    AUDIO_CALL_HISTORY_USER_SUCCESS,
    AUDIO_CALL_HISTORY_USER_FAILURE,
    REJECT_AUDIO_CALL_START,
    REJECT_AUDIO_CALL_SUCCESS,
    REJECT_AUDIO_CALL_FAILURE,
    REQUEST_AUDIO_CALL_START,
    REQUEST_AUDIO_CALL_SUCCESS,
    REQUEST_AUDIO_CALL_FAILURE,
    PAY_AUDIO_CALL_BY_STRIPE_START,
    PAY_AUDIO_CALL_BY_STRIPE_SUCCESS,
    PAY_AUDIO_CALL_BY_STRIPE_FAILURE,
    PAY_AUDIO_CALL_BY_PAYPAL_START,
    PAY_AUDIO_CALL_BY_PAYPAL_SUCCESS,
    PAY_AUDIO_CALL_BY_PAYPAL_FAILURE,
    FETCH_SINGLE_AUDIO_CALL_START,
    FETCH_SINGLE_AUDIO_CALL_SUCCESS,
    FETCH_SINGLE_AUDIO_CALL_FAILURE,
    END_AUDIO_CALL_START,
    END_AUDIO_CALL_SUCCESS,
    END_AUDIO_CALL_FAILURE,
    JOIN_AUDIO_CALL_START,
    JOIN_AUDIO_CALL_SUCCESS,
    JOIN_AUDIO_CALL_FAILURE,
    VIDEO_CALL_PAY_BY_WALLET_START,
    VIDEO_CALL_PAY_BY_WALLET_SUCCESS,
    VIDEO_CALL_PAY_BY_WALLET_FAILURE,
    AUDIO_CALL_PAY_BY_WALLET_START,
    AUDIO_CALL_PAY_BY_WALLET_SUCCESS,
    AUDIO_CALL_PAY_BY_WALLET_FAILURE,
    FETCH_AUDIO_CALL_CHAT_MESSAGE_START,
    FETCH_AUDIO_CALL_CHAT_MESSAGE_SUCCESS,
    FETCH_AUDIO_CALL_CHAT_MESSAGE_FAILURE,
    ADD_AUDIO_CALL_MESSAGE_CONTENT,
    START_AUDIO_CALL_REQUEST_START,
    START_AUDIO_CALL_REQUEST_SUCCESS,
    START_AUDIO_CALL_REQUEST_FAILURE,
    START_VIDEO_CALL_REQUEST_START,
    START_VIDEO_CALL_REQUEST_SUCCESS,
    START_VIDEO_CALL_REQUEST_FAILURE,
  } from "./ActionConstant";
  
  export function requestCallStart(data) {
    return {
      type: REQUEST_CALL_START,
      data,
    };
  }
  
  export function requestCallSuccess(data) {
    return {
      type: REQUEST_CALL_SUCCESS,
      data,
    };
  }
  
  export function requestCallFailure(error) {
    return {
      type: REQUEST_CALL_FAILURE,
      error,
    };
  }
  export function acceptCallStart(data) {
    return {
      type: ACCEPT_CALL_START,
      data,
    };
  }
  
  export function acceptCallSuccess(data) {
    return {
      type: ACCEPT_CALL_SUCCESS,
      data,
    };
  }
  
  export function acceptCallFailure(error) {
    return {
      type: ACCEPT_CALL_FAILURE,
      error,
    };
  }
  
  export function rejectCallStart(data) {
    return {
      type: REJECT_CALL_START,
      data,
    };
  }
  
  export function rejectCallSuccess(data) {
    return {
      type: REJECT_CALL_SUCCESS,
      data,
    };
  }
  
  export function rejectCallFailure(error) {
    return {
      type: REJECT_CALL_FAILURE,
      error,
    };
  }
  
  export function payByStripeStart(data) {
    return {
      type: PAY_BY_STRIPE_START,
      data,
    };
  }
  
  export function payByStripeSuccess(data) {
    return {
      type: PAY_BY_STRIPE_SUCCESS,
      data,
    };
  }
  
  export function payByStripeFailure(error) {
    return {
      type: PAY_BY_STRIPE_FAILURE,
      error,
    };
  }
  
  export function payByPayPalStart(data) {
    return {
      type: PAY_BY_PAYPAL_START,
      data,
    };
  }
  
  export function payByPayPalSuccess(data) {
    return {
      type: PAY_BY_PAYPAL_SUCCESS,
      data,
    };
  }
  
  export function payByPayPalFailure(error) {
    return {
      type: PAY_BY_PAYPAL_FAILURE,
      error,
    };
  }
  
  export function joinVideoCallStart(data) {
    return {
      type: JOIN_VIDEO_CALL_START,
      data,
    };
  }
  
  export function joinVideoCallSuccess(data) {
    return {
      type: JOIN_VIDEO_CALL_SUCCESS,
      data,
    };
  }
  
  export function joinVideoCallFailure(error) {
    return {
      type: JOIN_VIDEO_CALL_FAILURE,
      error,
    };
  }
  
  export function endVideoCallStart(data) {
    return {
      type: END_VIDEO_CALL_START,
      data,
    };
  }
  
  export function endVideoCallSuccess(data) {
    return {
      type: END_VIDEO_CALL_SUCCESS,
      data,
    };
  }
  
  export function endVideoCallFailure(error) {
    return {
      type: END_VIDEO_CALL_FAILURE,
      error,
    };
  }
  
  export function callRequestSentUserStart(data) {
    return {
      type: CALL_REQUEST_SENT_USER_START,
      data,
    };
  }
  
  export function callRequestSentUserSuccess(data) {
    return {
      type: CALL_REQUEST_SENT_USER_SUCCESS,
      data,
    };
  }
  
  export function callRequestSentUserFailure(error) {
    return {
      type: CALL_REQUEST_SENT_USER_FAILURE,
      error,
    };
  }
  
  export function fetchAudioCallRequestsStart(data) {
    return {
      type: FETCH_AUDIO_CALL_REQUESTS_START,
      data,
    };
  }
  
  export function fetchMoreAudioCallRequestsStart(data) {
    return {
      type: FETCH_MORE_AUDIO_CALL_REQUESTS_START,
      data,
    };
  }
  
  export function fetchAudioCallRequestsSuccess(data) {
    return {
      type: FETCH_AUDIO_CALL_REQUESTS_SUCCESS,
      data,
    };
  }
  export function fetchAudioCallRequestsFailure(error) {
    return {
      type: FETCH_AUDIO_CALL_REQUESTS_FAILURE,
      error,
    };
  }

  export function callHistoryUserStart(data) {
    return {
      type: CALL_HISTORY_USER_START,
      data,
    };
  }
  
  export function callHistoryUserSuccess(data) {
    return {
      type: CALL_HISTORY_USER_SUCCESS,
      data,
    };
  }
  
  export function callHistoryUserFailure(error) {
    return {
      type: CALL_HISTORY_USER_FAILURE,
      error,
    };
  }
  
  export function callHistoryModelStart(data) {
    return {
      type: CALL_HISTORY_MODEL_START,
      data,
    };
  }
  
  export function callHistoryModelSuccess(data) {
    return {
      type: CALL_HISTORY_MODEL_SUCCESS,
      data,
    };
  }
  
  export function callHistoryModelFailure(error) {
    return {
      type: CALL_HISTORY_MODEL_FAILURE,
      error,
    };
  }
  
  export function callRequestReceivedModelStart(data) {
    return {
      type: CALL_REQUEST_RECEIVED_MODEL_START,
      data,
    };
  }
  
  export function callRequestReceivedModelSuccess(data) {
    return {
      type: CALL_REQUEST_RECEIVED_MODEL_SUCCESS,
      data,
    };
  }
  
  export function callRequestReceivedModelFailure(error) {
    return {
      type: CALL_REQUEST_RECEIVED_MODEL_FAILURE,
      error,
    };
  }


  export function callAudioRequestReceivedModelStart(data) {
    return {
      type: CALL_AUDIO_REQUEST_RECEIVED_MODEL_START,
      data,
    };
  }

  export function callMoreAudioRequestReceivedModelStart(data) {
    return {
      type: CALL_MORE_AUDIO_REQUEST_RECEIVED_MODEL_START,
      data,
    };
  }
  
  export function callAudioRequestReceivedModelSuccess(data) {
    return {
      type: CALL_AUDIO_REQUEST_RECEIVED_MODEL_SUCCESS,
      data,
    };
  }
  
  export function callAudioRequestReceivedModelFailure(error) {
    return {
      type: CALL_AUDIO_REQUEST_RECEIVED_MODEL_FAILURE,
      error,
    };
  }
  
  export function fetchSingleVideoCallStart(data) {
    return {
      type: FETCH_SINGLE_VIDEO_CALL_START,
      data,
    };
  }
  
  export function fetchSingleVideoCallSuccess(data) {
    return {
      type: FETCH_SINGLE_VIDEO_CALL_SUCCESS,
      data,
    };
  }
  
  export function fetchSingleVideoCallFailure(error) {
    return {
      type: FETCH_SINGLE_VIDEO_CALL_FAILURE,
      error,
    };
  }
  
  export function acceptAudioCallStart(data) {
    return {
      type: ACCEPT_AUDIO_CALL_START,
      data,
    };
  }
  
  export function acceptAudioCallSuccess(data) {
    return {
      type: ACCEPT_AUDIO_CALL_SUCCESS,
      data,
    };
  }
  
  export function acceptAudioCallFailure(error) {
    return {
      type: ACCEPT_AUDIO_CALL_FAILURE,
      error,
    };
  }

  export function audioCallHistoryUserStart(data) {
    return {
      type: AUDIO_CALL_HISTORY_USER_START,
      data,
    };
  }
  
  export function audioCallHistoryUserSuccess(data) {
    return {
      type: AUDIO_CALL_HISTORY_USER_SUCCESS,
      data,
    };
  }
  
  export function audioCallHistoryUserFailure(error) {
    return {
      type: AUDIO_CALL_HISTORY_USER_FAILURE,
      error,
    };
  }

  export function rejectAudioCallStart(data) {
    return {
      type: REJECT_AUDIO_CALL_START,
      data,
    };
  }
  
  export function rejectAudioCallSuccess(data) {
    return {
      type: REJECT_AUDIO_CALL_SUCCESS,
      data,
    };
  }
  
  export function rejectAudioCallFailure(error) {
    return {
      type: REJECT_AUDIO_CALL_FAILURE,
      error,
    };
  }

  export function requestAudioCallStart(data) {
    return {
      type: REQUEST_AUDIO_CALL_START,
      data,
    };
  }
  
  export function requestAudioCallSuccess(data) {
    return {
      type: REQUEST_AUDIO_CALL_SUCCESS,
      data,
    };
  }
  
  export function requestAudioCallFailure(error) {
    return {
      type: REQUEST_AUDIO_CALL_FAILURE,
      error,
    };
  }

  export function payAudioCallByStripeStart(data) {
    return {
      type: PAY_AUDIO_CALL_BY_STRIPE_START,
      data,
    };
  }
  
  export function payAudioCallByStripeSuccess(data) {
    return {
      type: PAY_AUDIO_CALL_BY_STRIPE_SUCCESS,
      data,
    };
  }
  
  export function payAudioCallByStripeFailure(error) {
    return {
      type: PAY_AUDIO_CALL_BY_STRIPE_FAILURE,
      error,
    };
  }

  export function payAudioCallByPayPalStart(data) {
    return {
      type: PAY_AUDIO_CALL_BY_PAYPAL_START,
      data,
    };
  }
  
  export function payAudioCallByPayPalSuccess(data) {
    return {
      type: PAY_AUDIO_CALL_BY_PAYPAL_SUCCESS,
      data,
    };
  }
  
  export function payAudioCallByPayPalFailure(error) {
    return {
      type: PAY_AUDIO_CALL_BY_PAYPAL_FAILURE,
      error,
    };
  }

  export function fetchSingleAudioCallStart(data) {
    return {
      type: FETCH_SINGLE_AUDIO_CALL_START,
      data,
    };
  }
  
  export function fetchSingleAudioCallSuccess(data) {
    return {
      type: FETCH_SINGLE_AUDIO_CALL_SUCCESS,
      data,
    };
  }
  
  export function fetchSingleAudioCallFailure(error) {
    return {
      type: FETCH_SINGLE_AUDIO_CALL_FAILURE,
      error,
    };
  }

  export function endAudioCallStart(data) {
    return {
      type: END_AUDIO_CALL_START,
      data,
    };
  }
  
  export function endAudioCallSuccess(data) {
    return {
      type: END_AUDIO_CALL_SUCCESS,
      data,
    };
  }
  
  export function endAudioCallFailure(error) {
    return {
      type: END_AUDIO_CALL_FAILURE,
      error,
    };
  }

  export function joinAudioCallStart(data) {
    return {
      type: JOIN_AUDIO_CALL_START,
      data,
    };
  }
  
  export function joinAudioCallSuccess(data) {
    return {
      type: JOIN_AUDIO_CALL_SUCCESS,
      data,
    };
  }
  
  export function joinAudioCallFailure(error) {
    return {
      type: JOIN_AUDIO_CALL_FAILURE,
      error,
    };
  }

  export function videoCallPayByWalletStart(data) {
    return {
      type: VIDEO_CALL_PAY_BY_WALLET_START,
      data,
    };
  }
  
  export function videoCallPayByWalletSuccess(data) {
    return {
      type: VIDEO_CALL_PAY_BY_WALLET_SUCCESS,
      data,
    };
  }
  
  export function videoCallPayByWalletFailure(error) {
    return {
      type: VIDEO_CALL_PAY_BY_WALLET_FAILURE,
      error,
    };
  }

  export function audioCallPayByWalletStart(data) {
    return {
      type: AUDIO_CALL_PAY_BY_WALLET_START,
      data,
    };
  }
  
  export function audioCallPayByWalletSuccess(data) {
    return {
      type: AUDIO_CALL_PAY_BY_WALLET_SUCCESS,
      data,
    };
  }
  
  export function audioCallPayByWalletFailure(error) {
    return {
      type: AUDIO_CALL_PAY_BY_WALLET_FAILURE,
      error,
    };
  }

  export function fetchAudioCallChatMessageStart(data){
    return {
      type : FETCH_AUDIO_CALL_CHAT_MESSAGE_START,
      data
    }
  }
  
  export function fetchAudioCallChatMessageSuccess(data){
    return {
      type : FETCH_AUDIO_CALL_CHAT_MESSAGE_SUCCESS,
      data
    }
  }
  
  export function fetchAudioCallChatMessageFailure(error) {
    return {
      type: FETCH_AUDIO_CALL_CHAT_MESSAGE_FAILURE,
      error,
    };
  }
  
  export function addAudioCallMessageContent(data){
    return {
      type : ADD_AUDIO_CALL_MESSAGE_CONTENT,
      data
    }
  }

  export function startAudioCallRequestStart(data){
    return {
      type : START_AUDIO_CALL_REQUEST_START,
      data
    }
  }
  
  export function startAudioCallRequestSuccess(data){
    return {
      type : START_AUDIO_CALL_REQUEST_SUCCESS,
      data
    }
  }
  
  export function startAudioCallRequestFailure(error) {
    return {
      type: START_AUDIO_CALL_REQUEST_FAILURE,
      error,
    };
  }

  export function startVideoCallRequestStart(data){
    return {
      type : START_VIDEO_CALL_REQUEST_START,
      data
    }
  }
  
  export function startVideoCallRequestSuccess(data){
    return {
      type : START_VIDEO_CALL_REQUEST_SUCCESS,
      data
    }
  }
  
  export function startVideoCallRequestFailure(error) {
    return {
      type: START_VIDEO_CALL_REQUEST_FAILURE,
      error,
    };
  }