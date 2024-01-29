import {
  FETCH_USER_CATEGORY_LIST_START,
  FETCH_USER_CATEGORY_LIST_SUCCESS,
  FETCH_USER_CATEGORY_LIST_FAILURE,
  FETCH_CONTENT_CREATOR_LIST_START,
  FETCH_CONTENT_CREATOR_LIST_SUCCESS,
  FETCH_CONTENT_CREATOR_LIST_FAILURE,
  FETCH_CATEGORY_LISTING_START,
  FETCH_CATEGORY_LISTING_SUCCESS,
  FETCH_CATEGORY_LISTING_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  categoryList: {
    data: {},
    loading: true,
    error: false,
  },
  contentCreatorList: {
    data: {},
    loading: true,
    error: false,
  },
  buttonDisable: false,
  loadingButtonContent: null,
  categoryListing: {
    data: {
      categories: [],
      total: 0,
    },
    loading: true,
    error: false,
  }
};

const UserCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_CATEGORY_LIST_START:
      return {
        ...state,
        categoryList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case FETCH_USER_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };

    case FETCH_USER_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        categoryList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case FETCH_CONTENT_CREATOR_LIST_START:
      return {
        ...state,
        contentCreatorList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case FETCH_CONTENT_CREATOR_LIST_SUCCESS:
      return {
        ...state,
        contentCreatorList: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };

    case FETCH_CONTENT_CREATOR_LIST_FAILURE:
      return {
        ...state,
        contentCreatorList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case FETCH_CATEGORY_LISTING_START:
      return {
        ...state,
        categoryListing: {
          data: {
            ...state.categoryListing.data,
            categories: action.data.append && action.data.append === true ? state.categoryListing.data.categories : [],
          },
          loading: action.data.append && action.data.append === true ? false : true,
          error: false,
        }
      };
    case FETCH_CATEGORY_LISTING_SUCCESS:
      return {
        ...state,
        categoryListing: {
          data: {
            total: action.data.total,
            categories: [...state.categoryListing.data.categories, ...action.data.categories],
          },
          loading: false,
          error: false,
        }
      };
    case FETCH_CATEGORY_LISTING_FAILURE:
      return {
        ...state,
        categoryListing: {
          data: state.categoryListing.data,
          loading: false,
          error: action.error,
        }
      }

    default:
      return state;
  }
};

export default UserCategoryReducer;
