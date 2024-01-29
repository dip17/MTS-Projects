
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_VOD_VIDEOES_FOR_OWNER_START,
  VOD_VIDEOES_SAVE_START,
  FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_START,
  DELETE_VOD_VIDEOES_START,
  VOD_VIDEOES_FILES_UPLOAD_START,
  VOD_VIDEOES_FILES_REMOVE_START,
  VOD_VIDEOES_PAYMENT_BY_WALLET_START,
  VOD_VIDEOES_PAYMENT_BY_STRIPE_START,
  VOD_VIDEOES_PAYMENT_BY_PAYPAL_START,
  VOD_VIDEOES_HOME_INDEX_START,
  VOD_VIDEOES_SEARCH_START,
  FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_START,
  FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_START,
  FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_START,
  FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_START,
  FETCH_PROMO_CODE_START,
  PROMO_CODE_SAVE_START,
  PROMO_CODE_DELETE_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  fetchVodVideosForOwnerSuccess,
  fetchVodVideosForOwnerFailure,
  vodVideosSaveSuccess,
  vodVideosSaveFailure,
  fetchSingleVodVideosForOwnerSuccess,
  fetchSingleVodVideosForOwnerFailure,
  deleteVodVideosSuccess,
  deleteVodVideosFailure,
  vodVideosFilesUploadSuccess,
  vodVideosFilesUploadFailure,
  vodVideosFilesRemoveSuccess,
  vodVideosFilesRemoveFailure,
  vodVideosPaymentsByWalletSuccess,
  vodVideosPaymentsByWalletFailure,
  vodVideosPaymentsByStripeSuccess,
  vodVideosPaymentsByStripeFailure,
  vodVideosPaymentsByPaypalSuccess,
  vodVideosPaymentsByPaypalFailure,
  vodVideosHomeIndexSuccess,
  vodVideosHomeIndexFailure,
  vodVideosSearchSuccess,
  vodVideosSearchFailure,
  fetchSingleVodVideosForOthersSuccess,
  fetchSingleVodVideosForOthersFailure,
  fetchVodVideosTransactionForUserSuccess,
  fetchVodVideosTransactionForUserFailure,
  fetchVodVideosTransactionForOwnerSuccess,
  fetchVodVideosTransactionForOwnerFailure,
  fetchSingleVodVideosTransactionSuccess,
  fetchSingleVodVideosTransactionFailure,
  fetchPromoCodeSuccess,
  fetchPromoCodeFailure,
  promoCodeSaveSuccess,
  promoCodeSaveFailure,
  promoCodeDeleteSuccess,
  promoCodeDeleteFailure,
} from "../actions/VodVideosAction";

function* fetchVodVideosForOwnerAPI() {
  try {
    const response = yield api.postMethod("vod_videos_for_owner");

    if (response.data.success) {
      yield put(fetchVodVideosForOwnerSuccess(response.data.data));
    } else {
      yield put(fetchVodVideosForOwnerFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchVodVideosForOwnerFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* vodVideosSaveAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_save_for_owner" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosSaveSuccess(response.data.data));
      } else {
        yield put(vodVideosSaveFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosSaveFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchSingleVodVideosForOwnerAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_view_for_owner", action.data);
  
      if (response.data.success) {
        yield put(fetchSingleVodVideosForOwnerSuccess(response.data.data));
      } else {
        yield put(fetchSingleVodVideosForOwnerFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchSingleVodVideosForOwnerFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* deleteVodVideosAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_delete_for_owner" , action.data);
  
      if (response.data.success) {
        yield put(deleteVodVideosSuccess(response.data.data));
      } else {
        yield put(deleteVodVideosFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(deleteVodVideosFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosFilesUploadAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_files_upload" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosFilesUploadSuccess(response.data.data));
      } else {
        yield put(vodVideosFilesUploadFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosFilesUploadFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosFilesRemoveAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_files_remove" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosFilesRemoveSuccess(response.data.data));
      } else {
        yield put(vodVideosFilesRemoveFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosFilesRemoveFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosPaymentsByWalletAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_payment_by_wallet" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosPaymentsByWalletSuccess(response.data.data));
      } else {
        yield put(vodVideosPaymentsByWalletFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosPaymentsByWalletFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosPaymentsByStripeAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_payment_by_stripe" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosPaymentsByStripeSuccess(response.data.data));
      } else {
        yield put(vodVideosPaymentsByStripeFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosPaymentsByStripeFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosPaymentsByPaypalAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_payment_by_paypal" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosPaymentsByPaypalSuccess(response.data.data));
      } else {
        yield put(vodVideosPaymentsByPaypalFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosPaymentsByPaypalFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosHomeIndexAPI() {
    try {
      const response = yield api.postMethod("vod_videos_home");
  
      if (response.data.success) {
        yield put(vodVideosHomeIndexSuccess(response.data.data));
      } else {
        yield put(vodVideosHomeIndexFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosHomeIndexFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* vodVideosSearchAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_search" , action.data);
  
      if (response.data.success) {
        yield put(vodVideosSearchSuccess(response.data.data));
      } else {
        yield put(vodVideosSearchFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(vodVideosSearchFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchSingleVodVideosForOthersAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_view_for_others" , action.data);
  
      if (response.data.success) {
        yield put(fetchSingleVodVideosForOthersSuccess(response.data.data));
      } else {
        yield put(fetchSingleVodVideosForOthersFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchSingleVodVideosForOthersFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchVodVideosTransactionForUserAPI() {
    try {
      const response = yield api.postMethod("vod_videos_transaction_users");
  
      if (response.data.success) {
        yield put(fetchVodVideosTransactionForUserSuccess(response.data.data));
      } else {
        yield put(fetchVodVideosTransactionForUserFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchVodVideosTransactionForUserFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchVodVideosTransactionForOwnerAPI() {
    try {
      const response = yield api.postMethod("vod_videos_transaction_content_creator");
  
      if (response.data.success) {
        yield put(fetchVodVideosTransactionForOwnerSuccess(response.data.data));
      } else {
        yield put(fetchVodVideosTransactionForOwnerFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchVodVideosTransactionForOwnerFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchSingleVodVideosTransactionAPI(action) {
    try {
      const response = yield api.postMethod("vod_videos_transaction_view" , action.data);
  
      if (response.data.success) {
        yield put(fetchSingleVodVideosTransactionSuccess(response.data.data));
      } else {
        yield put(fetchSingleVodVideosTransactionFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchSingleVodVideosTransactionFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchPromoCodeAPI() {
    try {
      const response = yield api.postMethod("promo_code_index");
  
      if (response.data.success) {
        yield put(fetchPromoCodeSuccess(response.data.data));
      } else {
        yield put(fetchPromoCodeFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchPromoCodeFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* promoCodeSaveAPI(action) {
    try {
      const response = yield api.postMethod("promo_code_save" , action.data);
  
      if (response.data.success) {
        yield put(promoCodeSaveSuccess(response.data.data));
      } else {
        yield put(promoCodeSaveFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(promoCodeSaveFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* promoCodeDeleteAPI(action) {
    try {
      const response = yield api.postMethod("promo_code_delete" , action.data);
  
      if (response.data.success) {
        yield put(promoCodeDeleteSuccess(response.data.data));
      } else {
        yield put(promoCodeDeleteFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(promoCodeDeleteFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }


export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_VOD_VIDEOES_FOR_OWNER_START, fetchVodVideosForOwnerAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_SAVE_START, vodVideosSaveAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_START, fetchSingleVodVideosForOwnerAPI)]);
  yield all([yield takeLatest(DELETE_VOD_VIDEOES_START, deleteVodVideosAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_FILES_UPLOAD_START, vodVideosFilesUploadAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_FILES_REMOVE_START, vodVideosFilesRemoveAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_PAYMENT_BY_WALLET_START, vodVideosPaymentsByWalletAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_PAYMENT_BY_STRIPE_START, vodVideosPaymentsByStripeAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_PAYMENT_BY_PAYPAL_START, vodVideosPaymentsByPaypalAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_HOME_INDEX_START, vodVideosHomeIndexAPI)]);
  yield all([yield takeLatest(VOD_VIDEOES_SEARCH_START, vodVideosSearchAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_START, fetchSingleVodVideosForOthersAPI)]);
  yield all([yield takeLatest(FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_START, fetchVodVideosTransactionForUserAPI)]);
  yield all([yield takeLatest(FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_START, fetchVodVideosTransactionForOwnerAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_START, fetchSingleVodVideosTransactionAPI)]);
  yield all([yield takeLatest(FETCH_PROMO_CODE_START, fetchPromoCodeAPI)]);
  yield all([yield takeLatest(PROMO_CODE_SAVE_START, promoCodeSaveAPI)]);
  yield all([yield takeLatest(PROMO_CODE_DELETE_START, promoCodeDeleteAPI)]);
}
