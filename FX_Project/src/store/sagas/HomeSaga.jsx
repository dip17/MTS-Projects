import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_HOME_POSTS_START,
  FETCH_LISTS_DETAILS_START,
  FETCH_OTHERS_SINGLE_POST_START,
  FETCH_POST_SUGGESTION_START,
  POST_PAYMENT_STRIPE_START,
  POST_PAYMENT_WALLET_START,
  SEARCH_USER_START,
  FETCH_TRENDING_USERS_START,
  FETCH_MORE_HOME_POSTS_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  fetchHomePostsFailure,
  fetchHomePostsSuccess,
  fetchOtherSinglePostFailure,
  fetchOtherSinglePostSuccess,
  fetchPostSuggesstionFailure,
  fetchPostSuggesstionSuccess,
  searchUserFailure,
  searchUserSuccess,
  postPaymentStripeSuccess,
  postPaymentWalletSuccess,
  postPaymentStripeFailure,
  postPaymentWalletFailure,
  fetchListsDetailsSuccess,
  fetchListsDetailsFailure,
  fetchTrendingUsersFailure,
  fetchTrendingUsersSuccess,
} from "../actions/HomeAction";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";


function* fetchHomePostAPI(action) {
  try {
    // const skipCount = yield select((state) => state.home.homePost.skip);
    const response = yield api.postMethod("home", action.data);

    if (response.data.success) {
      yield put(fetchHomePostsSuccess(response.data.data));
      if (response.data.data.user) {
        localStorage.setItem(
          "total_followers",
          response.data.data.user.total_followers
            ? response.data.data.user.total_followers
            : 0
        );
        localStorage.setItem(
          "total_followings",
          response.data.data.user.total_followings
            ? response.data.data.user.total_followings
            : 0
        );
        localStorage.setItem(
          "is_subscription_enabled",
          response.data.data.user.is_subscription_enabled
        );
        localStorage.setItem("user_picture", response.data.data.user.picture);
        localStorage.setItem("user_cover", response.data.data.user.cover);
        localStorage.setItem("name", response.data.data.user.name);
        localStorage.setItem("username", response.data.data.user.username);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.user.is_document_verified
        );
      }
    } else {
      yield put(fetchHomePostsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchHomePostsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* searchUserAPI() {
  try {
    const inputData = yield select((state) => state.home.searchUser.inputData);
    const response = yield api.postMethod("users_search", inputData);
    if (response.data.success) {
      yield put(searchUserSuccess(response.data.data));
    } else {
      yield put(searchUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(searchUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchOtherSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod("posts_view", inputData);
    if (response.data.success) {
      yield put(fetchOtherSinglePostSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchOtherSinglePostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchOtherSinglePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchPostSuggesstionAPI(action) {
  try {
    // const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod("user_suggestions", action.data);
    if (response.data.success) {
      yield put(fetchPostSuggesstionSuccess(response.data.data));
    } else {
      yield put(fetchPostSuggesstionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostSuggesstionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchTrendingUsersAPI() {
  try {
    const inputData = yield select((state) => state.home.trendingUsers.inputData);
    const response = yield api.postMethod("trending_users", inputData);
    if (response.data.success) {
      yield put(fetchTrendingUsersSuccess(response.data.data));
    } else {
      yield put(fetchTrendingUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchTrendingUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* postPaymentStripeAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(postPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(postPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(postPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* postPaymentWalletAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(postPaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(postPaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(postPaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchListsAPI() {
  try {
    const response = yield api.postMethod("lists_index");
    if (response.data.success) {
      yield put(fetchListsDetailsSuccess(response.data.data));
    } else {
      yield put(fetchListsDetailsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchListsDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_HOME_POSTS_START, fetchHomePostAPI)]);
  yield all([yield takeLatest(FETCH_MORE_HOME_POSTS_START, fetchHomePostAPI)]);
  yield all([yield takeLatest(SEARCH_USER_START, searchUserAPI)]);
  yield all([
    yield takeLatest(FETCH_OTHERS_SINGLE_POST_START, fetchOtherSinglePostAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_POST_SUGGESTION_START, fetchPostSuggesstionAPI),
  ]);
  yield all([
    yield takeLatest(POST_PAYMENT_STRIPE_START, postPaymentStripeAPI),
  ]);
  yield all([
    yield takeLatest(POST_PAYMENT_WALLET_START, postPaymentWalletAPI),
  ]);
  yield all([yield takeLatest(FETCH_LISTS_DETAILS_START, fetchListsAPI)]);
  yield all([
    yield takeLatest(FETCH_TRENDING_USERS_START, fetchTrendingUsersAPI),
  ]);
}
