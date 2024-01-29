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
import configuration from "react-global-configuration";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";
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


const SignupModal = (props) => {

  const [show, setShow] = useState("login");

  const [signupInputData, setSignupInputData] = useState({
    referral_code: "",
    device_type: "",
    device_model: "",
    browser_type: "",
  });

  useEffect(() => {
    var device_type = "";
    var device_model = "";
    var browser_type = browserName;

    if (isAndroid == true) {
      device_type = "android";
      device_model = mobileModel;
    } else if (isIOS == true) {
      device_type = "ios";
      device_model = mobileModel;
    } else {
      device_type = "web";
      device_model = browserName + ' ' + browserVersion;
    }

    setSignupInputData({
      ...signupInputData,
      referral_code: '',
      device_type: device_type,
      device_model: device_model,
      browser_type: browser_type,
      isReload: 1,
    });

  }, []);

  const handleSignup = (event) => {
    event.preventDefault();
    props.dispatch(userRegisterStart(signupInputData));
  };

  const handleUsernameValidation = (event, username) => {
    setSignupInputData({
      ...signupInputData,
      username: username,
    });
    props.dispatch(usernameValidationStart({ username: username }));
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const checkReferralCode = (event) => {
    event.preventDefault();

    if (signupInputData.referral_code) {
      props.dispatch(referralValidationStart({ referral_code: signupInputData.referral_code }));
    } else {
      const notificationMessage = getErrorNotificationMessage(t("please_enter_the_referral_code"));
      props.dispatch(createNotification(notificationMessage));
    }
  };

  return (
    <>
      <Modal
        centered
        size="md"
        className="modal-dialog-center sent-tip-modal"
        show={props.signupModal}
        onHide={props.closeSignupModal}
      >
        {props.signupModal === true ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t("register")}</Modal.Title>
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
                <Form
                  onSubmit={handleSignup}
                  id="form"
                  method="post"
                  name="form"
                  autoComplete="off"
                >
                  <Form.Group controlId="signupName">
                    <Form.Control
                      type="text"
                      controlId="signupName"
                      placeholder={t("name")}
                      required
                      value={signupInputData.name}
                      name="name"
                      autoComplete="off"
                      onChange={(event) =>
                        setSignupInputData({
                          ...signupInputData,
                          name: event.currentTarget.value,
                        })
                      }
                    />
                  </Form.Group>
                  {props.validation.isValid}
                  <Form.Group controlId="signupUsername">
                    <Form.Control
                      type="text"
                      controlId="signupUsername"
                      placeholder={t("username")}
                      required
                      autoComplete="off"
                      value={signupInputData.user_name}
                      name="username"
                      onChange={(event) =>
                        event.currentTarget.value &&
                          event.currentTarget.value.length > 3
                          ? handleUsernameValidation(
                            event,
                            event.currentTarget.value
                          )
                          : ""
                      }
                      isValid={props.validation.isValid}
                      isInvalid={props.validation.isInValid}
                    />
                    {props.validation.isInValid ? (
                      <Form.Control.Feedback type="invalid">
                        {t("username_already_taken")}
                      </Form.Control.Feedback>
                    ) : (
                      ""
                    )}
                    {props.validation.isValid ? (
                      <Form.Control.Feedback>
                        {t("looks_good")}
                      </Form.Control.Feedback>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group controlId="registerEmail">
                    <Form.Control
                      type="text"
                      controlId="registerEmail"
                      placeholder={t("email")}
                      required
                      autoComplete="off"
                      value={signupInputData.email}
                      name="email"
                      onChange={(event) =>
                        setSignupInputData({
                          ...signupInputData,
                          email: event.currentTarget.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="registerPassword">
                    <Form.Control
                      type="password"
                      controlId="registerPassword"
                      placeholder={t("password")}
                      required
                      autoComplete="new-password"
                      value={signupInputData.password}
                      name="password"
                      onChange={(event) =>
                        setSignupInputData({
                          ...signupInputData,
                          password: event.currentTarget.value,
                        })
                      }
                    />
                  </Form.Group>
                  
                  <Form.Group controlId="registerNumber">
                    <Form.Control
                      type="number"
                      controlId="registerNumber"
                      placeholder={t("number")}
                      required
                      autoComplete="off"
                      name="number"
                      
                    />
                  </Form.Group>
                  {configuration.get("configData.is_referral_enabled") == 1 ? (
                    <Form.Group className="mb-0" controlId="registerReferral">
                      <Form.Control
                        type="text"
                        controlId="registerReferral"
                        placeholder={t("referral_code_optional")}
                        required
                        autoComplete="off"
                        value={signupInputData.referral_code}
                        name="referral_code"
                        onChange={(event) =>
                          setSignupInputData({
                            ...signupInputData,
                            referral_code: event.currentTarget.value,
                          })
                        }
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
                    </Form.Group>
                  ) : (
                    ""
                  )}

                
                  <Form.Group
                    controlId="formBasicName"
                    className="round"
                  >
                    {/* <input type="checkbox" id="checkbox" /> */}
                    {/* <label for="checkbox"></label> */}
                    <p className="terms">
                      {t("signing_up_confirmation")}{" "}
                      <br></br>
                      <Link to={`/page/terms`} target="_blank">
                        {t("terms_of_service")}
                      </Link>{" "}
                      {t("and")}{" "}
                      <Link to={`/page/privacy`} target="_blank">
                        {t("privacy_policy")}
                      </Link>
                      .
                    </p>
                  </Form.Group>

                  <Form.Group controlId="formBasicName">
                    <Button
                      id="register"
                      type="submit"
                      onClick={handleSignup}
                      className="btn gradient-btn gradientcolor mt-3"
                      disabled={props.signup.buttonDisable}
                    >
                      {props.signup.loadingButtonContent !== null
                        ? props.signup.loadingButtonContent
                        : t("signup")}
                    </Button>
                  </Form.Group>
                  {/* <p id="two">{t("already_have_an_account")}</p>
                  <p>
                    <Link
                      className="signup"
                      href="#"
                      id="signin"
                      onClick={(event) => {
                        event.preventDefault();
                        setShow("login");
                      }}
                    >
                      {" "}
                      {t("login_for")}{" "}
                      {configuration.get("configData.site_name")}
                    </Link>
                  </p> */}
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
  signup: state.users.registerInputData,
  validation: state.users.validationInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SignupModal));
