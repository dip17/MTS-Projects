import {
  FETCH_CARD_DETAILS_START,
  FETCH_CARD_DETAILS_SUCCESS,
  FETCH_CARD_DETAILS_FAILURE,
  DELETE_CARD_START,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  SELECT_DEFAULT_CARD_START,
  SELECT_DEFAULT_CARD_SUCCESS,
  SELECT_DEFAULT_CARD_FAILURE,
  ADD_CARD_START,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  cardDetails: {
    data: {},
    loading: true,
    error: false,
  },
  deleteCard: {
    data: {},
    loading: true,
    error: false,
  },
  selectDefaultCard: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  buttonDisable: false,
  loadingButtonContent: null,
  addCard: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

const CardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARD_DETAILS_START:
      return {
        ...state,
        cardDetails: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_CARD_DETAILS_SUCCESS:
      return {
        ...state,
        cardDetails: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_CARD_DETAILS_FAILURE:
      return {
        ...state,
        cardDetails: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case DELETE_CARD_START:
      return {
        ...state,
        deleteCard: {
          data: action.data,
          loading: true,
          error: false,
        },
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        deleteCard: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case DELETE_CARD_FAILURE:
      return {
        ...state,
        deleteCard: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SELECT_DEFAULT_CARD_START:
      return {
        ...state,
        selectDefaultCard: {
          inputData: action.data,
          loading: true,
          error: false,
          data: {},
        },
      };
    case SELECT_DEFAULT_CARD_SUCCESS:
      return {
        ...state,
        selectDefaultCard: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case SELECT_DEFAULT_CARD_FAILURE:
      return {
        ...state,
        selectDefaultCard: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };
    case ADD_CARD_START:
      return {
        ...state,
        addCard: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading",
        }
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        addCard: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      };
    case ADD_CARD_FAILURE:
      return {
        ...state,
        addCard: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }
    default:
      return state;
  }
};

export default CardsReducer;
