import {
    FETCH_VOD_VIDEOES_FOR_OWNER_START,
    FETCH_VOD_VIDEOES_FOR_OWNER_SUCCESS,
    FETCH_VOD_VIDEOES_FOR_OWNER_FAILURE,
    VOD_VIDEOES_SAVE_START,
    VOD_VIDEOES_SAVE_SUCCESS,
    VOD_VIDEOES_SAVE_FAILURE,
    FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_START,
    FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_SUCCESS,
    FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_FAILURE,
    DELETE_VOD_VIDEOES_START,
    DELETE_VOD_VIDEOES_SUCCESS,
    DELETE_VOD_VIDEOES_FAILURE,
    VOD_VIDEOES_FILES_UPLOAD_START,
    VOD_VIDEOES_FILES_UPLOAD_SUCCESS,
    VOD_VIDEOES_FILES_UPLOAD_FAILURE,
    VOD_VIDEOES_FILES_REMOVE_START,
    VOD_VIDEOES_FILES_REMOVE_SUCCESS,
    VOD_VIDEOES_FILES_REMOVE_FAILURE,
    VOD_VIDEOES_PAYMENT_BY_WALLET_START,
    VOD_VIDEOES_PAYMENT_BY_WALLET_SUCCESS,
    VOD_VIDEOES_PAYMENT_BY_WALLET_FAILURE,
    VOD_VIDEOES_PAYMENT_BY_STRIPE_START,
    VOD_VIDEOES_PAYMENT_BY_STRIPE_SUCCESS,
    VOD_VIDEOES_PAYMENT_BY_STRIPE_FAILURE,
    VOD_VIDEOES_PAYMENT_BY_PAYPAL_START,
    VOD_VIDEOES_PAYMENT_BY_PAYPAL_SUCCESS,
    VOD_VIDEOES_PAYMENT_BY_PAYPAL_FAILURE,
    VOD_VIDEOES_HOME_INDEX_START,
    VOD_VIDEOES_HOME_INDEX_SUCCESS,
    VOD_VIDEOES_HOME_INDEX_FAILURE,
    VOD_VIDEOES_SEARCH_START,
    VOD_VIDEOES_SEARCH_SUCCESS,
    VOD_VIDEOES_SEARCH_FAILURE,
    FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_START,
    FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_SUCCESS,
    FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_FAILURE,
    FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_START,
    FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_SUCCESS,
    FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_FAILURE,
    FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_START,
    FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_SUCCESS,
    FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_FAILURE,
    FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_START,
    FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_SUCCESS,
    FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_FAILURE,
    FETCH_PROMO_CODE_START,
    FETCH_PROMO_CODE_SUCCESS,
    FETCH_PROMO_CODE_FAILURE,
    PROMO_CODE_SAVE_START,
    PROMO_CODE_SAVE_SUCCESS,
    PROMO_CODE_SAVE_FAILURE,
    PROMO_CODE_DELETE_START,
    PROMO_CODE_DELETE_SUCCESS,
    PROMO_CODE_DELETE_FAILURE,
  } from './ActionConstant'
  
  export function fetchVodVideosForOwnerStart(data) {
    return {
      type: FETCH_VOD_VIDEOES_FOR_OWNER_START,
      data,
    };
  }
  
  export function fetchVodVideosForOwnerSuccess(data) {
    return {
      type: FETCH_VOD_VIDEOES_FOR_OWNER_SUCCESS,
      data,
    };
  }
  
  export function fetchVodVideosForOwnerFailure(error) {
    return {
      type: FETCH_VOD_VIDEOES_FOR_OWNER_FAILURE,
      error,
    };
  }
  
  export function vodVideosSaveStart(data) {
    return {
      type: VOD_VIDEOES_SAVE_START,
      data,
    };
  }
  
  export function vodVideosSaveSuccess(data) {
    return {
      type: VOD_VIDEOES_SAVE_SUCCESS,
      data,
    };
  }
  
  export function vodVideosSaveFailure(error) {
    return {
      type: VOD_VIDEOES_SAVE_FAILURE,
      error,
    };
  }

  export function fetchSingleVodVideosForOwnerStart(data) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_START,
      data,
    };
  }
  
  export function fetchSingleVodVideosForOwnerSuccess(data) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_SUCCESS,
      data,
    };
  }
  
  export function fetchSingleVodVideosForOwnerFailure(error) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_FAILURE,
      error,
    };
  }

  export function deleteVodVideosStart(data) {
    return {
      type: DELETE_VOD_VIDEOES_START,
      data,
    };
  }
  
  export function deleteVodVideosSuccess(data) {
    return {
      type: DELETE_VOD_VIDEOES_SUCCESS,
      data,
    };
  }
  
  export function deleteVodVideosFailure(error) {
    return {
      type: DELETE_VOD_VIDEOES_FAILURE,
      error,
    };
  }

  export function vodVideosFilesUploadStart(data) {
    return {
      type: VOD_VIDEOES_FILES_UPLOAD_START,
      data,
    };
  }
  
  export function vodVideosFilesUploadSuccess(data) {
    return {
      type: VOD_VIDEOES_FILES_UPLOAD_SUCCESS,
      data,
    };
  }
  
  export function vodVideosFilesUploadFailure(error) {
    return {
      type: VOD_VIDEOES_FILES_UPLOAD_FAILURE,
      error,
    };
  }

  export function vodVideosFilesRemoveStart(data) {
    return {
      type: VOD_VIDEOES_FILES_REMOVE_START,
      data,
    };
  }
  
  export function vodVideosFilesRemoveSuccess(data) {
    return {
      type: VOD_VIDEOES_FILES_REMOVE_SUCCESS,
      data,
    };
  }
  
  export function vodVideosFilesRemoveFailure(error) {
    return {
      type: VOD_VIDEOES_FILES_REMOVE_FAILURE,
      error,
    };
  }

  export function vodVideosPaymentsByWalletStart(data) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_WALLET_START,
      data,
    };
  }
  
  export function vodVideosPaymentsByWalletSuccess(data) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_WALLET_SUCCESS,
      data,
    };
  }
  
  export function vodVideosPaymentsByWalletFailure(error) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_WALLET_FAILURE,
      error,
    };
  }

  export function vodVideosPaymentsByStripeStart(data) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_STRIPE_START,
      data,
    };
  }
  
  export function vodVideosPaymentsByStripeSuccess(data) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_STRIPE_SUCCESS,
      data,
    };
  }
  
  export function vodVideosPaymentsByStripeFailure(error) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_STRIPE_FAILURE,
      error,
    };
  }

  export function vodVideosPaymentsByPaypalStart(data) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_PAYPAL_START,
      data,
    };
  }
  
  export function vodVideosPaymentsByPaypalSuccess(data) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_PAYPAL_SUCCESS,
      data,
    };
  }
  
  export function vodVideosPaymentsByPaypalFailure(error) {
    return {
      type: VOD_VIDEOES_PAYMENT_BY_PAYPAL_FAILURE,
      error,
    };
  }

  export function vodVideosHomeIndexStart(data) {
    return {
      type: VOD_VIDEOES_HOME_INDEX_START,
      data,
    };
  }
  
  export function vodVideosHomeIndexSuccess(data) {
    return {
      type: VOD_VIDEOES_HOME_INDEX_SUCCESS,
      data,
    };
  }
  
  export function vodVideosHomeIndexFailure(error) {
    return {
      type: VOD_VIDEOES_HOME_INDEX_FAILURE,
      error,
    };
  }

  export function vodVideosSearchStart(data) {
    return {
      type: VOD_VIDEOES_SEARCH_START,
      data,
    };
  }
  
  export function vodVideosSearchSuccess(data) {
    return {
      type: VOD_VIDEOES_SEARCH_SUCCESS,
      data,
    };
  }
  
  export function vodVideosSearchFailure(error) {
    return {
      type: VOD_VIDEOES_SEARCH_FAILURE,
      error,
    };
  }

  export function fetchSingleVodVideosForOthersStart(data) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_START,
      data,
    };
  }
  
  export function fetchSingleVodVideosForOthersSuccess(data) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_SUCCESS,
      data,
    };
  }
  
  export function fetchSingleVodVideosForOthersFailure(error) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_FAILURE,
      error,
    };
  }

  export function fetchVodVideosTransactionForUserStart(data) {
    return {
      type: FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_START,
      data,
    };
  }
  
  export function fetchVodVideosTransactionForUserSuccess(data) {
    return {
      type: FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_SUCCESS,
      data,
    };
  }
  
  export function fetchVodVideosTransactionForUserFailure(error) {
    return {
      type: FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_FAILURE,
      error,
    };
  }

  export function fetchVodVideosTransactionForOwnerStart(data) {
    return {
      type: FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_START,
      data,
    };
  }
  
  export function fetchVodVideosTransactionForOwnerSuccess(data) {
    return {
      type: FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_SUCCESS,
      data,
    };
  }
  
  export function fetchVodVideosTransactionForOwnerFailure(error) {
    return {
      type: FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_FAILURE,
      error,
    };
  }

  export function fetchSingleVodVideosTransactionStart(data) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_START,
      data,
    };
  }
  
  export function fetchSingleVodVideosTransactionSuccess(data) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_SUCCESS,
      data,
    };
  }
  
  export function fetchSingleVodVideosTransactionFailure(error) {
    return {
      type: FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_FAILURE,
      error,
    };
  }

  export function fetchPromoCodeStart(data) {
    return {
      type: FETCH_PROMO_CODE_START,
      data,
    };
  }
  
  export function fetchPromoCodeSuccess(data) {
    return {
      type: FETCH_PROMO_CODE_SUCCESS,
      data,
    };
  }
  
  export function fetchPromoCodeFailure(error) {
    return {
      type: FETCH_PROMO_CODE_FAILURE,
      error,
    };
  }

  export function promoCodeSaveStart(data) {
    return {
      type: PROMO_CODE_SAVE_START,
      data,
    };
  }
  
  export function promoCodeSaveSuccess(data) {
    return {
      type: PROMO_CODE_SAVE_SUCCESS,
      data,
    };
  }
  
  export function promoCodeSaveFailure(error) {
    return {
      type: PROMO_CODE_SAVE_FAILURE,
      error,
    };
  }

  export function promoCodeDeleteStart(data) {
    return {
      type: PROMO_CODE_DELETE_START,
      data,
    };
  }
  
  export function promoCodeDeleteSuccess(data) {
    return {
      type: PROMO_CODE_DELETE_SUCCESS,
      data,
    };
  }
  
  export function promoCodeDeleteFailure(error) {
    return {
      type: PROMO_CODE_DELETE_FAILURE,
      error,
    };
  }