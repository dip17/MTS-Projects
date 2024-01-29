import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "./Verification.css";
import { Link } from "react-router-dom";
import VerificationCodeInput from "./VerificationCodeInput";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import { registerVerifyStart, registerVerifyResendStart, fetchUserDetailsStart } from '../../store/actions/UserAction';
import { useHistory } from 'react-router-dom';

const RegisterVerifyIndex = (props) => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});
  let history = useHistory();

  const submitVerfication = (event) => {
    event.preventDefault();
    if (inputData.verification_code) {
      props.dispatch(registerVerifyStart({ verification_code: inputData.verification_code }));
    }
  };

  const resendVerfication = (event) => {
    event.preventDefault();
    props.dispatch(registerVerifyResendStart());
  };

  useEffect(() => {
    if (!localStorage.getItem("userId") || !localStorage.getItem("accessToken")) {
      history.push('/');
    } else {
      props.dispatch(fetchUserDetailsStart());
    }
  }, []);

  useEffect(() => {
    if (props.user.data.is_email_verified) {
      history.push('/home');
    }
  }, [props.user]);

  console.log(inputData.verification_code);
  return (
    <>
      <div className="verification-sec ">
        <Container className="verification-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12">
            <div className="c-email">
              <div className="c-email-header">
                <h1 className="c-email-header-title">{t("your_verification_code")}</h1>
              </div>
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
                  <p className="c-email-content-text text-italic opacity-30 text-title mt-5 mb-0">
                    {t("verification_code_info")}
                  </p>
                  <form onSubmit={submitVerfication}>
                    <VerificationCodeInput
                      length={6}
                      label={t("enter_verification_code")}
                      loading={loading}
                      labelClassName="c-email-content-text text-italic opacity-30 text-title mx-auto h2 mt-5 font-weight-bold"
                      onComplete={(code) => {
                        setLoading(true);
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
                        onClick={submitVerfication}
                        disabled={props.profileInputData.buttonDisable || inputData.verification_code ? false : true}
                      >
                        {props.profileInputData.loadingButtonContent != null ? props.profileInputData.loadingButtonContent : t("verify")}
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
  user: state.users.profile,
  profileInputData: state.users.profileInputData,
  codeResend: state.users.registerVerifyResend,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(RegisterVerifyIndex));