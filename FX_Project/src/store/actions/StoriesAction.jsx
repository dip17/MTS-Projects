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
} from './ActionConstant'

export function fetchUserStoriesStart(data) {
  return {
    type: FETCH_USER_STORIES_START,
    data,
  };
}

export function fetchuserStoriesSuccess(data) {
  return {
    type: FETCH_USER_STORIES_SUCCESS,
    data,
  };
}

export function fetchUserStoriesFailure(error) {
  return {
    type: FETCH_USER_STORIES_FAILURE,
    error,
  };
}

export function fetchStoriesStart(data) {
  return {
    type: FETCH_STORIES_START,
    data,
  };
}

export function fetchStoriesSucess(data) {
  return {
    type: FETCH_STORIES_SUCCESS,
    data,
  };
}

export function fetchStoriesFailure(error) {
  return {
    type: FETCH_STORIES_FAILURE,
    error,
  };
}

export function storyFileUploadStart(data) {
  return {
    type: STORY_FILE_UPLOAD_START,
    data,
  };
}

export function storyFileUploadSuccess(data) {
  return {
    type: STORY_FILE_UPLOAD_SUCCESS,
    data,
  };
}

export function storyFileUploadFailure(error) {
  return {
    type: STORY_FILE_UPLOAD_FAILURE,
    error,
  };
}

export function storyFileDeleteStart(data) {
  return {
    type: STORY_FILE_DELETE_START,
    data,
  };
}

export function storyFileDeleteSuccess(data) {
  return {
    type: STORY_FILE_DELETE_SUCCESS,
    data,
  };
}

export function storyFileDeleteFailure(error) {
  return {
    type: STORY_FILE_DELETE_FAILURE,
    error,
  };
}