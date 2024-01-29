import {
  FETCH_USER_STORIES_START,
  FETCH_USER_STORIES_SUCCESS,
  FETCH_USER_STORIES_FAILURE,
  STORY_FILE_UPLOAD_START,
  STORY_FILE_UPLOAD_SUCCESS,
  STORY_FILE_UPLOAD_FAILURE,
  FETCH_STORIES_START,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  STORY_FILE_DELETE_START,
  STORY_FILE_DELETE_SUCCESS,
  STORY_FILE_DELETE_FAILURE,
} from '../actions/ActionConstant'

const initialState = {
  stories: {
    data: {},
    loading: true,
    error: false,
  },
  storyUpload : {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent : "",
    buttonDisable : false
  },
  userStories: {
    data: {
      stories: [],
    },
    loading: true,
    error: false,
    skip: 0,
    length: 0,
  },
  storyDelete : {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent : "",
    buttonDisable : false
  },
}

const StoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORIES_START:
      return {
        ...state,
        stories: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_STORIES_SUCCESS:
      return {
        ...state,
        stories: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_STORIES_FAILURE:
      return {
        ...state,
        stories: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case STORY_FILE_UPLOAD_START:
      return {
        ...state,
        storyUpload: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent : "Uploading....",
          buttonDisable : true
        },
      };
    case STORY_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        storyUpload: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent : "",
          buttonDisable : false
        },
      };
    case STORY_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        storyUpload: {
          data: {},
          loading: true,
          error: action.error,
          loadingButtonContent : "",
          buttonDisable : false
        },
      };
    case STORY_FILE_DELETE_START:
      return {
        ...state,
        storyDelete: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent : "Uploading....",
          buttonDisable : true
        },
      };
    case STORY_FILE_DELETE_SUCCESS:
      return {
        ...state,
        storyDelete: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent : "",
          buttonDisable : false
        },
      };
    case STORY_FILE_DELETE_FAILURE:
      return {
        ...state,
        storyDelete: {
          data: {},
          loading: true,
          error: action.error,
          loadingButtonContent : "",
          buttonDisable : false
        },
      };
    case FETCH_USER_STORIES_START:
      return {
        ...state,
        userStories: {
          data: {
            stories: [...state.userStories.data.stories],
          },
          loading: true,
          error: false,
          skip: state.userStories.skip,
          length: state.userStories.length,
        },
      };
    case FETCH_USER_STORIES_SUCCESS:
      return {
        ...state,
        userStories: {
          data: {
            stories: [...state.userStories.data.stories, ...action.data.stories],
          },
          loading: false,
          error: false,
          skip: action.data.stories.length + state.userStories.skip,
          length: action.data.stories.length,
        },
      };
    case FETCH_USER_STORIES_FAILURE:
      return {
        ...state,
        userStories: {
          data: {},
          loading: true,
          error: action.error,
          skip: state.userStories.skip,
          length: state.userStories.length,
        },
      };
    default:
      return state;
  }
}

export default StoriesReducer;