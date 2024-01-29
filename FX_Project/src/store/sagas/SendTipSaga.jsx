import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  sendTipStripeFailure,
  sendTipStripeSuccess,
  sendTipWalletFailure,
  sendTipWalletSuccess,
  sendTipPaypalSuccess,
  sendTipPaypalFailure,
  sendTipCCBillSuccess,
  sendTipCCBillFailure,
  sendTipCoinPaymentSuccess,
  sendTipCoinPaymentFailure,
} from "../actions/SendTipAction";
import {
  SEND_TIP_BY_STRIPE_START,
  SEND_TIP_BY_WALLET_START,
  SEND_TIP_BY_PAYPAL_START,
  SEND_TIP_BY_CCBILL_START,
  SEND_TIP_BY_COINPAYMENT_START,
} from "../actions/ActionConstant";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* sendTipStripeAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipStripe.inputData);
    const response = yield api.postMethod("tips_payment_by_stripe", inputData);
    if (response.data.success) {
      yield put(sendTipStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(sendTipStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendTipPaypalAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipPaypal.inputData);
    const response = yield api.postMethod("tips_payment_by_paypal", inputData);
    if (response.data.success) {
      yield put(sendTipPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(sendTipPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendTipWalletAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipWallet.inputData);
    const response = yield api.postMethod("tips_payment_by_wallet", inputData);
    if (response.data.success) {
      yield put(sendTipWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(sendTipWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendTipCoinPaymentAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipCoinPayment.inputData);
    const response = yield api.postMethod("tips_payment_by_coinpayment", inputData);
    if (response.data.success) {
      yield put(sendTipCoinPaymentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      setTimeout(() => {
        window.location.assign(`${response.data.data.redirect_web_url}`);
      }, 3000);
    } else {
      yield put(sendTipCoinPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipCoinPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendTipCCBillAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipCCBill.inputData);
    const response = yield api.postMethod("tips_payment_by_ccbill", inputData);
    if (response.data.success) {
      yield put(sendTipCCBillSuccess(response.data.data));
      window.location.assign(`${response.data.data.redirect_web_url}`);
    } else {
      yield put(sendTipCCBillFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipCCBillFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SEND_TIP_BY_STRIPE_START, sendTipStripeAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_WALLET_START, sendTipWalletAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_PAYPAL_START, sendTipPaypalAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_CCBILL_START, sendTipCCBillAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_COINPAYMENT_START, sendTipCoinPaymentAPI)]);
}
