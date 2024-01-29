import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  GET_REFERRAL_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  getReferralSuccess,
  getReferralFailure,
} from "../actions/ReferralAction";
import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* getReferralAPI() {
  try {
    const response = yield api.postMethod("referral_code");
    yield put(getReferralSuccess(response.data.data));
    if (response.data.success) {
    } else {
      yield put(getReferralFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(getReferralFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(GET_REFERRAL_START, getReferralAPI)]);
}
