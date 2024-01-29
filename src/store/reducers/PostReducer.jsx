import {
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CHANGE_POST_STATUS_START,
  CHANGE_POST_STATUS_SUCCESS,
  CHANGE_POST_STATUS_FAILURE,
  POST_FILE_UPLOAD_START,
  POST_FILE_UPLOAD_SUCCESS,
  POST_FILE_UPLOAD_FAILURE,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_STRIPE_SUCCESS,
  PPV_PAYMENT_STRIPE_FAILURE,
  PPV_PAYMENT_WALLET_START,
  PPV_PAYMENT_WALLET_SUCCESS,
  PPV_PAYMENT_WALLET_FAILURE,
  SAVE_REPORT_POST_FAILURE,
  SAVE_REPORT_POST_SUCCESS,
  SAVE_BLOCK_USER_START,
  FETCH_REPORT_POSTS_FAILURE,
  FETCH_REPORT_POSTS_START,
  FETCH_REPORT_POSTS_SUCCESS,
  SAVE_REPORT_POST_START,
  PPV_PAYMENT_PAYPAL_START,
  PPV_PAYMENT_PAYPAL_SUCCESS,
  PPV_PAYMENT_PAYPAL_FAILURE,
  PPV_PAYMENT_CCBILL_START,
  PPV_PAYMENT_CCBILL_SUCCESS,
  PPV_PAYMENT_CCBILL_FAILURE,
  FETCH_EXPLORE_START,
  FETCH_EXPLORE_SUCCESS,
  FETCH_EXPLORE_FAILURE,
  POST_FILE_REMOVE_START,
  POST_FILE_REMOVE_SUCCESS,
  POST_FILE_REMOVE_FAILURE,
  PPV_PAYMENT_COINPAYMENT_START,
  PPV_PAYMENT_COINPAYMENT_SUCCESS,
  PPV_PAYMENT_COINPAYMENT_FAILURE,
  FETCH_POST_CATEGORIES_START,
  FETCH_POST_CATEGORIES_SUCCESS,
  FETCH_POST_CATEGORIES_FAILURE,
  FETCH_REPORT_REASON_START,
  FETCH_REPORT_REASON_SUCCESS,
  FETCH_REPORT_REASON_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  savePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  posts: {
    data: {
      posts: [],
      total: 0,
    },
    inputData: {},
    loading: true,
    error: false,
  },
  singlePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  changePostStatus: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  fileUpload: {
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
  ppvPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  reportPosts: {
    data: {},
    loading: true,
    error: false,
  },
  saveReportPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  ppvPayCCBill: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  ppvPayCoinPayment: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  explorePosts: {
    inputData: {},
    data: {
      posts: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
  fileRemove: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  postCategories: {
    data: {},
    inputData: {},
    loading: true,
    error: false,
  },
  reportReason: {
    data: {},
    inputData: {},
    loading: true,
    error: false,
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST_START:
      return {
        ...state,
        savePost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        savePost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_POSTS_START:
      return {
        ...state,
        posts: {
          inputData: action.data,
          data: {
            ...state.posts.data,
            posts: action.data.append ? state.posts.data.posts : [],
          },
          loading: action.data.append ? false : true,
          error: false,
        },
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          inputData: action.data,
          data: {
            posts: [...state.posts.data.posts, ...action.data.posts],
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          inputData: action.data,
          data: state.posts.data,
          loading: false,
          error: action.error,
        },
      };

    case FETCH_SINGLE_POST_START:
      return {
        ...state,
        singlePost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_POST_FAILURE:
      return {
        ...state,
        singlePost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case DELETE_POST_START:
      return {
        ...state,
        delPost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        delPost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        delPost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case CHANGE_POST_STATUS_START:
      return {
        ...state,
        changePostStatus: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        changePostStatus: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHANGE_POST_STATUS_FAILURE:
      return {
        ...state,
        changePostStatus: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_UPLOAD_START:
      return {
        ...state,
        fileUpload: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Uploading....",
          buttonDisable: true,
        },
      };
    case POST_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        fileUpload: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        fileUpload: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PPV_PAYMENT_STRIPE_START:
      return {
        ...state,
        ppvPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        ppvPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        ppvPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_WALLET_START:
      return {
        ...state,
        ppvPayWallet: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        ppvPayWallet: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        ppvPayWallet: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case FETCH_REPORT_POSTS_START:
      return {
        ...state,
        reportPosts: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_REPORT_POSTS_SUCCESS:
      return {
        ...state,
        reportPosts: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_REPORT_POSTS_FAILURE:
      return {
        ...state,
        reportPosts: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_REPORT_POST_START:
      return {
        ...state,
        saveReportPost: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_REPORT_POST_SUCCESS:
      return {
        ...state,
        saveReportPost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_REPORT_POST_FAILURE:
      return {
        ...state,
        saveReportPost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PPV_PAYMENT_PAYPAL_START:
      return {
        ...state,
        ppvPayPal: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_PAYPAL_SUCCESS:
      return {
        ...state,
        ppvPayPal: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_PAYPAL_FAILURE:
      return {
        ...state,
        ppvPayPal: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case POST_FILE_REMOVE_START:
      return {
        ...state,
        fileRemove: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Deleting....",
          buttonDisable: true,
        },
      };
    case POST_FILE_REMOVE_SUCCESS:
      return {
        ...state,
        fileRemove: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_REMOVE_FAILURE:
      return {
        ...state,
        fileRemove: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PPV_PAYMENT_CCBILL_START:
      return {
        ...state,
        ppvPayCCBill: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_CCBILL_SUCCESS:
      return {
        ...state,
        ppvPayCCBill: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_CCBILL_FAILURE:
      return {
        ...state,
        ppvPayCCBill: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_COINPAYMENT_START:
      return {
        ...state,
        ppvPayCoinPayment: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_COINPAYMENT_SUCCESS:
      return {
        ...state,
        ppvPayCoinPayment: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_COINPAYMENT_FAILURE:
      return {
        ...state,
        ppvPayCoinPayment: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case FETCH_EXPLORE_START:
      return {
        ...state,
        explorePosts: {
          inputData: action.data,
          data: {
            ...state.explorePosts.data,
            posts: action.data?.append && action.data.append === true ? state.explorePosts.data.posts : [],
          },
          loading: true,
          error: false,
        },
      };
    case FETCH_EXPLORE_SUCCESS:
      return {
        ...state,
        explorePosts: {
          data: {
            posts: [...state.explorePosts.data.posts, ...action.data.posts],
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_EXPLORE_FAILURE:
      return {
        ...state,
        explorePosts: {
          data: state.explorePosts.data,
          loading: false,
          error: action.error,
        },
      };
    case FETCH_POST_CATEGORIES_START:
      return {
        ...state,
        postCategories: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_POST_CATEGORIES_SUCCESS:
      return {
        ...state,
        postCategories: {
          inputData: action.data,
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_POST_CATEGORIES_FAILURE:
      return {
        ...state,
        postCategories: {
          inputData: action.data,
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case FETCH_REPORT_REASON_START:
      return {
        ...state,
        reportReason: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_REPORT_REASON_SUCCESS:
      return {
        ...state,
        reportReason: {
          inputData: action.data,
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_REPORT_REASON_FAILURE:
      return {
        ...state,
        reportReason: {
          inputData: action.data,
          data: {},
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default PostReducer;
