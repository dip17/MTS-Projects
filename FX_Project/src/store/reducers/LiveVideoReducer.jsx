import {
  VIDEO_CALL_BROADCAST_START,
  VIDEO_CALL_BROADCAST_SUCCESS,
  VIDEO_CALL_BROADCAST_FAILURE,
  FETCH_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_SUCCESS,
  FETCH_LIVE_VIDEOS_FAILURE,
  FETCH_MORE_LIVE_VIDEOS_START,
  FETCH_LIVE_VIDEOS_HISTORY_START,
  FETCH_LIVE_VIDEOS_HISTORY_SUCCESS,
  FETCH_LIVE_VIDEOS_HISTORY_FAILURE,
  JOIN_LIVE_VIDEOS_START,
  JOIN_LIVE_VIDEOS_SUCCESS,
  JOIN_LIVE_VIDEOS_FAILURE,
  FETCH_SINGLE_LIVE_VIDEOS_START,
  FETCH_SINGLE_LIVE_VIDEOS_SUCCESS,
  FETCH_SINGLE_LIVE_VIDEOS_FAILURE,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS,
  LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS,
  LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE,
  LIVE_VIDEOS_VIEWER_UPDATE_START,
  LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS,
  LIVE_VIDEOS_VIEWER_UPDATE_FAILURE,
  LIVE_VIDEOS_END_START,
  LIVE_VIDEOS_END_SUCCESS,
  LIVE_VIDEOS_END_FAILURE,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS,
  LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE,
  FETCH_POPULAR_LIVE_VIDEOS_START,
  FETCH_MORE_POPULAR_LIVE_VIDEOS_START,
  FETCH_POPULAR_LIVE_VIDEOS_SUCCESS,
  FETCH_POPULAR_LIVE_VIDEOS_FAILURE,
  FETCH_RECOMMENDED_LIVE_VIDEOS_START,
  FETCH_MORE_RECOMMENDED_LIVE_VIDEOS_START,
  FETCH_RECOMMENDED_LIVE_VIDEOS_SUCCESS,
  FETCH_RECOMMENDED_LIVE_VIDEOS_FAILURE,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_START,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_SUCCESS,
  FETCH_LIVE_VIDEOS_CHAT_MESSAGES_FAILURE,
  FETCH_LIVE_VIDEOS_LIST_SUCCESS,
  FETCH_LIVE_VIDEOS_LIST_START,
  FETCH_LIVE_VIDEOS_LIST_FAILUER,
  FETCH_MORE_LIVE_VIDEOS_LIST_START,
  SINGLE_LIVE_VIDEO_VIEW_START,
  SINGLE_LIVE_VIDEO_VIEW_SUCCESS,
  SINGLE_LIVE_VIDEO_VIEW_FAILURE,
  FETCH_LIVE_AUDIENCE_LIST_START,
  FETCH_LIVE_AUDIENCE_LIST_SUCCESS,
  FETCH_LIVE_AUDIENCE_LIST_FAILURE,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_START,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_SUCCESS,
  FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_FAILURE,
  SAVE_LIVE_CHAT_MESSAGE_START,
  SAVE_LIVE_CHAT_MESSAGE_SUCCESS,
  SAVE_LIVE_CHAT_MESSAGE_FAILURE,
  ADD_LIVE_VIDEO_MESSAGE_CONTENT,
  FETCH_MORE_LIVE_VIDEOS_HISTORY_START,
  UPDATE_LIVE_AUDIENCE_LIST,
  UPDATE_LIVE_AUDIENCE_COUNT,
  UPDATE_LIVE_AUDIENCE_EARNING
} from "../actions/ActionConstant";

const initialState = {
  saveLiveVideo: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  joinliveVideo: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  singleLiveVideo: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveVideos: {
    data: {
      live_videos: [],
      total: 0,
    },
    loading: true,
    error: false,
    errorCount: 0,
  },
  liveVideosHistory: {
    data: {
      videos: [],
      total: 0,
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  liveWallet: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveStripe: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  livePaypal: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveViewerUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  liveEnd: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  popularLiveVideos: {
    data: {
      live_videos: [],
      total: 0,
    },
    loading: true,
    error: false,
    errorCount: 0,
  },
  recommendedLiveVideos: {
    data: {
      live_videos: [],
      total: 0,
    },
    loading: true,
    error: false,
    errorCount: 0,
  },
  liveVideoChatMessages: {
    data: [],
    loading: true,
    error: false,
  },
  liveVideosList: {
    data: {
      public_videos: [],
      private_videos: [],
      videos: [],
      total: 0,
    },
    loading: true,
    error: false,
    errorCount: 0,
  },
  singleLiveVideoView: {
    data: {},
    loading: true,
    error: false,
  },
  liveAudienceList: {
    data: {},
    viewers: [],
    total_earnings : null,
    total_earnings_formatted : null,
    viewer_count : null,
    loading: false,
    error: false,
  },
  liveChatMessageList: {
    data: {},
    loading: false,
    error: false,
  },
  liveChatMessageSave: {
    data: {},
    loading: false,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const LiveVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_CALL_BROADCAST_START:
      return {
        ...state,
        saveLiveVideo: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case VIDEO_CALL_BROADCAST_SUCCESS:
      return {
        ...state,
        saveLiveVideo: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case VIDEO_CALL_BROADCAST_FAILURE:
      return {
        ...state,
        saveLiveVideo: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LIVE_VIDEOS_START:
      return {
        ...state,
        liveVideos: {
          data: {
            live_videos: [],
            total: 0,
          },
          loading: true,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_MORE_LIVE_VIDEOS_START:
      return state;
    case FETCH_LIVE_VIDEOS_SUCCESS:
      return {
        ...state,
        liveVideos: {
          data: action.data,
          data: {
            live_videos: [
              ...state.liveVideos.data.live_videos,
              ...action.data.live_videos,
            ],
            total: action.data.total,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_LIVE_VIDEOS_FAILURE:
      return {
        ...state,
        liveVideos: {
          data: state.liveVideos.data,
          loading: false,
          error: action.error,
          errorCount: state.liveVideos.errorCount + 1,
        },
      };
    case FETCH_LIVE_VIDEOS_HISTORY_START:
      return {
        ...state,
        liveVideosHistory: {
          // data: {
          //   videos: [...state.liveVideosHistory.data.videos],
          // },
          data: {
            videos: [],
            total: 0,
          },
          loading: true,
          error: false,
          skip: state.liveVideosHistory.skip,
          length: state.liveVideosHistory.length,
        },
      };

    case FETCH_LIVE_VIDEOS_HISTORY_SUCCESS:
      return {
        ...state,
        liveVideosHistory: {
          // data: action.data,
          data: {
            ...state.liveVideosHistory.data,
            videos: [
              ...state.liveVideosHistory.data.videos,
              ...action.data.live_videos,
            ],
            total: action.data.total,
          },
          loading: false,
          error: false,
          skip: action.data.live_videos.length + state.liveVideosHistory.skip,
          length: action.data.live_videos.length,
        },
      };
    case FETCH_LIVE_VIDEOS_HISTORY_FAILURE:
      return {
        ...state,
        liveVideosHistory: {
          ...state.liveVideosHistory,
          loading: false,
          error: action.error,
          skip: state.liveVideosHistory.skip,
          length: state.liveVideosHistory.length,
        },
      };

    case FETCH_SINGLE_LIVE_VIDEOS_START:
      return {
        ...state,
        singleLiveVideo: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_LIVE_VIDEOS_SUCCESS:
      return {
        ...state,
        singleLiveVideo: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_LIVE_VIDEOS_FAILURE:
      return {
        ...state,
        singleLiveVideo: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case JOIN_LIVE_VIDEOS_START:
      return {
        ...state,
        joinliveVideo: {
          inputData: action.data,
          loading: true,
          error: false,
          data: {},
          buttonDisable: true,
          loadingButtonContent: "Loading... Please wait",
        },
      };
    case JOIN_LIVE_VIDEOS_SUCCESS:
      return {
        ...state,
        joinliveVideo: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case JOIN_LIVE_VIDEOS_FAILURE:
      return {
        ...state,
        joinliveVideo: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_STRIPE_START:
      return {
        ...state,
        liveStripe: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS:
      return {
        ...state,
        liveStripe: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE:
      return {
        ...state,
        liveStripe: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START:
      return {
        ...state,
        livePaypal: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS:
      return {
        ...state,
        livePaypal: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE:
      return {
        ...state,
        livePaypal: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_VIEWER_UPDATE_START:
      return {
        ...state,
        liveViewerUpdate: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS:
      return {
        ...state,
        liveViewerUpdate: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_VIEWER_UPDATE_FAILURE:
      return {
        ...state,
        liveViewerUpdate: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_END_START:
      return {
        ...state,
        liveEnd: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case LIVE_VIDEOS_END_SUCCESS:
      return {
        ...state,
        liveEnd: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_END_FAILURE:
      return {
        ...state,
        liveEnd: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_WALLET_START:
      return {
        ...state,
        liveWallet: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS:
      return {
        ...state,
        liveWallet: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE:
      return {
        ...state,
        liveWallet: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_POPULAR_LIVE_VIDEOS_START:
      return {
        ...state,
        popularLiveVideos: {
          data: {
            live_videos: [],
            total: 0,
          },
          loading: true,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_MORE_POPULAR_LIVE_VIDEOS_START:
      return state;
    case FETCH_POPULAR_LIVE_VIDEOS_SUCCESS:
      return {
        ...state,
        popularLiveVideos: {
          data: {
            live_videos: [
              ...state.popularLiveVideos.data.live_videos,
              ...action.data.live_videos,
            ],
            total: action.data.total,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_POPULAR_LIVE_VIDEOS_FAILURE:
      return {
        ...state,
        popularLiveVideos: {
          data: state.popularLiveVideos.data,
        },
        loading: false,
        error: action.error,
        errorCount: state.popularLiveVideos.errorCount + 1,
      };
    case FETCH_RECOMMENDED_LIVE_VIDEOS_START:
      return {
        ...state,
        recommendedLiveVideos: {
          data: {
            live_videos: [],
            total: 0,
          },
        },
        loading: true,
        error: false,
        errorCount: 0,
      };
    case FETCH_MORE_RECOMMENDED_LIVE_VIDEOS_START:
      return state;
    case FETCH_RECOMMENDED_LIVE_VIDEOS_SUCCESS:
      return {
        ...state,
        recommendedLiveVideos: {
          data: {
            live_videos: [
              ...state.recommendedLiveVideos.data.live_videos,
              ...action.data.live_videos,
            ],
            total: action.data.total,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_RECOMMENDED_LIVE_VIDEOS_FAILURE:
      return {
        ...state,
        recommendedLiveVideos: {
          data: state.recommendedLiveVideos.data,
          loading: false,
          error: false,
          errorCount: state.recommendedLiveVideos.errorCount + 1,
        },
      };
    case FETCH_LIVE_VIDEOS_CHAT_MESSAGES_START:
      return {
        ...state,
        liveVideoChatMessages: {
          data: [],
          loading: true,
          error: false,
        },
      };
    case FETCH_LIVE_VIDEOS_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        liveVideoChatMessages: {
          data: action.data.messages,
          loading: false,
          error: false,
        },
      };
    case FETCH_LIVE_VIDEOS_CHAT_MESSAGES_FAILURE:
      return {
        ...state,
        liveVideoChatMessages: {
          data: [],
          loading: false,
          error: action.error,
        },
      };
    case FETCH_LIVE_VIDEOS_LIST_START:
      return {
        ...state,
        liveVideosList: {
          data: {
            private_videos: [],
            public_videos: [],
            videos: [],
            total: 0,
          },
          loading: true,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_MORE_LIVE_VIDEOS_LIST_START:
      return state;
    case FETCH_LIVE_VIDEOS_LIST_SUCCESS:
      return {
        ...state,
        liveVideosList: {
          data: {
            private_videos: [
              ...state.liveVideosList.data.private_videos,
              ...action.data.private_videos,
            ],
            public_videos: [
              ...state.liveVideosList.data.public_videos,
              ...action.data.public_videos,
            ],
            videos: [
              ...state.liveVideosList.data.videos,
              ...action.data.videos,
            ],
            total: action.data.total_videos,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_LIVE_VIDEOS_LIST_FAILUER:
      return {
        ...state,
        liveVideosList: {
          data: state.liveVideosList.data,
          loading: false,
          error: action.error,
          errorCount: state.liveVideosList.errorCount + 1,
        },
      };
    case SINGLE_LIVE_VIDEO_VIEW_START:
      return {
        ...state,
        singleLiveVideoView: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case SINGLE_LIVE_VIDEO_VIEW_SUCCESS:
      return {
        ...state,
        singleLiveVideoView: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case SINGLE_LIVE_VIDEO_VIEW_FAILURE:
      return {
        ...state,
        singleLiveVideoView: {
          data: {},
          loaidng: false,
          error: action.error,
        },
      };
    case FETCH_LIVE_AUDIENCE_LIST_START:
      return {
        ...state,
        liveAudienceList: {
          ...state.liveAudienceList,
          data: {},
          viewers: [],
          loading: true,
          error: false,
        },
      };
    case FETCH_LIVE_AUDIENCE_LIST_SUCCESS:
      return {
        ...state,
        liveAudienceList: {
          ...state.liveAudienceList,
          data: action.data,
          viewers : action.data.viewers,
          loading: false,
          error: false,
        },
      };
    case FETCH_LIVE_AUDIENCE_LIST_FAILURE:
      return {
        ...state,
        liveAudienceList: {
          ...state.liveAudienceList,
          data: {},
          viewers: [],
          viewer_count : null,
          total_earnings : null,
          total_earnings_formatted : null,
          loading: false,
          error: action.data,
        },
      };
    case FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_START:
      return {
        ...state,
        liveChatMessageList: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        liveChatMessageList: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_LIVE_VIDEO_CHAT_MESSAGE_LIST_FAILURE:
      return {
        ...state,
        liveChatMessageList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case SAVE_LIVE_CHAT_MESSAGE_START:
      return {
        ...state,
        liveChatMessageSave: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "loading...",
          buttonDisable: true,
        },
      };
    case SAVE_LIVE_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        liveChatMessageSave: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_LIVE_CHAT_MESSAGE_FAILURE:
      return {
        ...state,
        liveChatMessageSave: {
          data: {},
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case ADD_LIVE_VIDEO_MESSAGE_CONTENT:
      return {
        ...state,
        liveVideoChatMessages: {
          data: [...state.liveVideoChatMessages.data, ...action.data],
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case FETCH_MORE_LIVE_VIDEOS_HISTORY_START:
      return {
        ...state,
        liveVideosHistory: {
          data: {
            videos: [...state.liveVideosHistory.data.videos],
          },
          loading: true,
          error: false,
          skip: state.liveVideosHistory.skip,
          length: state.liveVideosHistory.length,
        },
      };

    case UPDATE_LIVE_AUDIENCE_LIST:
      return {
        ...state,
        liveAudienceList: {
          ...state.liveAudienceList,
          viewers : action.data
        }
      };

      case UPDATE_LIVE_AUDIENCE_COUNT:
        return {
          ...state,
          liveAudienceList: {
            ...state.liveAudienceList,
            viewer_count : action.data
          }
        };

        case UPDATE_LIVE_AUDIENCE_EARNING:
        return {
          ...state,
          liveAudienceList: {
            ...state.liveAudienceList,
            total_earnings :  action.data.total_earnings,
            total_earnings_formatted :  action.data.total_earnings_formatted,
          }
        };

    default:
      return state;
  }
};

export default LiveVideoReducer;
