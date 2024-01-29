import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORY_USERS_START,
  FOLLOW_CATEGORY_START,
  UPDATE_CATEGORY_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  fetchCategoryUsersFailure,
  fetchCategoryUsersSuccess,
  followCategoryFailure,
  followCategorySuccess,
  updateCategoryFailure,
  updateCategorySuccess,
} from "../actions/CategoryAction";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* fetchCategoriesAPI() {
  try {
    const response = yield api.postMethod("categories_list");
    if (response.data.success) {
      yield put(fetchCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchCategoriesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}
function* updateCategoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.updateCategory.inputData
    );

    const response = yield api.postMethod("posts_save_for_owner", inputData);
    if (response.data.success) {
      yield put(updateCategorySuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(updateCategoryFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(updateCategoryFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchCategoryUsersAPI() {
  try {
    const inputData = yield select(
      (state) => state.category.categoryUsers.inputData
    );
    const response = yield api.postMethod("categories_view", inputData);
    if (response.data.success) {
      yield put(fetchCategoryUsersSuccess(response.data.data));
    } else {
      yield put(fetchCategoryUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCategoryUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* followCategoryAPI() {
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod("posts_delete_for_owner", inputData);
    if (response.data.success) {
      yield put(followCategorySuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/profile");
    } else {
      yield put(followCategoryFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(followCategoryFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_CATEGORIES_START, fetchCategoriesAPI)]);
  yield all([yield takeLatest(UPDATE_CATEGORY_START, updateCategoryAPI)]);
  yield all([
    yield takeLatest(FETCH_CATEGORY_USERS_START, fetchCategoryUsersAPI),
  ]);
  yield all([yield takeLatest(FOLLOW_CATEGORY_START, followCategoryAPI)]);
}
