import {
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_FAILURE,
  FETCH_BOOKMARKS_PHOTO_START,
  FETCH_BOOKMARKS_PHOTO_SUCCESS,
  FETCH_BOOKMARKS_PHOTO_FAILURE,
  FETCH_BOOKMARKS_VIDEO_START,
  FETCH_BOOKMARKS_VIDEO_SUCCESS,
  FETCH_BOOKMARKS_VIDEO_FAILURE,
  SAVE_BOOKMARK_START,
  SAVE_BOOKMARK_SUCCESS,
  SAVE_BOOKMARK_FAILURE,
  DELETE_BOOKMARK_START,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILURE,
  FETCH_BOOKMARKS_AUDIO_START,
  FETCH_BOOKMARKS_AUDIO_SUCCESS,
  FETCH_BOOKMARKS_AUDIO_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  bookmark: {
    data: {
      posts: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
  bookmarkPhoto: {
    data: {
      posts: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
  bookmarkVideo: {
    data: {
      posts: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
  saveBookmark: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteBookmark: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  bookmarkAudio: {
    data: {
      posts: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
};

const BookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKMARKS_START:
      return {
        ...state,
        bookmark: {
          data: {
            ...state.bookmark.data,
            posts: action.data.append && action.data.append === true ? state.bookmark.data.posts : [],
          },
          loading: action.data.append && action.data.append === true ? false : true,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_SUCCESS:
      return {
        ...state,
        bookmark: {
          data: {
            posts: [...state.bookmark.data.posts, ...action.data.posts],
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_FAILURE:
      return {
        ...state,
        bookmark: {
          data: state.bookmark.data,
          loading: true,
          error: action.error,
        },
      };

    case FETCH_BOOKMARKS_PHOTO_START:
      return {
        ...state,
        bookmarkPhoto: {
          data: {
            ...state.bookmarkPhoto.data,
            posts: action.data.append && action.data.append === true ? state.bookmarkPhoto.data.posts : [],
          },
          loading: action.data.append && action.data.append === true ? false : true,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_PHOTO_SUCCESS:
      return {
        ...state,
        bookmarkPhoto: {
          data: {
            total: action.data.total,
            posts: [...state.bookmarkPhoto.data.posts, ...action.data.posts],
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_PHOTO_FAILURE:
      return {
        ...state,
        bookmarkPhoto: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          skip: state.bookmarkPhoto.skip,
          length: state.bookmarkPhoto.length,
        },
      };

    case FETCH_BOOKMARKS_VIDEO_START:
      return {
        ...state,
        bookmarkVideo: {
          data: {
            ...state.bookmarkVideo.data,
            posts: action.data.append && action.data.append === true ? state.bookmarkVideo.data.posts : [],
          },
          loading: action.data.append && action.data.append === true ? false : true,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_VIDEO_SUCCESS:
      return {
        ...state,
        bookmarkVideo: {
          data: {
            posts: [...state.bookmarkVideo.data.posts, ...action.data.posts],
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_VIDEO_FAILURE:
      return {
        ...state,
        bookmarkVideo: {
          data: state.bookmarkVideo.data,
          loading: true,
          error: action.error,
        },
      };
    case SAVE_BOOKMARK_START:
      return {
        ...state,
        saveBookmark: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_BOOKMARK_SUCCESS:
      return {
        ...state,
        saveBookmark: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_BOOKMARK_FAILURE:
      return {
        ...state,
        saveBookmark: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_BOOKMARK_START:
      return {
        ...state,
        deleteBookmark: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        deleteBookmark: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_BOOKMARK_FAILURE:
      return {
        ...state,
        deleteBookmark: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_BOOKMARKS_AUDIO_START:
      return {
        ...state,
        bookmarkAudio: {
          data: {
            ...state.bookmarkAudio.data,
            posts: action.data.append && action.data.append === true ? state.bookmarkAudio.data.posts : [],
          },
          loading: action.data.append && action.data.append === true ? false : true,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_AUDIO_SUCCESS:
      return {
        ...state,
        bookmarkAudio: {
          data: {
            posts: [...state.bookmarkAudio.data.posts, ...action.data.posts],
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_BOOKMARKS_AUDIO_FAILURE:
      return {
        ...state,
        bookmarkAudio: {
          data: state.bookmarkAudio.data,
          loading: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default BookmarkReducer;
