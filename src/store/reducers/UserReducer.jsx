import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS,
  UPDATE_USER_DETAILS_START,
  UPDATE_USER_SUBSCRIPTION_DETAILS_START,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_LOGIN_DETAILS,
  GET_REGISTER_DETAILS,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_SUCCESS,
  REGISTER_VERIFY_FAILURE,
  REGISTER_VERIFY_RESEND_START,
  REGISTER_VERIFY_RESEND_SUCCESS,
  REGISTER_VERIFY_RESEND_FAILURE,
  NOTIFICATION_STATUS_UPDATE_START,
  NOTIFICATION_STATUS_UPDATE_SUCCESS,
  NOTIFICATION_STATUS_UPDATE_FAILURE,
  GET_FORGOT_PASSWORD_DETAILS,
  FETCH_PAYMENTS_START,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  FETCH_BLOCK_USERS_START,
  FETCH_BLOCK_USERS_SUCCESS,
  FETCH_BLOCK_USERS_FAILURE,
  SAVE_BLOCK_USER_START,
  SAVE_BLOCK_USER_SUCCESS,
  SAVE_BLOCK_USER_FAILURE,
  USER_VERIFY_BADGE_STATUS_SUCCESS,
  USER_VERIFY_BADGE_STATUS_START,
  USER_VERIFY_BADGE_STATUS_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  USERNAME_VALIDATION_START,
  USERNAME_VALIDATION_SUCCESS,
  USERNAME_VALIDATION_FAILURE,
  REFERRAL_VALIDATION_START,
  REFERRAL_VALIDATION_SUCCESS,
  REFERRAL_VALIDATION_FAILURE,
  FETCH_CONTENT_CREATOR_DASHBOARD_START,
  FETCH_CONTENT_CREATOR_DASHBOARD_SUCCESS,
  FETCH_CONTENT_CREATOR_DASHBOARD_FAILURE,
  TWO_STEP_AUTH_UPDATE_START,
  TWO_STEP_AUTH_UPDATE_SUCCESS,
  TWO_STEP_AUTH_UPDATE_FAILURE,
  TWO_STEP_AUTHENTICATION_LOGIN_START,
  TWO_STEP_AUTHENTICATION_LOGIN_SUCCESS,
  TWO_STEP_AUTHENTICATION_LOGIN_FAILURE,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_START,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_SUCCESS,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_FAILURE,
  SAVE_FEATURE_STORY_START,
  SAVE_FEATURE_STORY_SUCCESS,
  SAVE_FEATURE_STORY_FAILURE,
  DELETE_FEATURE_STORY_START,
  DELETE_FEATURE_STORY_SUCCESS,
  DELETE_FEATURE_STORY_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  profile: {
    data: {},
    loading: true,
    error: false,
  },
  profileInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  buttonDisable: false,
  loadingButtonContent: null,
  loginInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  registerInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  forgotPasswordInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  deleteAccount: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  registerVerify: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    buttonLoadingContent: null,
    inputData: {},
  },
  registerVerifyResend: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    buttonLoadingContent: null,
    inputData: {},
  },
  notificationUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  verifyBadgeUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  payments: {
    data: {},
    loading: true,
    error: false,
  },
  blockUsers: {
    data: {},
    loading: true,
    error: false,
  },
  saveBlockUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  validationInputData: {
    data: {},
    loading: true,
    error: false,
    isValid: false,
    isInValid: false,
    errorMessage: "",
  },
  referralInputData: {
    data: {},
    loading: true,
    error: false,
  },
  dashboard: {
    data: {},
    loading: true,
    error: false,
  },
  profileSubscriptionInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  twoStepAuthUpdate: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  twoStepAuthLogin: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  twoStepAuthCodeResend: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  saveFeatureStory: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteFeatureStory: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_START:
      return {
        ...state,
        profile: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        profile: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case EDIT_USER_DETAILS:
      return {
        ...state,
        profile: {
          loading: false,
          error: false,
          data: {
            ...state.profile.data,
            [action.name]: action.value,
          },
        },
      };
    case UPDATE_USER_DETAILS_START:
      return {
        ...state,
        profileInputData: {
          data: {
            first_name: state.profile.data.first_name,
            last_name: state.profile.data.last_name,
            email: state.profile.data.email,
            name: state.profile.data.name,
            username: state.profile.data.username,
            video_call_amount: state.profile.data.video_call_amount,
            audio_call_amount: state.profile.data.audio_call_amount,
            about: state.profile.data.about,
            is_online_status: state.profile.data.is_online_status,
            default_payment_method: state.profile.data.default_payment_method,
            gender: state.profile.data.gender,
            eyes_color: state.profile.data.eyes_color,
            height:
              state.profile.data.height == null ? 0 : state.profile.data.height,
            weight:
              state.profile.data.weight == null ? 0 : state.profile.data.weight,
            address: state.profile.data.address,
            website: state.profile.data.website,
            category_id: state.profile.data.category_id,
            amazon_wishlist: state.profile.data.amazon_wishlist,
            instagram_link: state.profile.data.instagram_link,
            facebook_link: state.profile.data.facebook_link,
            twitter_link: state.profile.data.twitter_link,
            snapchat_link: state.profile.data.snapchat_link,
            linkedin_link: state.profile.data.linkedin_link,
            pinterest_link: state.profile.data.pinterest_link,
            youtube_link: state.profile.data.youtube_link,
            twitch_link: state.profile.data.twitch_link,
            latitude: state.profile.data.latitude,
            longitude: state.profile.data.longitude,
            monthly_amount:
              state.profile.data.monthly_amount != undefined
                ? state.profile.data.monthly_amount
                : 0,
            yearly_amount:
              state.profile.data.yearly_amount != undefined
                ? state.profile.data.yearly_amount
                : 0,
            mobile:
              state.profile.data.mobile != null
                ? state.profile.data.mobile
                : "",
            picture: action.data
              ? action.data.picture != undefined
                ? action.data.picture
                : ""
              : "",
            cover: action.data
              ? action.data.cover != undefined
                ? action.data.cover
                : ""
              : "",
          },
          buttonDisable: true,
          loadingButtonContent: "Loading...please wait",
        },
      };
    case UPDATE_USER_SUBSCRIPTION_DETAILS_START:
      return {
        ...state,
        profileSubscriptionInputData: {
          data: {
            monthly_amount:
              state.profile.data.monthly_amount != undefined
                ? state.profile.data.monthly_amount
                : 0,
            yearly_amount:
              state.profile.data.yearly_amount != undefined
                ? state.profile.data.yearly_amount
                : 0,
          },
          buttonDisable: true,
          loadingButtonContent: "Loading...please wait",
        },
      };

    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          buttonDisable: false,
          loadingButtonContent: null,
          loading: false,
        },
        profileInputData: {
          ...state.profileInputData,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        profile: {
          data: state.profile.data,
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
        profileInputData: {
          ...state.profileInputData,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case GET_LOGIN_DETAILS:
      return {
        ...state,
        loginInputData: {
          loading: false,
          error: false,
          data: {
            ...state.loginInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case LOGIN_START:
      return {
        ...state,
        loginInputData: {
          data: {
            ...action.data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
        loginInputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginInputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case GET_REGISTER_DETAILS:
      return {
        ...state,
        registerInputData: {
          loading: false,
          error: false,
          data: {
            ...state.registerInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case REGISTER_START:
      return {
        ...state,
        registerInputData: {
          data: {
            ...action.data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
        },
        registerInputData: {
          data: {},
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerInputData: {
          data: {},
          loading: false,
          error: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case GET_FORGOT_PASSWORD_DETAILS:
      return {
        ...state,
        forgotPasswordInputData: {
          loading: false,
          error: false,
          data: {
            ...state.forgotPasswordInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case FORGOT_PASSWORD_START:
      return {
        ...state,
        forgotPasswordInputData: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordInputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordInputData: {
          data: {},
          loading: true,
          error: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case DELETE_ACCOUNT_START:
      return {
        ...state,
        deleteAccount: {
          data: {},
          loading: true,
          error: {},
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccount: {
          data: action.data,
          loading: true,
          error: {},
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        deleteAccount: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case REGISTER_VERIFY_START:
      return {
        ...state,
        registerVerify: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case REGISTER_VERIFY_SUCCESS:
      return {
        ...state,
        registerVerify: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case REGISTER_VERIFY_FAILURE:
      return {
        ...state,
        registerVerify: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case REGISTER_VERIFY_RESEND_START:
      return {
        ...state,
        registerVerifyResend: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case REGISTER_VERIFY_RESEND_SUCCESS:
      return {
        ...state,
        registerVerifyResend: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case REGISTER_VERIFY_RESEND_FAILURE:
      return {
        ...state,
        registerVerifyResend: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_START:
      return {
        ...state,
        notificationUpdate: {
          inputData: action.data,
          data: {},
          loading: true,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        notificationUpdate: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_FAILURE:
      return {
        ...state,
        notificationUpdate: {
          inputData: {},
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case FETCH_PAYMENTS_START:
      return {
        ...state,
        payments: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        payments: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case FETCH_BLOCK_USERS_START:
      return {
        ...state,
        blockUsers: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_BLOCK_USERS_SUCCESS:
      return {
        ...state,
        blockUsers: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_BLOCK_USERS_FAILURE:
      return {
        ...state,
        blockUsers: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_BLOCK_USER_START:
      return {
        ...state,
        saveBlockUser: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_BLOCK_USER_SUCCESS:
      return {
        ...state,
        saveBlockUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_BLOCK_USER_FAILURE:
      return {
        ...state,
        saveBlockUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case USER_VERIFY_BADGE_STATUS_START:
      return {
        ...state,
        verifyBadgeUpdate: {
          inputData: action.data,
          data: {},
          loading: true,
        },
      };
    case USER_VERIFY_BADGE_STATUS_SUCCESS:
      return {
        ...state,
        verifyBadgeUpdate: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case USER_VERIFY_BADGE_STATUS_FAILURE:
      return {
        ...state,
        verifyBadgeUpdate: {
          inputData: {},
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case RESET_PASSWORD_START:
      return {
        ...state,
        resetPasswordInputData: {
          inputData: action.data,
        },
        buttonDisable: true,
        loadingButtonContent: "Loading please wait",
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
        inputData: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        buttonDisable: false,
        loadingButtonContent: null,
      };
    case USERNAME_VALIDATION_START:
      return {
        ...state,
        validationInputData: {
          data: {
            ...action.data,
          },
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case USERNAME_VALIDATION_SUCCESS:
      return {
        ...state,
        // profile: {
        //   data: action.data.data,
        // },
        validationInputData: {
          data: {},
          loading: false,
          error: false,
          isValid: true,
          isInValid: false,
        },
      };
    case USERNAME_VALIDATION_FAILURE:
      // console.log("action", action.error.data.error);
      return {
        ...state,
        validationInputData: {
          data: {},
          loading: false,
          error: action.error,
          isInValid: true,
          isValid: false,
          errorMessage: action.error.data.error ?? "",
        },
      };
    case REFERRAL_VALIDATION_START:
      return {
        ...state,
        referralInputData: {
          data: {
            ...action.data,
          },
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case REFERRAL_VALIDATION_SUCCESS:
      return {
        ...state,
        // profile: {
        //   data: action.data.data,
        // },
        referralInputData: {
          data: {},
          loading: false,
          error: false,
        },
      };
    case REFERRAL_VALIDATION_FAILURE:
      return {
        ...state,
        referralInputData: {
          data: {},
          loading: false,
          error: action.data,
        },
      };
    case FETCH_CONTENT_CREATOR_DASHBOARD_START:
      return {
        ...state,
        dashboard: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_CONTENT_CREATOR_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_CONTENT_CREATOR_DASHBOARD_FAILURE:
      return {
        ...state,
        dashboard: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case TWO_STEP_AUTH_UPDATE_START:
      return {
        ...state,
        twoStepAuthUpdate: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case TWO_STEP_AUTH_UPDATE_SUCCESS:
      return {
        ...state,
        twoStepAuthUpdate: {
          data: action.data.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case TWO_STEP_AUTH_UPDATE_FAILURE:
      return {
        ...state,
        twoStepAuthUpdate: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case TWO_STEP_AUTHENTICATION_LOGIN_START:
      return {
        ...state,
        twoStepAuthLogin: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case TWO_STEP_AUTHENTICATION_LOGIN_SUCCESS:
      return {
        ...state,
        twoStepAuthLogin: {
          data: action.data.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case TWO_STEP_AUTHENTICATION_LOGIN_FAILURE:
      return {
        ...state,
        twoStepAuthLogin: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case TWO_STEP_AUTHENTICATION_CODE_RESEND_START:
      return {
        ...state,
        twoStepAuthCodeResend: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case TWO_STEP_AUTHENTICATION_CODE_RESEND_SUCCESS:
      return {
        ...state,
        twoStepAuthCodeResend: {
          data: action.data.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case TWO_STEP_AUTHENTICATION_CODE_RESEND_FAILURE:
      return {
        ...state,
        twoStepAuthCodeResend: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SAVE_FEATURE_STORY_START:
      return {
        ...state,
        saveFeatureStory: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_FEATURE_STORY_SUCCESS:
      return {
        ...state,
        saveFeatureStory: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_FEATURE_STORY_FAILURE:
      return {
        ...state,
        saveFeatureStory: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_FEATURE_STORY_START:
      return {
        ...state,
        deleteFeatureStory: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case DELETE_FEATURE_STORY_SUCCESS:
      return {
        ...state,
        deleteFeatureStory: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_FEATURE_STORY_FAILURE:
      return {
        ...state,
        deleteFeatureStory: {
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

export default userReducer;
