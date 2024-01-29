import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  chatAssetPaymentStripeStart,
  chatAssetPaymentPaypalStart,
  chatAssetPaymentWalletStart,
} from "../../store/actions/ChatAssetAction";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";

const AssetPaymentModal = (props) => {
  const [paymentType, setPaymentType] = useState(localStorage.getItem("default_payment_method"));

  const [showPayPal, payPal] = useState(false);

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  const choosePaymentOption = (event) => {
    setPaymentType(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "CARD")
      props.dispatch(
        chatAssetPaymentStripeStart({
          chat_message_id: props.paymentData.chat_message_id,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        chatAssetPaymentWalletStart({
          chat_message_id: props.paymentData.chat_message_id,
        })
      );
    if (paymentType === "PAYPAL") showPayPal(true);

    props.closePaymentModal();
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        chatAssetPaymentPaypalStart({
          payment_id: payment.paymentID,
          chat_message_id: props.paymentData.chat_message_id,
        })
      );
    }, 1000);
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
     t("payment_cancelled_please_try_again")
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <Modal
        className={`modal-dialog-center sent-tip-modal 
                ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.chatPayment}
        onHide={props.closePaymentModal}
      >
        {props.chatPayment === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("chat_message")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="header-userinfo mb-0">
                <div className="popup-username-row">
                  <span className="pop-username popuser-realname">
                    <div className="pop-username">{t("chat_message_payment")}</div>
                  </span>
                </div>
              </div>

              <div className="floating-form">
                <div>
                  <div className="pop-user-username">
                    {t("amount")} - {props.paymentData.amount}
                  </div>
                </div>
                <Form className="mt-4">
                  {["radio"].map((type) => (
                    <div key={`custom-inline-${type}`} className="mb-3">
                      {configuration.get("configData.is_only_wallet_payment") == 0 ?
                        <>
                          {configuration.get("configData.is_stripe_enabled") ==
                            1 && configuration.get("configData.stripe_publishable_key") !== "" && configuration.get("configData.stripe_secret_key") !== "" ? (
                            <Form.Check
                              custom
                              inline
                              label="Card"
                              type={type}
                              // id={`custom-inline-${type}-2`}
                              id="card"
                              value="CARD"
                              name="payment_type"
                              defaultChecked={paymentType == "CARD" ? true : false}
                              onChange={(event) => {
                                choosePaymentOption(event.currentTarget.value);
                              }}
                            />
                          ) : (
                            null
                          )}
                          {configuration.get("configData.is_paypal_enabled") ==
                            1 && configuration.get("configData.PAYPAL_ID") !== "" ? (
                            <Form.Check
                              custom
                              inline
                              label="Paypal"
                              type={type}
                              id="paypal"
                              value="PAYPAL"
                              name="payment_type"
                              defaultChecked={paymentType == "PAYPAL" ? true : false}
                              onChange={(event) => {
                                choosePaymentOption(event.currentTarget.value);
                              }}
                            />
                          ) : (
                            ""
                          )}
                          {configuration.get(
                            "configData.is_wallet_payment_enabled"
                          ) == 1 ? (
                            <Form.Check
                              custom
                              inline
                              label="Wallet"
                              type={type}
                              id="wallet"
                              value="WALLET"
                              name="payment_type"
                              onChange={(event) => {
                                choosePaymentOption(event.currentTarget.value);
                              }}
                            />
                          ) : null}
                        </>
                        :
                        <>
                          {configuration.get(
                            "configData.is_wallet_payment_enabled"
                          ) == 1 ? (
                            <Form.Check
                              custom
                              inline
                              label="Wallet"
                              type={type}
                              id="wallet"
                              value="WALLET"
                              name="payment_type"
                              defaultChecked={paymentType == "WALLET" ? true : false}
                              onChange={(event) => {
                                choosePaymentOption(event.currentTarget.value);
                              }}
                            />
                          ) : null}
                        </>
                      }
                    </div>
                  ))}
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {paymentType === "PAYPAL" &&
                props.paymentData.amount_formatted != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={props.paymentData.amount_formatted}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}

              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closePaymentModal}
              >
                {t("cancel")}
              </Button>
              {paymentType !== "PAYPAL" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.payStripe.buttonDisable}
                >
                  {props.payStripe.loadingButtonContent !== null
                    ? props.payStripe.loadingButtonContent
                    : t("pay_now")}
                </Button>
              ) : (
                ""
              )}
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  payStripe: state.chatAsset.chatAssetPayStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(AssetPaymentModal));
