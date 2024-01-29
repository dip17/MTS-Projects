import {
  FETCH_SESSION_MANAGEMENT_LIST_START,
  FETCH_SESSION_MANAGEMENT_LIST_SUCCESS,
  FETCH_SESSION_MANAGEMENT_LIST_FAILURE,
  DELETE_SINGLE_LOGIN_SESSION_START,
  DELETE_SINGLE_LOGIN_SESSION_SUCCESS,
  DELETE_SINGLE_LOGIN_SESSION_FAILURE,
  DELETE_ALL_LOGIN_SESSION_START,
  DELETE_ALL_LOGIN_SESSION_SUCCESS,
  DELETE_ALL_LOGIN_SESSION_FAILURE
} from "./ActionConstant";

export function fetchSesssionManagementStart(data) {
  return {
    type: FETCH_SESSION_MANAGEMENT_LIST_START,
    data,
  };
}

export function fetchSesssionManagementSuccess(data) {
  return {
    type: FETCH_SESSION_MANAGEMENT_LIST_SUCCESS,
    data,
  };
}

export function fetchSesssionManagementFailure(error) {
  return {
    type: FETCH_SESSION_MANAGEMENT_LIST_FAILURE,
    error,
  };
}

export function deleteSingleLoginSessionStart(data) {
  return {
    type: DELETE_SINGLE_LOGIN_SESSION_START,
    data,
  };
}

export function deleteSingleLoginSessionSuccess(data) {
  return {
    type: DELETE_SINGLE_LOGIN_SESSION_SUCCESS,
    data,
  };
}

export function deleteSingleLoginSessionFailure(error) {
  return {
    type: DELETE_SINGLE_LOGIN_SESSION_FAILURE,
    error,
  };
}

export function deleteAllLoginSessionStart(data) {
  return {
    type: DELETE_ALL_LOGIN_SESSION_START,
    data,
  };
}

export function deleteAllLoginSessionSuccess(data) {
  return {
    type: DELETE_ALL_LOGIN_SESSION_SUCCESS,
    data,
  };
}

export function deleteAllLoginSessionFailure(error) {
  return {
    type: DELETE_ALL_LOGIN_SESSION_FAILURE,
    error,
  };
}