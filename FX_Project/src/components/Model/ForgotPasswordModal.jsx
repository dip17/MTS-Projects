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
import {
  sendTipStripeStart,
  sendTipWalletStart,
  sendTipPaypalStart,
  sendTipCCBillStart,
  sendTipCoinPaymentStart,
} from "../../store/actions/SendTipAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import configuration from "react-global-configuration";

import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const ForgotPasswordModal = (props) => {
  

    return (
        <>
          <Modal
            centered
            size="md"
            className="modal-dialog-center sent-tip-modal"
            show={props.forgotPasswordModal}
            onHide={props.closeForgotPasswordModal}
          >
            {props.loginModal === true ? 
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{t("forgot_password")}</Modal.Title>
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
                        {/* <Button className="social-button" id="facebook-connect">
                            <span>Sign In / Login with Facebook</span>
                        </Button>
                        <Button className="social-button" id="google-connect">
                            <span>Sign In / Login with Google</span>
                        </Button> */}
                      <Form className="modal-form" method="post">
                            <Form.Group controlId="formBasicEmail" className="mb-4">
                                <Form.Control
                                type="text"
                                controlId="loginemail"
                                className="form-control"
                                placeholder={t("email")}
                                required
                                name="email"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Button
                                id="forgotpassword"
                                type="submit"
                                className="btn btn-auth btn-lg"
                                >
                                {t("forgot_passwords")}
                                </Button>
                            </Form.Group>
                            
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
 
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ForgotPasswordModal));
