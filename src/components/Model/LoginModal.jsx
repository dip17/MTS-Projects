import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Image,
  Modal,
  Tab,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import SocialButton from "../helper/SocialButton";
import configuration from "react-global-configuration";

import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import {
  forgotPasswordStart,
  userLoginStart,
  userRegisterStart,
  usernameValidationStart,
  referralValidationStart,
} from "../../store/actions/UserAction";
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

const LoginModal = (props) => {
    const [loginInputData, setLoginInputData] = useState({});
    const [show, setShow] = useState("login");
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
  
      setLoginInputData({
        ...loginInputData,
        email: configuration.get("configData.demo_user_email"),
        password: configuration.get("configData.demo_user_password"),
        device_type: device_type,
        device_model: device_model,
        browser_type: browser_type,
        isReload:1,
      })
    }, []);
  
    const handleLogin = (event) => {
      event.preventDefault();
      props.dispatch(userLoginStart(loginInputData));
    };

    const handleFacebookLogin = (user) => {
      console.log("handleFacebookLogin", user._profile);
      props.dispatch(
        userRegisterStart({
          name: user._profile.name,
          first_name: user._profile.firstName ? user._profile.firstName : "",
          last_name: user._profile.lastName ? user._profile.lastName : "",
          email: user._profile.email ? user._profile.email : "",
          social_unique_id: user._profile.id,
          picture: user._profile.profilePicURL,
          login_by: "facebook",
          isReload:1,
        })
      );
    };
  
    const handleGoogleLogin = (user) => {
      console.log("handleGoogleLogin", user._profile);
      props.dispatch(
        userRegisterStart({
          name: user._profile.name,
          email: user._profile.email,
          first_name: user._profile.firstName ? user._profile.firstName : "",
          last_name: user._profile.lastName ? user._profile.lastName : "",
          social_unique_id: user._profile.id,
          picture: user._profile.profilePicURL,
          login_by: "google",
          isReload:1,
        })
      );
    };
  
    const handleSocialLoginFailure = (err) => {
      console.error(err);
    };

    return (
        <>
          <Modal
            centered
            size="md"
            className="modal-dialog-center sent-tip-modal"
            show={props.loginModal}
            onHide={props.closeLoginModal}
          >
            {props.loginModal === true ? 
              <>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="signin-modal form-section">
                    <Link to="#" className="sign-in-logo">
                      <Image
                        src={configuration.get("configData.site_logo")}
                        width="237"
                        className="modal-logo"
                      />
                      </Link>
                      <p className="login-tagline">
                        {configuration.get("configData.tag_name")}
                      </p>
                      {configuration.get("configData.FB_CLIENT_ID") ? (
                        <SocialButton
                          provider="facebook"
                          appId={configuration.get("configData.FB_CLIENT_ID")}
                          onLoginSuccess={handleFacebookLogin}
                          onLoginFailure={handleSocialLoginFailure}
                          className="social-button"
                          id="facebook-connect"
                        >
                          <span>
                            {t("signup")} / {t("login_with_facebook")}
                          </span>
                        </SocialButton>
                      ) : (
                        ""
                      )}

                      {configuration.get("configData.GOOGLE_CLIENT_ID") ? (
                        <SocialButton
                          provider="google"
                          key={"google"}
                          appId={configuration.get("configData.GOOGLE_CLIENT_ID")}
                          onLoginSuccess={handleGoogleLogin}
                          onLoginFailure={handleSocialLoginFailure}
                          className="social-button"
                          id="google-connect"
                        >
                          <span>
                            {t("signup")} / {t("login_with_google")}
                          </span>
                        </SocialButton>
                      ) : (
                        ""
                      )}
                      <Form
                        onSubmit={handleLogin}
                        method="post"
                        autoComplete="off"
                      >
                        <Form.Group controlId="loginemail">
                          <Form.Control
                            type="text"
                            controlId="loginemail"
                            placeholder={t("e_mail")}
                            required
                            value={loginInputData.email}
                            name="email"
                            autoComplete="nope"
                            onChange={(event) =>
                              setLoginInputData({
                                ...loginInputData,
                                email: event.currentTarget.value,
                              })
                            }
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Control
                            type="password"
                            controlId="loginpassword"
                            placeholder={t("password")}
                            required
                            autocomplete="off"
                            value={loginInputData.password}
                            name="password"
                            onChange={(event) =>
                              setLoginInputData({
                                ...loginInputData,
                                password: event.currentTarget.value,
                              })
                            }
                          />
                        </Form.Group>
                   
                        {/* <div className="forget-password">
                          <p id="one">
                            <Link
                              to="#"
                              type="button"
                              className="forgot-link"
                              onClick={(event) => {
                                event.preventDefault();
                                setShow("forgotpassword");
                              }}
                            >
                              {" "}
                              {t("forgot_password")}{" "}
                            </Link>
                          </p>
                        </div> */}
                        <div className="">
                          <Button
                            id="login"
                            type="submit"
                            onClick={handleLogin}
                            className="btn gradient-btn gradientcolor"
                            disabled={props.login.buttonDisable}
                          >
                            {props.login.loadingButtonContent !== null
                              ? props.login.loadingButtonContent
                              : t("login")}
                          </Button>
                        </div>
                        
                        <p id="two">{t("do_not_have_an_account")}</p>
                        <p>
                          <Link
                            className="signup"
                            to="#"
                            id="signup"
                            onClick={(event) => {
                              event.preventDefault();
                              props.openSignupModal();
                            }}
                          >
                            {" "}
                            {t("signup_for")}{" "}
                            {configuration.get("configData.site_name")}
                          </Link>
                        </p>
                      </Form>
                  </div>
                </Modal.Body>
            </>
            : null}
          </Modal>
        </>
    );
};

const mapStateToPros = (state) => ({
  login: state.users.loginInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LoginModal));
