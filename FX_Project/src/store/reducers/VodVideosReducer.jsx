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
  } from '../actions/ActionConstant'
  
  const initialState = {
    vodVideosOwner: {
      data: {},
      loading: true,
      error: false,
    },
		vodVideosSave : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosViewOwner: {
      data: {},
      loading: true,
      error: false,
    },
		vodVideosFilesUpload : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosFilesRemove : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosPaymentsByWallet : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosPaymentsByStripe : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosPaymentsByPaypal : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosHomeIndex: {
      data: {},
      loading: true,
      error: false,
    },
		vodVideosSearch : {
			data: {},
			loading: true,
			error: false,
			loadingButtonContent : "",
			buttonDisable : false
		},
		vodVideosViewOthers: {
      data: {},
      loading: true,
      error: false,
    },
		vodVideosTransactionUser: {
      data: {},
      loading: true,
      error: false,
    },
		vodVideosTransactionOwner: {
      data: {},
      loading: true,
      error: false,
    },
		vodVideosViewTransaction: {
      data: {},
      loading: true,
      error: false,
    },
		promoCode: {
      data: {},
      loading: true,
      error: false,
    },
		promoCodeSave: {
      data: {},
      loading: true,
      error: false,
    },
		promoCodeDelete: {
      data: {},
      loading: true,
      error: false,
    },
  }
  
  const VodVideosReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_VOD_VIDEOES_FOR_OWNER_START:
        return {
          ...state,
          vodVideosOwner: {
            data: {},
            loading: true,
            error: false,
          },
        };
      case FETCH_VOD_VIDEOES_FOR_OWNER_SUCCESS:
        return {
          ...state,
          vodVideosOwner: {
            data: action.data,
            loading: false,
            error: false,
          },
        };
      case FETCH_VOD_VIDEOES_FOR_OWNER_FAILURE:
        return {
          ...state,
          vodVideosOwner: {
            data: {},
            loading: true,
            error: action.error,
          },
        };
			case VOD_VIDEOES_SAVE_START:
				return {
					...state,
					vodVideosSave: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "Uploading....",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_SAVE_SUCCESS:
				return {
					...state,
					vodVideosSave: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_SAVE_FAILURE:
				return {
					...state,
					vodVideosSave: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_START:
				return {
					...state,
					vodVideosViewOwner: {
						data: {},
						loading: true,
						error: false,
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_SUCCESS:
				return {
					...state,
					vodVideosViewOwner: {
						data: action.data,
						loading: false,
						error: false,
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_FOR_OWNER_FAILURE:
				return {
					...state,
					vodVideosViewOwner: {
						data: {},
						loading: true,
						error: action.error,
					},
				};
			case DELETE_VOD_VIDEOES_START:
				return {
					...state,
					vodVideosDelete: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case DELETE_VOD_VIDEOES_SUCCESS:
				return {
					...state,
					vodVideosDelete: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case DELETE_VOD_VIDEOES_FAILURE:
				return {
					...state,
					vodVideosDelete: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_FILES_UPLOAD_START:
				return {
					...state,
					vodVideosFilesUpload: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_FILES_UPLOAD_SUCCESS:
				return {
					...state,
					vodVideosFilesUpload: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_FILES_UPLOAD_FAILURE:
				return {
					...state,
					vodVideosFilesUpload: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_FILES_REMOVE_START:
				return {
					...state,
					vodVideosFilesRemove: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_FILES_REMOVE_SUCCESS:
				return {
					...state,
					vodVideosFilesRemove: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_FILES_REMOVE_FAILURE:
				return {
					...state,
					vodVideosFilesRemove: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_WALLET_START:
				return {
					...state,
					vodVideosPaymentsByWallet: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_WALLET_SUCCESS:
				return {
					...state,
					vodVideosPaymentsByWallet: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_WALLET_FAILURE:
				return {
					...state,
					vodVideosPaymentsByWallet: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_STRIPE_START:
				return {
					...state,
					vodVideosPaymentsByStripe: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_STRIPE_SUCCESS:
				return {
					...state,
					vodVideosPaymentsByStripe: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_STRIPE_FAILURE:
				return {
					...state,
					vodVideosPaymentsByStripe: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_PAYPAL_START:
				return {
					...state,
					vodVideosPaymentsByPaypal: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_PAYPAL_SUCCESS:
				return {
					...state,
					vodVideosPaymentsByPaypal: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_PAYMENT_BY_PAYPAL_FAILURE:
				return {
					...state,
					vodVideosPaymentsByPaypal: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_HOME_INDEX_START:
				return {
					...state,
					vodVideosHomeIndex: {
						data: {},
						loading: true,
						error: false,
					},
				};
			case VOD_VIDEOES_HOME_INDEX_SUCCESS:
				return {
					...state,
					vodVideosHomeIndex: {
						data: action.data,
						loading: false,
						error: false,
					},
				};
			case VOD_VIDEOES_HOME_INDEX_FAILURE:
				return {
					...state,
					vodVideosHomeIndex: {
						data: {},
						loading: true,
						error: action.error,
					},
				};
			case VOD_VIDEOES_SEARCH_START:
				return {
					...state,
					vodVideosSearch: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case VOD_VIDEOES_SEARCH_SUCCESS:
				return {
					...state,
					vodVideosSearch: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case VOD_VIDEOES_SEARCH_FAILURE:
				return {
					...state,
					vodVideosSearch: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_START:
				return {
					...state,
					vodVideosViewOthers: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_SUCCESS:
				return {
					...state,
					vodVideosViewOthers: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_FOR_OTHERS_FAILURE:
				return {
					...state,
					vodVideosViewOthers: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_START:
				return {
					...state,
					vodVideosTransactionUser: {
						data: {},
						loading: true,
						error: false,
					},
				};
			case FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_SUCCESS:
				return {
					...state,
					vodVideosTransactionUser: {
						data: action.data,
						loading: false,
						error: false,
					},
				};
			case FETCH_VOD_VIDEOES_TRANSACTION_FOR_USER_FAILURE:
				return {
					...state,
					vodVideosTransactionUser: {
						data: {},
						loading: true,
						error: action.error,
					},
				};
			case FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_START:
				return {
					...state,
					vodVideosTransactionOwner: {
						data: {},
						loading: true,
						error: false,
					},
				};
			case FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_SUCCESS:
				return {
					...state,
					vodVideosTransactionOwner: {
						data: action.data,
						loading: false,
						error: false,
					},
				};
			case FETCH_VOD_VIDEOES_TRANSACTION_FOR_OWNER_FAILURE:
				return {
					...state,
					vodVideosTransactionOwner: {
						data: {},
						loading: true,
						error: action.error,
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_START:
				return {
					...state,
					vodVideosViewTransaction: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_SUCCESS:
				return {
					...state,
					vodVideosViewTransaction: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case FETCH_SINGLE_VOD_VIDEOES_TRANSACTION_FAILURE:
				return {
					...state,
					vodVideosViewTransaction: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case FETCH_PROMO_CODE_START:
				return {
					...state,
					promoCode: {
						data: {},
						loading: true,
						error: false,
					},
				};
			case FETCH_PROMO_CODE_SUCCESS:
				return {
					...state,
					promoCode: {
						data: action.data,
						loading: false,
						error: false,
					},
				};
			case FETCH_PROMO_CODE_FAILURE:
				return {
					...state,
					promoCode: {
						data: {},
						loading: true,
						error: action.error,
					},
				};
			case PROMO_CODE_SAVE_START:
				return {
					...state,
					promoCodeSave: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case PROMO_CODE_SAVE_SUCCESS:
				return {
					...state,
					promoCodeSave: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case PROMO_CODE_SAVE_FAILURE:
				return {
					...state,
					promoCodeSave: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case PROMO_CODE_DELETE_START:
				return {
					...state,
					promoCodeDelete: {
						data: {},
						loading: true,
						error: false,
						loadingButtonContent : "",
						buttonDisable : true
					},
				};
			case PROMO_CODE_DELETE_SUCCESS:
				return {
					...state,
					promoCodeDelete: {
						data: action.data,
						loading: false,
						error: false,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
			case PROMO_CODE_DELETE_FAILURE:
				return {
					...state,
					promoCodeDelete: {
						data: {},
						loading: true,
						error: action.error,
						loadingButtonContent : "",
						buttonDisable : false
					},
				};
      default:
        return state;
    }
  }
  
  export default VodVideosReducer;