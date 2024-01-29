import {
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CHANGE_POST_STATUS_START,
  CHANGE_POST_STATUS_SUCCESS,
  CHANGE_POST_STATUS_FAILURE,
  POST_FILE_UPLOAD_START,
  POST_FILE_UPLOAD_SUCCESS,
  POST_FILE_UPLOAD_FAILURE,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_STRIPE_SUCCESS,
  PPV_PAYMENT_STRIPE_FAILURE,
  PPV_PAYMENT_WALLET_START,
  PPV_PAYMENT_WALLET_SUCCESS,
  PPV_PAYMENT_WALLET_FAILURE,
  SAVE_REPORT_POST_START,
  SAVE_REPORT_POST_SUCCESS,
  SAVE_REPORT_POST_FAILURE,
  FETCH_REPORT_POSTS_START,
  FETCH_REPORT_POSTS_SUCCESS,
  FETCH_REPORT_POSTS_FAILURE,
  PPV_PAYMENT_PAYPAL_START,
  PPV_PAYMENT_PAYPAL_SUCCESS,
  PPV_PAYMENT_PAYPAL_FAILURE,
  PPV_PAYMENT_CCBILL_START,
  PPV_PAYMENT_CCBILL_SUCCESS,
  PPV_PAYMENT_CCBILL_FAILURE,
  FETCH_EXPLORE_START,
  FETCH_EXPLORE_SUCCESS,
  FETCH_EXPLORE_FAILURE,
  POST_FILE_REMOVE_START,
  POST_FILE_REMOVE_SUCCESS,
  POST_FILE_REMOVE_FAILURE,
  PPV_PAYMENT_COINPAYMENT_START,
  PPV_PAYMENT_COINPAYMENT_SUCCESS,
  PPV_PAYMENT_COINPAYMENT_FAILURE,
  FETCH_POST_CATEGORIES_START,
  FETCH_POST_CATEGORIES_SUCCESS,
  FETCH_POST_CATEGORIES_FAILURE,
  FETCH_REPORT_REASON_START,
  FETCH_REPORT_REASON_SUCCESS,
  FETCH_REPORT_REASON_FAILURE,
} from "./ActionConstant";

export function savePostStart(data) {
  return {
    type: SAVE_POST_START,
    data,
  };
}

export function savePostSuccess(data) {
  return {
    type: SAVE_POST_SUCCESS,
    data,
  };
}

export function savePostFailure(error) {
  return {
    type: SAVE_POST_FAILURE,
    error,
  };
}
export function fetchPostsStart(data) {
  return {
    type: FETCH_POSTS_START,
    data,
  };
}

export function fetchPostsSuccess(data) {
  return {
    type: FETCH_POSTS_SUCCESS,
    data,
  };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    error,
  };
}

export function fetchSinglePostStart(data) {
  return {
    type: FETCH_SINGLE_POST_START,
    data,
  };
}

export function fetchSinglePostSuccess(data) {
  return {
    type: FETCH_SINGLE_POST_SUCCESS,
    data,
  };
}

export function fetchSinglePostFailure(error) {
  return {
    type: FETCH_SINGLE_POST_FAILURE,
    error,
  };
}

export function deletePostStart(data) {
  return {
    type: DELETE_POST_START,
    data,
  };
}

export function deletePostSuccess(data) {
  return {
    type: DELETE_POST_SUCCESS,
    data,
  };
}

export function deletePostFailure(error) {
  return {
    type: DELETE_POST_FAILURE,
    error,
  };
}

export function changePostStatusStart(data) {
  return {
    type: CHANGE_POST_STATUS_START,
    data,
  };
}

export function changePostStatusSuccess(data) {
  return {
    type: CHANGE_POST_STATUS_SUCCESS,
    data,
  };
}

export function changePostStatusFailure(error) {
  return {
    type: CHANGE_POST_STATUS_FAILURE,
    error,
  };
}

export function postFileUploadStart(data) {
  return {
    type: POST_FILE_UPLOAD_START,
    data,
  };
}

export function postFileUploadSuccess(data) {
  return {
    type: POST_FILE_UPLOAD_SUCCESS,
    data,
  };
}

export function postFileUploadFailure(error) {
  return {
    type: POST_FILE_UPLOAD_FAILURE,
    error,
  };
}

export function PPVPaymentStripeStart(data) {
  return {
    type: PPV_PAYMENT_STRIPE_START,
    data,
  };
}

export function PPVPaymentStripeSuccess(data) {
  return {
    type: PPV_PAYMENT_STRIPE_SUCCESS,
    data,
  };
}

export function PPVPaymentStripeFailure(error) {
  return {
    type: PPV_PAYMENT_STRIPE_FAILURE,
    error,
  };
}

// Subscription Payment wallet actions.

export function PPVPaymentWalletStart(data) {
  return {
    type: PPV_PAYMENT_WALLET_START,
    data,
  };
}

export function PPVPaymentWalletSuccess(data) {
  return {
    type: PPV_PAYMENT_WALLET_SUCCESS,
    data,
  };
}

export function PPVPaymentWalletFailure(error) {
  return {
    type: PPV_PAYMENT_WALLET_FAILURE,
    error,
  };
}

export function saveReportPostStart(data) {
  return {
    type: SAVE_REPORT_POST_START,
    data,
  };
}

export function saveReportPostSuccess(data) {
  return {
    type: SAVE_REPORT_POST_SUCCESS,
    data,
  };
}

export function saveReportPostFailure(error) {
  return {
    type: SAVE_REPORT_POST_FAILURE,
    error,
  };
}

export function fetchReportPostsStart(data) {
  return {
    type: FETCH_REPORT_POSTS_START,
    data,
  };
}

export function fetchReportPostsSuccess(data) {
  return {
    type: FETCH_REPORT_POSTS_SUCCESS,
    data,
  };
}

export function fetchReportPostsFailure(error) {
  return {
    type: FETCH_REPORT_POSTS_FAILURE,
    error,
  };
}

export function PPVPaymentPaypalStart(data) {
  return {
    type: PPV_PAYMENT_PAYPAL_START,
    data,
  };
}

export function PPVPaymentPaypalSuccess(data) {
  return {
    type: PPV_PAYMENT_PAYPAL_SUCCESS,
    data,
  };
}

export function PPVPaymentPaypalFailure(error) {
  return {
    type: PPV_PAYMENT_PAYPAL_FAILURE,
    error,
  };
}

export function PPVPaymentCCBillStart(data) {
  return {
    type: PPV_PAYMENT_CCBILL_START,
    data,
  };
}

export function postFileRemoveStart(data) {
  return {
    type: POST_FILE_REMOVE_START,
    data,
  };
}

export function PPVPaymentCCBillSuccess(data) {
  return {
    type: PPV_PAYMENT_CCBILL_SUCCESS,
    data,
  };
}

export function postFileRemoveSuccess(data) {
  return {
    type: POST_FILE_REMOVE_SUCCESS,
    data,
  };
}

export function postFileRemoveFailure(error) {
  return {
    type: POST_FILE_REMOVE_FAILURE,
    error,
  };
}

export function PPVPaymentCCBillFailure(error) {
  return {
    type: PPV_PAYMENT_CCBILL_FAILURE,
    error,
  };
}

export function fetchExploreStart(data) {
  return {
    type: FETCH_EXPLORE_START,
    data,
  };
}

export function fetchExploreSuccess(data) {
  return {
    type: FETCH_EXPLORE_SUCCESS,
    data,
  };
}

export function fetchExploreFailure(error) {
  return {
    type: FETCH_EXPLORE_FAILURE,
    error,
  };
}

export function PPVPaymentCoinPaymentStart(data) {
  return {
    type: PPV_PAYMENT_COINPAYMENT_START,
    data,
  };
}
export function PPVPaymentCoinPaymentSuccess(data) {
  return {
    type: PPV_PAYMENT_COINPAYMENT_SUCCESS,
    data,
  };
}

export function PPVPaymentCoinPaymentFailure(error) {
  return {
    type: PPV_PAYMENT_COINPAYMENT_FAILURE,
    error,
  };
}
export function fetchPostCategoriesStart(data) {
  return {
    type: FETCH_POST_CATEGORIES_START,
    data,
  };
}

export function fetchPostCategoriesSuccess(data) {
  return {
    type: FETCH_POST_CATEGORIES_SUCCESS,
    data,
  };
}

export function fetchPostCategoriesFailure(error) {
  return {
    type: FETCH_POST_CATEGORIES_FAILURE,
    error,
  };
}

export function fetchReportReasonStart(data) {
  return {
    type: FETCH_REPORT_REASON_START,
    data,
  };
}

export function fetchReportReasonSuccess(data) {
  return {
    type: FETCH_REPORT_REASON_SUCCESS,
    data,
  };
}

export function fetchReportReasonFailure(error) {
  return {
    type: FETCH_REPORT_REASON_FAILURE,
    error,
  };
}
