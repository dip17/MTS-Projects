import {
  CHAT_ASSET_PAYMENT_STRIPE_START,
  CHAT_ASSET_PAYMENT_STRIPE_SUCCESS,
  CHAT_ASSET_PAYMENT_STRIPE_FAILURE,
  CHAT_ASSET_PAYMENT_WALLET_START,
  CHAT_ASSET_PAYMENT_WALLET_SUCCESS,
  CHAT_ASSET_PAYMENT_WALLET_FAILURE,
  CHAT_ASSET_PAYMENT_PAYPAL_START,
  CHAT_ASSET_PAYMENT_PAYPAL_SUCCESS,
  CHAT_ASSET_PAYMENT_PAYPAL_FAILURE,
  CHAT_ASSET_FILE_UPLOAD_START,
  CHAT_ASSET_FILE_UPLOAD_SUCCESS,
  CHAT_ASSET_FILE_UPLOAD_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  saveAssetUpload: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  chatAssetInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  chatAssetPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  chatAssetPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  chatAssetPayPaypal: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

const ChatAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_ASSET_FILE_UPLOAD_START:
      return {
        ...state,
        chatAssetInputData: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
        saveAssetUpload: {
          data: {},
          loading: true,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHAT_ASSET_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        saveAssetUpload: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHAT_ASSET_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        saveAssetUpload: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHAT_ASSET_PAYMENT_STRIPE_START:
      return {
        ...state,
        chatAssetPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case CHAT_ASSET_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        chatAssetPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CHAT_ASSET_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        chatAssetPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CHAT_ASSET_PAYMENT_WALLET_START:
      return {
        ...state,
        chatAssetPayWallet: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case CHAT_ASSET_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        chatAssetPayWallet: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CHAT_ASSET_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        chatAssetPayPaypal: {
          loading: false,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CHAT_ASSET_PAYMENT_PAYPAL_START:
      return {
        ...state,
        chatAssetPayPaypal: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case CHAT_ASSET_PAYMENT_PAYPAL_SUCCESS:
      return {
        ...state,
        chatAssetPayPaypal: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case CHAT_ASSET_PAYMENT_PAYPAL_FAILURE:
      return {
        ...state,
        chatAssetPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    default:
      return state;
  }
};

export default ChatAssetReducer;
