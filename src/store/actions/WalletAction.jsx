import {
  FETCH_WALLET_DETAILS_START,
  FETCH_WALLET_DETAILS_SUCCESS,
  FETCH_WALLET_DETAILS_FAILURE,
  ADD_MONEY_VIA_CARD_START,
  ADD_MONEY_VIA_CARD_SUCCESS,
  ADD_MONEY_VIA_CARD_FAILURE,
  ADD_MONEY_VIA_BANK_START,
  ADD_MONEY_VIA_BANK_SUCCESS,
  ADD_MONEY_VIA_BANK_FAILURE,
  ADD_MONEY_VIA_PAYPAL_START,
  ADD_MONEY_VIA_PAYPAL_SUCCESS,
  ADD_MONEY_VIA_PAYPAL_FAILURE,
  GENERATE_STRIPE_PAYMENT_START,
  GENERATE_STRIPE_PAYMENT_SUCCESS,
  GENERATE_STRIPE_PAYMENT_FAILURE,
} from "./ActionConstant";

// Get Wallet Details actions.

export function fetchWalletDetailsStart(data) {
  return {
    type: FETCH_WALLET_DETAILS_START,
    data,
  };
}

export function fetchWalletDetailsSuccess(data) {
  return {
    type: FETCH_WALLET_DETAILS_SUCCESS,
    data,
  };
}

export function fetchWalletDetailsFailure(error) {
  return {
    type: FETCH_WALLET_DETAILS_FAILURE,
    error,
  };
}

// add Wallet via card actions.

export function addMoneyViaCardStart(data) {
  return {
    type: ADD_MONEY_VIA_CARD_START,
    data,
  };
}

export function addMoneyViaCardSuccess(data) {
  return {
    type: ADD_MONEY_VIA_CARD_SUCCESS,
    data,
  };
}

export function addMoneyViaCardFailure(error) {
  return {
    type: ADD_MONEY_VIA_CARD_FAILURE,
    error,
  };
}

// add Wallet via bank actions.

export function addMoneyViaBankStart(data) {
  return {
    type: ADD_MONEY_VIA_BANK_START,
    data,
  };
}

export function addMoneyViaBankSuccess(data) {
  return {
    type: ADD_MONEY_VIA_BANK_SUCCESS,
    data,
  };
}

export function addMoneyViaBankFailure(error) {
  return {
    type: ADD_MONEY_VIA_BANK_FAILURE,
    error,
  };
}

// add Wallet via Paypal actions.

export function addMoneyViaPaypalStart(data) {
  return {
    type: ADD_MONEY_VIA_PAYPAL_START,
    data,
  };
}

export function addMoneyViaPaypalSuccess(data) {
  return {
    type: ADD_MONEY_VIA_PAYPAL_SUCCESS,
    data,
  };
}

export function addMoneyViaPaypalFailure(error) {
  return {
    type: ADD_MONEY_VIA_PAYPAL_FAILURE,
    error,
  };
}

export function generateStripePaymentStart(data) {
  return {
    type: GENERATE_STRIPE_PAYMENT_START,
    data,
  }
}

export function generateStripePaymentSuccess(data) {
  return {
    type: GENERATE_STRIPE_PAYMENT_SUCCESS,
    data,
  }
}

export function generateStripePaymentFailure(error) {
  return {
    type: GENERATE_STRIPE_PAYMENT_FAILURE,
    error,
  }
}