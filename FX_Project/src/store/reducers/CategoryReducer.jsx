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
} from "../actions/ActionConstant";

const initialState = {
  updateCategory: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  categories: {
    data: {},
    loading: true,
    error: false,
  },
  categoryUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  followCategory: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_START:
      return {
        ...state,
        updateCategory: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updateCategory: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        updateCategory: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_CATEGORIES_START:
      return {
        ...state,
        categories: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case FETCH_CATEGORY_USERS_START:
      return {
        ...state,
        categoryUsers: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_CATEGORY_USERS_SUCCESS:
      return {
        ...state,
        categoryUsers: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_CATEGORY_USERS_FAILURE:
      return {
        ...state,
        categoryUsers: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case FOLLOW_CATEGORY_START:
      return {
        ...state,
        followCategory: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FOLLOW_CATEGORY_SUCCESS:
      return {
        ...state,
        followCategory: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FOLLOW_CATEGORY_FAILURE:
      return {
        ...state,
        followCategory: {
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

export default CategoryReducer;
