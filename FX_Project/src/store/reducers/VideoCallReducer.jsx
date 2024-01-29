import {
  FETCH_VIDEO_CALL_REQUESTS_FAILURE,
  FETCH_VIDEO_CALL_REQUESTS_START,
  FETCH_VIDEO_CALL_REQUESTS_SUCCESS,
  SAVE_POST_START,
  SAVE_VIDEO_CALL_AMOUNT_FAILURE,
  SAVE_VIDEO_CALL_AMOUNT_START,
  SAVE_VIDEO_CALL_AMOUNT_SUCCESS,
  SAVE_VIDEO_CALL_REQUEST_FAILURE,
  SAVE_VIDEO_CALL_REQUEST_START,
  SAVE_VIDEO_CALL_REQUEST_SUCCESS,
  VIDEO_CALL_REQUESTS_ACCEPT_FAILURE,
  VIDEO_CALL_REQUESTS_ACCEPT_START,
  VIDEO_CALL_REQUESTS_ACCEPT_SUCCESS,
  VIDEO_CALL_REQUESTS_JOIN_FAILURE,
  VIDEO_CALL_REQUESTS_JOIN_START,
  VIDEO_CALL_REQUESTS_JOIN_SUCCESS,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_FAILURE,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_START,
  VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_SUCCESS,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_FAILURE,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_START,
  VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_SUCCESS,
  VIDEO_CALL_REQUESTS_REJECT_FAILURE,
  VIDEO_CALL_REQUESTS_REJECT_START,
  VIDEO_CALL_REQUESTS_REJECT_SUCCESS,
  FETCH_VIDEO_CALL_CHAT_MESSAGE_START,
  FETCH_VIDEO_CALL_CHAT_MESSAGE_SUCCESS,
  FETCH_VIDEO_CALL_CHAT_MESSAGE_FAILURE,
  ADD_VIDEO_CALL_MESSAGE_CONTENT,
} from "../actions/ActionConstant";

const initialState = {
  videoCallRequests: {
    data: {},
    loading: true,
    error: false,
  },
  saveVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },

  acceptVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  rejectVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  joinVideoCallRequest: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },

  videoCallRequestPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  videoCallRequestPayPaypal: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  saveVideoCallAmount: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  videoCallChatMessage: {
    data: [],
    loading: true,
    error: false,
  },
};

const VideoCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEO_CALL_REQUESTS_START:
      return {
        ...state,
        videoCallRequests: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_VIDEO_CALL_REQUESTS_SUCCESS:
      return {
        ...state,
        videoCallRequests: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_VIDEO_CALL_REQUESTS_FAILURE:
      return {
        ...state,
        videoCallRequests: {
          data: {},
          loading: false,
          error: action.error,
        },
      };


    case SAVE_VIDEO_CALL_REQUEST_START:
      console.log("SAVE_VIDEO_CALL_REQUEST_START");
      return {
        ...state,
        saveVideoCallRequest: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_VIDEO_CALL_REQUEST_SUCCESS:
      return {
        ...state,
        saveVideoCallRequest: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_VIDEO_CALL_REQUEST_FAILURE:
      return {
        ...state,
        saveVideoCallRequest: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case VIDEO_CALL_REQUESTS_ACCEPT_START:
      return {
        ...state,
        acceptVideoCallRequest: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case VIDEO_CALL_REQUESTS_ACCEPT_SUCCESS:
      return {
        ...state,
        acceptVideoCallRequest: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VIDEO_CALL_REQUESTS_ACCEPT_FAILURE:
      return {
        ...state,
        acceptVideoCallRequest: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case VIDEO_CALL_REQUESTS_REJECT_START:
      return {
        ...state,
        rejectVideoCallRequest: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case VIDEO_CALL_REQUESTS_REJECT_SUCCESS:
      return {
        ...state,
        rejectVideoCallRequest: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VIDEO_CALL_REQUESTS_REJECT_FAILURE:
      return {
        ...state,
        rejectVideoCallRequest: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case VIDEO_CALL_REQUESTS_JOIN_START:
      return {
        ...state,
        joinVideoCallRequest: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case VIDEO_CALL_REQUESTS_JOIN_SUCCESS:
      return {
        ...state,
        joinVideoCallRequest: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VIDEO_CALL_REQUESTS_JOIN_FAILURE:
      return {
        ...state,
        joinVideoCallRequest: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_START:
      return {
        ...state,
        videoCallRequestPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        videoCallRequestPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case VIDEO_CALL_REQUESTS_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        videoCallRequestPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_START:
      return {
        ...state,
        videoCallRequestPayPaypal: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_SUCCESS:
      return {
        ...state,
        videoCallRequestPayPaypal: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case VIDEO_CALL_REQUESTS_PAYMENT_PAYPAL_FAILURE:
      return {
        ...state,
        videoCallRequestPayPaypal: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SAVE_VIDEO_CALL_AMOUNT_START:
      return {
        ...state,
        saveVideoCallAmount: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SAVE_VIDEO_CALL_AMOUNT_SUCCESS:
      return {
        ...state,
        saveVideoCallAmount: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SAVE_VIDEO_CALL_AMOUNT_FAILURE:
      return {
        ...state,
        saveVideoCallAmount: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case FETCH_VIDEO_CALL_CHAT_MESSAGE_START:
      return {
        ...state,
        videoCallChatMessage: {
          data: [],
          loading: true,
          error: false,
        },
      };
    case FETCH_VIDEO_CALL_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        videoCallChatMessage: {
          data: action.data.messages,
          loading: false,
          error: false,
        },
      };
    case FETCH_VIDEO_CALL_CHAT_MESSAGE_FAILURE:
      return {
        ...state,
        videoCallChatMessage: {
          data: [],
          loading: false,
          error: action.error,
        },
      };

    case ADD_VIDEO_CALL_MESSAGE_CONTENT:
      return {
        ...state,
        videoCallChatMessage: {
          data: [...state.videoCallChatMessage.data, ...action.data],
          loading: false,
          error: false,
        },
      };

    default:
      return state;
  }
};

export default VideoCallReducer;
