
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_USER_STORIES_START,
  STORY_FILE_UPLOAD_START,
  FETCH_STORIES_START,
  STORY_FILE_DELETE_START
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  fetchStoriesSucess,
  fetchStoriesFailure,
  fetchuserStoriesSuccess,
  fetchUserStoriesFailure,
  storyFileUploadSuccess,
  storyFileUploadFailure,
  fetchStoriesStart,
  storyFileDeleteSuccess,
  storyFileDeleteFailure,
  fetchUserStoriesStart,
} from "../actions/StoriesAction";

function* fetchUserStoriesAPI() {
  try {
    const skipCount = yield select((state) => state.userStories.userStories.skip);
    const response = yield api.postMethod("stories_list", { skip: skipCount });

    if (response.data.success) {
      yield put(fetchuserStoriesSuccess(response.data.data));
    } else {
      yield put(fetchUserStoriesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserStoriesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchStoriesAPI() {
  try {
    const response = yield api.postMethod("stories_home");

    if (response.data.success) {
      yield put(fetchStoriesSucess(response.data.data));
    } else {
      yield put(fetchStoriesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchStoriesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* storyFileUploadAPI(action) {
  try {
    const response = yield api.postMethod("story_files_upload" , action.data);

    if (response.data.success) {
      yield put(storyFileUploadSuccess(response.data.data));
      yield put(fetchStoriesStart());
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(storyFileUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(storyFileUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* storyFileDeleteAPI(action) {
  try {
    const response = yield api.postMethod("stories_delete" , action.data);

    if (response.data.success) {
      yield put(storyFileDeleteSuccess(response.data.data));
      yield put(fetchUserStoriesStart())
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(storyFileDeleteFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(storyFileDeleteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_STORIES_START, fetchStoriesAPI)]);
  yield all([yield takeLatest(STORY_FILE_UPLOAD_START, storyFileUploadAPI)]);
  yield all([yield takeLatest(FETCH_USER_STORIES_START, fetchUserStoriesAPI)]);
  yield all([yield takeLatest(STORY_FILE_DELETE_START, storyFileDeleteAPI)]);
}
