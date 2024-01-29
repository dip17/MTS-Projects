import {
  FETCH_SINGLE_USER_PROFILE_START,
  FETCH_SINGLE_USER_PROFILE_SUCCESS,
  FETCH_SINGLE_USER_PROFILE_FAILURE,
  FETCH_SINGLE_USER_POSTS_START,
  FETCH_SINGLE_USER_POSTS_SUCCESS,
  FETCH_SINGLE_USER_POSTS_FAILURE,
  SEARCH_USER_POST_START,
  SEARCH_USER_POST_SUCCESS,
  SEARCH_USER_POST_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  userDetails: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  userPosts: {
    data: {
      posts: [],
      total: 0,
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  searchPosts: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const OtherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER_PROFILE_START:
      return {
        ...state,
        userDetails: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userDetails: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_USER_PROFILE_FAILURE:
      return {
        ...state,
        userDetails: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_USER_POSTS_START:
      return {
        ...state,
        userPosts: {
          data: {
            ...state.userPosts.data,
            posts: action.data.append ? [...state.userPosts.data.posts] : [],
          },
          loading: action.data.append ? false : true,
          error: false,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: {
          data: {
            posts: [...state.userPosts.data.posts, ...action.data.posts],
            total: action.data.total,
          },
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_USER_POSTS_FAILURE:
      return {
        ...state,
        userPosts: {
          data: state.userPosts.data,
          loading: false,
          error: action.error,
          loadingButtonContent: null,
          buttonDisable: false
        },
      };
    case SEARCH_USER_POST_START:
      return {
        ...state,
        searchPosts: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SEARCH_USER_POST_SUCCESS:
      return {
        ...state,
        searchPosts: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SEARCH_USER_POST_FAILURE:
      return {
        ...state,
        searchPosts: {
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

export default OtherUserReducer;
