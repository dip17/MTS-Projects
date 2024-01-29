import {
  FETCH_SESSION_MANAGEMENT_LIST_START,
  FETCH_SESSION_MANAGEMENT_LIST_SUCCESS,
  FETCH_SESSION_MANAGEMENT_LIST_FAILURE,
  DELETE_SINGLE_LOGIN_SESSION_START,
  DELETE_SINGLE_LOGIN_SESSION_SUCCESS,
  DELETE_SINGLE_LOGIN_SESSION_FAILURE,
  DELETE_ALL_LOGIN_SESSION_START,
  DELETE_ALL_LOGIN_SESSION_SUCCESS,
  DELETE_ALL_LOGIN_SESSION_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  sessionList: {
    data: {
      session: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
  sessionDelete: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION_MANAGEMENT_LIST_START:
      return {
        ...state,
        sessionList: {
          data: {
            ...state.sessionList.data,
            session: action.data.append ? state.sessionList.data.session : [],
          },
          loading: action.data.append ? action.data.append : false,
          error: false,
        },
      };
    case FETCH_SESSION_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        sessionList: {
          data: {
            total: action.data.total,
            session: [...state.sessionList.data.session, ...action.data.session],
          },
          loading: false,
          error: false,
        },
      };
    case FETCH_SESSION_MANAGEMENT_LIST_FAILURE:
      return {
        ...state,
        sessionList: {
          data: state.sessionList.data,
          loading: true,
          error: action.error,
        },
      };
    case DELETE_SINGLE_LOGIN_SESSION_START:
      return {
        ...state,
        sessionDelete: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case DELETE_SINGLE_LOGIN_SESSION_SUCCESS:
      return {
        ...state,
        sessionDelete: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_SINGLE_LOGIN_SESSION_FAILURE:
      return {
        ...state,
        sessionDelete: {
          data: {},
          loading: true,
          error: action.error,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_ALL_LOGIN_SESSION_START:
      return {
        ...state,
        sessionDelete: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case DELETE_ALL_LOGIN_SESSION_SUCCESS:
      return {
        ...state,
        sessionDelete: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_ALL_LOGIN_SESSION_FAILURE:
      return {
        ...state,
        sessionDelete: {
          data: {},
          loading: true,
          error: action.error,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    default:
      return state;
  }
};

export default SessionReducer;
