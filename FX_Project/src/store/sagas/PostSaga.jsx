import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  CHANGE_POST_STATUS_START,
  DELETE_POST_START,
  FETCH_POSTS_START,
  FETCH_SINGLE_POST_START,
  POST_FILE_UPLOAD_START,
  POST_FILE_REMOVE_START,
  SAVE_POST_START,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_WALLET_START,
  SAVE_REPORT_POST_START,
  FETCH_REPORT_POSTS_START,
  PPV_PAYMENT_PAYPAL_START,
  PPV_PAYMENT_CCBILL_START,
  FETCH_EXPLORE_START,
  PPV_PAYMENT_COINPAYMENT_START,
  FETCH_POST_CATEGORIES_START,
  FETCH_REPORT_REASON_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  changePostStatusFailure,
  changePostStatusSuccess,
  deletePostFailure,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsSuccess,
  fetchSinglePostFailure,
  fetchSinglePostSuccess,
  postFileUploadFailure,
  postFileUploadSuccess,
  savePostFailure,
  savePostSuccess,
  PPVPaymentStripeFailure,
  PPVPaymentStripeSuccess,
  PPVPaymentWalletSuccess,
  PPVPaymentWalletFailure,
  saveReportPostSuccess,
  saveReportPostFailure,
  fetchReportPostsSuccess,
  fetchReportPostsFailure,
  PPVPaymentPaypalFailure,
  PPVPaymentPaypalSuccess,
  PPVPaymentCCBillSuccess,
  PPVPaymentCCBillFailure,
  PPVPaymentCoinPaymentSuccess,
  PPVPaymentCoinPaymentFailure,
  fetchExploreFailure,
  fetchExploreSuccess,
  postFileRemoveFailure,
  postFileRemoveSuccess,
  fetchPostCategoriesFailure,
  fetchPostCategoriesSuccess,
  fetchReportReasonFailure,
  fetchReportReasonSuccess,
} from "../actions/PostAction";
import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* savePostAPI() {
  try {
    const inputData = yield select((state) => state.post.savePost.inputData);

    if (!inputData.content && !inputData.post_files) {
      // !!!!! Dont change this condition. If changing get confirmation vidhya
      yield put(savePostFailure("Please fill the content"));
      const notificationMessage = getErrorNotificationMessage(
        "Please fill the content"
      );
      yield put(createNotification(notificationMessage));
    } else {
      const response = yield api.postMethod("posts_save_for_owner", inputData);
      if (response.data.success) {
        yield put(savePostSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/post/" + response.data.data.post_unique_id);
      } else {
        yield put(savePostFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(savePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchPostsAPI() {
  try {
    const inputData = yield select((state) => state.post.posts.inputData);
    const response = yield api.postMethod("posts_for_owner", inputData);
    if (response.data.success) {
      yield put(fetchPostsSuccess(response.data.data));
    } else {
      yield put(fetchPostsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod("posts_view_for_others", inputData);
    if (response.data.success) {
      yield put(fetchSinglePostSuccess(response.data.data));
    } else {
      yield put(fetchSinglePostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      window.location.assign("/home");
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSinglePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deletePostAPI(action) {
  try {
    // const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod("posts_delete_for_owner", action.data);
    if (response.data.success) {
      yield put(deletePostSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      // window.location.assign("/profile");
    } else {
      yield put(deletePostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deletePostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* changePostStatusAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(changePostStatusSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(changePostStatusFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(changePostStatusFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* postFileUploadAPI() {
  try {
    const inputData = yield select((state) => state.post.fileUpload.inputData);
    const response = yield api.postMethod("post_files_upload", inputData);
    if (response.data.success) {
      yield put(postFileUploadSuccess(response.data.data));
    } else {
      yield put(postFileUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(postFileUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentPaypalAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayPal.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_paypal",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentStripeAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayStripe.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_stripe",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentWalletAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayWallet.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_wallet",
      paymentInputData
    );

    if (response.data.success) {
      yield put(PPVPaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchReportPostsAPI() {
  try {
    const response = yield api.postMethod("report_posts");
    if (response.data.success) {
      yield put(fetchReportPostsSuccess(response.data.data));
    } else {
      yield put(fetchReportPostsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchReportPostsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveReportPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.saveReportPost.inputData
    );
    const response = yield api.postMethod("report_posts_save", inputData);
    if (response.data.success) {
      yield put(saveReportPostSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveReportPostFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveReportPostFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentCCBillAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayCCBill.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_ccbill",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentCCBillSuccess(response.data.data));
      window.location.assign(`${response.data.data.redirect_web_url}`);
    } else {
      yield put(PPVPaymentCCBillFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentCCBillFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* postFileRemoveAPI() {
  try {
    const inputData = yield select((state) => state.post.fileRemove.inputData);
    const response = yield api.postMethod("post_files_remove", inputData);
    if (response.data.success) {
      yield put(postFileRemoveSuccess(response.data.data));
    } else {
      yield put(postFileRemoveFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentCCBillFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchExploreAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.explorePosts.inputData
    );
    const response = yield api.postMethod("explore", inputData);
    if (response.data.success) {
      yield put(fetchExploreSuccess(response.data.data));
    } else {
      yield put(fetchExploreFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchExploreFailure(error));
    yield put(postFileRemoveFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* PPVPaymentCoinPaymentAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayCoinPayment.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_coinpayment",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentCoinPaymentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      setTimeout(() => {
        window.location.assign(`${response.data.data.redirect_web_url}`);
      }, 3000);
    } else {
      yield put(PPVPaymentCoinPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(PPVPaymentCoinPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}
function* fetchPostCategories() {
  try {
    const inputData = yield select(
      (state) => state.post.postCategories.inputData
    );
    const response = yield api.postMethod("post_categories_list", inputData);
    if (response.data.success) {
      yield put(fetchPostCategoriesSuccess(response.data.data));
    } else {
      yield put(fetchPostCategoriesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostCategoriesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchReportReason() {
  try {
    const response = yield api.postMethod("report_reasons_index");
    if (response.data.success) {
      yield put(fetchReportReasonSuccess(response.data.data));
    } else {
      yield put(fetchReportReasonFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchReportReasonFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_POST_START, savePostAPI)]);
  yield all([yield takeLatest(FETCH_POSTS_START, fetchPostsAPI)]);
  yield all([yield takeLatest(FETCH_EXPLORE_START, fetchExploreAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_POST_START, fetchSinglePostAPI)]);
  yield all([yield takeLatest(DELETE_POST_START, deletePostAPI)]);
  yield all([yield takeLatest(CHANGE_POST_STATUS_START, changePostStatusAPI)]);
  yield all([yield takeLatest(POST_FILE_UPLOAD_START, postFileUploadAPI)]);
  yield all([yield takeLatest(POST_FILE_REMOVE_START, postFileRemoveAPI)]);

  yield all([yield takeLatest(PPV_PAYMENT_STRIPE_START, PPVPaymentStripeAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_WALLET_START, PPVPaymentWalletAPI)]);
  yield all([yield takeLatest(SAVE_REPORT_POST_START, saveReportPostAPI)]);
  yield all([yield takeLatest(FETCH_REPORT_POSTS_START, fetchPostsAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_PAYPAL_START, PPVPaymentPaypalAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_CCBILL_START, PPVPaymentCCBillAPI)]);
  yield all([
    yield takeLatest(PPV_PAYMENT_COINPAYMENT_START, PPVPaymentCoinPaymentAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_POST_CATEGORIES_START, fetchPostCategories),
  ]);
  yield all([yield takeLatest(FETCH_REPORT_REASON_START, fetchReportReason)]);
}
