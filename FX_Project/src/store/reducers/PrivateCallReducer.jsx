import {
  REQUEST_CALL_START,
  REQUEST_CALL_SUCCESS,
  REQUEST_CALL_FAILURE,
  ACCEPT_CALL_START,
  ACCEPT_CALL_SUCCESS,
  ACCEPT_CALL_FAILURE,
  REJECT_CALL_START,
  REJECT_CALL_SUCCESS,
  REJECT_CALL_FAILURE,
  PAY_BY_STRIPE_START,
  PAY_BY_STRIPE_SUCCESS,
  PAY_BY_STRIPE_FAILURE,
  PAY_BY_PAYPAL_START,
  PAY_BY_PAYPAL_SUCCESS,
  PAY_BY_PAYPAL_FAILURE,
  JOIN_VIDEO_CALL_START,
  JOIN_VIDEO_CALL_SUCCESS,
  JOIN_VIDEO_CALL_FAILURE,
  END_VIDEO_CALL_START,
  END_VIDEO_CALL_SUCCESS,
  END_VIDEO_CALL_FAILURE,
  CALL_REQUEST_SENT_USER_START,
  CALL_REQUEST_SENT_USER_SUCCESS,
  CALL_REQUEST_SENT_USER_FAILURE,
  CALL_HISTORY_USER_START,
  CALL_HISTORY_USER_SUCCESS,
  CALL_HISTORY_USER_FAILURE,
  CALL_HISTORY_MODEL_START,
  CALL_HISTORY_MODEL_SUCCESS,
  CALL_HISTORY_MODEL_FAILURE,
  CALL_REQUEST_RECEIVED_MODEL_START,
  CALL_MORE_AUDIO_REQUEST_RECEIVED_MODEL_START,
  CALL_REQUEST_RECEIVED_MODEL_SUCCESS,
  CALL_REQUEST_RECEIVED_MODEL_FAILURE,
  CALL_AUDIO_REQUEST_RECEIVED_MODEL_START,
  CALL_AUDIO_REQUEST_RECEIVED_MODEL_SUCCESS,
  CALL_AUDIO_REQUEST_RECEIVED_MODEL_FAILURE,
  FETCH_AUDIO_CALL_REQUESTS_FAILURE,
  FETCH_AUDIO_CALL_REQUESTS_START,
  FETCH_MORE_AUDIO_CALL_REQUESTS_START,
  FETCH_AUDIO_CALL_REQUESTS_SUCCESS,
  FETCH_SINGLE_VIDEO_CALL_START,
  FETCH_SINGLE_VIDEO_CALL_SUCCESS,
  FETCH_SINGLE_VIDEO_CALL_FAILURE,
  ACCEPT_AUDIO_CALL_START,
  ACCEPT_AUDIO_CALL_SUCCESS,
  ACCEPT_AUDIO_CALL_FAILURE,
  AUDIO_CALL_HISTORY_USER_START,
  AUDIO_CALL_HISTORY_USER_SUCCESS,
  AUDIO_CALL_HISTORY_USER_FAILURE,
  REJECT_AUDIO_CALL_START,
  REJECT_AUDIO_CALL_SUCCESS,
  REJECT_AUDIO_CALL_FAILURE,
  REQUEST_AUDIO_CALL_START,
  REQUEST_AUDIO_CALL_SUCCESS,
  REQUEST_AUDIO_CALL_FAILURE,
  PAY_AUDIO_CALL_BY_STRIPE_START,
  PAY_AUDIO_CALL_BY_STRIPE_SUCCESS,
  PAY_AUDIO_CALL_BY_STRIPE_FAILURE,
  PAY_AUDIO_CALL_BY_PAYPAL_START,
  PAY_AUDIO_CALL_BY_PAYPAL_SUCCESS,
  PAY_AUDIO_CALL_BY_PAYPAL_FAILURE,
  FETCH_SINGLE_AUDIO_CALL_START,
  FETCH_SINGLE_AUDIO_CALL_SUCCESS,
  FETCH_SINGLE_AUDIO_CALL_FAILURE,
  END_AUDIO_CALL_START,
  END_AUDIO_CALL_SUCCESS,
  END_AUDIO_CALL_FAILURE,
  JOIN_AUDIO_CALL_START,
  JOIN_AUDIO_CALL_SUCCESS,
  JOIN_AUDIO_CALL_FAILURE,
  VIDEO_CALL_PAY_BY_WALLET_START,
  VIDEO_CALL_PAY_BY_WALLET_SUCCESS,
  VIDEO_CALL_PAY_BY_WALLET_FAILURE,
  AUDIO_CALL_PAY_BY_WALLET_START,
  AUDIO_CALL_PAY_BY_WALLET_SUCCESS,
  AUDIO_CALL_PAY_BY_WALLET_FAILURE,
  FETCH_AUDIO_CALL_CHAT_MESSAGE_START,
  FETCH_AUDIO_CALL_CHAT_MESSAGE_SUCCESS,
  FETCH_AUDIO_CALL_CHAT_MESSAGE_FAILURE,
  ADD_AUDIO_CALL_MESSAGE_CONTENT,
  START_AUDIO_CALL_REQUEST_START,
  START_AUDIO_CALL_REQUEST_SUCCESS,
  START_AUDIO_CALL_REQUEST_FAILURE,
  START_VIDEO_CALL_REQUEST_START,
  START_VIDEO_CALL_REQUEST_SUCCESS,
  START_VIDEO_CALL_REQUEST_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  requestCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  audioCallRequests: {
    data: {},
    loading: true,
    error: false,
  },
  acceptCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  rejectCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payByStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payByPayPal: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  ppvPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  joinVideoCall: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  endVideoCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  callRequestSent: {
    data: {},
    loading: true,
    error: false,
  },
  callHistoryUser: {
    data: {},
    loading: true,
    error: false,
  },
  callHistoryModel: {
    data: {},
    loading: true,
    error: false,
  },
  callRequestReceivedModel: {
    data: {},
    loading: true,
    error: false,
  },
  audiocallRequestReceivedModel: {
    data: {},
    loading: true,
    error: false,
  },
  singleVideoCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  acceptAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  audioCallHistoryUser: {
    data: {},
    loading: true,
    error: false,
  },
  rejectAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  requestAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payAudioCallByStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  payAudioCallByPayPal: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  singleAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  endAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  joinAudioCall: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  videoCallPayByWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  audioCallPayByWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  audioCallChatMessage: {
    data: [],
    loading: true,
    error: false,
  },
  startCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  startAudioCall: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CALL_START:
      return {
        ...state,
        requestCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case REQUEST_CALL_SUCCESS:
      return {
        ...state,
        requestCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case REQUEST_CALL_FAILURE:
      return {
        ...state,
        requestCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case ACCEPT_CALL_START:
      return {
        ...state,
        acceptCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case ACCEPT_CALL_SUCCESS:
      return {
        ...state,
        acceptCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case ACCEPT_CALL_FAILURE:
      return {
        ...state,
        acceptCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case REJECT_CALL_START:
      return {
        ...state,
        rejectCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case REJECT_CALL_SUCCESS:
      return {
        ...state,
        rejectCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case REJECT_CALL_FAILURE:
      return {
        ...state,
        rejectCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case PAY_BY_STRIPE_START:
      return {
        ...state,
        payByStripe: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case PAY_BY_STRIPE_SUCCESS:
      return {
        ...state,
        payByStripe: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_BY_STRIPE_FAILURE:
      return {
        ...state,
        payByStripe: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_BY_PAYPAL_START:
      return {
        ...state,
        payByPayPal: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Uploading....",
          buttonDisable: true,
        },
      };
    case PAY_BY_PAYPAL_SUCCESS:
      return {
        ...state,
        payByPayPal: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_BY_PAYPAL_FAILURE:
      return {
        ...state,
        payByPayPal: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case JOIN_VIDEO_CALL_START:
      return {
        ...state,
        joinVideoCall: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case JOIN_VIDEO_CALL_SUCCESS:
      return {
        ...state,
        joinVideoCall: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case JOIN_VIDEO_CALL_FAILURE:
      return {
        ...state,
        joinVideoCall: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case END_VIDEO_CALL_START:
      return {
        ...state,
        endVideoCall: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case END_VIDEO_CALL_SUCCESS:
      return {
        ...state,
        endVideoCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case END_VIDEO_CALL_FAILURE:
      return {
        ...state,
        endVideoCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CALL_REQUEST_SENT_USER_START:
      return {
        ...state,
        callRequestSent: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case CALL_REQUEST_SENT_USER_SUCCESS:
      return {
        ...state,
        callRequestSent: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case CALL_REQUEST_SENT_USER_FAILURE:
      return {
        ...state,
        callRequestSent: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case FETCH_AUDIO_CALL_REQUESTS_START:
      return {
        ...state,
        audioCallRequests: {
          data: {
            audio_call_requests: [],
            total: 0,
          },
          loading: true,
          error: false,
          errorCount: 0,
        },
      };

    case FETCH_MORE_AUDIO_CALL_REQUESTS_START:
      return state;

    case FETCH_AUDIO_CALL_REQUESTS_SUCCESS:
      return {
        ...state,
        audioCallRequests: {
          data: {
            audio_call_requests: [...state.audioCallRequests.data.audio_call_requests, ...action.data.audio_call_requests],
            total: action.data.total,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };

    case FETCH_AUDIO_CALL_REQUESTS_FAILURE:
      return {
        ...state,
        audioCallRequests: {
          data: state.audioCallRequests.data,
          loading: true,
          error: action.error,
          errorCount: state.audioCallRequests.errorCount + 1,
        },
      };

    case CALL_HISTORY_USER_START:
      return {
        ...state,
        callHistoryUser: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case CALL_HISTORY_USER_SUCCESS:
      return {
        ...state,
        callHistoryUser: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case CALL_HISTORY_USER_FAILURE:
      return {
        ...state,
        callHistoryUser: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case CALL_HISTORY_MODEL_START:
      return {
        ...state,
        callHistoryModel: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case CALL_HISTORY_MODEL_SUCCESS:
      return {
        ...state,
        callHistoryModel: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case CALL_HISTORY_MODEL_FAILURE:
      return {
        ...state,
        callHistoryModel: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case CALL_REQUEST_RECEIVED_MODEL_START:
      return {
        ...state,
        callRequestReceivedModel: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case CALL_REQUEST_RECEIVED_MODEL_SUCCESS:
      return {
        ...state,
        callRequestReceivedModel: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case CALL_REQUEST_RECEIVED_MODEL_FAILURE:
      return {
        ...state,
        callRequestReceivedModel: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case CALL_AUDIO_REQUEST_RECEIVED_MODEL_START:
      return {
        ...state,
        audiocallRequestReceivedModel: {
          data: {
            audio_call_requests: [],
            total: 0,
          },
          loading: true,
          error: false,
          errorCount: 0,
        },
      };

    case CALL_MORE_AUDIO_REQUEST_RECEIVED_MODEL_START:
      return state;
    case CALL_AUDIO_REQUEST_RECEIVED_MODEL_SUCCESS:
      return {
        ...state,
        audiocallRequestReceivedModel: {
          data: {
            audio_call_requests: [...state.audiocallRequestReceivedModel.data.audio_call_requests, ...action.data.audio_call_requests],
            total: action.data.total,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };

    case CALL_AUDIO_REQUEST_RECEIVED_MODEL_FAILURE:
      return {
        ...state,
        audiocallRequestReceivedModel: {
          data: state.audiocallRequestReceivedModel.data,
          loading: true,
          error: action.error,
          errorCount: state.audiocallRequestReceivedModel.errorCount + 1,
        },
      };


    case FETCH_SINGLE_VIDEO_CALL_START:
      return {
        ...state,
        singleVideoCall: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case FETCH_SINGLE_VIDEO_CALL_SUCCESS:
      return {
        ...state,
        singleVideoCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_SINGLE_VIDEO_CALL_FAILURE:
      return {
        ...state,
        singleVideoCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };
    case ACCEPT_AUDIO_CALL_START:
      return {
        ...state,
        acceptAudioCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case ACCEPT_AUDIO_CALL_SUCCESS:
      return {
        ...state,
        acceptAudioCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case ACCEPT_AUDIO_CALL_FAILURE:
      return {
        ...state,
        acceptAudioCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case AUDIO_CALL_HISTORY_USER_START:
      return {
        ...state,
        audioCallHistoryUser: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case AUDIO_CALL_HISTORY_USER_SUCCESS:
      return {
        ...state,
        audioCallHistoryUser: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case AUDIO_CALL_HISTORY_USER_FAILURE:
      return {
        ...state,
        audioCallHistoryUser: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case REJECT_AUDIO_CALL_START:
      return {
        ...state,
        rejectAudioCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case REJECT_AUDIO_CALL_SUCCESS:
      return {
        ...state,
        rejectAudioCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case REJECT_AUDIO_CALL_FAILURE:
      return {
        ...state,
        rejectAudioCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case REQUEST_AUDIO_CALL_START:
      return {
        ...state,
        requestAudioCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case REQUEST_AUDIO_CALL_SUCCESS:
      return {
        ...state,
        requestAudioCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case REQUEST_AUDIO_CALL_FAILURE:
      return {
        ...state,
        requestAudioCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_AUDIO_CALL_BY_STRIPE_START:
      return {
        ...state,
        payAudioCallByStripe: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case PAY_AUDIO_CALL_BY_STRIPE_SUCCESS:
      return {
        ...state,
        payAudioCallByStripe: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_AUDIO_CALL_BY_STRIPE_FAILURE:
      return {
        ...state,
        payAudioCallByStripe: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_AUDIO_CALL_BY_PAYPAL_START:
      return {
        ...state,
        payAudioCallByPayPal: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Uploading....",
          buttonDisable: true,
        },
      };
    case PAY_AUDIO_CALL_BY_PAYPAL_SUCCESS:
      return {
        ...state,
        payAudioCallByPayPal: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PAY_AUDIO_CALL_BY_PAYPAL_FAILURE:
      return {
        ...state,
        payAudioCallByPayPal: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_AUDIO_CALL_START:
      return {
        ...state,
        singleAudioCall: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
        },
      };
    case FETCH_SINGLE_AUDIO_CALL_SUCCESS:
      return {
        ...state,
        singleAudioCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_SINGLE_AUDIO_CALL_FAILURE:
      return {
        ...state,
        singleAudioCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };
    case END_AUDIO_CALL_START:
      return {
        ...state,
        endAudioCall: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case END_AUDIO_CALL_SUCCESS:
      return {
        ...state,
        endAudioCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case END_AUDIO_CALL_FAILURE:
      return {
        ...state,
        endAudioCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case JOIN_AUDIO_CALL_START:
      return {
        ...state,
        joinAudioCall: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case JOIN_AUDIO_CALL_SUCCESS:
      return {
        ...state,
        joinAudioCall: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case JOIN_AUDIO_CALL_FAILURE:
      return {
        ...state,
        joinAudioCall: {
          loading: false,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case VIDEO_CALL_PAY_BY_WALLET_START:
      return {
        ...state,
        videoCallPayByWallet: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case VIDEO_CALL_PAY_BY_WALLET_SUCCESS:
      return {
        ...state,
        videoCallPayByWallet: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VIDEO_CALL_PAY_BY_WALLET_FAILURE:
      return {
        ...state,
        videoCallPayByWallet: {
          data: {},
          loading: false,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case AUDIO_CALL_PAY_BY_WALLET_START:
      return {
        ...state,
        audioCallPayByWallet: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case AUDIO_CALL_PAY_BY_WALLET_SUCCESS:
      return {
        ...state,
        audioCallPayByWallet: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case AUDIO_CALL_PAY_BY_WALLET_FAILURE:
      return {
        ...state,
        audioCallPayByWallet: {
          data: {},
          loading: false,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case FETCH_AUDIO_CALL_CHAT_MESSAGE_START:
      return {
        ...state,
        audioCallChatMessage: {
          data: [],
          loading: true,
          error: false,
        },
      };
    case FETCH_AUDIO_CALL_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        audioCallChatMessage: {
          data: action.data.messages,
          loading: false,
          error: false,
        },
      };
    case FETCH_AUDIO_CALL_CHAT_MESSAGE_FAILURE:
      return {
        ...state,
        audioCallChatMessage: {
          data: [],
          loading: false,
          error: action.error,
        },
      };

    case ADD_AUDIO_CALL_MESSAGE_CONTENT:
      return {
        ...state,
        audioCallChatMessage: {
          data: [...state.audioCallChatMessage.data, ...action.data],
          loading: false,
          error: false,
        },
      };
    case START_AUDIO_CALL_REQUEST_START:
      return {
        ...state,
        startAudioCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case START_AUDIO_CALL_REQUEST_SUCCESS:
      return {
        ...state,
        startAudioCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case START_AUDIO_CALL_REQUEST_FAILURE:
      return {
        ...state,
        startAudioCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case START_VIDEO_CALL_REQUEST_START:
      return {
        ...state,
        startCall: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case START_VIDEO_CALL_REQUEST_SUCCESS:
      return {
        ...state,
        startCall: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case START_VIDEO_CALL_REQUEST_FAILURE:
      return {
        ...state,
        startCall: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    default:
      return state;
  }
};

export default PostReducer;
