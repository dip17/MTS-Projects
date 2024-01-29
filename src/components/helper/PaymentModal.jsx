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
  subscriptionPaymentStripeStart,
  subscriptionPaymentPaypalStart,
  subscriptionPaymentCCBillStart,
  subscriptionPaymentWalletStart,
  subscriptionPaymentCoinPaymentStart,
} from "../../store/actions/SubscriptionAction";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const PaymentModal = (props) => {
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );

  const [isOnlyWalletPayment, setIsOnlyWalletPayment] = useState(
    configuration.get("configData.is_only_wallet_payment")
  );

  const [showPayPal, payPal] = useState(false);

  useEffect(() => {
    props.dispatch(fetchCardDetailsStart());
    props.dispatch(fetchWalletDetailsStart());
  }, []);

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
        subscriptionPaymentStripeStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "PAYPAL") showPayPal(true);

    if (paymentType === "WALLET")
      props.dispatch(
        subscriptionPaymentWalletStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );

    if (paymentType === "CCBILL")
      props.dispatch(
        subscriptionPaymentCCBillStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
        })
      );
    if (paymentType === "coinpayment")
      props.dispatch(
        subscriptionPaymentCoinPaymentStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
        })
      );
    // props.closePaymentModal();
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        subscriptionPaymentPaypalStart({
          payment_id: payment.paymentID,
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
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
        show={props.subscrptionPayment}
        onHide={props.closePaymentModal}
        centered
        size="lg"
        className={`m${nullData.includes(localStorage.getItem("theme")) ?
          "" : "dark-theme-modal"
          }`}

      >
        {props.subscrptionPayment === true ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t("subscribe")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="subscription-tip-ppv-tab">
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={paymentType}
              >
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      {isOnlyWalletPayment == 0 ?
                        <Nav.Item>
                          {configuration.get("configData.is_stripe_enabled") == 1 &&
                            configuration.get("configData.stripe_publishable_key") !==
                            "" &&
                            configuration.get("configData.stripe_secret_key") !==
                            "" ? (
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
                        : null}
                      {configuration.get(
                        "configData.is_wallet_payment_enabled"
                      ) == 1 ? (
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
                      <Form onSubmit={handleSubmit}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            placeholder={t("amount")}
                            value={props.subscriptionData.amount_formatted}
                            disabled
                          />
                        </Form.Group>
                        <Tab.Content>
                          {configuration.get("configData.is_stripe_enabled") ==
                            1 &&
                            configuration.get(
                              "configData.stripe_publishable_key"
                            ) !== "" &&
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
                                  {props.subscriptionData.amount >
                                    props.wallet.data.user_wallet.remaining ? (
                                    <div className="">
                                      <p className="conv-desc desc">
                                        {t(
                                          "low_wallet_balance_tips_payment_para"
                                        )}
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
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              {paymentType === "PAYPAL" &&
                props.subscriptionData.amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={props.subscriptionData.amount}
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
                Cancel
              </Button>
              {paymentType !== "PAYPAL" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.subPayStripe.buttonDisable}
                >
                  {props.subPayStripe.loadingButtonContent !== null
                    ? props.subPayStripe.loadingButtonContent
                    : t("pay_now")}
                </Button>
              ) : null}
            </Modal.Footer>
          </>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  subPayStripe: state.subscriptions.subPayStripe,
  wallet: state.wallet.walletData,
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PaymentModal));
