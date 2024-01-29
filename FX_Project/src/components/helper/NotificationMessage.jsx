import React from "react";
import {
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_ERROR,
} from "react-redux-notify";

export const getSuccessNotificationMessage = (message) => {
  return {
    message: message,
    type: NOTIFICATION_TYPE_INFO,
    duration: 1500,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
    // customStyles: {
    //   // close: "SuccessNotify-Close",
    //   // item__message: "SuccessNotify-message",
    //   // "notification--success": "SuccessNotify",
    // },
  };
};

export const getErrorNotificationMessage = (message) => {
  return {
    message: message,
    type: NOTIFICATION_TYPE_ERROR,
    duration: 1500,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
  };
};
