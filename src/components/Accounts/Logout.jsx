import React, { useEffect } from "react";
import api from "../../Environment";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion
} from "react-device-detect";

const Logout = (props) => {
  useEffect(() => {
    var device_type = "";
    var device_model = "";
    var browser_type = browserName;

    if(isAndroid==true){
      device_type = "android";
      device_model = mobileModel;
    } else if(isIOS==true){
      device_type = "ios";
      device_model = mobileModel;
    } else {
      device_type = "web";
      device_model = browserName+' '+browserVersion;
    }

    const inputData = {
      device_type: device_type,
      device_model: device_model,
      browser_type: browser_type,
    };

    api.postMethod("logout",inputData).then((response) => {
      if (response.data.success) {
        console.log("success");
      } else {
      }
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLoginStatus");
    localStorage.removeItem("user_picture");
    localStorage.removeItem("username");
    localStorage.removeItem("socket");
    localStorage.removeItem("user_cover");
    localStorage.removeItem("name");
    localStorage.removeItem("user_unique_id");
    localStorage.removeItem("is_document_verified");
    localStorage.removeItem("is_verified_badge");
    localStorage.removeItem("is_two_step_auth_enabled");
    localStorage.removeItem("is_content_creator");
    localStorage.removeItem("default_payment_method");
    localStorage.removeItem("emailId");
    localStorage.removeItem("total_followers");
    localStorage.removeItem("total_followings");
    localStorage.removeItem("is_subscription_enabled");

    props.history.push("/");
  }, []);
  return "";
};

export default Logout;
