
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_USER_PRODUCTS_START,
  USER_PRODUCTS_SAVE_START,
  FETCH_USER_SINGLE_PRODUCT_START,
  DELETE_USER_PRODUCT_START,
  SET_USER_PRODUCT_VISIBILITY_START,
  UPDATE_USER_PRODUCT_AVAILABILITY_START,
  FETCH_PRODUCT_CATEGORIES_START,
  FETCH_PRODUCT_SUB_CATEGORIES_START,
  FETCH_CART_LIST_START,
  SAVE_CART_DETAILS_START,
  REMOVE_CART_DETAILS_START,
  USER_PRODUCTS_SEARCH_START,
  FETCH_USER_PRODUCT_PICTURES_START,
  USER_PRODUCT_PICTURES_SAVE_START,
  USER_PRODUCT_PICTURES_DELETE_START,
  FETCH_ECOMM_HOME_START,
  USER_PRODUCT_VIEW_FOR_OTHERS_START,
  ORDERS_LIST_FOR_OTHERS_START,
  ORDERS_VIEW_FOR_OTHERS_START,
  FETCH_USER_ORDER_PAYMENTS_START,
  FETCH_DELIVERY_ADDRESS_START,
  ORDERS_PAYMENT_BY_WALLET_START,
  ORDERS_PAYMENT_BY_CARD_START,
  ORDERS_PAYMENT_BY_PAYPAL_START,
  FETCH_SINGLE_PRODUCT_ORDERS_START,
  FETCH_OTHER_MODEL_PRODUCT_LIST_START
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  fetchProductsProOwnerStart,
} from "../actions/ProductOwnerAction";

import {
  fetchUserProductsSuccess,
  fetchUserProductsFailure,
  userProductsSaveSuccess,
  userProductsSaveFailure,
  fetchUserSingleProductSuccess,
  fetchUserSingleProductFailure,
  deleteUserProductSuccess,
  deleteUserProductFailure,
  setUserProductVisibilitySuccess,
  setUserProductVisibilityFailure,
  updateUserProductAvailabilitySuccess,
  updateUserProductAvailabilityFailure,
  fetchProductCategoriesSuccess,
  fetchProductCategoriesFailure,
  fetchProductSubCategoriesSuccess,
  fetchProductSubCategoriesFailure,
  fetchCartListSuccess,
  fetchCartListFailure,
  saveCartDetailsSuccess,
  saveCartDetailsFailure,
  removeCartDetailsSuccess,
  removeCartDetailsFailure,
  userProductsSearchSuccess,
  userProductsSearchFailure,
  fetchUserProductPicturesSuccess,
  fetchUserProductPicturesFailure,
  userProductPicturesSaveSuccess,
  userProductPicturesSaveFailure,
  userProductPicturesDeleteSuccess,
  userProductPicturesDeleteFailure,
  fetchEcommHomeStart,
  fetchEcommHomeSuccess,
  fetchEcommHomeFailure,
  userProductViewForOthersSuccess,
  userProductViewForOthersFailure,
  ordersListForOthersSuccess,
  ordersListForOthersFailure,
  ordersViewForOthersSuccess,
  ordersViewForOthersFailure,
  fetchUserOrderPaymentsSuccess,
  fetchUserOrderPaymentsFailure,
  fetchDeliveryAddressSuccess,
  fetchDeliveryAddressFailure,
  fetchCartListStart,
  ordersPaymentByWalletSuccess,
  ordersPaymentByWalletFailure,
  ordersPaymentByCardSuccess,
  ordersPaymentByCardFailure,
  ordersPaymentByPaypalSuccess,
  ordersPaymentByPaypalFailure,
  fetchSingleProductOrdersSuccess,
  fetchSingleProductOrdersFailure,
  fetchOtherModelProductListStart,
  fetchOtherModelProductListSuccess,
  fetchOtherModelProductListFailure
} from "../actions/ProductsAction";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* fetchUserProductsAPI() {
  try {
    const response = yield api.postMethod("user_products");

    if (response.data.success) {
      yield put(fetchUserProductsSuccess(response.data.data));
    } else {
      yield put(fetchUserProductsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserProductsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userProductsSaveAPI(action) {
    try {
      const response = yield api.postMethod("user_products_save" , action.data);
  
      if (response.data.success) {
        yield put(userProductsSaveSuccess(response.data.data));
        window.location.assign("/single-product/" + response.data.data.unique_id);
      } else {
        yield put(userProductsSaveFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(userProductsSaveFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchUserSingleProductAPI(action) {
    try {
      const response = yield api.postMethod("user_products_view" , action.data);
  
      if (response.data.success) {
        yield put(fetchUserSingleProductSuccess(response.data.data));
      } else {
        yield put(fetchUserSingleProductFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchUserSingleProductFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* deleteUserProductAPI(action) {
    try {
      const response = yield api.postMethod("user_products_delete" , action.data);
  
      if (response.data.success) {
        yield put(deleteUserProductSuccess(response.data.data));
        yield put(fetchProductsProOwnerStart());
      } else {
        yield put(deleteUserProductFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(deleteUserProductFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* setUserProductVisibilityAPI(action) {
    try {
      const response = yield api.postMethod("user_products_set_visibility" , action.data);
  
      if (response.data.success) {
        yield put(setUserProductVisibilitySuccess(response.data.data));
      } else {
        yield put(setUserProductVisibilityFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(setUserProductVisibilityFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* updateUserProductAvailabilityAPI(action) {
    try {
      const response = yield api.postMethod("user_products_update_availability" , action.data);
  
      if (response.data.success) {
        yield put(updateUserProductAvailabilitySuccess(response.data.data));
      } else {
        yield put(updateUserProductAvailabilityFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(updateUserProductAvailabilityFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchProductCategoriesAPI() {
    try {
      const response = yield api.postMethod("product_categories");
  
      if (response.data.success) {
        yield put(fetchProductCategoriesSuccess(response.data.data));
      } else {
        yield put(fetchProductCategoriesFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchProductCategoriesFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchProductSubCategoriesAPI(action) {
    try {
      const response = yield api.postMethod("product_sub_categories", action.data);
  
      if (response.data.success) {
        yield put(fetchProductSubCategoriesSuccess(response.data.data));
      } else {
        yield put(fetchProductSubCategoriesFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchProductSubCategoriesFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchCartListAPI() {
    try {
      const response = yield api.postMethod("carts_list");
  
      if (response.data.success) {
        yield put(fetchCartListSuccess(response.data.data));
      } else {
        yield put(fetchCartListFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchCartListFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* saveCartDetailsAPI(action) {
    try {
      const response = yield api.postMethod("carts_save" , action.data);
  
      if (response.data.success) {
        yield put(saveCartDetailsSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        if(action.data.type == "userProfile")
          yield put(fetchOtherModelProductListStart({user_unique_id: action.data.otherUserUniquId}));
        else
          yield put(fetchEcommHomeStart());
        yield put(fetchCartListStart());
      } else {
        yield put(saveCartDetailsFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(saveCartDetailsFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* removeCartDetailsAPI(action) {
    try {
      const response = yield api.postMethod("carts_remove" , action.data);
  
      if (response.data.success) {
        yield put(removeCartDetailsSuccess(response.data.data));
        yield put(fetchCartListStart());
      } else {
        yield put(removeCartDetailsFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(removeCartDetailsFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* userProductsSearchAPI(action) {
    try {
      const response = yield api.postMethod("user_products_search" , action.data);
  
      if (response.data.success) {
        yield put(userProductsSearchSuccess(response.data.data));
      } else {
        yield put(userProductsSearchFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(userProductsSearchFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchUserProductPicturesAPI(action) {
    try {
      const response = yield api.postMethod("user_product_pictures" , action.data);
  
      if (response.data.success) {
        yield put(fetchUserProductPicturesSuccess(response.data.data));
      } else {
        yield put(fetchUserProductPicturesFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchUserProductPicturesFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* userProductPicturesSaveAPI(action) {
    try {
      const response = yield api.postMethod("user_product_pictures_save" , action.data);
  
      if (response.data.success) {
        yield put(userProductPicturesSaveSuccess(response.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
      } else {
        yield put(userProductPicturesSaveFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(userProductPicturesSaveFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* userProductPicturesDeleteAPI(action) {
    try {
      const response = yield api.postMethod("user_product_pictures_delete" , action.data);
  
      if (response.data.success) {
        yield put(userProductPicturesDeleteSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
      } else {
        yield put(userProductPicturesDeleteFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(userProductPicturesDeleteFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchEcommHomeAPI() {
    try {
      const response = yield api.postMethod("ecommerce_home");
  
      if (response.data.success) {
        yield put(fetchEcommHomeSuccess(response.data.data));
      } else {
        yield put(fetchEcommHomeFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchEcommHomeFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* userProductViewForOthersAPI(action) {
    try {
      const response = yield api.postMethod("user_products_view_for_others" , action.data);
  
      if (response.data.success) {
        yield put(userProductViewForOthersSuccess(response.data.data));
      } else {
        yield put(userProductViewForOthersFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(userProductViewForOthersFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* ordersListForOthersAPI(action) {
    try {
      const response = yield api.postMethod("orders_list_for_others" , action.data);
  
      if (response.data.success) {
        yield put(ordersListForOthersSuccess(response.data.data));
      } else {
        yield put(ordersListForOthersFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(ordersListForOthersFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* ordersViewForOthersAPI(action) {
    try {
      const response = yield api.postMethod("orders_view_for_others" , action.data);
  
      if (response.data.success) {
        yield put(ordersViewForOthersSuccess(response.data.data));
      } else {
        yield put(ordersViewForOthersFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(ordersViewForOthersFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchUserOrderPaymentsAPI() {
    try {
      const response = yield api.postMethod("order_payments_list");
  
      if (response.data.success) {
        yield put(fetchUserOrderPaymentsSuccess(response.data.data));
      } else {
        yield put(fetchUserOrderPaymentsFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchUserOrderPaymentsFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchDeliveryAddressAPI() {
    try {
      const response = yield api.postMethod("delivery_addresses_list");
  
      if (response.data.success) {
        yield put(fetchDeliveryAddressSuccess(response.data.data));
      } else {
        yield put(fetchDeliveryAddressFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchDeliveryAddressFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* orderWalletPaymentAPI(action) {
    try {
      const response = yield api.postMethod("orders_payment_by_wallet" , action.data);
  
      if (response.data.success) {
        yield put(ordersPaymentByWalletSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign(`/order-view/${response.data.data.unique_id}`)
      } else {
        yield put(ordersPaymentByWalletFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(ordersPaymentByWalletFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* ordercardPaymentAPI(action) {
    try {
      const response = yield api.postMethod("orders_payment_by_stripe" , action.data);
  
      if (response.data.success) {
        yield put(ordersPaymentByCardSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign(`/order-view/${response.data.data.unique_id}`)
      } else {
        yield put(ordersPaymentByPaypalFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(ordersPaymentByPaypalFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* orderPaypalPaymentAPI(action) {
    try {
      const response = yield api.postMethod("orders_payment_by_paypal" , action.data);
  
      if (response.data.success) {
        yield put(ordersPaymentByPaypalSuccess(response.data.data));
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign(`/order-view/${response.data.data.unique_id}`)
      } else {
        yield put(ordersPaymentByCardFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(ordersPaymentByCardFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchSingleProductOrdersAPI(action) {
    try {
      const response = yield api.postMethod("user_products_orders_list" , action.data);
  
      if (response.data.success) {
        yield put(fetchSingleProductOrdersSuccess(response.data.data));
      } else {
        yield put(fetchSingleProductOrdersFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchSingleProductOrdersFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

  function* fetchOtherModelProductListAPI(action) {
    try {
      const response = yield api.postMethod("other_model_product_list" , action.data);
  
      if (response.data.success) {
        yield put(fetchOtherModelProductListSuccess(response.data.data));
      } else {
        yield put(fetchOtherModelProductListFailure(response.data.error));
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(checkLogoutStatus(response.data));
        yield put(createNotification(notificationMessage));
      }
    } catch (error) {
      yield put(fetchOtherModelProductListFailure(error));
      const notificationMessage = getErrorNotificationMessage(error.message);
      yield put(createNotification(notificationMessage));
    }
  }

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_USER_PRODUCTS_START, fetchUserProductsAPI)]);
  yield all([yield takeLatest(USER_PRODUCTS_SAVE_START, userProductsSaveAPI)]);
  yield all([yield takeLatest(FETCH_USER_SINGLE_PRODUCT_START, fetchUserSingleProductAPI)]);
  yield all([yield takeLatest(DELETE_USER_PRODUCT_START, deleteUserProductAPI)]);
  yield all([yield takeLatest(SET_USER_PRODUCT_VISIBILITY_START, setUserProductVisibilityAPI)]);
  yield all([yield takeLatest(UPDATE_USER_PRODUCT_AVAILABILITY_START, updateUserProductAvailabilityAPI)]);
  yield all([yield takeLatest(FETCH_PRODUCT_CATEGORIES_START, fetchProductCategoriesAPI)]);
  yield all([yield takeLatest(FETCH_PRODUCT_SUB_CATEGORIES_START, fetchProductSubCategoriesAPI)]);
  yield all([yield takeLatest(FETCH_CART_LIST_START, fetchCartListAPI)]);
  yield all([yield takeLatest(SAVE_CART_DETAILS_START, saveCartDetailsAPI)]);
  yield all([yield takeLatest(REMOVE_CART_DETAILS_START, removeCartDetailsAPI)]);
  yield all([yield takeLatest(USER_PRODUCTS_SEARCH_START, userProductsSearchAPI)]);
  yield all([yield takeLatest(FETCH_USER_PRODUCT_PICTURES_START, fetchUserProductPicturesAPI)]);
  yield all([yield takeLatest(USER_PRODUCT_PICTURES_SAVE_START, userProductPicturesSaveAPI)]);
  yield all([yield takeLatest(USER_PRODUCT_PICTURES_DELETE_START, userProductPicturesDeleteAPI)]);
  yield all([yield takeLatest(FETCH_ECOMM_HOME_START, fetchEcommHomeAPI)]);
  yield all([yield takeLatest(USER_PRODUCT_VIEW_FOR_OTHERS_START, userProductViewForOthersAPI)]);
  yield all([yield takeLatest(ORDERS_LIST_FOR_OTHERS_START, ordersListForOthersAPI)]);
  yield all([yield takeLatest(ORDERS_VIEW_FOR_OTHERS_START, ordersViewForOthersAPI)]);
  yield all([yield takeLatest(FETCH_USER_ORDER_PAYMENTS_START, fetchUserOrderPaymentsAPI)]);
  yield all([yield takeLatest(FETCH_DELIVERY_ADDRESS_START, fetchDeliveryAddressAPI)]);
  yield all([yield takeLatest(ORDERS_PAYMENT_BY_WALLET_START, orderWalletPaymentAPI)]);
  yield all([yield takeLatest(ORDERS_PAYMENT_BY_CARD_START, ordercardPaymentAPI)]);
  yield all([yield takeLatest(ORDERS_PAYMENT_BY_PAYPAL_START, orderPaypalPaymentAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_PRODUCT_ORDERS_START, fetchSingleProductOrdersAPI)]);
  yield all([yield takeLatest(FETCH_OTHER_MODEL_PRODUCT_LIST_START, fetchOtherModelProductListAPI)]);
}
