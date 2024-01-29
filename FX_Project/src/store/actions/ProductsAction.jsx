import {
    FETCH_USER_PRODUCTS_START,
    FETCH_USER_PRODUCTS_SUCCESS,
    FETCH_USER_PRODUCTS_FAILURE,
    USER_PRODUCTS_SAVE_START,
    USER_PRODUCTS_SAVE_SUCCESS,
    USER_PRODUCTS_SAVE_FAILURE,
    FETCH_USER_SINGLE_PRODUCT_START,
    FETCH_USER_SINGLE_PRODUCT_SUCCESS,
    FETCH_USER_SINGLE_PRODUCT_FAILURE,
    DELETE_USER_PRODUCT_START,
    DELETE_USER_PRODUCT_SUCCESS,
    DELETE_USER_PRODUCT_FAILURE,
    SET_USER_PRODUCT_VISIBILITY_START,
    SET_USER_PRODUCT_VISIBILITY_SUCCESS,
    SET_USER_PRODUCT_VISIBILITY_FAILURE,
    UPDATE_USER_PRODUCT_AVAILABILITY_START,
    UPDATE_USER_PRODUCT_AVAILABILITY_SUCCESS,
    UPDATE_USER_PRODUCT_AVAILABILITY_FAILURE,
    FETCH_PRODUCT_CATEGORIES_START,
    FETCH_PRODUCT_CATEGORIES_SUCCESS,
    FETCH_PRODUCT_CATEGORIES_FAILURE,
    FETCH_PRODUCT_SUB_CATEGORIES_START,
    FETCH_PRODUCT_SUB_CATEGORIES_SUCCESS,
    FETCH_PRODUCT_SUB_CATEGORIES_FAILURE,
    FETCH_CART_LIST_START,
    FETCH_CART_LIST_SUCCESS,
    FETCH_CART_LIST_FAILURE,
    SAVE_CART_DETAILS_START,
    SAVE_CART_DETAILS_SUCCESS,
    SAVE_CART_DETAILS_FAILURE,
    REMOVE_CART_DETAILS_START,
    REMOVE_CART_DETAILS_SUCCESS,
    REMOVE_CART_DETAILS_FAILURE,
    USER_PRODUCTS_SEARCH_START,
    USER_PRODUCTS_SEARCH_SUCCESS,
    USER_PRODUCTS_SEARCH_FAILURE,
    FETCH_USER_PRODUCT_PICTURES_START,
    FETCH_USER_PRODUCT_PICTURES_SUCCESS,
    FETCH_USER_PRODUCT_PICTURES_FAILURE,
    USER_PRODUCT_PICTURES_SAVE_START,
    USER_PRODUCT_PICTURES_SAVE_SUCCESS,
    USER_PRODUCT_PICTURES_SAVE_FAILURE,
    USER_PRODUCT_PICTURES_DELETE_START,
    USER_PRODUCT_PICTURES_DELETE_SUCCESS,
    USER_PRODUCT_PICTURES_DELETE_FAILURE,
    FETCH_ECOMM_HOME_START,
    FETCH_ECOMM_HOME_SUCCESS,
    FETCH_ECOMM_HOME_FAILURE,
    USER_PRODUCT_VIEW_FOR_OTHERS_START,
    USER_PRODUCT_VIEW_FOR_OTHERS_SUCCESS,
    USER_PRODUCT_VIEW_FOR_OTHERS_FAILURE,
    ORDERS_LIST_FOR_OTHERS_START,
    ORDERS_LIST_FOR_OTHERS_SUCCESS,
    ORDERS_LIST_FOR_OTHERS_FAILURE,
    ORDERS_VIEW_FOR_OTHERS_START,
    ORDERS_VIEW_FOR_OTHERS_SUCCESS,
    ORDERS_VIEW_FOR_OTHERS_FAILURE,
    FETCH_USER_ORDER_PAYMENTS_START,
    FETCH_USER_ORDER_PAYMENTS_SUCCESS,
    FETCH_USER_ORDER_PAYMENTS_FAILURE,
    FETCH_DELIVERY_ADDRESS_START,
    FETCH_DELIVERY_ADDRESS_SUCCESS,
    FETCH_DELIVERY_ADDRESS_FAILURE,
    ORDERS_PAYMENT_BY_WALLET_START,
    ORDERS_PAYMENT_BY_WALLET_SUCCESS,
    ORDERS_PAYMENT_BY_WALLET_FAILURE,
    ORDERS_PAYMENT_BY_CARD_START,
    ORDERS_PAYMENT_BY_CARD_SUCCESS,
    ORDERS_PAYMENT_BY_CARD_FAILURE,
    ORDERS_PAYMENT_BY_PAYPAL_START,
    ORDERS_PAYMENT_BY_PAYPAL_SUCCESS,
    ORDERS_PAYMENT_BY_PAYPAL_FAILURE,
    FETCH_SINGLE_PRODUCT_ORDERS_START,
    FETCH_SINGLE_PRODUCT_ORDERS_SUCCESS,
    FETCH_SINGLE_PRODUCT_ORDERS_FAILURE,
    FETCH_OTHER_MODEL_PRODUCT_LIST_START,
    FETCH_OTHER_MODEL_PRODUCT_LIST_SUCCESS,
    FETCH_OTHER_MODEL_PRODUCT_LIST_FAILURE
  } from './ActionConstant'
  
  export function fetchUserProductsStart(data) {
    return {
      type: FETCH_USER_PRODUCTS_START,
      data,
    };
  }
  
  export function fetchUserProductsSuccess(data) {
    return {
      type: FETCH_USER_PRODUCTS_SUCCESS,
      data,
    };
  }
  
  export function fetchUserProductsFailure(error) {
    return {
      type: FETCH_USER_PRODUCTS_FAILURE,
      error,
    };
  }
  
  export function userProductsSaveStart(data) {
    return {
      type: USER_PRODUCTS_SAVE_START,
      data,
    };
  }
  
  export function userProductsSaveSuccess(data) {
    return {
      type: USER_PRODUCTS_SAVE_SUCCESS,
      data,
    };
  }
  
  export function userProductsSaveFailure(error) {
    return {
      type: USER_PRODUCTS_SAVE_FAILURE,
      error,
    };
  }

  export function fetchUserSingleProductStart(data) {
    return {
      type: FETCH_USER_SINGLE_PRODUCT_START,
      data,
    };
  }
  
  export function fetchUserSingleProductSuccess(data) {
    return {
      type: FETCH_USER_SINGLE_PRODUCT_SUCCESS,
      data,
    };
  }
  
  export function fetchUserSingleProductFailure(error) {
    return {
      type: FETCH_USER_SINGLE_PRODUCT_FAILURE,
      error,
    };
  }

  export function deleteUserProductStart(data) {
    return {
      type: DELETE_USER_PRODUCT_START,
      data,
    };
  }
  
  export function deleteUserProductSuccess(data) {
    return {
      type: DELETE_USER_PRODUCT_SUCCESS,
      data,
    };
  }
  
  export function deleteUserProductFailure(error) {
    return {
      type: DELETE_USER_PRODUCT_FAILURE,
      error,
    };
  }

  export function setUserProductVisibilityStart(data) {
    return {
      type: SET_USER_PRODUCT_VISIBILITY_START,
      data,
    };
  }
  
  export function setUserProductVisibilitySuccess(data) {
    return {
      type: SET_USER_PRODUCT_VISIBILITY_SUCCESS,
      data,
    };
  }
  
  export function setUserProductVisibilityFailure(error) {
    return {
      type: SET_USER_PRODUCT_VISIBILITY_FAILURE,
      error,
    };
  }

  export function updateUserProductAvailabilityStart(data) {
    return {
      type: UPDATE_USER_PRODUCT_AVAILABILITY_START,
      data,
    };
  }
  
  export function updateUserProductAvailabilitySuccess(data) {
    return {
      type: UPDATE_USER_PRODUCT_AVAILABILITY_SUCCESS,
      data,
    };
  }
  
  export function updateUserProductAvailabilityFailure(error) {
    return {
      type: UPDATE_USER_PRODUCT_AVAILABILITY_FAILURE,
      error,
    };
  }

  export function fetchProductCategoriesStart(data) {
    return {
      type: FETCH_PRODUCT_CATEGORIES_START,
      data,
    };
  }
  
  export function fetchProductCategoriesSuccess(data) {
    return {
      type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
      data,
    };
  }
  
  export function fetchProductCategoriesFailure(error) {
    return {
      type: FETCH_PRODUCT_CATEGORIES_FAILURE,
      error,
    };
  }

  export function fetchProductSubCategoriesStart(data) {
    return {
      type: FETCH_PRODUCT_SUB_CATEGORIES_START,
      data,
    };
  }
  
  export function fetchProductSubCategoriesSuccess(data) {
    return {
      type: FETCH_PRODUCT_SUB_CATEGORIES_SUCCESS,
      data,
    };
  }
  
  export function fetchProductSubCategoriesFailure(error) {
    return {
      type: FETCH_PRODUCT_SUB_CATEGORIES_FAILURE,
      error,
    };
  }

  export function fetchCartListStart(data) {
    return {
      type: FETCH_CART_LIST_START,
      data,
    };
  }
  
  export function fetchCartListSuccess(data) {
    return {
      type: FETCH_CART_LIST_SUCCESS,
      data,
    };
  }
  
  export function fetchCartListFailure(error) {
    return {
      type: FETCH_CART_LIST_FAILURE,
      error,
    };
  }

  export function saveCartDetailsStart(data) {
    return {
      type: SAVE_CART_DETAILS_START,
      data,
    };
  }
  
  export function saveCartDetailsSuccess(data) {
    return {
      type: SAVE_CART_DETAILS_SUCCESS,
      data,
    };
  }
  
  export function saveCartDetailsFailure(error) {
    return {
      type: SAVE_CART_DETAILS_FAILURE,
      error,
    };
  }

  export function removeCartDetailsStart(data) {
    return {
      type: REMOVE_CART_DETAILS_START,
      data,
    };
  }
  
  export function removeCartDetailsSuccess(data) {
    return {
      type: REMOVE_CART_DETAILS_SUCCESS,
      data,
    };
  }
  
  export function removeCartDetailsFailure(error) {
    return {
      type: REMOVE_CART_DETAILS_FAILURE,
      error,
    };
  }

  export function userProductsSearchStart(data) {
    return {
      type: USER_PRODUCTS_SEARCH_START,
      data,
    };
  }
  
  export function userProductsSearchSuccess(data) {
    return {
      type: USER_PRODUCTS_SEARCH_SUCCESS,
      data,
    };
  }
  
  export function userProductsSearchFailure(error) {
    return {
      type: USER_PRODUCTS_SEARCH_FAILURE,
      error,
    };
  }

  export function fetchUserProductPicturesStart(data) {
    return {
      type: FETCH_USER_PRODUCT_PICTURES_START,
      data,
    };
  }
  
  export function fetchUserProductPicturesSuccess(data) {
    return {
      type: FETCH_USER_PRODUCT_PICTURES_SUCCESS,
      data,
    };
  }
  
  export function fetchUserProductPicturesFailure(error) {
    return {
      type: FETCH_USER_PRODUCT_PICTURES_FAILURE,
      error,
    };
  }

  export function userProductPicturesSaveStart(data) {
    return {
      type: USER_PRODUCT_PICTURES_SAVE_START,
      data,
    };
  }
  
  export function userProductPicturesSaveSuccess(data) {
    return {
      type: USER_PRODUCT_PICTURES_SAVE_SUCCESS,
      data,
    };
  }
  
  export function userProductPicturesSaveFailure(error) {
    return {
      type: USER_PRODUCT_PICTURES_SAVE_FAILURE,
      error,
    };
  }
  
  export function userProductPicturesDeleteStart(data) {
    return {
      type: USER_PRODUCT_PICTURES_DELETE_START,
      data,
    };
  }
  
  export function userProductPicturesDeleteSuccess(data) {
    return {
      type: USER_PRODUCT_PICTURES_DELETE_SUCCESS,
      data,
    };
  }
  
  export function userProductPicturesDeleteFailure(error) {
    return {
      type: USER_PRODUCT_PICTURES_DELETE_FAILURE,
      error,
    };
  }

  export function fetchEcommHomeStart(data) {
    return {
      type: FETCH_ECOMM_HOME_START,
      data,
    };
  }
  
  export function fetchEcommHomeSuccess(data) {
    return {
      type: FETCH_ECOMM_HOME_SUCCESS,
      data,
    };
  }
  
  export function fetchEcommHomeFailure(error) {
    return {
      type: FETCH_ECOMM_HOME_FAILURE,
      error,
    };
  }

  export function userProductViewForOthersStart(data) {
    return {
      type: USER_PRODUCT_VIEW_FOR_OTHERS_START,
      data,
    };
  }
  
  export function userProductViewForOthersSuccess(data) {
    return {
      type: USER_PRODUCT_VIEW_FOR_OTHERS_SUCCESS,
      data,
    };
  }
  
  export function userProductViewForOthersFailure(error) {
    return {
      type: USER_PRODUCT_VIEW_FOR_OTHERS_FAILURE,
      error,
    };
  }

  export function ordersListForOthersStart(data) {
    return {
      type: ORDERS_LIST_FOR_OTHERS_START,
      data,
    };
  }
  
  export function ordersListForOthersSuccess(data) {
    return {
      type: ORDERS_LIST_FOR_OTHERS_SUCCESS,
      data,
    };
  }
  
  export function ordersListForOthersFailure(error) {
    return {
      type: ORDERS_LIST_FOR_OTHERS_FAILURE,
      error,
    };
  }

  export function ordersViewForOthersStart(data) {
    return {
      type: ORDERS_VIEW_FOR_OTHERS_START,
      data,
    };
  }
  
  export function ordersViewForOthersSuccess(data) {
    return {
      type: ORDERS_VIEW_FOR_OTHERS_SUCCESS,
      data,
    };
  }
  
  export function ordersViewForOthersFailure(error) {
    return {
      type: ORDERS_VIEW_FOR_OTHERS_FAILURE,
      error,
    };
  }

  export function fetchUserOrderPaymentsStart(data) {
    return {
      type: FETCH_USER_ORDER_PAYMENTS_START,
      data,
    };
  }
  
  export function fetchUserOrderPaymentsSuccess(data) {
    return {
      type: FETCH_USER_ORDER_PAYMENTS_SUCCESS,
      data,
    };
  }
  
  export function fetchUserOrderPaymentsFailure(error) {
    return {
      type: FETCH_USER_ORDER_PAYMENTS_FAILURE,
      error,
    };
  }

  export function fetchDeliveryAddressStart(data) {
    return {
      type: FETCH_DELIVERY_ADDRESS_START,
      data,
    };
  }
  
  export function fetchDeliveryAddressSuccess(data) {
    return {
      type: FETCH_DELIVERY_ADDRESS_SUCCESS,
      data,
    };
  }
  
  export function fetchDeliveryAddressFailure(error) {
    return {
      type: FETCH_DELIVERY_ADDRESS_FAILURE,
      error,
    };
  }

  export function ordersPaymentByWalletStart(data) {
    return {
      type: ORDERS_PAYMENT_BY_WALLET_START,
      data,
    };
  }
  
  export function ordersPaymentByWalletSuccess(data) {
    return {
      type: ORDERS_PAYMENT_BY_WALLET_SUCCESS,
      data,
    };
  }
  
  export function ordersPaymentByWalletFailure(error) {
    return {
      type: ORDERS_PAYMENT_BY_WALLET_FAILURE,
      error,
    };
  }

  export function ordersPaymentByCardStart(data) {
    return {
      type: ORDERS_PAYMENT_BY_CARD_START,
      data,
    };
  }
  
  export function ordersPaymentByCardSuccess(data) {
    return {
      type: ORDERS_PAYMENT_BY_CARD_SUCCESS,
      data,
    };
  }
  
  export function ordersPaymentByCardFailure(error) {
    return {
      type: ORDERS_PAYMENT_BY_CARD_FAILURE,
      error,
    };
  }

  export function ordersPaymentByPaypalStart(data) {
    return {
      type: ORDERS_PAYMENT_BY_PAYPAL_START,
      data,
    };
  }
  
  export function ordersPaymentByPaypalSuccess(data) {
    return {
      type: ORDERS_PAYMENT_BY_PAYPAL_SUCCESS,
      data,
    };
  }
  
  export function ordersPaymentByPaypalFailure(error) {
    return {
      type: ORDERS_PAYMENT_BY_PAYPAL_FAILURE,
      error,
    };
  }

  export function fetchSingleProductOrdersStart(data) {
    return {
      type: FETCH_SINGLE_PRODUCT_ORDERS_START,
      data,
    };
  }
  
  export function fetchSingleProductOrdersSuccess(data) {
    return {
      type: FETCH_SINGLE_PRODUCT_ORDERS_SUCCESS,
      data,
    };
  }
  
  export function fetchSingleProductOrdersFailure(error) {
    return {
      type: FETCH_SINGLE_PRODUCT_ORDERS_FAILURE,
      error,
    };
  }

  export function fetchOtherModelProductListStart(data) {
    return {
      type: FETCH_OTHER_MODEL_PRODUCT_LIST_START,
      data,
    };
  }
  
  export function fetchOtherModelProductListSuccess(data) {
    return {
      type: FETCH_OTHER_MODEL_PRODUCT_LIST_SUCCESS,
      data,
    };
  }
  
  export function fetchOtherModelProductListFailure(error) {
    return {
      type: FETCH_OTHER_MODEL_PRODUCT_LIST_FAILURE,
      error,
    };
  }