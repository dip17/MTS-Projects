import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  CHAT_ASSET_FILES_UPLOAD_START,
  FETCH_CHAT_ASSETS_START,
  FETCH_CHAT_MESSAGES_START,
  FETCH_CHAT_USERS_START,
  FETCH_MORE_CHAT_MESSAGES_START,
  FETCH_MORE_CHAT_USERS_START,
  FETCH_MORE_USER_CHAT_ASSETS_START,
  FETCH_USER_CHAT_ASSETS_START,
  SAVE_CHAT_USERS_START
} from "../actions/ActionConstant";
import {
  chatAssetFilesUploadFailure,
  chatAssetFilesUploadSuccess,
  chatUser,
  fetchChatMessagesFailure,
  fetchCHatMessagesSuccess,
  fetchChatUsersFailure,
  fetchChatUsersSuccess,
  fetchUserChatAssetsFailure,
  fetchUserChatAssetsSuccess,
  saveChatUserFailure,
  saveChatUserSuccess
} from "../actions/ChatAction";
import { createNotification } from "react-redux-notify";

function* fetchChatUserAPI(action) {
  try {
    const response = yield api.postMethod("chat_users", action.data);
    if (response.data.success) {
      yield put(fetchChatUsersSuccess(response.data.data));
      // if (response.data.data.users.length > 0 && inputData.search_key == '')
      //   yield put(
      //     fetchChatMessageStart({
      //       to_user_id: response.data.data.users[0].to_user_id,
      //       from_user_id: response.data.data.users[0].from_user_id,
      //     })
      //   );
    } else {
      yield put(fetchChatUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchChatUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchChatAssetsAPI(action) {
  try {
    const response = yield api.postMethod("user_chat_assets", action.data);
    if (response.data.success) {
      yield put(fetchUserChatAssetsSuccess(response.data.data));
    } else {
      yield put(fetchUserChatAssetsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserChatAssetsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchChatMessagesAPI(action) {
  try {
    const response = yield api.postMethod("chat_messages_index", {
      ...action.data,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (response.data.success) {
      yield put(fetchCHatMessagesSuccess(response.data.data));
    } else {
      yield put(fetchChatMessagesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchChatMessagesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveChatUserAPI(action) {
  try {
    const response = yield api.postMethod("chat_users_save", action.data);
    if (response.data.success) {
      yield put(saveChatUserSuccess(response.data.data));
      yield put(chatUser(response.data.data.to_user));
    } else {
      yield put(saveChatUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveChatUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatAssetFilesUploadAPI(action) {
  try {
    const response = yield api.postMethod("chat_asset_files_upload", action.data);
    if (response.data.success) {
      yield put(chatAssetFilesUploadSuccess(response.data.data));
    } else {
      yield put(chatAssetFilesUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatAssetFilesUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* ChatSaga() {
  yield all([
    yield takeLatest(FETCH_CHAT_USERS_START, fetchChatUserAPI),
    yield takeLatest(FETCH_MORE_CHAT_USERS_START, fetchChatUserAPI),
    yield takeLatest(FETCH_USER_CHAT_ASSETS_START, fetchChatAssetsAPI),
    yield takeLatest(FETCH_MORE_USER_CHAT_ASSETS_START, fetchChatAssetsAPI),
    yield takeLatest(FETCH_CHAT_MESSAGES_START, fetchChatMessagesAPI),
    yield takeLatest(FETCH_MORE_CHAT_MESSAGES_START, fetchChatMessagesAPI),
    yield takeLatest(SAVE_CHAT_USERS_START, saveChatUserAPI),
    yield takeLatest(CHAT_ASSET_FILES_UPLOAD_START, chatAssetFilesUploadAPI),
  ]);
}