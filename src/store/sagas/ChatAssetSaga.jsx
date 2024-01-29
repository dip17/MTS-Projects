import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  CHAT_ASSET_FILE_UPLOAD_START,
  CHAT_ASSET_PAYMENT_STRIPE_START,
  CHAT_ASSET_PAYMENT_PAYPAL_START,
  CHAT_ASSET_PAYMENT_WALLET_START
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  chatAssetFileUploadSuccess,
  chatAssetFileUploadFailure,
  chatAssetPaymentStripeSuccess,
  chatAssetPaymentStripeFailure,
  chatAssetPaymentWalletSuccess,
  chatAssetPaymentWalletFailure,
  chatAssetPaymentPaypalSuccess,
  chatAssetPaymentPaypalFailure,
} from "../actions/ChatAssetAction";

import {
  fetchChatMessageStart, forceChatMessagesSuccess, forceUserChatAssetsSuccesss,
} from "../actions/ChatAction";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";


function* chatAssetFileUploadAPI() {
  try {
    const inputData = yield select(
      (state) => state.chatAsset.chatAssetInputData.inputData
    );
    const response = yield api.postMethod("chat_assets_save", inputData);
    if (response.data.success) {
      console.log(response.data.data);
      yield put(chatAssetFileUploadSuccess(response.data.data));
    } else {
      yield put(chatAssetFileUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatAssetFileUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatAssetPaymentStripeAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.chatAsset.chatAssetPayStripe.inputData
    );
    const response = yield api.postMethod(
      "chat_assets_payment_by_stripe",
      paymentInputData
    );
    if (response.data.success) {
      console.log(response.data.data);
      yield put(chatAssetPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(
        fetchChatMessageStart({
          to_user_id: response.data.data.chat_message.to_user_id,
          from_user_id: response.data.data.chat_message.from_user_id,
        })
      );
    } else {
      yield put(chatAssetPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatAssetPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatAssetPaymentWalletAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.chatAsset.chatAssetPayWallet.inputData
    );
    const response = yield api.postMethod(
      "chat_assets_payment_by_wallet",
      paymentInputData
    );
    if (response.data.success) {
      yield put(chatAssetPaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      let chatMessagesData = yield select((state) => state.chat.chatMessages.data);
      yield put(forceChatMessagesSuccess({
        ...chatMessagesData,
        messages: chatMessagesData.messages.map(message =>
          message.chat_message_id === paymentInputData.chat_message_id
            ? response.data.data.chat_message : message)
      }));
      let chatAssetsData = yield select((state) => state.chat.chatAssets.data);
      if (chatAssetsData.chat_assets && chatAssetsData.chat_assets.length > 0) {
        let newChatAssets = chatAssetsData.chat_assets.map((asset, i) => {
          let finalAsset = null;
          response.data.data.chat_message.chat_assets.map((newAsset, j) => {
            if (asset.chat_asset_id === newAsset.chat_asset_id) {
              finalAsset = {
                ...newAsset,
                is_user_needs_pay: 0,
                chat_message: response.data.data.chat_message.message,
                chat_message_status: response.data.data.chat_message.chat_message_status,
              }
            }
          })
          return finalAsset ? finalAsset : asset;
        });
        yield put(forceUserChatAssetsSuccesss({
          ...chatAssetsData,
          chat_assets: newChatAssets,
        }));
      }
    } else {
      yield put(chatAssetPaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatAssetPaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatAssetPaymentPaypalAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.chatAsset.chatAssetPayPaypal.inputData
    );
    const response = yield api.postMethod(
      "chat_assets_payment_by_paypal",
      paymentInputData
    );
    if (response.data.success) {
      yield put(chatAssetPaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(
        fetchChatMessageStart({
          to_user_id: response.data.data.chat_message.to_user_id,
          from_user_id: response.data.data.chat_message.from_user_id,
        })
      );
    } else {
      yield put(chatAssetPaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatAssetPaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(CHAT_ASSET_FILE_UPLOAD_START, chatAssetFileUploadAPI),
  ]);
  yield all([
    yield takeLatest(CHAT_ASSET_PAYMENT_STRIPE_START, chatAssetPaymentStripeAPI),
  ]);
  yield all([
    yield takeLatest(CHAT_ASSET_PAYMENT_PAYPAL_START, chatAssetPaymentPaypalAPI),
  ]);
  yield all([
    yield takeLatest(CHAT_ASSET_PAYMENT_WALLET_START, chatAssetPaymentWalletAPI),
  ]);
}
