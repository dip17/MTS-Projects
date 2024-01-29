import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  videoCallBroadcastFailure,
  videoCallBroadcastSuccess,
  fetchLiveVideosSuccess,
  fetchLiveVideosFailure,
  fetchLiveVideosHistorySuccess,
  fetchLiveVideosHistoryFailure,
  fetchSingleLiveVideoSuccess,
  fetchSingleLiveVideoFailure,
  joinLiveVideosSuccess,
  joinLiveVideosFailure,
  livePaymentPaypalSuccess,
  livePaymentPaypalFailure,
  livePaymentStripeSuccess,
  livePaymentStripeFailure,
  liveViewerUpdateSuccess,
  liveViewerUpdateFailure,
  liveVideoEndSuccess,
  liveVideoEndFailure,
  livePaymentWalletSuccess,
  livePaymentWalletFailure,
  fetchPopularLiveVideosSuccess,
  fetchPopularLiveVideosFailure,
  fetchRecommendedLiveVideosSuccess,
  fetchRecommendedLiveVideosFailure,
  fetchLiveVideoChatMessagesSuccess,
  fetchLiveVideoChatMessagesFailure,
  fetchLiveVideosListSuccess,
  fetchLiveVideosListFailure,
  fetchLiveAudienceListStart,
  fetchLiveAudienceListSuccess,
  fetchLiveAudienceListFailure,
  saveLiveChatMessageSuccess,
  saveLiveChatMessageFailure,
  singleLiveVideoViewSuccess,
  singleLiveVideoViewFailure,
  updateLiveAudianceCount,
  updateLiveAudianceEarnings,
  updateLiveAudianceList,
} from "../actions/LiveVideoAction";
import {
  VIDEO_CALL_BROADCAST_START,
  FETCH_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_HISTORY_START,
  JOIN_LIVE_VIDEOS_START,
  FETCH_SINGLE_LIVE_VIDEOS_START,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
  LIVE_VIDEOS_VIEWER_UPDATE_START,
  LIVE_VIDEOS_END_START,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
  FETCH_POPULAR_LIVE_VIDEOS_START,
  FETCH_MORE_POPULAR_LIVE_VIDEOS_START,
  FETCH_RECOMMENDED_LIVE_VIDEOS_START,
  FETCH_MORE_RECOMMENDED_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_START,
  FETCH_MORE_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_LIST_START,
  FETCH_MORE_LIVE_VIDEOS_LIST_START,
  FETCH_LIVE_AUDIENCE_LIST_START,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_START,
  SAVE_LIVE_CHAT_MESSAGE_START,
  SINGLE_LIVE_VIDEO_VIEW_START,
  FETCH_MORE_LIVE_VIDEOS_HISTORY_START,
} from "../actions/ActionConstant";

import { checkLogoutStatus } from "../actions/ErrorAction";
import configuration from "react-global-configuration";

function* liveVideoSaveAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.saveLiveVideo.inputData
    );
    const response = yield api.postMethod(
      "live_videos_broadcast_start",
      inputData
    );
    if (response.data.success) {
      yield put(videoCallBroadcastSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(
        window.location.origin +
          "/join-live/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(videoCallBroadcastFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallBroadcastFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveVideosAPI(action) {
  try {
    const response = yield api.postMethod("live_videos", action.data);
    if (response.data.success) {
      yield put(fetchLiveVideosSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideosFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveVideosHistoryAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_videos_owner_list",
      action.data
    );
    if (response.data.success) {
      yield put(fetchLiveVideosHistorySuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosHistoryFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideosHistoryFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleLiveVideoAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.singleLiveVideo.inputData
    );
    const response = yield api.postMethod("live_videos_view", inputData);
    if (response.data.success) {
      yield put(fetchSingleLiveVideoSuccess(response.data.data));
    } else {
      yield put(fetchSingleLiveVideoFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleLiveVideoFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveStripeAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveStripe.inputData
    );
    const response = yield api.postMethod(
      "live_videos_payment_by_card",
      inputData
    );
    if (response.data.success) {
      yield put(livePaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(
        window.location.origin +
          "/live-video/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(livePaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(livePaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* livePaypalAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.livePaypal.inputData
    );
    const response = yield api.postMethod(
      "live_videos_payment_by_paypal",
      inputData
    );
    if (response.data.success) {
      yield put(livePaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

      window.location.assign(
        window.location.origin +
          "/live-video/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(livePaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(livePaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveViewerUpdateAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveViewerUpdate.inputData
    );
    const response = yield api.postMethod(
      "live_videos_viewer_update",
      inputData
    );
    if (response.data.success) {
      yield put(liveViewerUpdateSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
    } else {
      yield put(liveViewerUpdateFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(liveViewerUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveEndAPI(action) {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveEnd.inputData
    );
    const response = yield api.postMethod(
      "live_videos_broadcast_stop",
      inputData
    );
    if (response.data.success) {
      yield put(liveVideoEndSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      setTimeout(() => {
        if (action.data.isOwner) {
          window.location.assign(
            window.location.origin + "/live-videos-history"
          );
        } else {
          window.location.assign(window.location.origin + "/live-videos");
        }
      }, 1000);
    } else {
      yield put(liveVideoEndFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(liveVideoEndFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveWalletAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveWallet.inputData
    );
    const response = yield api.postMethod(
      "live_videos_payment_by_wallet",
      inputData
    );
    if (response.data.success) {
      yield put(livePaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(
        window.location.origin +
          "/live-video/" +
          response.data.data.live_video_unique_id
      );
    } else {
      yield put(livePaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(livePaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchPopularLiveVideosAPI(action) {
  try {
    const response = yield api.postMethod("popular_live_videos", action.data);
    if (response.data.success) {
      yield put(fetchPopularLiveVideosSuccess(response.data.data));
    } else {
      yield put(fetchPopularLiveVideosFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPopularLiveVideosFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchRecommendedLiveVideosAPI(action) {
  try {
    const response = yield api.postMethod(
      "recommended_live_videos",
      action.data
    );
    if (response.data.success) {
      yield put(fetchRecommendedLiveVideosSuccess(response.data.data));
    } else {
      yield put(fetchRecommendedLiveVideosFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchRecommendedLiveVideosFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchLiveVideoChatMessagesAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_video_chat_messages",
      action.data
    );
    if (response.data.success) {
      yield put(fetchLiveVideoChatMessagesSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideoChatMessagesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideoChatMessagesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchLiveVideosListAPI(action) {
  try {
    const response = yield api.postMethod("live_videos_list", action.data);
    if (response.data.success) {
      yield put(fetchLiveVideosListSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideosListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchLiveAudienceListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_videos_viewers_list",
      action.data
    );

    if (response.data.success) {
      console.log(...response.data.data.viewers, "res");
      yield put(fetchLiveAudienceListSuccess(response.data.data));
      yield put(updateLiveAudianceCount(response.data.data.total_viewers));
      yield put(
        updateLiveAudianceEarnings({
          total_earnings: response.data.data.total_revenue
            .replace(configuration.get("configData.token_symbol"), "")
            .trim(),
          total_earnings_formatted: response.data.data.total_revenue,
        })
      );
    } else {
      yield put(fetchLiveAudienceListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveAudienceListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchLiveVideoChatMessageListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_video_chat_messages",
      action.data
    );
    if (response.data.success) {
      yield put(fetchLiveVideoChatMessagesSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideoChatMessagesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideoChatMessagesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveLivechatMessageAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_chat_messages_save",
      action.data
    );
    if (response.data.success) {
      yield put(saveLiveChatMessageSuccess(response.data.data));
    } else {
      yield put(saveLiveChatMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveLiveChatMessageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* singleLiveVideoViewAPI(action) {
  try {
    const response = yield api.postMethod(
      "single_live_video_view",
      action.data
    );
    if (response.data.success) {
      yield put(singleLiveVideoViewSuccess(response.data.data));
    } else {
      yield put(singleLiveVideoViewFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(singleLiveVideoViewFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(VIDEO_CALL_BROADCAST_START, liveVideoSaveAPI)]);
  yield all([yield takeLatest(FETCH_LIVE_VIDEOS_START, liveVideosAPI)]);
  yield all([yield takeLatest(FETCH_MORE_LIVE_VIDEOS_START, liveVideosAPI)]);
  yield all([
    yield takeLatest(FETCH_LIVE_VIDEOS_HISTORY_START, liveVideosHistoryAPI),
  ]);
  yield all([
    yield takeLatest(
      FETCH_MORE_LIVE_VIDEOS_HISTORY_START,
      liveVideosHistoryAPI
    ),
  ]);
  // yield all([yield takeLatest(JOIN_LIVE_VIDEOS_START, joinLiveVideosAPI)]);
  yield all([
    yield takeLatest(FETCH_SINGLE_LIVE_VIDEOS_START, fetchSingleLiveVideoAPI),
  ]);
  yield all([
    yield takeLatest(LIVE_VIDEOS_PAYMENT_BY_STRIPE_START, liveStripeAPI),
  ]);
  yield all([
    yield takeLatest(LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START, livePaypalAPI),
  ]);
  yield all([
    yield takeLatest(LIVE_VIDEOS_VIEWER_UPDATE_START, liveViewerUpdateAPI),
  ]);
  yield all([yield takeLatest(LIVE_VIDEOS_END_START, liveEndAPI)]);
  yield all([
    yield takeLatest(LIVE_VIDEOS_PAYMENT_BY_WALLET_START, liveWalletAPI),
  ]);
  yield all([
    yield takeLatest(
      FETCH_POPULAR_LIVE_VIDEOS_START,
      fetchPopularLiveVideosAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      FETCH_MORE_POPULAR_LIVE_VIDEOS_START,
      fetchPopularLiveVideosAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      FETCH_RECOMMENDED_LIVE_VIDEOS_START,
      fetchRecommendedLiveVideosAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      FETCH_MORE_RECOMMENDED_LIVE_VIDEOS_START,
      fetchRecommendedLiveVideosAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      FETCH_LIVE_VIDEOS_CHAT_MESSAGES_START,
      fetchLiveVideoChatMessagesAPI
    ),
  ]);
  yield all([
    yield takeLatest(FETCH_LIVE_VIDEOS_LIST_START, fetchLiveVideosListAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_MORE_LIVE_VIDEOS_LIST_START, fetchLiveVideosListAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_LIVE_AUDIENCE_LIST_START, fetchLiveAudienceListAPI),
  ]);
  yield all([
    yield takeLatest(
      FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_START,
      fetchLiveVideoChatMessageListAPI
    ),
  ]);
  yield all([
    yield takeLatest(SAVE_LIVE_CHAT_MESSAGE_START, saveLivechatMessageAPI),
  ]);
  yield all([
    yield takeLatest(SINGLE_LIVE_VIDEO_VIEW_START, singleLiveVideoViewAPI),
  ]);
}
