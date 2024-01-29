import {
  FETCH_VIDEO_CALL_REQUESTS_FAILURE,
  FETCH_VIDEO_CALL_REQUESTS_START,
  FETCH_VIDEO_CALL_REQUESTS_SUCCESS,
  SAVE_VIDEO_CALL_AMOUNT_FAILURE,
  SAVE_VIDEO_CALL_AMOUNT_START,
  SAVE_VIDEO_CALL_AMOUNT_SUCCESS,
  SAVE_VIDEO_CALL_REQUEST_FAILURE,
  SAVE_VIDEO_CALL_REQUEST_START,
  SAVE_VIDEO_CALL_REQUEST_SUCCESS,
  VIDEO_CALL_REQUESTS_ACCEPT_FAILURE,
  VIDEO_CALL_REQUESTS_ACCEPT_START,
  VIDEO_CALL_REQUESTS_ACCEPT_SUCCESS,
  VIDEO_CALL_REQUESTS_JOIN_FAILURE,
  VIDEO_CALL_REQUESTS_JOIN_START,
  VIDEO_CALL_REQUESTS_JOIN_SUCCESS,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_FAILURE,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_START,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_SUCCESS,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_FAILURE,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_START,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_SUCCESS,
  VIDEO_CALL_REQUESTS_REJECT_FAILURE,
  VIDEO_CALL_REQUESTS_REJECT_START,
  VIDEO_CALL_REQUESTS_REJECT_SUCCESS,
  FETCH_VIDEO_CALL_CHAT_MESSAGE_START,
  FETCH_VIDEO_CALL_CHAT_MESSAGE_SUCCESS,
  FETCH_VIDEO_CALL_CHAT_MESSAGE_FAILURE,
  ADD_VIDEO_CALL_MESSAGE_CONTENT
} from "./ActionConstant";

export function fetchVideoCallRequestsStart(data) {
  return {
    type: FETCH_VIDEO_CALL_REQUESTS_START,
    data,
  };
}
export function fetchVideoCallRequestsSuccess(data) {
  return {
    type: FETCH_VIDEO_CALL_REQUESTS_SUCCESS,
    data,
  };
}
export function fetchVideoCallRequestsFailure(error) {
  return {
    type: FETCH_VIDEO_CALL_REQUESTS_FAILURE,
    error,
  };
}


export function saveVideoCallRequestStart(data) {
  console.log(data);
  return {
    type: SAVE_VIDEO_CALL_REQUEST_START,
    data,
  };
}

export function saveVideoCallRequestSuccess(data) {
  return {
    type: SAVE_VIDEO_CALL_REQUEST_SUCCESS,
    data,
  };
}

export function saveVideoCallRequestFailure(error) {
  return {
    type: SAVE_VIDEO_CALL_REQUEST_FAILURE,
    error,
  };
}

export function videoCallRequestsAcceptStart(data) {
  return {
    type: VIDEO_CALL_REQUESTS_ACCEPT_START,
    data,
  };
}

export function videoCallRequestsAcceptSuccess(data) {
  return {
    type: VIDEO_CALL_REQUESTS_ACCEPT_SUCCESS,
    data,
  };
}

export function videoCallRequestsAcceptFailure(error) {
  return {
    type: VIDEO_CALL_REQUESTS_ACCEPT_FAILURE,
    error,
  };
}

export function videoCallRequestsRejectStart(data) {
  return {
    type: VIDEO_CALL_REQUESTS_REJECT_START,
    data,
  };
}

export function videoCallRequestsRejectSuccess(data) {
  return {
    type: VIDEO_CALL_REQUESTS_REJECT_SUCCESS,
    data,
  };
}

export function videoCallRequestsRejectFailure(error) {
  return {
    type: VIDEO_CALL_REQUESTS_REJECT_FAILURE,
    error,
  };
}

export function videoCallRequestsJoinStart(data) {
  return {
    type: VIDEO_CALL_REQUESTS_JOIN_START,
    data,
  };
}

export function videoCallRequestsJoinSuccess(data) {
  return {
    type: VIDEO_CALL_REQUESTS_JOIN_SUCCESS,
    data,
  };
}

export function videoCallRequestsJoinFailure(error) {
  return {
    type: VIDEO_CALL_REQUESTS_JOIN_FAILURE,
    error,
  };
}

export function videoCallRequestsPaymentStripeStart(data) {
  return {
    type: VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_START,
    data,
  };
}

export function videoCallRequestsPaymentStripeSuccess(data) {
  return {
    type: VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_SUCCESS,
    data,
  };
}

export function videoCallRequestsPaymentStripeFailure(error) {
  return {
    type: VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_FAILURE,
    error,
  };
}
export function videoCallRequestsPaymentPaypalStart(data) {
  return {
    type: VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_START,
    data,
  };
}

export function videoCallRequestsPaymentPaypalSuccess(data) {
  return {
    type: VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_SUCCESS,
    data,
  };
}

export function videoCallRequestsPaymentPaypalFailure(error) {
  return {
    type: VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_FAILURE,
    error,
  };
}

export function saveVideoCallAmountStart(data) {
  return {
    type: SAVE_VIDEO_CALL_AMOUNT_START,
    data,
  };
}

export function saveVideoCallAmountSuccess(data) {
  return {
    type: SAVE_VIDEO_CALL_AMOUNT_SUCCESS,
    data,
  };
}

export function saveVideoCallAmountFailure(error) {
  return {
    type: SAVE_VIDEO_CALL_AMOUNT_FAILURE,
    error,
  };
}

export function fetchVideoCallChatMessageStart(data){
  return {
    type : FETCH_VIDEO_CALL_CHAT_MESSAGE_START,
    data
  }
}

export function fetchVideoCallChatMessageSuccess(data){
  return {
    type : FETCH_VIDEO_CALL_CHAT_MESSAGE_SUCCESS,
    data
  }
}

export function fetchVideoCallChatMessageFailure(error) {
  return {
    type: FETCH_VIDEO_CALL_CHAT_MESSAGE_FAILURE,
    error,
  };
}

export function addVideoCallMessageContent(data){
  return {
    type : ADD_VIDEO_CALL_MESSAGE_CONTENT,
    data
  }
}