import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_MORE_NOTIFICATIONS_START,
} from "../actions/ActionConstant";

const initialState = {
  notification: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  notifications: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return {
        ...state,
        notification: {
          data: {
            notifications: [],
            total: 0,
          },
          loading: true,
          error: false,
          errorCount: 0,
        },
      };
      case FETCH_MORE_NOTIFICATIONS_START:
        return state;
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notification: {
          data: {
            notifications: [...state.notification.data.notifications, ...action.data.notifications],
            total: action.data.total,
          },
          loading: false,
          error: false,
          errorCount: 0,
        },
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notification: {
          data: state.notification.data,
          loading: true,
          error: action.error,
          errorCount: state.notification.errorCount + 1,
        },
      };
    default:
      return state;
  }
};

export default NotificationReducer;
