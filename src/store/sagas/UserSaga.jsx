import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  updateUserDetailsSuccess,
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  deleteAccountSuccess,
  deleteAccountFailure,
  updateUserDetailsFailure,
  registerVerifyFailure,
  registerVerifyResendFailure,
  registerVerifySuccess,
  registerVerifyResendSuccess,
  notificationStatusUpdateSuccess,
  notificationStatusUpdateFailure,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  saveBlockUserSuccess,
  saveBlockUserFailure,
  fetchBlockUsersSuccess,
  fetchBlockUsersFailure,
  resetPasswordFailure,
  resetPasswordSuccess,
  usernameValidationSuccess,
  usernameValidationFailure,
  referralValidationSuccess,
  referralValidationFailure,
  fetchContentCreatorDashboardSuccess,
  fetchContentCreatorDashboardFailure,
  twoStepAuthUpdateSuccess,
  twoStepAuthUpdateFAilure,
  twoStepAuthenticationLoginSuccess,
  twoStepAuthenticationLoginFailure,
  twoStepAuthenticationCodeResendSuccess,
  twoStepAuthenticationCodeResendFailure,
  saveFeatureStorySuccess,
  saveFeatureStoryFailure,
  deleteFeatureStorySuccess,
  deleteFeatureStoryFailure,
  fetchUserDetailsStart,
} from "../actions/UserAction";

import api from "../../Environment";
import {
  FETCH_USER_DETAILS_START,
  UPDATE_USER_DETAILS_START,
  UPDATE_USER_SUBSCRIPTION_DETAILS_START,
  LOGIN_START,
  REGISTER_START,
  FORGOT_PASSWORD_START,
  DELETE_ACCOUNT_START,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_RESEND_START,
  NOTIFICATION_STATUS_UPDATE_START,
  FETCH_PAYMENTS_START,
  FETCH_BLOCK_USERS_START,
  SAVE_BLOCK_USER_START,
  USER_VERIFY_BADGE_STATUS_START,
  RESET_PASSWORD_START,
  USERNAME_VALIDATION_START,
  REFERRAL_VALIDATION_START,
  FETCH_CONTENT_CREATOR_DASHBOARD_START,
  TWO_STEP_AUTH_UPDATE_START,
  TWO_STEP_AUTHENTICATION_LOGIN_START,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_START,
  SAVE_FEATURE_STORY_START,
  DELETE_FEATURE_STORY_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { checkLogoutStatus } from "../actions/ErrorAction";
import { id } from "date-fns/locale";

function* getUserDetailsAPI() {
  try {
    const response = yield api.postMethod("profile");

    if (response.data.success) {
      yield put(fetchUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem(
        "total_followers",
        response.data.data.total_followers
      );
      localStorage.setItem(
        "total_followings",
        response.data.data.total_followings
      );
      localStorage.setItem(
        "is_subscription_enabled",
        response.data.data.is_subscription_enabled
      );
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem(
        "is_content_creator",
        response.data.data.is_content_creator
      );
      localStorage.setItem(
        "default_payment_method",
        response.data.data.default_payment_method
      );
      localStorage.setItem(
        "is_two_step_auth_enabled",
        response.data.data.is_two_step_auth_enabled
      );
    } else {
      yield put(fetchUserDetailsFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* updateUserDetailsAPI(action) {
  try {
    const userData = yield select((state) => state.users.profileInputData.data);
    const response = yield api.postMethod("update_profile", action.data);
    if (response.data.success) {
      yield put(updateUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem(
        "is_content_creator",
        response.data.data.is_content_creator
      );
      localStorage.setItem(
        "default_payment_method",
        response.data.data.default_payment_method
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      // window.location.assign("/profile");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(updateUserDetailsFailure(response.data.error));
    }
  } catch (error) {
    yield put(updateUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userLoginAPI() {
  try {
    const userData = yield select((state) => state.users.loginInputData.data);
    const response = yield api.postMethod("login", userData);
    yield put(userLoginSuccess(response.data));
    if (response.data.success) {
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("device_unique_id", response.data.data.device_unique_id);
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        if (response.data.code == 240) {
          const notificationMessage = getSuccessNotificationMessage(
            response.data.message
          );
          yield put(createNotification(notificationMessage));
          window.location.assign("/verification");
          localStorage.setItem("emailId", response.data.data.email);
        } else {
          localStorage.setItem("userLoginStatus", true);
          localStorage.setItem("user_picture", response.data.data.picture);
          localStorage.setItem("user_cover", response.data.data.cover);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("username", response.data.data.username);
          localStorage.setItem("socket", true);
          localStorage.setItem(
            "user_unique_id",
            response.data.data.user_unique_id
          );
          localStorage.setItem(
            "is_document_verified",
            response.data.data.is_document_verified
          );
          localStorage.setItem(
            "is_verified_badge",
            response.data.data.is_verified_badge
              ? response.data.data.is_verified_badge
              : 0
          );
          localStorage.setItem(
            "is_content_creator",
            response.data.data.is_content_creator
          );
          localStorage.setItem(
            "default_payment_method",
            response.data.data.default_payment_method
          );
          localStorage.setItem(
            "is_two_step_auth_enabled",
            response.data.data.is_two_step_auth_enabled
          );
          localStorage.setItem("emailId", response.data.data.email);
          const notificationMessage = getSuccessNotificationMessage(
            response.data.message
          );
          yield put(createNotification(notificationMessage));
          if (userData.isReload) {
            window.location.reload();
          } else {
            window.location.assign("/home");
          }
        }

      }
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(userLoginFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userRegisterAPI() {
  try {
    const userData = yield select(
      (state) => state.users.registerInputData.data
    );
    const response = yield api.postMethod("register", userData);
    yield put(userRegisterSuccess(response.data));

    if (response.data.success) {
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("device_unique_id", response.data.data.device_unique_id);
      if (response.data.code == 1001) {
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/register/verify");
      }
      else {
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("socket", true);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        localStorage.setItem(
          "is_two_step_auth_enabled",
          response.data.data.is_two_step_auth_enabled
        );
        localStorage.setItem(
          "is_content_creator",
          response.data.data.is_content_creator
        );
        localStorage.setItem(
          "default_payment_method",
          response.data.data.default_payment_method
        );
        localStorage.setItem("emailId", response.data.data.email);
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        if (response.data.data.is_welcome_steps == 1) {
          window.location.assign("/upload-profile-picture");
        } else {
          if (userData.isReload) {
            window.location.reload();
          } else {
            window.location.assign("/home");
          }
        }
      }
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(userRegisterFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* forgotPasswordAPI() {
  try {
    const userData = yield select(
      (state) => state.users.forgotPasswordInputData.data
    );

    if (
      !userData.email ||
      userData.email == undefined ||
      userData.email == null
    ) {
      const notificationMessage = getErrorNotificationMessage(
        "Please enter the email address"
      );
      yield put(createNotification(notificationMessage));
      yield put(forgotPasswordFailure());
    } else {
      const response = yield api.postMethod("forgot_password", userData);
      yield put(forgotPasswordSuccess(response.data));
      if (response.data.success) {
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(createNotification(notificationMessage));
        window.location.assign("/");
      } else {
        const notificationMessage = getErrorNotificationMessage(
          response.data.error
        );
        yield put(createNotification(notificationMessage));
      }
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteAccountAPI() {
  try {
    const userData = yield select(
      (state) => state.users.deleteAccount.inputData
    );
    const response = yield api.postMethod("delete_account", userData);
    yield put(deleteAccountSuccess(response.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* registerVerify() {
  try {
    const inputData = yield select(
      (state) => state.users.registerVerify.inputData
    );

    const response = yield api.postMethod("verify_email", inputData);

    if (response.data.success) {
      yield put(registerVerifySuccess(response.data));
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("userLoginStatus", true);
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("username", response.data.data.first_name);
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem("socket", true);
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/home");
    } else {
      yield put(registerVerifyFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(registerVerifyFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* registerVerifyResend() {
  try {
    const response = yield api.postMethod("regenerate_email_verification_code");

    if (response.data.success) {
      yield put(registerVerifyResendSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(registerVerifyResendFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(registerVerifyResendFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* notificationStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.notificationUpdate.inputData
    );
    const response = yield api.postMethod(
      "notifications_status_update",
      userData
    );
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error
    );
    yield put(createNotification(notificationMessage));
  }
}

function* verificationBadgeStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.verifyBadgeUpdate.inputData
    );
    const response = yield api.postMethod("verified_badge_status", userData);
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getPaymentsAPI() {
  try {
    const response = yield api.postMethod("payments_index");

    if (response.data.success) {
      yield put(fetchPaymentsSuccess(response.data));
    } else {
      yield put(fetchPaymentsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPaymentsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchBlockUsersAPI() {
  try {
    const response = yield api.postMethod("block_users");
    if (response.data.success) {
      yield put(fetchBlockUsersSuccess(response.data.data));
    } else {
      yield put(fetchBlockUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchBlockUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveBlockUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.saveBlockUser.inputData
    );
    const response = yield api.postMethod("block_users_save", inputData);
    if (response.data.success) {
      yield put(saveBlockUserSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.reload();
      localStorage.setItem(
        "total_followers",
        response.data.data.total_followers
      );
      localStorage.setItem(
        "total_followings",
        response.data.data.total_followings
      );

      if (inputData.is_other_profile == 1) {
        window.location.reload();
      }
    } else {
      yield put(saveBlockUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveBlockUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveFeatureStoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.saveFeatureStory.inputData
    );
    const response = yield api.postMethod("feature_story_save", inputData);
    if (response.data.success) {
      yield put(saveFeatureStorySuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(fetchUserDetailsStart());
    } else {
      yield put(saveFeatureStoryFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveFeatureStoryFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteFeatureStoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.deleteFeatureStory.inputData
    );
    const response = yield api.postMethod("feature_story_delete", inputData);
    if (response.data.success) {
      yield put(deleteFeatureStorySuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(fetchUserDetailsStart());
    } else {
      yield put(deleteFeatureStoryFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteFeatureStoryFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* resetPasswordAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.resetPasswordInputData.inputData
    );
    const response = yield api.postMethod("reset_password", inputData);
    yield put(resetPasswordSuccess(response.data));
    if (response.data.success) {
      localStorage.setItem("userLoginStatus", true);
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("socket", true);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
      yield put(createNotification(notificationMessage));
      window.location.assign("/home");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(resetPasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* usernameValidationAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.validationInputData.data
    );
    const response = yield api.postMethod("username_validation", inputData);
    yield put(usernameValidationSuccess(response.data));
    if (response.data.success) {
    } else {
      yield put(usernameValidationFailure(response));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      // yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(usernameValidationFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* referralValidationAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.referralInputData.data
    );
    const response = yield api.postMethod("referral_code_validate", inputData);
    yield put(referralValidationSuccess(response.data));
    if (response.data.success) {

      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));

    } else {
      yield put(referralValidationFailure(response));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(referralValidationFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getContentCreatorDashboardAPI() {
  try {
    const response = yield api.postMethod("content_creators_dashboard");

    if (response.data.success) {
      yield put(fetchContentCreatorDashboardSuccess(response.data));
    } else {
      yield put(fetchContentCreatorDashboardFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchContentCreatorDashboardFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* updateUserSubscriptionDetailsAPI() {
  try {
    const userData = yield select((state) => state.users.profileSubscriptionInputData.data);
    const response = yield api.postMethod("update_profile", userData);
    if (response.data.success) {
      yield put(updateUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem(
        "is_content_creator",
        response.data.data.is_content_creator
      );
      localStorage.setItem(
        "default_payment_method",
        response.data.data.default_payment_method
      );
      const notificationMessage = getSuccessNotificationMessage("User Subscription Details Updated");
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(updateUserDetailsFailure(response.data.error));
    }
  } catch (error) {
    yield put(updateUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* twoStepAuthenticationUpdateAPI(action) {
  try {
    const response = yield api.postMethod("two_step_auth_update", action.data);

    if (response.data.success) {
      yield put(twoStepAuthUpdateSuccess(response.data));
      localStorage.setItem(
        "is_two_step_auth_enabled",
        response.data.data.is_two_step_auth_enabled
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(twoStepAuthUpdateFAilure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(twoStepAuthUpdateFAilure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* twoStepAuthenticationLoginAPI(action) {
  try {
    const response = yield api.postMethod("two_step_auth_login", action.data);
    yield put(twoStepAuthenticationLoginSuccess(response.data));
    if (response.data.success) {
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("socket", true);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        localStorage.setItem(
          "is_content_creator",
          response.data.data.is_content_creator
        );
        localStorage.setItem(
          "default_payment_method",
          response.data.data.default_payment_method
        );
        localStorage.setItem(
          "is_two_step_auth_enabled",
          response.data.data.is_two_step_auth_enabled
        );
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        localStorage.setItem("emailId", response.data.data.email);
        yield put(createNotification(notificationMessage));
        window.location.assign("/home");
      }
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(twoStepAuthenticationLoginFailure(response.data.error));
    }
  } catch (error) {
    yield put(twoStepAuthenticationLoginFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* twoStepAuthenticationCodeResendAPI(action) {
  try {
    const response = yield api.postMethod("two_step_auth_resend_code", action.data);

    if (response.data.success) {
      yield put(twoStepAuthenticationCodeResendSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(twoStepAuthenticationCodeResendFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(twoStepAuthenticationCodeResendFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_USER_DETAILS_START, getUserDetailsAPI),
    yield takeLatest(UPDATE_USER_DETAILS_START, updateUserDetailsAPI),
    yield takeLatest(UPDATE_USER_SUBSCRIPTION_DETAILS_START, updateUserSubscriptionDetailsAPI),
    yield takeLatest(LOGIN_START, userLoginAPI),
    yield takeLatest(REGISTER_START, userRegisterAPI),
    yield takeLatest(FORGOT_PASSWORD_START, forgotPasswordAPI),
    yield takeLatest(DELETE_ACCOUNT_START, deleteAccountAPI),
    yield takeLatest(REGISTER_VERIFY_START, registerVerify),
    yield takeLatest(REGISTER_VERIFY_RESEND_START, registerVerifyResend),
    yield takeLatest(
      NOTIFICATION_STATUS_UPDATE_START,
      notificationStatusUpdateAPI
    ),
    yield takeLatest(FETCH_PAYMENTS_START, getPaymentsAPI),
    yield takeLatest(FETCH_BLOCK_USERS_START, fetchBlockUsersAPI),
    yield takeLatest(SAVE_BLOCK_USER_START, saveBlockUserAPI),
    yield takeLatest(
      USER_VERIFY_BADGE_STATUS_START,
      verificationBadgeStatusUpdateAPI
    ),
    yield takeLatest(RESET_PASSWORD_START, resetPasswordAPI),
    yield takeLatest(USERNAME_VALIDATION_START, usernameValidationAPI),
    yield takeLatest(REFERRAL_VALIDATION_START, referralValidationAPI),
    yield takeLatest(FETCH_CONTENT_CREATOR_DASHBOARD_START, getContentCreatorDashboardAPI),
    yield takeLatest(TWO_STEP_AUTH_UPDATE_START, twoStepAuthenticationUpdateAPI),
    yield takeLatest(TWO_STEP_AUTHENTICATION_LOGIN_START, twoStepAuthenticationLoginAPI),
    yield takeLatest(TWO_STEP_AUTHENTICATION_CODE_RESEND_START, twoStepAuthenticationCodeResendAPI),
    yield takeLatest(SAVE_FEATURE_STORY_START, saveFeatureStoryAPI),
    yield takeLatest(DELETE_FEATURE_STORY_START, deleteFeatureStoryAPI),
  ]);
}