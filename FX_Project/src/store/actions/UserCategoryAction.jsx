import {
  FETCH_USER_CATEGORY_LIST_START,
  FETCH_USER_CATEGORY_LIST_SUCCESS,
  FETCH_USER_CATEGORY_LIST_FAILURE,
  FETCH_CONTENT_CREATOR_LIST_START,
  FETCH_CONTENT_CREATOR_LIST_SUCCESS,
  FETCH_CONTENT_CREATOR_LIST_FAILURE,
  FETCH_CATEGORY_LISTING_START,
  FETCH_CATEGORY_LISTING_FAILURE,
  FETCH_CATEGORY_LISTING_SUCCESS
} from './ActionConstant'


export function fetchUserCategoryListStart(data) {
  return {
    type: FETCH_USER_CATEGORY_LIST_START,
    data,
  };
}

export function fetchUserCategoryListSuccess(data) {
  return {
    type: FETCH_USER_CATEGORY_LIST_SUCCESS,
    data,
  };
}

export function fetchUserCategoryListFailure(error) {
  return {
    type: FETCH_USER_CATEGORY_LIST_FAILURE,
    error,
  };
}

export function fetchContentCreatorListStart(data) {
  return {
    type: FETCH_CONTENT_CREATOR_LIST_START,
    data,
  };
}

export function fetchContentCreatorListSuccess(data) {
  return {
    type: FETCH_CONTENT_CREATOR_LIST_SUCCESS,
    data,
  };
}

export function fetchContentCreatorListFailure(error) {
  return {
    type: FETCH_CONTENT_CREATOR_LIST_FAILURE,
    error,
  };
}


export function fetchCategoryListingStart(data) {
  return {
    type: FETCH_CATEGORY_LISTING_START,
    data,
  };
}

export function fetchCategoryListingSuccess(data) {
  return {
    type: FETCH_CATEGORY_LISTING_SUCCESS,
    data,
  };
}

export function fetchCategoryListingFailure(error) {
  return {
    type: FETCH_CATEGORY_LISTING_FAILURE,
    error,
  };
}