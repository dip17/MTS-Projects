import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_VIDEO_CALL_CHAT_MESSAGE_START,
  FETCH_VIDEO_CALL_REQUESTS_START,
  SAVE_VIDEO_CALL_AMOUNT_START,
  SAVE_VIDEO_CALL_REQUEST_START,
  VIDEO_CALL_REQUESTS_ACCEPT_START,
  VIDEO_CALL_REQUESTS_JOIN_START,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_START,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_START,
  VIDEO_CALL_REQUESTS_REJECT_FAILURE,
  VIDEO_CALL_REQUESTS_REJECT_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchVideoCallChatMessageFailure,
  fetchVideoCallChatMessageSuccess,
  fetchVideoCallRequestsFailure,
  fetchVideoCallRequestsSuccess,
  saveVideoCallAmountFailure,
  saveVideoCallAmountSuccess,
  saveVideoCallRequestFailure,
  saveVideoCallRequestSuccess,
  videoCallRequestsAcceptFailure,
  videoCallRequestsAcceptSuccess,
  videoCallRequestsJoinFailure,
  videoCallRequestsJoinSuccess,
  videoCallRequestsPaymentPaypalFailure,
  videoCallRequestsPaymentPaypalSuccess,
  videoCallRequestsPaymentStripeFailure,
  videoCallRequestsPaymentStripeSuccess,
  videoCallRequestsRejectFailure,
  videoCallRequestsRejectSuccess,
} from "../actions/VideoCallAction";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* fetchVideoCallRequestsAPI() {
  try {
    const response = yield api.postMethod("video_call_requests");
    if (response.data.success) {
      yield put(fetchVideoCallRequestsSuccess(response.data.data));
    } else {
      yield put(fetchVideoCallRequestsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchVideoCallRequestsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.videocall.saveVideoCallRequest.inputData
    );

    if (!inputData.start_time && !inputData.model_id) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(saveVideoCallRequestFailure("Please fill the content"));
      const notificationMessage = getErrorNotificationMessage(
        "Please fill the content"
      );
      yield put(createNotification(notificationMessage));
    } else {
      const response = yield api.postMethod(
        "video_call_requests_save",
        inputData
      );
      if (response.data.success) {
        yield put(saveVideoCallRequestSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        // window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(saveVideoCallRequestFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(saveVideoCallRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* acceptVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.acceptVideoCallRequest.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_accept",
      inputData
    );
    if (response.data.success) {
      yield put(videoCallRequestsAcceptSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/profile");
    } else {
      yield put(videoCallRequestsAcceptFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallRequestsAcceptFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* rejectVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.rejectVideoCallRequest.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_reject",
      inputData
    );
    if (response.data.success) {
      yield put(videoCallRequestsRejectSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/profile");
    } else {
      yield put(videoCallRequestsRejectFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallRequestsRejectFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* joinVideoCallRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.joinVideoCallRequest.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_join",
      inputData
    );
    if (response.data.success) {
      yield put(videoCallRequestsJoinSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/profile");
    } else {
      yield put(videoCallRequestsJoinFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallRequestsJoinFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PayStripeAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.videoCallRequestPayStripe.inputData
    );
    const response = yield api.postMethod(
      "video_call_payment_by_stripe",
      paymentInputData
    );
    if (response.data.success) {
      yield put(videoCallRequestsPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(videoCallRequestsPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallRequestsPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PayPaypalAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.videoCallRequestPayPaypal.inputData
    );
    const response = yield api.postMethod(
      "video_call_payment_by_paypal",
      paymentInputData
    );
    if (response.data.success) {
      yield put(videoCallRequestsPaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(videoCallRequestsPaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallRequestsPaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveVideoAmountAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.saveVideoCallAmount.inputData
    );
    const response = yield api.postMethod(
      "video_call_amount_update",
      inputData
    );
    if (response.data.success) {
      yield put(saveVideoCallAmountSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      // window.location.assign("/post/" + response.data.data.post_unique_id);
    } else {
      yield put(saveVideoCallAmountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveVideoCallAmountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* fetchVideoCallChatAPI(action) {
  try {
    const response = yield api.postMethod(
      "video_call_chat",
      action.data
    );
    if (response.data.success) {
      yield put(fetchVideoCallChatMessageSuccess(response.data.data));
    } else {
      yield put(fetchVideoCallChatMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchVideoCallChatMessageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


export default function* pageSaga() {
  yield all([
    yield takeLatest(
      FETCH_VIDEO_CALL_REQUESTS_START,
      fetchVideoCallRequestsAPI
    ),
  ]);

  yield all([
    yield takeLatest(SAVE_VIDEO_CALL_REQUEST_START, saveVideoCallRequestAPI),
  ]);
  yield all([
    yield takeLatest(
      VIDEO_CALL_REQUESTS_ACCEPT_START,
      acceptVideoCallRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      VIDEO_CALL_REQUESTS_REJECT_START,
      rejectVideoCallRequestAPI
    ),
  ]);
  yield all([
    yield takeLatest(VIDEO_CALL_REQUESTS_JOIN_START, joinVideoCallRequestAPI),
  ]);
  yield all([
    yield takeLatest(VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_START, PayStripeAPI),
  ]);
  yield all([
    yield takeLatest(VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_START, PayPaypalAPI),
  ]);
  yield all([
    yield takeLatest(SAVE_VIDEO_CALL_AMOUNT_START, saveVideoAmountAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_VIDEO_CALL_CHAT_MESSAGE_START, fetchVideoCallChatAPI),
  ]);
}
