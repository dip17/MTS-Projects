import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import SocialButton from "../helper/SocialButton";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import {
  forgotPasswordStart,
  userLoginStart,
  userRegisterStart,
  usernameValidationStart,
  referralValidationStart,
} from "../../store/actions/UserAction";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion,
} from "react-device-detect";
import { getFcmToken, onMessageListener } from "../../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from "focus-formik-error";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';


const REDIRECT_URI = window.location.href;

const LandingPageIndex = (props) => {
  const [show, setShow] = useState("login");
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState(0);
  const [loginInputData, setLoginInputData] = useState({});
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [isvalidUserName, setIsValidUserName] = useState(false);

  const [isTokenFound, setTokenFound] = useState(false);

  const [signupInputData, setSignupInputData] = useState();

  const [additionalDetails, setAdditionalDetails] = useState({
    device_type: "",
    device_model: "",
    browser_type: browserName,
    device_token: "",
  });
  const [deviceUniqueId, setDeviceUniqueId] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);

  useEffect(() => {
    const referral = "";
    if (configuration.get("configData.is_referral_enabled") == 1) {
      const query = new URLSearchParams(props.location.search);
      const referral = query.get("referral");

      if (referral) {
        setReferralCode(referral);
        setShow("signup");
      }
    }

    if (isAndroid == true) {
      setAdditionalDetails({
        ...additionalDetails,
        device_type: "android",
        device_model: mobileModel,
      });
    } else if (isIOS == true) {
      setAdditionalDetails({
        ...additionalDetails,
        device_type: "ios",
        device_model: mobileModel,
      });
    } else {
      setAdditionalDetails({
        ...additionalDetails,
        device_type: "web",
        device_model: browserName + " " + browserVersion,
      });
    }
  }, []);

  const [validationError, setValidationError] = useState("NO");

  // useEffect(() => {
  //   let data;
  //   async function tokenFunc() {
  //     data = await getFcmToken(setTokenFound);
  //     setAdditionalDetails({
  //       ...additionalDetails,
  //       device_token: data,
  //     });
  //     return data;
  //   }
  //   tokenFunc();
  // }, [setTokenFound]);

  useEffect(() => {
    getDeviceUniqueID();
  }, []);

  async function getDeviceUniqueID() {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    setDeviceUniqueId(result.visitorId);
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("invalid_email"))
      .required(t("email_is_required")),
    password: Yup.string()
      .required(t("password_is_required"))
      .matches(/^(?=.*[a-zA-Z0-9])(?=.{6,})/, t("password_required_note")),
  });

  const handleLogin = (values) => {
    let newValues = {
      ...values,
      ...additionalDetails,
      device_unique_id: deviceUniqueId,
    };
    props.dispatch(userLoginStart(newValues));
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required(t("name_is_required")),
    username: Yup.string().required(t("username_is_required")),
    email: Yup.string()
      .email(t("invalid_email"))
      .required(t("email_is_required")),
    password: Yup.string()
      .required(t("password_is_required"))
      .matches(/^(?=.*[a-zA-Z0-9])(?=.{6,})/, t("password_required_note")),
  });

  const handleSignup = (values) => {
    let newValues = {
      ...values,
      ...additionalDetails,
      referral_code: referralCode,
      device_unique_id: deviceUniqueId,
    };
    props.dispatch(userRegisterStart(newValues));
  };

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("invalid_email"))
      .required(t("email_is_required")),
  });

  const handleForgotPassword = (values) => {
    props.dispatch(forgotPasswordStart(values));
  };


  const handleFacebookLogin = (response) => {
    console.log("handleFacebookLogin", response);
    const emailAddress = response.email === undefined || response.email === null ? response.id + "@facebook.com" : response.email;
    props.dispatch(
      userRegisterStart({
        name: response.name,
        first_name: response.first_name ? response.first_name : "",
        last_name: response.last_name ? response.last_name : "",
        email: emailAddress,
        social_unique_id: response.userID,
        picture: response.picture ? response.picture.data.url : '',
        login_by: "facebook",
        device_token: additionalDetails.device_token,
      })
    );
  };

  const handleGoogleLogin = (response) => {
    console.log("handleGoogleLogin", response);
    props.dispatch(
      userRegisterStart({
        name: response.name,
        email: response.email,
        first_name: response.given_name ? response.given_name : "",
        last_name: response.family_name ? response.family_name : "",
        social_unique_id: response.sub,
        picture: response.picture,
        login_by: "google",
        device_token: additionalDetails.device_token,
      })
    );
  };

  const handleUsernameValidation = (username) => {
    if (username && username.length > 3) {
      if (username.replace(" ", "") === username) {
        if (username !== userName) {
          setUserName(username);
          setIsValidUserName(true);
          props.dispatch(usernameValidationStart({ username: username }));
          return "";
        }
      } else {
        setIsValidUserName(false);
        return t("no_white_space_allowed");
      }
    } else {
      setIsValidUserName(false);
      return t("must_contain_four_characters");
    }
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const checkReferralCode = (event) => {
    event.preventDefault();

    if (referralCode) {
      props.dispatch(referralValidationStart({ referral_code: referralCode }));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("please_enter_the_referral_code")
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };

  const onChange = (event) => {
    setIsCaptchaEnabled(1);
    console.log("Captcha value:", event);
    if (event == null) {
      setIsCaptchaEnabled(0);
    }
  };
  return (
    <>
      <div className="login-section">
        <Container>
          <Row>
            <Col
              lg={6}
              xl={6}
              md={12}
              sm={12}
              xs={12}
              className="hidden-xs iphone-slide-area resp-btm-lg flex-49"
            >
              {/* <div className="dm-width">
                <div className="dm-device">
                  <div className="device">
                    <div className="screen">
                      <div className="slider">
                        <div className="slider__item slider__item--1">
                          <img
                            src={
                              window.location.origin +
                              "/assets/images/login-slider-1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="slider__item slider__item--2">
                          {" "}
                          <img
                            src={
                              window.location.origin +
                              "/assets/images/login-slider-2.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="slider__item slider__item--3"></div>
                        <div className="slider__item slider__item--4"></div>
                        <div className="slider__item slider__item--5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="auth-img-left-sec">
                <Image
                  src={window.location.origin + "/assets/images/auth-img.jpg"}
                  alt=""
                  className="auth-left-img"
                />
              </div>
            </Col>
            <Col lg={6} xl={6} md={12} sm={12} xs={12}>
              <div className="sign-in form-section">
                <div className="sign-in-logo">
                  <Image
                    src={configuration.get("configData.site_logo")}
                    width="237"
                  />
                </div>
                <p className="login-tagline">
                  {configuration.get("configData.tag_name")}
                </p>
                <div className="forms-fields">
                  {configuration.get("configData.FB_CLIENT_ID") ? (
                    <LoginSocialFacebook
                      appId={configuration.get("configData.social_logins.FB_CLIENT_ID")}
                      fieldsProfile={
                        'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                      }
                      redirect_uri={REDIRECT_URI}
                      onResolve={({ provider, data }: IResolveParams) => {
                        handleFacebookLogin(data);
                      }}
                      onReject={err => {
                        console.log(err);
                      }}
                    >
                      <FacebookLoginButton />
                    </LoginSocialFacebook>
                  ) : (
                    ""
                  )}

                  {configuration.get("configData.GOOGLE_CLIENT_ID") ? (
                    <LoginSocialGoogle
                      client_id={configuration.get("configData.social_logins.GOOGLE_CLIENT_ID")}
                      redirect_uri={REDIRECT_URI}
                      scope="openid profile email"
                      discoveryDocs="claims_supported"
                      access_type="offline"
                      onResolve={({ provider, data }: IResolveParams) => {
                        handleGoogleLogin(data);
                      }}
                      onReject={err => {
                        console.log(err);
                      }}
                    >
                      <GoogleLoginButton />
                    </LoginSocialGoogle>
                  ) : (
                    ""
                  )}
                  {/* <Link to="#" className="social-button" id="twitter-connect">
                    <span>Sign Up / Login with Twitter</span>
                  </Link>
                  <Link to="#" className="social-button" id="google-connect">
                    <span>Sign Up / Login with Google</span>
                  </Link> */}

                  {configuration.get("configData.GOOGLE_CLIENT_ID") ||
                    configuration.get("configData.FB_CLIENT_ID") ? (
                    <span className="or-line">
                      <span>or</span>
                    </span>
                  ) : (
                    <span classsName="login-or-hide"></span>
                  )}
                  <div id="main">
                    <div id="first">
                      {show === "login" ? (
                        <Formik
                          initialValues={{
                            email: configuration.get(
                              "configData.demo_user_email"
                            ),
                            password: configuration.get(
                              "configData.demo_user_password"
                            ),
                          }}
                          validationSchema={loginSchema}
                          onSubmit={(values) => handleLogin(values)}
                        >
                          {({
                            touched,
                            errors,
                            isSubmitting,
                            setFieldValue,
                          }) => (
                            <Form noValidate>
                              {/* <ConnectedFocusError /> */}
                              <div class="form-group">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder={t("e_mail_address")}
                                  className="form-control"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="email"
                                  className="text-danger text-right"
                                />
                              </div>
                              <div className="form-group">
                                <div class="input-group">
                                  <Field
                                    type={
                                      loginPasswordVisible ? "text" : "password"
                                    }
                                    name="password"
                                    placeholder={t("password")}
                                    className="form-control"
                                  />
                                  <div class="input-group-append">
                                    <button
                                      onClick={() =>
                                        setLoginPasswordVisible(
                                          !loginPasswordVisible
                                        )
                                      }
                                      class="btn password-eye"
                                      type="button"
                                    >
                                      {loginPasswordVisible ? (
                                        <i className="fas fa-eye-slash align-self-center"></i>
                                      ) : (
                                        <i className="fas fa-eye align-self-center"></i>
                                      )}
                                    </button>
                                  </div>
                                </div>
                                <ErrorMessage
                                  component={"div"}
                                  name="password"
                                  className="text-danger text-right"
                                />
                              </div>

                              <div className="forget-password">
                                <p id="one">
                                  <Link
                                    to="#"
                                    type="button"
                                    className="forgot-link"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setShow("forgotpassword");
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }}
                                  >
                                    {" "}
                                    {t("forgot_password")}{" "}
                                  </Link>
                                </p>
                              </div>

                              <Button
                                type="submit"
                                className="btn gradient-btn gradientcolor"
                                disabled={props.login.buttonDisable}
                              >
                                {props.login.loadingButtonContent !== null
                                  ? props.login.loadingButtonContent
                                  : t("login")}
                              </Button>

                              <p id="two">{t("do_not_have_an_account")}</p>
                              <p>
                                <Link
                                  className="signup"
                                  to="#"
                                  id="signup"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setShow("signup");
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                >
                                  {" "}
                                  {t("signup_for")}{" "}
                                  {configuration.get("configData.site_name")}
                                </Link>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      ) : null}
                      {show === "signup" ? (
                        <Formik
                          initialValues={{
                            name: "",
                            username: "",
                            email: "",
                            password: "",
                          }}
                          validationSchema={registerSchema}
                          onSubmit={(values) => handleSignup(values)}
                        >
                          {({
                            touched,
                            errors,
                            isSubmitting,
                            setFieldValue,
                          }) => (
                            <Form noValidate>
                              {/* <ConnectedFocusError /> */}
                              <div class="form-group">
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder={t("name")}
                                  className="form-control"
                                  autoComplete="off"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="name"
                                  className="text-danger text-right"
                                />
                              </div>

                              <div class="form-group">
                                <Field
                                  type="text"
                                  name="username"
                                  placeholder={t("username")}
                                  className="form-control"
                                  validate={handleUsernameValidation}
                                  autoComplete="off"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="username"
                                  className="text-danger text-right"
                                />
                                {props.validation.isInValid &&
                                  isvalidUserName ? (
                                  <div class="text-danger text-right">
                                    {props.validation.errorMessage ??
                                      t("username_already_taken")}
                                  </div>
                                ) : (
                                  ""
                                )}
                                {props.validation.isValid && isvalidUserName ? (
                                  <div class="text-success text-right">
                                    {t("looks_good")}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div class="form-group">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder={t("email_address")}
                                  className="form-control mb-3"
                                  autoComplete="off"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="email"
                                  className="text-danger text-right"
                                />
                              </div>

                              <div className="form-group">
                                <div class="input-group">
                                  <Field
                                    type={
                                      loginPasswordVisible ? "text" : "password"
                                    }
                                    name="password"
                                    placeholder={t("password")}
                                    className="form-control mb-3"
                                    autoComplete="off"
                                  />
                                  <div class="input-group-append">
                                    <button
                                      onClick={() =>
                                        setLoginPasswordVisible(
                                          !loginPasswordVisible
                                        )
                                      }
                                      class="btn password-eye"
                                      type="button"
                                    >
                                      {loginPasswordVisible ? (
                                        <i className="fas fa-eye-slash align-self-center"></i>
                                      ) : (
                                        <i className="fas fa-eye align-self-center"></i>
                                      )}
                                    </button>
                                  </div>
                                </div>
                                <ErrorMessage
                                  component={"div"}
                                  name="password"
                                  className="text-danger text-right"
                                />
                              </div>

                              {configuration.get(
                                "configData.is_referral_enabled"
                              ) == 1 ? (
                                <>
                                  <div class="form-group">
                                    <Field
                                      type="text"
                                      name="referral_code"
                                      placeholder={t("referral_code_optional")}
                                      value={referralCode}
                                      className="form-control mb-3"
                                      onChange={(e) =>
                                        setReferralCode(e.target.value)
                                      }
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="referral_code"
                                      className="text-danger text-right"
                                    />
                                    <div className="check-referral-link">
                                      <a
                                        className="text-primary"
                                        href="#"
                                        onClick={checkReferralCode}
                                      >
                                        {t("check_referral_code_valid")}
                                      </a>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            
                              <div className="round">
                                <p className="terms text-center">
                                  {t("signing_up_confirmation")} <br></br>
                                  <Link to={`/page/terms`} target="_blank">
                                    {t("terms_of_service")}
                                  </Link>{" "}
                                  {t("and")}{" "}
                                  <Link to={`/page/privacy`} target="_blank">
                                    {t("privacy_policy")}
                                 
                                  </Link>
                                  .
                                </p>
                              </div>

                              <Button
                                type="submit"
                                className="btn gradient-btn gradientcolor"
                                disabled={props.signup.buttonDisable}
                              >
                                {props.signup.loadingButtonContent !== null
                                  ? props.signup.loadingButtonContent
                                  : "Sign Up"}
                              </Button>

                              <p id="two">{t("already_have_an_account")}</p>
                              <p>
                                <Link
                                  className="signup"
                                  href="#"
                                  id="signin"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setShow("login");
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                >
                                  {" "}
                                  {t("login_for")}{" "}
                                  {configuration.get("configData.site_name")}
                                </Link>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      ) : null}
                      {show === "forgotpassword" ? (
                        <Formik
                          initialValues={{
                            email: "",
                          }}
                          validationSchema={forgotPasswordSchema}
                          onSubmit={(values) => handleForgotPassword(values)}
                        >
                          {({
                            touched,
                            errors,
                            isSubmitting,
                            setFieldValue,
                          }) => (
                            <Form noValidate>
                              {/* <ConnectedFocusError /> */}
                              <div class="form-group">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder={t("email_address")}
                                  className="form-control"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="email"
                                  className="text-danger text-right"
                                />
                              </div>
                              <Button
                                type="submit"
                                className="btn gradient-btn gradientcolor"
                                disabled={props.forgotPassword.buttonDisable}
                              >
                                {props.forgotPassword.loadingButtonContent !==
                                  null
                                  ? props.forgotPassword.loadingButtonContent
                                  : t("request_reset_link")}
                              </Button>

                              <p id="two">{t("already_have_an_account")}</p>
                              <p>
                                <Link
                                  className="signup"
                                  to="#"
                                  id="signin"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setShow("login");
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                >
                                  {" "}
                                  {t("login_for")}{" "}
                                  {configuration.get("configData.site_name")}
                                </Link>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  login: state.users.loginInputData,
  signup: state.users.registerInputData,
  forgotPassword: state.users.forgotPasswordInputData,
  validation: state.users.validationInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LandingPageIndex));
