import React, { useState } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchSinglePageStart } from "../../store/actions/PageAction";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";
import { resetPasswordStart } from "../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from 'focus-formik-error';

const ResetPassword = (props) => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required *")
      .matches(
        /^(?=.*[a-zA-Z])(?=.{6,})/,
       t("must_contain_six_characters")
      ),
    password_confirmation: Yup.string()
      .required(t("confirm_password_is_required"))
      .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
         t("both_password_need_to_be_the_same")
        )
      }),
  });

  const handleChange = (type) => {
    if (type === "password") {
      setPasswordVisible(!passwordVisible);
    }
    if (type === "confirm") {
      setConfirmPasswordVisible(!confirmPasswordVisible)
    }
  };

  const handleForgotPasswordSubmit = (values) => {
    let newValues = {
      ...values,
      reset_token: props.match.params.token
    }
    props.dispatch(resetPasswordStart(newValues));
  };

  const handlePasswordValidation = (password) => {
    if (password.trim() !== password) {
      return t("no_white_space_allowed");
    }
    return "";
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
                  <div id="main">
                    <div id="first">
                      <Formik
                        initialValues={{
                          name: "",
                          username: "",
                          email: "",
                          password: "",
                        }}
                        validationSchema={resetPasswordSchema}
                        onSubmit={(values) => handleForgotPasswordSubmit(values)}>

                        {({ touched, errors, isSubmitting, setFieldValue }) => (
                          <Form noValidate>
                            <ConnectedFocusError />

                            <div className="form-group">
                              <div class="input-group">
                                <Field
                                  type={passwordVisible ? "text" : "password"}
                                  name="password"
                                  placeholder={t("new_password_placeholder")}
                                  className="form-control mb-3"
                                  autocomplete="off"
                                  validate={handlePasswordValidation}
                                />
                                <div class="input-group-append">
                                  <button
                                    onClick={() => handleChange("password")}
                                    class="btn"
                                    type="button">
                                    {passwordVisible ?
                                      <i className="fas fa-eye-slash align-self-center"></i>
                                      : <i className="fas fa-eye align-self-center"></i>}
                                  </button>
                                </div>
                              </div>
                              <ErrorMessage component={"div"} name="password" className='text-danger text-right' />
                            </div>
                            <div className="form-group">
                              <div class="input-group">
                                <Field
                                  type={confirmPasswordVisible ? "text" : "password"}
                                  name="password_confirmation"
                                  placeholder={t("new_password_placeholder")}
                                  className="form-control mb-3"
                                  autocomplete="off"
                                />
                                <div class="input-group-append">
                                  <button
                                    onClick={() => handleChange("confirm")}
                                    class="btn"
                                    type="button">
                                    {confirmPasswordVisible ?
                                      <i className="fas fa-eye-slash align-self-center"></i>
                                      : <i className="fas fa-eye align-self-center"></i>}
                                  </button>
                                </div>
                              </div>
                              <ErrorMessage component={"div"} name="password_confirmation" className='text-danger text-right' />
                            </div>


                            <Button
                              type="submit"
                              className="btn gradient-btn gradientcolor"
                              disabled={props.inputData.buttonDisable}
                            >
                              {props.inputData.loadingButtonContent != null
                                ? props.inputData.loadingButtonContent
                                : t("reset_password")}
                            </Button>

                            <p id="two">{t("already_have_an_account")}</p>
                            <p>
                              <Link className="signup" to={"/"} id="signin">
                                {" "}
                                {t("login_for")}{" "}
                                {configuration.get("configData.site_name")}
                              </Link>
                            </p>
                          </Form>
                        )}
                      </Formik>
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
}

const mapStateToPros = (state) => ({
  inputData: state.users.forgotPasswordInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ResetPassword));