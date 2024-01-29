import {
  CHAT_ASSET_PAYMENT_STRIPE_START,
  CHAT_ASSET_PAYMENT_STRIPE_SUCCESS,
  CHAT_ASSET_PAYMENT_STRIPE_FAILURE,
  CHAT_ASSET_PAYMENT_WALLET_START,
  CHAT_ASSET_PAYMENT_WALLET_SUCCESS,
  CHAT_ASSET_PAYMENT_WALLET_FAILURE,
  CHAT_ASSET_PAYMENT_PAYPAL_START,
  CHAT_ASSET_PAYMENT_PAYPAL_SUCCESS,
  CHAT_ASSET_PAYMENT_PAYPAL_FAILURE,
  CHAT_ASSET_FILE_UPLOAD_START,
  CHAT_ASSET_FILE_UPLOAD_SUCCESS,
  CHAT_ASSET_FILE_UPLOAD_FAILURE,
} from "./ActionConstant";

export function chatAssetPaymentStripeStart(data) {
  return {
    type: CHAT_ASSET_PAYMENT_STRIPE_START,
    data,
  };
}

export function chatAssetPaymentStripeSuccess(data) {
  return {
    type: CHAT_ASSET_PAYMENT_STRIPE_SUCCESS,
    data,
  };
}

export function chatAssetPaymentStripeFailure(error) {
  return {
    type: CHAT_ASSET_PAYMENT_STRIPE_FAILURE,
    error,
  };
}

export function chatAssetPaymentWalletStart(data) {
  return {
    type: CHAT_ASSET_PAYMENT_WALLET_START,
    data,
  };
}

export function chatAssetPaymentWalletSuccess(data) {
  return {
    type: CHAT_ASSET_PAYMENT_WALLET_SUCCESS,
    data,
  };
}

export function chatAssetPaymentWalletFailure(error) {
  return {
    type: CHAT_ASSET_PAYMENT_WALLET_FAILURE,
    error,
  };
}

export function chatAssetPaymentPaypalStart(data) {
  return {
    type: CHAT_ASSET_PAYMENT_PAYPAL_START,
    data,
  };
}

export function chatAssetPaymentPaypalSuccess(data) {
  return {
    type: CHAT_ASSET_PAYMENT_PAYPAL_SUCCESS,
    data,
  };
}

export function chatAssetPaymentPaypalFailure(error) {
  return {
    type: CHAT_ASSET_PAYMENT_PAYPAL_FAILURE,
    error,
  };
}


export function chatAssetFileUploadStart(data) {
  return {
    type: CHAT_ASSET_FILE_UPLOAD_START,
    data,
  };
}

export function chatAssetFileUploadSuccess(data) {
  return {
    type: CHAT_ASSET_FILE_UPLOAD_SUCCESS,
    data,
  };
}

export function chatAssetFileUploadFailure(data) {
  return {
    type: CHAT_ASSET_FILE_UPLOAD_FAILURE,
    data,
  };
}
