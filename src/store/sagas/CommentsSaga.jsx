import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  DELETE_COMMENT_START,
  FETCH_COMMENTS_START,
  FETCH_COMMENT_REPLIES_START,
  SAVE_COMMENT_START,
  SAVE_COMMENT_REPLY_START,
  FETCH_MORE_COMMENTS_START,
  FETCH_MORE_COMMENT_REPLIES_START,
} from "../actions/ActionConstant";
import {
  deleteCommentFailure,
  deleteCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsSuccess,
  saveCommentFailure,
  saveCommentSuccess,
  fetchCommentRepliesFailure,
  fetchCommentRepliesSuccess,
  saveCommentReplyFailure,
  saveCommentReplySuccess,
  fetchCommentsStart
} from "../actions/CommentsAction";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* fetchCommentsAPI(action) {
  try {
    // const inputData = yield select((state) => state.comment.comments.inputData);
    const response = yield api.postMethod("post_comments", action.data);
    if (response.data.success) {
      yield put(fetchCommentsSuccess(response.data.data));
    } else {
      yield put(fetchCommentsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCommentsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveCommentAPI() {
  try {
    const inputData = yield select(
      (state) => state.comment.saveComment.inputData
    );
    const response = yield api.postMethod("post_comments_save", inputData);
    if (response.data.success) {
      yield put(saveCommentSuccess(response.data.data));
      yield put(fetchCommentsStart(inputData))
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveCommentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveCommentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteCommentAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod("documents_delete", inputData);
    if (response.data.success) {
      yield put(deleteCommentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteCommentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteCommentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchCommentRepliesAPI(action) {
  try {
    // const inputData = yield select((state) => state.comment.commentReplies.inputData);
    const response = yield api.postMethod("post_comment_replies", action.data);
    if (response.data.success) {
      yield put(fetchCommentRepliesSuccess(response.data.data));
    } else {
      yield put(fetchCommentRepliesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCommentRepliesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveCommentReplyAPI() {
  try {
    const inputData = yield select(
      (state) => state.comment.saveCommentReply.inputData
    );
    const response = yield api.postMethod("post_comments_replies_save", inputData);
    if (response.data.success) {
      yield put(saveCommentReplySuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveCommentReplyFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveCommentReplyFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_COMMENTS_START, fetchCommentsAPI)]);
  yield all([yield takeLatest(FETCH_MORE_COMMENTS_START, fetchCommentsAPI)]);
  yield all([yield takeLatest(FETCH_COMMENT_REPLIES_START, fetchCommentRepliesAPI)]);
  yield all([yield takeLatest(FETCH_MORE_COMMENT_REPLIES_START, fetchCommentRepliesAPI)]);
  yield all([yield takeLatest(SAVE_COMMENT_START, saveCommentAPI)]);
  yield all([yield takeLatest(SAVE_COMMENT_REPLY_START, saveCommentReplyAPI)]);
  yield all([yield takeLatest(DELETE_COMMENT_START, deleteCommentAPI)]);
}
