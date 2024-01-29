import {
  CHANGE_CHAT_AUDIO,
  FETCH_CHAT_USERS_FAILURE,
  FETCH_CHAT_USERS_START,
  FETCH_CHAT_USERS_SUCCESS,
  FETCH_USER_CHAT_ASSETS_START,
  FETCH_USER_CHAT_ASSETS_SUCCESS,
  FETCH_USER_CHAT_ASSETS_FAILURE,
  FETCH_CHAT_MESSAGES_START,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
  FETCH_MORE_CHAT_MESSAGES_START,
  UPDATE_CHAT_MESSAGES_SUCCESS,
  FORCE_CHAT_MESSAGES_SUCCESS,
  SAVE_CHAT_USERS_START,
  SAVE_CHAT_USERS_SUCCESS,
  SAVE_CHAT_USERS_FAILURE,
  CHAT_USER,
  CHAT_ASSET_FILES_UPLOAD_START,
  CHAT_ASSET_FILES_UPLOAD_SUCCESS,
  CHAT_ASSET_FILES_UPLOAD_FAILURE,
  FETCH_MORE_USER_CHAT_ASSETS_START,
  FETCH_MORE_CHAT_USERS_START,
  FORCE_CHAT_USERS_SUCCESS,
  FORCE_USER_CHAT_ASSETS_SUCCESS,
} from "../actions/ActionConstant";

const initialState = {
  currentAudio: {
    src: "",
  },
  chatUsers: {
    data: {},
    loading: true,
    error: false,
  },
  chatAssets: {
    data: {},
    loading: true,
    error: false,
  },
  chatMessages: {
    data: {},
    loading: true,
    error: false,
  },
  saveChatUser: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
  chatUser: null,
  chatFilesUpload: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  }
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHAT_AUDIO:
      return {
        ...state,
        currentAudio: action.data,
      }
    case FETCH_CHAT_USERS_START:
      return {
        ...state,
        chatUsers: {
          data: {
            users: [],
            total: 0,
          },
          loading: true,
          error: false,
        },
      };
    case FETCH_MORE_CHAT_USERS_START:
      return state;
    case FETCH_CHAT_USERS_SUCCESS:
      return {
        ...state,
        chatUsers: {
          data: {
            users: [...state.chatUsers.data.users, ...action.data.users],
            total: action.data.total,
          },
          loading: false,
          error: false,
        }
      };
    case FORCE_CHAT_USERS_SUCCESS:
      return {
        ...state,
        chatUsers: {
          data: action.data,
          loading: false,
          error: false,
        }
      }
    case FETCH_CHAT_USERS_FAILURE:
      return {
        ...state,
        chatUsers: {
          data: {},
          loading: false,
          error: action.error,
        }
      }
    case FETCH_USER_CHAT_ASSETS_START:
      return {
        ...state,
        chatAssets: {
          data: {
            chat_assets: [],
            total: 0
          },
          loading: true,
          error: false,
        }
      }
    case FETCH_MORE_USER_CHAT_ASSETS_START:
      return state;
    case FETCH_USER_CHAT_ASSETS_SUCCESS:
      return {
        ...state,
        chatAssets: {
          data: {
            chat_assets: [...state.chatAssets.data.chat_assets, ...action.data.chat_assets],
            total: action.data.total,
          },
          loading: false,
          error: false,
        }
      }
    case FORCE_USER_CHAT_ASSETS_SUCCESS:
      return {
        ...state,
        chatAssets: {
          data: action.data,
          loading: false,
          error: false,
        }
      }
    case FETCH_USER_CHAT_ASSETS_FAILURE:
      return {
        ...state,
        chatAssets: {
          data: {},
          loading: false,
          error: action.error,
        }
      }
    case FETCH_CHAT_MESSAGES_START:
      return {
        ...state,
        chatMessages: {
          data: {
            messages: [],
          },
          loading: true,
          error: false,
        }
      }
    case FETCH_MORE_CHAT_MESSAGES_START:
      return state;
    case FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        chatMessages: {
          data: {
            messages: [...state.chatMessages.data.messages, ...action.data.messages],
            is_block_user: action.data.is_block_user,
            total: action.data.total,
            user: action.data.user,
          },
          loading: false,
          error: false,
        }
      }
    case UPDATE_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        chatMessages: {
          data: {
            ...state.chatMessages.data,
            messages: [action.data, ...state.chatMessages.data.messages],
          },
          loading: false,
          error: false,
        }
      }
    case FORCE_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        chatMessages: {
          data: action.data,
          loading: false,
          error: false,
        }
      }
    case FETCH_CHAT_MESSAGES_FAILURE:
      return {
        ...state,
        chatMessages: {
          data: {},
          loading: false,
          error: action.error,
        }
      }

    case SAVE_CHAT_USERS_START:
      return {
        ...state,
        saveChatUser: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_CHAT_USERS_SUCCESS:
      return {
        ...state,
        saveChatUser: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_CHAT_USERS_FAILURE:
      return {
        ...state,
        saveChatUser: {
          data: {},
          loading: false,
          error: action.error,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHAT_USER:
      return {
        ...state,
        chatUser: action.data,
      }
    case CHAT_ASSET_FILES_UPLOAD_START:
      return {
        ...state,
        chatFilesUpload: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Uploading",
        }
      }
    case CHAT_ASSET_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        chatFilesUpload: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }
    case CHAT_ASSET_FILES_UPLOAD_FAILURE:
      return {
        ...state,
        chatFilesUpload: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }
    default: return state;
  }
}

export default ChatReducer;