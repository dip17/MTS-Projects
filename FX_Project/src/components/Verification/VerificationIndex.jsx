import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "./Verification.css";
import { Link } from "react-router-dom";
import VerificationCodeInput from "./VerificationCodeInput";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import { twoStepAuthenticationLoginStart, twoStepAuthenticationCodeResendStart } from '../../store/actions/UserAction'
import { useHistory } from "react-router";

const VerificationIndex = (props) => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});
  const history = useHistory();

  const emailId = localStorage.getItem("emailId");

  useEffect(() => {
    if (!localStorage.getItem("emailId")) {
      history.push("/");
    }
  }, []);

  const submitVerfication = (event) => {
    event.preventDefault();
    if (inputData.verification_code) {
      props.dispatch(twoStepAuthenticationLoginStart({ code: inputData.verification_code, email: emailId }));
    }
  };

  const resendVerfication = (event) => {
    event.preventDefault();
    props.dispatch(twoStepAuthenticationCodeResendStart({ email: emailId }));
  };

  return (
    <>
      <div className="verification-sec ">
        <Container className="verification-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12">
            <div className="c-email">
              <div className="c-email-header">
                <h1 className="c-email-header-title">{t("your_verification_code")}</h1>
              </div>
              {/* <div className="c-email-content">
              <Form>
                <p className="c-email-content-text text-title">
                  Enter this verification code in field:
                </p>
                <div className="c-email-code">
                  <span className="c-email-code-text">
                    <Form.Control type="number" placeholder="1" />
                  </span>
                  <span className="c-email-code-text">
                    <Form.Control type="number" placeholder="2" />
                  </span>
                  <span className="c-email-code-text">
                    <Form.Control type="number" placeholder="3" />
                  </span>
                  <span className="c-email-code-text">
                    <Form.Control type="number" placeholder="4" />
                  </span>
                  <span className="c-email-code-text">
                    <Form.Control type="number" placeholder="5" />
                  </span>
                  <span className="c-email-code-text">
                    <Form.Control type="number" placeholder="6" />
                  </span>
                </div>
                <p className="c-email-content-text text-italic opacity-30 text-title mb-0">
                  Verification code is valid only for 30 minutes
                </p>
                <div className="verify-btn-sec">
                  <Button className="verify-btn">Verify</Button>
                </div>
              </Form>
            </div> */}

              <div className="verificationCodeWrapper">
                <div className="inputsWrapper">
                  <div className="verified-img-sec">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/verified-img.svg"
                      }
                      alt=""
                      className="verified-img"
                    />
                  </div>
                  <p className="c-email-content-text text-italic opacity-30 text-title mb-0">
                    {t("verification_code_info")}
                  </p>
                  <form onSubmit={submitVerfication}>
                    <VerificationCodeInput
                      length={4}
                      label={t("enter_verification_code")}
                      loading={loading}
                      labelClassName="c-email-content-text text-italic opacity-30 text-title mx-auto"
                      autoFocus={true}
                      onComplete={(code) => {
                        setInputData({
                          ...inputData,
                          verification_code: code,
                        });
                      }}
                    />
              
                    <div className="verify-btn-sec">
                      <Button
                        type="submit"
                        className="verify-btn"
                        disabled={props.twoStepAuthLogin.buttonDisable || inputData.verification_code ? false : true}
                      >
                        {props.twoStepAuthLogin.loadingButtonContent != null ? props.twoStepAuthLogin.loadingButtonContent : t("verify")}
                      </Button>
                    </div>
                  </form>
                  <div className="d-flex mt-5 footerLinks align-items-center justify-content-md-center">
                    <p className="c-email-content-text text-italic opacity-30 text-title mb-0">
                      {t("verification_code_resend_info")}
                    </p>
                    <Button
                      type="button"
                      className="verify-btn m-0"
                      onClick={resendVerfication}
                    >
                      {props.codeResend.loadingButtonContent != null ? props.codeResend.loadingButtonContent : t("send_again")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  twoStepAuthLogin: state.users.twoStepAuthLogin,
  codeResend: state.users.twoStepAuthCodeResend,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(VerificationIndex));