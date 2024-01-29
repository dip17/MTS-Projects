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
} from '../actions/ActionConstant'

const initialState = {
	products: {
		data: {},
		loading: true,
		error: false,
	},
	productSave: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productView: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productDelete: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productVisibility: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productAvailabilityUpdate: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productCategories: {
		data: {},
		loading: true,
		error: false,
	},
	productSubCategories: {
		data: {},
		loading: true,
		error: false,
	},
	cartList: {
		data: {},
		loading: true,
		error: false,
	},
	cartSave: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	cartRemove: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productSearch: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productPictures: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	productPicturesSave: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: null,
		buttonDisable: false
	},
	productPicturesDelete: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	ecommHome: {
		data: {},
		loading: true,
		error: false,
	},
	productViewForOthers: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	ordersListForOthers: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	ordersViewForOthers: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	userOrderPayments: {
		data: {},
		loading: true,
		error: false,
	},
	deliveryAddress: {
		data: {},
		loading: true,
		error: false,
	},
	ordersPayment: {
		data: {},
		loading: true,
		error: false,
		loadingButtonContent: "",
		buttonDisable: false
	},
	singleProductOrders: {
		data: {},
		loading: true,
		error: false,
	},
	otherModelProducts: {
		data: {},
		loading: true,
		error: false,
	}
}

const ProductsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_PRODUCTS_START:
			return {
				...state,
				products: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_USER_PRODUCTS_SUCCESS:
			return {
				...state,
				products: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_USER_PRODUCTS_FAILURE:
			return {
				...state,
				products: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case USER_PRODUCTS_SAVE_START:
			return {
				...state,
				productSave: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case USER_PRODUCTS_SAVE_SUCCESS:
			return {
				...state,
				productSave: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case USER_PRODUCTS_SAVE_FAILURE:
			return {
				...state,
				productSave: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_USER_SINGLE_PRODUCT_START:
			return {
				...state,
				productView: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "",
					buttonDisable: true
				},
			};
		case FETCH_USER_SINGLE_PRODUCT_SUCCESS:
			return {
				...state,
				productView: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_USER_SINGLE_PRODUCT_FAILURE:
			return {
				...state,
				productView: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case DELETE_USER_PRODUCT_START:
			return {
				...state,
				productDelete: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "",
					buttonDisable: true
				},
			};
		case DELETE_USER_PRODUCT_SUCCESS:
			return {
				...state,
				productDelete: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case DELETE_USER_PRODUCT_FAILURE:
			return {
				...state,
				productDelete: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case SET_USER_PRODUCT_VISIBILITY_START:
			return {
				...state,
				productVisibility: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "",
					buttonDisable: true
				},
			};
		case SET_USER_PRODUCT_VISIBILITY_SUCCESS:
			return {
				...state,
				productVisibility: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case SET_USER_PRODUCT_VISIBILITY_FAILURE:
			return {
				...state,
				productVisibility: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case UPDATE_USER_PRODUCT_AVAILABILITY_START:
			return {
				...state,
				productAvailabilityUpdate: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "",
					buttonDisable: true
				},
			};
		case UPDATE_USER_PRODUCT_AVAILABILITY_SUCCESS:
			return {
				...state,
				productAvailabilityUpdate: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case UPDATE_USER_PRODUCT_AVAILABILITY_FAILURE:
			return {
				...state,
				productAvailabilityUpdate: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_PRODUCT_CATEGORIES_START:
			return {
				...state,
				productCategories: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_PRODUCT_CATEGORIES_SUCCESS:
			return {
				...state,
				productCategories: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_PRODUCT_CATEGORIES_FAILURE:
			return {
				...state,
				productCategories: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case FETCH_PRODUCT_SUB_CATEGORIES_START:
			return {
				...state,
				productSubCategories: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_PRODUCT_SUB_CATEGORIES_SUCCESS:
			return {
				...state,
				productSubCategories: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_PRODUCT_SUB_CATEGORIES_FAILURE:
			return {
				...state,
				productSubCategories: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case FETCH_CART_LIST_START:
			return {
				...state,
				cartList: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_CART_LIST_SUCCESS:
			return {
				...state,
				cartList: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_CART_LIST_FAILURE:
			return {
				...state,
				cartList: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case SAVE_CART_DETAILS_START:
			return {
				...state,
				cartSave: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case SAVE_CART_DETAILS_SUCCESS:
			return {
				...state,
				cartSave: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case SAVE_CART_DETAILS_FAILURE:
			return {
				...state,
				cartSave: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case REMOVE_CART_DETAILS_START:
			return {
				...state,
				cartRemove: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case REMOVE_CART_DETAILS_SUCCESS:
			return {
				...state,
				cartRemove: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case REMOVE_CART_DETAILS_FAILURE:
			return {
				...state,
				cartRemove: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case USER_PRODUCTS_SEARCH_START:
			return {
				...state,
				productSearch: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case USER_PRODUCTS_SEARCH_SUCCESS:
			return {
				...state,
				productSearch: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case USER_PRODUCTS_SEARCH_FAILURE:
			return {
				...state,
				productSearch: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_USER_PRODUCT_PICTURES_START:
			return {
				...state,
				productPictures: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case FETCH_USER_PRODUCT_PICTURES_SUCCESS:
			return {
				...state,
				productPictures: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_USER_PRODUCT_PICTURES_FAILURE:
			return {
				...state,
				productPictures: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case USER_PRODUCT_PICTURES_SAVE_START:
			return {
				...state,
				productPicturesSave: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case USER_PRODUCT_PICTURES_SAVE_SUCCESS:
			return {
				...state,
				productPicturesSave: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: null,
					buttonDisable: false
				},
			};
		case USER_PRODUCT_PICTURES_SAVE_FAILURE:
			return {
				...state,
				productPicturesSave: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: null,
					buttonDisable: false
				},
			};
		case USER_PRODUCT_PICTURES_DELETE_START:
			return {
				...state,
				productPicturesDelete: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case USER_PRODUCT_PICTURES_DELETE_SUCCESS:
			return {
				...state,
				productPicturesDelete: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case USER_PRODUCT_PICTURES_DELETE_FAILURE:
			return {
				...state,
				productPicturesDelete: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_ECOMM_HOME_START:
			return {
				...state,
				ecommHome: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_ECOMM_HOME_SUCCESS:
			return {
				...state,
				ecommHome: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_ECOMM_HOME_FAILURE:
			return {
				...state,
				ecommHome: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case USER_PRODUCT_VIEW_FOR_OTHERS_START:
			return {
				...state,
				productViewForOthers: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case USER_PRODUCT_VIEW_FOR_OTHERS_SUCCESS:
			return {
				...state,
				productViewForOthers: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case USER_PRODUCT_VIEW_FOR_OTHERS_FAILURE:
			return {
				...state,
				productViewForOthers: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_LIST_FOR_OTHERS_START:
			return {
				...state,
				ordersListForOthers: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case ORDERS_LIST_FOR_OTHERS_SUCCESS:
			return {
				...state,
				ordersListForOthers: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_LIST_FOR_OTHERS_FAILURE:
			return {
				...state,
				ordersListForOthers: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_VIEW_FOR_OTHERS_START:
			return {
				...state,
				ordersViewForOthers: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case ORDERS_VIEW_FOR_OTHERS_SUCCESS:
			return {
				...state,
				ordersViewForOthers: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_VIEW_FOR_OTHERS_FAILURE:
			return {
				...state,
				ordersViewForOthers: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_USER_ORDER_PAYMENTS_START:
			return {
				...state,
				userOrderPayments: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_USER_ORDER_PAYMENTS_SUCCESS:
			return {
				...state,
				userOrderPayments: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_USER_ORDER_PAYMENTS_FAILURE:
			return {
				...state,
				userOrderPayments: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case FETCH_DELIVERY_ADDRESS_START:
			return {
				...state,
				deliveryAddress: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_DELIVERY_ADDRESS_SUCCESS:
			return {
				...state,
				deliveryAddress: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_DELIVERY_ADDRESS_FAILURE:
			return {
				...state,
				deliveryAddress: {
					data: {},
					loading: true,
					error: action.error,
				},
			};
		case ORDERS_PAYMENT_BY_WALLET_START:
			return {
				...state,
				ordersPayment: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case ORDERS_PAYMENT_BY_WALLET_SUCCESS:
			return {
				...state,
				ordersPayment: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_PAYMENT_BY_WALLET_FAILURE:
			return {
				...state,
				ordersPayment: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_PAYMENT_BY_CARD_START:
			return {
				...state,
				ordersPayment: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case ORDERS_PAYMENT_BY_CARD_SUCCESS:
			return {
				...state,
				ordersPayment: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_PAYMENT_BY_CARD_FAILURE:
			return {
				...state,
				ordersPayment: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_PAYMENT_BY_PAYPAL_START:
			return {
				...state,
				ordersPayment: {
					data: {},
					loading: true,
					error: false,
					loadingButtonContent: "Uploading....",
					buttonDisable: true
				},
			};
		case ORDERS_PAYMENT_BY_PAYPAL_SUCCESS:
			return {
				...state,
				ordersPayment: {
					data: action.data,
					loading: false,
					error: false,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case ORDERS_PAYMENT_BY_PAYPAL_FAILURE:
			return {
				...state,
				ordersPayment: {
					data: {},
					loading: true,
					error: action.error,
					loadingButtonContent: "",
					buttonDisable: false
				},
			};
		case FETCH_SINGLE_PRODUCT_ORDERS_START:
			return {
				...state,
				singleProductOrders: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_SINGLE_PRODUCT_ORDERS_SUCCESS:
			return {
				...state,
				singleProductOrders: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_SINGLE_PRODUCT_ORDERS_FAILURE:
			return {
				...state,
				singleProductOrders: {
					data: {},
					loading: false,
					error: action.error,
				},
			};
		case FETCH_OTHER_MODEL_PRODUCT_LIST_START:
			return {
				...state,
				otherModelProducts: {
					data: {},
					loading: true,
					error: false,
				},
			};
		case FETCH_OTHER_MODEL_PRODUCT_LIST_SUCCESS:
			return {
				...state,
				otherModelProducts: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case FETCH_OTHER_MODEL_PRODUCT_LIST_FAILURE:
			return {
				...state,
				otherModelProducts: {
					data: {},
					loading: false,
					error: action.error,
				},
			};
		default:
			return state;
	}
}

export default ProductsReducer;