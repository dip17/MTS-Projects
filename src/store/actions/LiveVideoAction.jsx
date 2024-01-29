import {
  VIDEO_CALL_BROADCAST_START,
  VIDEO_CALL_BROADCAST_SUCCESS,
  VIDEO_CALL_BROADCAST_FAILURE,
  FETCH_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_SUCCESS,
  FETCH_LIVE_VIDEOS_FAILURE,
  FETCH_LIVE_VIDEOS_HISTORY_START,
  FETCH_LIVE_VIDEOS_HISTORY_SUCCESS,
  FETCH_LIVE_VIDEOS_HISTORY_FAILURE,
  JOIN_LIVE_VIDEOS_START,
  JOIN_LIVE_VIDEOS_SUCCESS,
  JOIN_LIVE_VIDEOS_FAILURE,
  FETCH_SINGLE_LIVE_VIDEOS_START,
  FETCH_SINGLE_LIVE_VIDEOS_SUCCESS,
  FETCH_SINGLE_LIVE_VIDEOS_FAILURE,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE,
  LIVE_VIDEOS_VIEWER_UPDATE_START,
  LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS,
  LIVE_VIDEOS_VIEWER_UPDATE_FAILURE,
  LIVE_VIDEOS_END_START,
  LIVE_VIDEOS_END_SUCCESS,
  LIVE_VIDEOS_END_FAILURE,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE,
  FETCH_POPULAR_LIVE_VIDEOS_START,
  FETCH_POPULAR_LIVE_VIDEOS_SUCCESS,
  FETCH_POPULAR_LIVE_VIDEOS_FAILURE,
  FETCH_MORE_POPULAR_LIVE_VIDEOS_START,
  FETCH_RECOMMENDED_LIVE_VIDEOS_START,
  FETCH_RECOMMENDED_LIVE_VIDEOS_SUCCESS,
  FETCH_RECOMMENDED_LIVE_VIDEOS_FAILURE,
  FETCH_MORE_RECOMMENDED_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_START,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_SUCCESS,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_FAILURE,
  FETCH_MORE_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_LIST_START,
  FETCH_LIVE_VIDEOS_LIST_SUCCESS,
  FETCH_LIVE_VIDEOS_LIST_FAILUER,
  SINGLE_LIVE_VIDEO_VIEW_START,
  SINGLE_LIVE_VIDEO_VIEW_SUCCESS,
  SINGLE_LIVE_VIDEO_VIEW_FAILURE,
  FETCH_MORE_LIVE_VIDEOS_LIST_START,
  FETCH_LIVE_AUDIENCE_LIST_START,
  FETCH_LIVE_AUDIENCE_LIST_SUCCESS,
  FETCH_LIVE_AUDIENCE_LIST_FAILURE,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_START,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_SUCCESS,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_FAILURE,
  SAVE_LIVE_CHAT_MESSAGE_START,
  SAVE_LIVE_CHAT_MESSAGE_FAILURE,
  SAVE_LIVE_CHAT_MESSAGE_SUCCESS,
  ADD_LIVE_VIDEO_MESSAGE_CONTENT,
  FETCH_MORE_LIVE_VIDEOS_HISTORY_START,
  UPDATE_LIVE_AUDIENCE_LIST,
  UPDATE_LIVE_AUDIENCE_COUNT,
  UPDATE_LIVE_AUDIENCE_EARNING
} from "./ActionConstant";

export function videoCallBroadcastStart(data) {
  return {
    type: VIDEO_CALL_BROADCAST_START,
    data,
  };
}

export function videoCallBroadcastSuccess(data) {
  return {
    type: VIDEO_CALL_BROADCAST_SUCCESS,
    data,
  };
}

export function videoCallBroadcastFailure(error) {
  return {
    type: VIDEO_CALL_BROADCAST_FAILURE,
    error,
  };
}

export function fetchLiveVideosStart(data) {
  return {
    type: FETCH_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchLiveVideosSuccess(data) {
  return {
    type: FETCH_LIVE_VIDEOS_SUCCESS,
    data,
  };
}

export function fetchLiveVideosFailure(error) {
  return {
    type: FETCH_LIVE_VIDEOS_FAILURE,
    error,
  };
}

export function fetchMoreLiveVideosStart(data) {
  return {
    type: FETCH_MORE_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchLiveVideosHistoryStart(data) {
  return {
    type: FETCH_LIVE_VIDEOS_HISTORY_START,
    data,
  };
}

export function fetchLiveVideosHistorySuccess(data) {
  return {
    type: FETCH_LIVE_VIDEOS_HISTORY_SUCCESS,
    data,
  };
}

export function fetchLiveVideosHistoryFailure(error) {
  return {
    type: FETCH_LIVE_VIDEOS_HISTORY_FAILURE,
    error,
  };
}

export function joinLiveVideosStart(data) {
  return {
    type: JOIN_LIVE_VIDEOS_START,
    data,
  };
}

export function joinLiveVideosSuccess(data) {
  return {
    type: JOIN_LIVE_VIDEOS_SUCCESS,
    data,
  };
}

export function joinLiveVideosFailure(error) {
  return {
    type: JOIN_LIVE_VIDEOS_FAILURE,
    error,
  };
}

export function fetchSingleLiveVideoStart(data) {
  return {
    type: FETCH_SINGLE_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchSingleLiveVideoSuccess(data) {
  return {
    type: FETCH_SINGLE_LIVE_VIDEOS_SUCCESS,
    data,
  };
}

export function fetchSingleLiveVideoFailure(error) {
  return {
    type: FETCH_SINGLE_LIVE_VIDEOS_FAILURE,
    error,
  };
}

export function livePaymentPaypalStart(data) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
    data,
  };
}

export function livePaymentPaypalSuccess(data) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS,
    data,
  };
}

export function livePaymentPaypalFailure(error) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE,
    error,
  };
}

export function livePaymentStripeStart(data) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
    data,
  };
}

export function livePaymentStripeSuccess(data) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS,
    data,
  };
}

export function livePaymentStripeFailure(error) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE,
    error,
  };
}

export function liveViewerUpdateStart(data) {
  return {
    type: LIVE_VIDEOS_VIEWER_UPDATE_START,
    data,
  };
}

export function liveViewerUpdateSuccess(data) {
  return {
    type: LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS,
    data,
  };
}

export function liveViewerUpdateFailure(error) {
  return {
    type: LIVE_VIDEOS_VIEWER_UPDATE_FAILURE,
    error,
  };
}

export function liveVideoEndStart(data) {
  return {
    type: LIVE_VIDEOS_END_START,
    data,
  };
}

export function liveVideoEndSuccess(data) {
  return {
    type: LIVE_VIDEOS_END_SUCCESS,
    data,
  };
}

export function liveVideoEndFailure(error) {
  return {
    type: LIVE_VIDEOS_END_FAILURE,
    error,
  };
}
export function livePaymentWalletStart(data) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
    data,
  };
}

export function livePaymentWalletSuccess(data) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS,
    data,
  };
}

export function livePaymentWalletFailure(error) {
  return {
    type: LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE,
    error,
  };
}

export function fetchPopularLiveVideosStart(data) {
  return {
    type: FETCH_POPULAR_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchPopularLiveVideosSuccess(data) {
  return {
    type: FETCH_POPULAR_LIVE_VIDEOS_SUCCESS,
    data,
  };
}

export function fetchPopularLiveVideosFailure(error) {
  return {
    type: FETCH_POPULAR_LIVE_VIDEOS_FAILURE,
    error,
  };
}

export function fetchMorePopularLiveVideosStart(data) {
  return {
    type: FETCH_MORE_POPULAR_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchRecommendedLiveVideosStart(data) {
  return {
    type: FETCH_RECOMMENDED_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchRecommendedLiveVideosSuccess(data) {
  return {
    type: FETCH_RECOMMENDED_LIVE_VIDEOS_SUCCESS,
    data,
  };
}

export function fetchRecommendedLiveVideosFailure(error) {
  return {
    type: FETCH_RECOMMENDED_LIVE_VIDEOS_FAILURE,
    error,
  };
}

export function fetchMoreRecommendedLiveVideosStart(data) {
  return {
    type: FETCH_MORE_RECOMMENDED_LIVE_VIDEOS_START,
    data,
  };
}

export function fetchLiveVideoChatMessagesStart(data) {
  return {
    type: FETCH_LIVE_VIDEOS_CHAT_MESSAGES_START,
    data,
  };
}

export function fetchLiveVideoChatMessagesSuccess(data) {
  return {
    type: FETCH_LIVE_VIDEOS_CHAT_MESSAGES_SUCCESS,
    data,
  };
}

export function fetchLiveVideoChatMessagesFailure(error) {
  return {
    type: FETCH_LIVE_VIDEOS_CHAT_MESSAGES_FAILURE,
    error,
  };
}

export function fetchLiveVideosListStart(data) {
  return {
    type: FETCH_LIVE_VIDEOS_LIST_START,
    data,
  };
}

export function fetchLiveVideosListSuccess(data) {
  return {
    type: FETCH_LIVE_VIDEOS_LIST_SUCCESS,
    data,
  };
}

export function fetchLiveVideosListFailure(error) {
  return {
    type: FETCH_LIVE_VIDEOS_LIST_FAILUER,
    error,
  };
}

export function fetchMoreLiveVideosListStart(data) {
  return {
    type: FETCH_MORE_LIVE_VIDEOS_LIST_START,
    data,
  };
}

export function singleLiveVideoViewStart(data) {
  return {
    type: SINGLE_LIVE_VIDEO_VIEW_START,
    data,
  };
}

export function singleLiveVideoViewSuccess(data) {
  return {
    type: SINGLE_LIVE_VIDEO_VIEW_SUCCESS,
    data,
  };
}

export function singleLiveVideoViewFailure(error) {
  return {
    type: SINGLE_LIVE_VIDEO_VIEW_FAILURE,
    error,
  };
}

export function fetchLiveAudienceListStart(data) {
  return {
    type: FETCH_LIVE_AUDIENCE_LIST_START,
    data,
  };
}

export function fetchLiveAudienceListSuccess(data) {
  return {
    type: FETCH_LIVE_AUDIENCE_LIST_SUCCESS,
    data,
  };
}

export function fetchLiveAudienceListFailure(error) {
  return {
    type: FETCH_LIVE_AUDIENCE_LIST_FAILURE,
    error,
  };
}

export function fetchLiveVideoChatMessageListStart(data) {
  return {
    type: FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_START,
    data,
  };
}

export function fetchLiveVideoChatMessageListSuccess(data) {
  return {
    type: FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_SUCCESS,
    data,
  };
}

export function fetchLiveVideoChatMessageListFailure(error) {
  return {
    type: FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_FAILURE,
    error,
  };
}

export function saveLiveChatMessageStart(data) {
  return {
    type: SAVE_LIVE_CHAT_MESSAGE_START,
    data,
  };
}

export function saveLiveChatMessageSuccess(data) {
  return {
    type: SAVE_LIVE_CHAT_MESSAGE_SUCCESS,
    data,
  };
}

export function saveLiveChatMessageFailure(error) {
  return {
    type: SAVE_LIVE_CHAT_MESSAGE_FAILURE,
    error,
  };
}

export function addLiveVideoMessageContent(data) {
  return {
    type: ADD_LIVE_VIDEO_MESSAGE_CONTENT,
    data,
  };
}

export function fetchMoreLiveVideoHistoryStart(data) {
  return {
    type: FETCH_MORE_LIVE_VIDEOS_HISTORY_START,
    data,
  };
}

export function updateLiveAudianceList(data) {
  return {
    type: UPDATE_LIVE_AUDIENCE_LIST,
    data,
  };
}

export function updateLiveAudianceCount(data) {
  return {
    type: UPDATE_LIVE_AUDIENCE_COUNT,
    data,
  };
}


export function updateLiveAudianceEarnings(data) {
  return {
    type: UPDATE_LIVE_AUDIENCE_EARNING,
    data,
  };
}
