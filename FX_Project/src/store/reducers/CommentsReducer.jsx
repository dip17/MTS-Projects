import {
  FETCH_COMMENTS_START,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_MORE_COMMENTS_START,
  SAVE_COMMENT_START,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  FETCH_COMMENT_REPLIES_START,
  FETCH_COMMENT_REPLIES_SUCCESS,
  FETCH_COMMENT_REPLIES_FAILURE,
  SAVE_COMMENT_REPLY_START,
  SAVE_COMMENT_REPLY_SUCCESS,
  SAVE_COMMENT_REPLY_FAILURE,
  FETCH_MORE_COMMENT_REPLIES_START,
} from "../actions/ActionConstant";

const initialState = {
  comments: {
    data: {
      post_comments: [],
      total: 0,
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
  },
  saveComment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delComment: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  commentReplies: {
    data: {
      post_comment_replies: [],
      total: 0,
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
  },
  saveCommentReply: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_START:
      return {
        ...state,
        comments: {
          data: {
            post_comments: [],
            total: 0,
          },
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
        },
      };
    case FETCH_MORE_COMMENTS_START:
      return state;
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          data: {
            post_comments: [...state.comments.data.post_comments, ...action.data.post_comments],
            total: action.data.total,
          },
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
        },
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        comments: {
          data: state.comments.data,
          loading: false,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
        },
      };
    case SAVE_COMMENT_START:
      return {
        ...state,
        saveComment: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        saveComment: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_COMMENT_FAILURE:
      return {
        ...state,
        saveComment: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_COMMENT_START:
      return {
        ...state,
        delComment: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        delComment: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        delComment: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_COMMENT_REPLY_START:
      return {
        ...state,
        saveCommentReply: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        saveCommentReply: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_COMMENT_REPLY_FAILURE:
      return {
        ...state,
        saveCommentReply: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_COMMENT_REPLIES_START:
      return {
        ...state,
        commentReplies: {
          data: {
            post_comment_replies: [],
            total: 0,
          },
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
        },
      };
    case FETCH_MORE_COMMENT_REPLIES_START:
      return state;
    case FETCH_COMMENT_REPLIES_SUCCESS:
      return {
        ...state,
        commentReplies: {
          data: {
            post_comment_replies: [...state.commentReplies.data.post_comment_replies, ...action.data.post_comment_replies],
            total: action.data.total,
          },
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
        },
      };
    case FETCH_COMMENT_REPLIES_FAILURE:
      return {
        ...state,
        commentReplies: {
          data: state.commentReplies.data,
          loading: false,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
        },
      };

    default:
      return state;
  }
};

export default CommentsReducer;
