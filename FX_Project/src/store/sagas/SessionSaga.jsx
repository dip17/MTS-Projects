import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchSesssionManagementSuccess,
  fetchSesssionManagementFailure,
  deleteSingleLoginSessionSuccess,
  deleteSingleLoginSessionFailure,
  deleteAllLoginSessionSuccess,
  deleteAllLoginSessionFailure,
} from "../actions/SessionManagementAction";
import {
  FETCH_SESSION_MANAGEMENT_LIST_START,
  DELETE_SINGLE_LOGIN_SESSION_START,
  DELETE_ALL_LOGIN_SESSION_START,
} from "../actions/ActionConstant";
import { checkLogoutStatus } from "../actions/ErrorAction";

function* fetchSessionListAPI(action) {
  try {
    const response = yield api.postMethod("login_session_index", action.data);
    if (response.data.success) {
      yield put(fetchSesssionManagementSuccess(response.data.data));
    } else {
      yield put(fetchSesssionManagementFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSesssionManagementFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteSingleLoginSessionAPI(action) {
  try {
    const response = yield api.postMethod("login_session_delete", action.data);
    if (response.data.success) {
      yield put(deleteSingleLoginSessionSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteSingleLoginSessionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteSingleLoginSessionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteAllLoginSessionAPI(action) {
  try {
    const response = yield api.postMethod(
      "login_session_delete_all",
      action.data
    );
    if (response.data.success) {
      yield put(deleteAllLoginSessionSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/");
    } else {
      yield put(deleteAllLoginSessionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteAllLoginSessionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_SESSION_MANAGEMENT_LIST_START, fetchSessionListAPI),
  ]);
  yield all([
    yield takeLatest(
      DELETE_SINGLE_LOGIN_SESSION_START,
      deleteSingleLoginSessionAPI
    ),
  ]);
  yield all([
    yield takeLatest(DELETE_ALL_LOGIN_SESSION_START, deleteAllLoginSessionAPI),
  ]);
}
