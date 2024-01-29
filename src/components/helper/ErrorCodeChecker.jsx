import React from "react";

export function* errorCodeChecker(errorCode){
    console.log(errorCode);
    if (errorCode == 1004) {
        localStorage.removeItem("user_cover");
        localStorage.removeItem("name");
        localStorage.removeItem("userLoginStatus");
        localStorage.removeItem("user_picture");
        localStorage.removeItem("username");
        localStorage.removeItem("user_unique_id");
        localStorage.removeItem("is_document_verified");
        localStorage.removeItem("socket");
        localStorage.removeItem("is_verified_badge");
        localStorage.removeItem("is_two_step_auth_enabled");
        localStorage.removeItem("is_content_creator");
        localStorage.removeItem("default_payment_method");
        localStorage.removeItem("emailId");

        setTimeout(function() {
            window.location = "/";
        }, 1000);
    }
}
