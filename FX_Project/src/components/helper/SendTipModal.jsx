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

const SendTipModal = (props) => {
  const [amount, setAmount] = useState(1);
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [message, setMessage] = useState("");
  const [showPayPal, payPal] = useState(false);
  const [isOnlyWalletPayment, setIsOnlyWalletPayment] = useState(
    configuration.get("configData.is_only_wallet_payment")
  );

  const nullData = ["", null, undefined, "light"];


  useEffect(() => {
    if (props.sendTip === true) {
      props.dispatch(fetchCardDetailsStart());
      props.dispatch(fetchWalletDetailsStart());
    }
  }, [props.sendTip]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "CARD")
      props.dispatch(
        sendTipStripeStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          message: message,
          user_id: props.user_id,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        sendTipWalletStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          message: message,
          user_id: props.user_id,
        })
      );
    if (paymentType === "CCBILL")
      props.dispatch(
        sendTipCCBillStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          user_id: props.user_id,
        })
      );
    if (paymentType === "coinpayment")
      props.dispatch(
        sendTipCoinPaymentStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          user_id: props.user_id,
        })
      );
    props.closeSendTipModal();
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      props.dispatch(
        sendTipPaypalStart({
          payment_id: payment.paymentID,
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          user_id: props.user_id,
        })
      );
    }, 1000);
    props.closeSendTipModal();
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      "Payment cancelled please try again.."
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const choosePaymentOption = (event) => {
    console.log(amount);
    setPaymentType(event);
  };

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  return (
    <>
      <Modal
        centered
        size="lg"
        className={`modal-dialog-center sent-tip-modal
        ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }
        `}
        show={props.sendTip}
        onHide={props.closeSendTipModal}
      >
        {props.sendTip === true ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t("send_tip")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="subscription-tip-ppv-tab">
              <Tab.Container id="left-tabs-example" defaultActiveKey={paymentType}>
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">

                      {isOnlyWalletPayment == 0 ? (
                        <Nav.Item>
                          {configuration.get("configData.is_stripe_enabled") == 1 &&
                            configuration.get("configData.stripe_publishable_key") !==
                            "" &&
                            configuration.get("configData.stripe_secret_key") !== "" ? (
                            <Nav.Item>
                              <Nav.Link
                                onClick={() => setPaymentType("CARD")}
                                eventKey="CARD"
                              >
                                {t("card_stripe")}
                              </Nav.Link>
                            </Nav.Item>
                          ) : null}
                          {configuration.get("configData.is_paypal_enabled") == 1 &&
                            configuration.get("configData.PAYPAL_ID") !== "" ? (
                            <Nav.Item>
                              <Nav.Link
                                onClick={() => setPaymentType("PAYPAL")}
                                eventKey="PAYPAL"
                              >
                                {t("paypal")}
                              </Nav.Link>
                            </Nav.Item>
                          ) : null}
                          {configuration.get("configData.is_ccbill_enabled") == 1 &&
                            configuration.get("configData.flex_form_id") !== "" &&
                            configuration.get("configData.salt_key") !== "" ? (
                            <Nav.Item>
                              <Nav.Link
                                onClick={() => setPaymentType("CCBILL")}
                                eventKey="CCBILL"
                              >
                                {t("ccbill")}
                              </Nav.Link>
                            </Nav.Item>
                          ) : null}

                        </Nav.Item>

                      ) : null}
                      {configuration.get("configData.is_wallet_payment_enabled") ==
                        1 ? (
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setPaymentType("WALLET")}
                            eventKey="WALLET"
                          >
                            {t("wallet")}
                          </Nav.Link>
                        </Nav.Item>
                      ) : null}
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <div className="card-stripe-box">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="number"
                            placeholder={isOnlyWalletPayment == 1 ? t("tip_token") : t("tip_amount")}
                            // value={amount}
                            min="1"
                            step="any"
                            defaultValue={amount}
                            onChange={(event) => {
                              // if (event.currentTarget.value > 0) {
                              setAmount(event.currentTarget.value);
                              // }
                            }}
                          />
                        </Form.Group>
                        {isOnlyWalletPayment == 1 ?
                          <div className="floating-label">
                            <label className="label-default-1">{t("amount")} ({configuration.get("configData.token_amount")} * {amount}) = {configuration.get("configData.currency")}{configuration.get("configData.token_amount") * amount}
                            </label>
                          </div>
                          : ''}
                        <Tab.Content>
                          {configuration.get("configData.is_stripe_enabled") == 1 &&
                            configuration.get("configData.stripe_publishable_key") !==
                            "" &&
                            configuration.get("configData.stripe_secret_key") !==
                            "" ? (
                            <Tab.Pane eventKey="CARD">
                              <div className="card-stripe-sec">
                                {props.cards.loading ? (
                                  ""
                                ) : props.cards.data.cards.length > 0 ? (
                                  props.cards.data.cards.map(
                                    (card) =>
                                      card.is_default == 1 && (
                                        <div className="card-stripe-list-box">
                                          <h5 className="mb-3">
                                            XXXX XXXX XXXX {card.last_four}
                                          </h5>
                                          <h5 className="text-muted">
                                            {card.card_type}
                                          </h5>
                                          <div className="card-stripe-bottom">
                                            <div className="card-stripe-action-btn">
                                              <p className="card-link-text text-success">
                                                {t("default_card")}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  )
                                ) : (
                                  <div className="card-stripe-item">
                                    <Link to="cards">
                                      <div className="add-account-item">
                                        <Image
                                          className="add-account-icon"
                                          src={
                                            window.location.origin +
                                            "/assets/images/icons/new/add-card.svg"
                                          }
                                        />
                                        <h5 className="text-muted">{t("add_card")}</h5>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </Tab.Pane>
                          ) : null}

                          {configuration.get(
                            "configData.is_wallet_payment_enabled"
                          ) == 1 ? (
                            <Tab.Pane eventKey="WALLET">
                              {props.wallet.loading ? (
                                ""
                              ) : (
                                <div className="card-stripe-box">
                                  <div className="wallet-balence-amount">
                                    <h4>{t("available")}</h4>
                                    <p>
                                      {
                                        props.wallet.data.user_wallet
                                          .remaining_formatted
                                      }
                                    </p>
                                  </div>
                                  {amount >
                                    props.wallet.data.user_wallet.remaining ? (
                                    <div className="">
                                      <p className="conv-desc desc">
                                        {t("low_wallet_balance_tips_payment_para")}
                                      </p>
                                      <div className="d-flex">
                                        <Link
                                          to="/wallet"
                                          className="withdraw-money-btn"
                                        >
                                          {t("add_wallet_amount")}
                                        </Link>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Tab.Pane>
                          ) : null}
                        </Tab.Content>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={t("message_optional")}
                            className="height-auto"
                            onChange={(event) => {
                              setMessage(event.currentTarget.value);
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              {paymentType === "PAYPAL" && amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={amount}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closeSendTipModal}
              >
                {t("cancel")}
              </Button>
              {paymentType !== "PAYPAL" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.tipStripe.buttonDisable}
                >
                  {props.tipStripe.loadingButtonContent !== null
                    ? props.tipStripe.loadingButtonContent
                    : t("send_tip")}
                </Button>
              ) : null}
            </Modal.Footer>
          </>
          : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  tipStripe: state.tip.tipStripe,
  wallet: state.wallet.walletData,
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SendTipModal));
