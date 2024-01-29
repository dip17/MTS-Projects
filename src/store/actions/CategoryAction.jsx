import {
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORY_USERS_START,
  FETCH_CATEGORY_USERS_SUCCESS,
  FETCH_CATEGORY_USERS_FAILURE,
  FOLLOW_CATEGORY_START,
  FOLLOW_CATEGORY_SUCCESS,
  FOLLOW_CATEGORY_FAILURE,
} from "./ActionConstant";

export function updateCategoryStart(data) {
  return {
    type: UPDATE_CATEGORY_START,
    data,
  };
}

export function updateCategorySuccess(data) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    data,
  };
}

export function updateCategoryFailure(error) {
  return {
    type: UPDATE_CATEGORY_FAILURE,
    error,
  };
}
export function fetchCategoriesStart(data) {
  return {
    type: FETCH_CATEGORIES_START,
    data,
  };
}

export function fetchCategoriesSuccess(data) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    data,
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    error,
  };
}

export function fetchCategoryUsersStart(data) {
  return {
    type: FETCH_CATEGORY_USERS_START,
    data,
  };
}

export function fetchCategoryUsersSuccess(data) {
  return {
    type: FETCH_CATEGORY_USERS_SUCCESS,
    data,
  };
}

export function fetchCategoryUsersFailure(error) {
  return {
    type: FETCH_CATEGORY_USERS_FAILURE,
    error,
  };
}

export function followCategoryStart(data) {
  return {
    type: FOLLOW_CATEGORY_START,
    data,
  };
}

export function followCategorySuccess(data) {
  return {
    type: FOLLOW_CATEGORY_SUCCESS,
    data,
  };
}

export function followCategoryFailure(error) {
  return {
    type: FOLLOW_CATEGORY_FAILURE,
    error,
  };
}
