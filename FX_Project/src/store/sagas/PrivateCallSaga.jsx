import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  acceptCallFailure,
  acceptCallSuccess,
  callHistoryModelFailure,
  callHistoryModelSuccess,
  callHistoryUserFailure,
  callHistoryUserSuccess,
  callRequestReceivedModelFailure,
  callRequestReceivedModelSuccess,
  callAudioRequestReceivedModelFailure,
  callAudioRequestReceivedModelSuccess,
  callRequestSentUserFailure,
  callRequestSentUserSuccess,
  fetchAudioCallRequestsFailure,
  fetchAudioCallRequestsSuccess,
  endVideoCallFailure,
  endVideoCallSuccess,
  fetchSingleVideoCallFailure,
  fetchSingleVideoCallSuccess,
  joinVideoCallFailure,
  joinVideoCallSuccess,
  payByPayPalFailure,
  payByPayPalSuccess,
  payByStripeFailure,
  payByStripeSuccess,
  rejectCallFailure,
  rejectCallSuccess,
  requestCallFailure,
  requestCallSuccess,
  acceptAudioCallFailure,
  acceptAudioCallSuccess,
  audioCallHistoryUserFailure,
  audioCallHistoryUserSuccess,
  rejectAudioCallFailure,
  rejectAudioCallSuccess,
  requestAudioCallFailure,
  requestAudioCallSuccess,
  payAudioCallByStripeFailure,
  payAudioCallByStripeSuccess,
  payAudioCallByPayPalFailure,
  payAudioCallByPayPalSuccess,
  fetchSingleAudioCallFailure,
  fetchSingleAudioCallSuccess,
  endAudioCallFailure,
  endAudioCallSuccess,
  joinAudioCallFailure,
  joinAudioCallSuccess,
  videoCallPayByWalletFailure,
  videoCallPayByWalletSuccess,
  audioCallPayByWalletFailure,
  audioCallPayByWalletSuccess,
  fetchAudioCallChatMessageSuccess,
  fetchAudioCallChatMessageFailure,
  startAudioCallRequestSuccess,
  startAudioCallRequestFailure,
  startVideoCallRequestSuccess,
  startVideoCallRequestFailure,
} from "../actions/PrivateCallAction";
import {
  ACCEPT_CALL_START,
  CALL_HISTORY_MODEL_START,
  CALL_HISTORY_USER_START,
  CALL_REQUEST_RECEIVED_MODEL_START,
  CALL_AUDIO_REQUEST_RECEIVED_MODEL_START,
  FETCH_AUDIO_CALL_REQUESTS_START,
  FETCH_MORE_AUDIO_CALL_REQUESTS_START,
  CALL_MORE_AUDIO_REQUEST_RECEIVED_MODEL_START,
  CALL_REQUEST_SENT_USER_START,
  END_VIDEO_CALL_START,
  FETCH_SINGLE_VIDEO_CALL_START,
  JOIN_VIDEO_CALL_START,
  PAY_BY_PAYPAL_START,
  PAY_BY_STRIPE_START,
  REJECT_CALL_START,
  REQUEST_CALL_START,
  ACCEPT_AUDIO_CALL_START,
  AUDIO_CALL_HISTORY_USER_START,
  REJECT_AUDIO_CALL_START,
  REQUEST_AUDIO_CALL_START,
  PAY_AUDIO_CALL_BY_STRIPE_START,
  PAY_AUDIO_CALL_BY_PAYPAL_START,
  FETCH_SINGLE_AUDIO_CALL_START,
  END_AUDIO_CALL_START,
  JOIN_AUDIO_CALL_START,
  VIDEO_CALL_PAY_BY_WALLET_START,
  AUDIO_CALL_PAY_BY_WALLET_START,
  FETCH_AUDIO_CALL_CHAT_MESSAGE_START,
  START_AUDIO_CALL_REQUEST_START,
  START_VIDEO_CALL_REQUEST_START,
} from "../actions/ActionConstant";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* saveRequestCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.requestCall.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_save",
      inputData
    );
    if (response.data.success) {
      yield put(requestCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

      window.location.assign("/video-calls-sent");
    } else {
      yield put(requestCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(requestCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* acceptCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.acceptCall.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_accept",
      inputData
    );
    if (response.data.success) {
      yield put(acceptCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

      window.location.reload();
    } else {
      yield put(acceptCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(acceptCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* rejectCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.rejectCall.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_reject",
      inputData
    );
    if (response.data.success) {
      yield put(rejectCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(rejectCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(rejectCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* payByStripeApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.payByStripe.inputData
    );
    const response = yield api.postMethod(
      "video_call_payment_by_stripe",
      inputData
    );
    if (response.data.success) {
      yield put(payByStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/video-calls-sent");
    } else {
      yield put(payByStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(payByStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* payByPayPalApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.payByPayPal.inputData
    );
    const response = yield api.postMethod(
      "video_call_payment_by_paypal",
      inputData
    );
    if (response.data.success) {
      yield put(payByPayPalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(payByPayPalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(payByPayPalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* joinCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.joinVideoCall.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_join",
      inputData
    );
    if (response.data.success) {
      yield put(joinVideoCallSuccess(response.data.data));
    } else {
      yield put(joinVideoCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(joinVideoCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* endVideoCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.endVideoCall.inputData
    );
    const response = yield api.postMethod("video_call_requests_end", inputData);
    if (response.data.success) {
      yield put(endVideoCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.reload();
    } else {
      yield put(endVideoCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(endVideoCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* callRequestSentUserApi() {
  try {
    const response = yield api.postMethod("video_call_requests");
    if (response.data.success) {
      yield put(callRequestSentUserSuccess(response.data.data));
    } else {
      yield put(callRequestSentUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(callRequestSentUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* callHistoryUserApi() {
  try {
    const response = yield api.postMethod("user_video_call_history");
    if (response.data.success) {
      yield put(callHistoryUserSuccess(response.data.data));
    } else {
      yield put(callHistoryUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(callHistoryUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* callHistoryModelApi() {
  try {
    const response = yield api.postMethod("model_video_call_history");
    if (response.data.success) {
      yield put(callHistoryModelSuccess(response.data.data));
    } else {
      yield put(callHistoryModelFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(callHistoryModelFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* callRequestReceivedModelApi() {
  try {
    const response = yield api.postMethod("model_video_call_requests");
    if (response.data.success) {
      yield put(callRequestReceivedModelSuccess(response.data.data));
    } else {
      yield put(callRequestReceivedModelFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(callRequestReceivedModelFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchAudioCallRequestsAPI(action) {
  try {
    const response = yield api.postMethod("audio_call_requests", action.data);
    if (response.data.success) {
      yield put(fetchAudioCallRequestsSuccess(response.data.data));
    } else {
      yield put(fetchAudioCallRequestsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchAudioCallRequestsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* audiocallRequestReceivedModelApi(action) {
  try {
    const response = yield api.postMethod("model_audio_call_requests", action.data);
    if (response.data.success) {
      yield put(callAudioRequestReceivedModelSuccess(response.data.data));
    } else {
      yield put(callAudioRequestReceivedModelFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(callAudioRequestReceivedModelFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleVideoCallAPI() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.singleVideoCall.inputData
    );
    const response = yield api.postMethod(
      "video_call_requests_view",
      inputData
    );
    if (response.data.success) {
      yield put(fetchSingleVideoCallSuccess(response.data.data));
    } else {
      yield put(fetchSingleVideoCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleVideoCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* acceptAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.acceptAudioCall.inputData
    );
    const response = yield api.postMethod(
      "audio_call_requests_accept",
      inputData
    );
    if (response.data.success) {
      yield put(acceptAudioCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

      window.location.reload();
    } else {
      yield put(acceptAudioCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(acceptAudioCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* audioCallHistoryUserApi() {
  try {
    const response = yield api.postMethod("user_audio_call_history");
    if (response.data.success) {
      yield put(audioCallHistoryUserSuccess(response.data.data));
    } else {
      yield put(audioCallHistoryUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(audioCallHistoryUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* rejectAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.rejectAudioCall.inputData
    );
    const response = yield api.postMethod(
      "audio_call_requests_reject",
      inputData
    );
    if (response.data.success) {
      yield put(rejectAudioCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.reload();
    } else {
      yield put(rejectAudioCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(rejectAudioCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveRequestAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.requestAudioCall.inputData
    );
    const response = yield api.postMethod(
      "audio_call_requests_save",
      inputData
    );
    if (response.data.success) {
      yield put(requestAudioCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

      window.location.assign("/audio-calls-history");
    } else {
      yield put(requestAudioCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(requestCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* payAudioCallByStripeApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.payAudioCallByStripe.inputData
    );
    const response = yield api.postMethod(
      "audio_call_payment_by_stripe",
      inputData
    );
    if (response.data.success) {
      yield put(payAudioCallByStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/audio-calls-sent");
    } else {
      yield put(payAudioCallByStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(payAudioCallByStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* payAudioCallByPayPalApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.payAudioCallByPayPal.inputData
    );
    const response = yield api.postMethod(
      "audio_call_payment_by_paypal",
      inputData
    );
    if (response.data.success) {
      yield put(payAudioCallByPayPalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/audio-calls-sent");
    } else {
      yield put(payAudioCallByPayPalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(payAudioCallByPayPalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleAudioCallAPI() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.singleAudioCall.inputData
    );
    const response = yield api.postMethod(
      "audio_call_requests_view",
      inputData
    );
    if (response.data.success) {
      yield put(fetchSingleAudioCallSuccess(response.data.data));
    } else {
      yield put(fetchSingleAudioCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleAudioCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* endAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.endAudioCall.inputData
    );
    const response = yield api.postMethod("audio_call_requests_end", inputData);
    if (response.data.success) {
      yield put(endAudioCallSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.reload();
    } else {
      yield put(endAudioCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(endAudioCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* joinAudioCallApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.joinAudioCall.inputData
    );
    const response = yield api.postMethod(
      "audio_call_requests_join",
      inputData
    );
    if (response.data.success) {
      yield put(joinAudioCallSuccess(response.data.data));
    } else {
      yield put(joinAudioCallFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(joinAudioCallFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* videoCallPayByWalletApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.videoCallPayByWallet.inputData
    );
    const response = yield api.postMethod(
      "video_call_payment_by_wallet",
      inputData
    );
    if (response.data.success) {
      yield put(videoCallPayByWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/video-calls-history");
    } else {
      yield put(videoCallPayByWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallPayByWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* audioCallPayByWalletApi() {
  try {
    const inputData = yield select(
      (state) => state.privateCall.audioCallPayByWallet.inputData
    );
    const response = yield api.postMethod(
      "audio_call_payment_by_wallet",
      inputData
    );
    if (response.data.success) {
      yield put(audioCallPayByWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/audio-calls-history");
    } else {
      yield put(audioCallPayByWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(audioCallPayByWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchAudioCallChatApi(action) {
  try {
    const response = yield api.postMethod(
      "audio_call_chat",
      action.data
    );
    if (response.data.success) {
      yield put(fetchAudioCallChatMessageSuccess(response.data.data));
    } else {
      yield put(fetchAudioCallChatMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchAudioCallChatMessageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* startAudioCallApi(action) {
  try {
    const response = yield api.postMethod("audio_call_requests_start", action.data);
    if (response.data.success) {
      yield put(startAudioCallRequestSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(`/audio-call/${action.data.audio_call_request_unique_id}`);
    } else {
      yield put(startAudioCallRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(startAudioCallRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}
function* startVideoCallApi(action) {
  try {
    const response = yield api.postMethod("video_call_requests_start", action.data);
    if (response.data.success) {
      yield put(startVideoCallRequestSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(`/video-call/${action.data.video_call_request_unique_id}`);
    } else {
      yield put(startVideoCallRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(startVideoCallRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(REQUEST_CALL_START, saveRequestCallApi)]);
  yield all([yield takeLatest(ACCEPT_CALL_START, acceptCallApi)]);
  yield all([yield takeLatest(REJECT_CALL_START, rejectCallApi)]);
  yield all([yield takeLatest(PAY_BY_STRIPE_START, payByStripeApi)]);
  yield all([yield takeLatest(PAY_BY_PAYPAL_START, payByPayPalApi)]);
  yield all([yield takeLatest(JOIN_VIDEO_CALL_START, joinCallApi)]);
  yield all([yield takeLatest(END_VIDEO_CALL_START, endVideoCallApi)]);
  yield all([
    yield takeLatest(CALL_REQUEST_SENT_USER_START, callRequestSentUserApi),
  ]);

  yield all([
    yield takeLatest(
      FETCH_AUDIO_CALL_REQUESTS_START,
      fetchAudioCallRequestsAPI
    ),
  ]);

  yield all([
    yield takeLatest(
      FETCH_MORE_AUDIO_CALL_REQUESTS_START,
      fetchAudioCallRequestsAPI
    ),
  ]);


  yield all([yield takeLatest(CALL_HISTORY_USER_START, callHistoryUserApi)]);
  yield all([yield takeLatest(CALL_HISTORY_MODEL_START, callHistoryModelApi)]);
  yield all([
    yield takeLatest(FETCH_SINGLE_VIDEO_CALL_START, fetchSingleVideoCallAPI),
  ]);
  yield all([
    yield takeLatest(
      CALL_REQUEST_RECEIVED_MODEL_START,
      callRequestReceivedModelApi
    ),
  ]);
  yield all([
    yield takeLatest(
      CALL_AUDIO_REQUEST_RECEIVED_MODEL_START,
      audiocallRequestReceivedModelApi
    ),
  ]);
  yield all([
    yield takeLatest(
      CALL_MORE_AUDIO_REQUEST_RECEIVED_MODEL_START,
      audiocallRequestReceivedModelApi
    ),
  ]);
  yield all([yield takeLatest(ACCEPT_AUDIO_CALL_START, acceptAudioCallApi)]);
  yield all([yield takeLatest(AUDIO_CALL_HISTORY_USER_START, audioCallHistoryUserApi)]);
  yield all([yield takeLatest(REJECT_AUDIO_CALL_START, rejectAudioCallApi)]);
  yield all([yield takeLatest(REQUEST_AUDIO_CALL_START, saveRequestAudioCallApi)]);
  yield all([yield takeLatest(PAY_AUDIO_CALL_BY_STRIPE_START, payAudioCallByStripeApi)]);
  yield all([yield takeLatest(PAY_AUDIO_CALL_BY_PAYPAL_START, payAudioCallByPayPalApi)]);
  yield all([yield takeLatest(FETCH_SINGLE_AUDIO_CALL_START, fetchSingleAudioCallAPI),]);
  yield all([yield takeLatest(END_AUDIO_CALL_START, endAudioCallApi)]);
  yield all([yield takeLatest(JOIN_AUDIO_CALL_START, joinAudioCallApi)]);
  yield all([yield takeLatest(VIDEO_CALL_PAY_BY_WALLET_START, videoCallPayByWalletApi)]);
  yield all([yield takeLatest(AUDIO_CALL_PAY_BY_WALLET_START, audioCallPayByWalletApi)]);
  yield all([yield takeLatest(FETCH_AUDIO_CALL_CHAT_MESSAGE_START, fetchAudioCallChatApi)]);
  yield all([yield takeLatest(START_AUDIO_CALL_REQUEST_START, startAudioCallApi)]);
  yield all([yield takeLatest(START_VIDEO_CALL_REQUEST_START, startVideoCallApi)]);
}
