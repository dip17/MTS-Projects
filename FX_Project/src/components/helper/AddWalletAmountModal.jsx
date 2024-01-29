import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import {
  addMoneyViaCardStart,
  addMoneyViaPaypalStart,
} from "../../store/actions/WalletAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { translate, t } from "react-multi-lang";

const AddWalletAmountModal = (props) => {

  const [paymentType, setPaymentType] = useState("card");

  const [amount, setAmount] = useState(1);

  useEffect(() => {
    props.dispatch(fetchWalletDetailsStart());
  }, []);

  const handleChangeAmount = (amount) => {
    setAmount(amount);
  };

  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "card")
      props.dispatch(
        addMoneyViaCardStart({
          amount: amount,
        })
      );
    // props.closeAddWalletAmountModal();
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      props.dispatch(
        addMoneyViaPaypalStart({
          payment_id: payment.paymentID,
          amount: amount,
        })
      );
    }, 1000);
    props.dispatch(fetchWalletDetailsStart());
    props.closeAddWalletAmountModal();
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

  const choosePaymentOption = (event) => {
    setPaymentType(event);
  };

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <Modal
        className={`modal-dialog-center withdraw-modal 
                ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.addWalletAmountModal}
        onHide={props.closeAddWalletAmountModal}
      >
        {props.addWalletAmountModal === true ?
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{Number(configuration.get("configData.is_only_wallet_payment")) ? t("add_wallet_token") : t("add_wallet_amount")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.payments.loading ? (
                t("loading")
              ) : (
                <Row>
                  <Col md="12">
                    <div className="mb-5">
                      <h4 className="text-muted">
                        {t("wallet_balance")}:{" "}
                        <span className="text-muted">
                          {props.payments.data.user_wallet
                            ? props.payments.data.user_wallet.remaining_formatted
                            : ""}
                        </span>
                      </h4>
                    </div>
                  </Col>
                </Row>
              )}
              <div className="floating-form">
                <div className="floating-label">
                  <input
                    className="floating-input"
                    type="number"
                    placeholder={Number(configuration.get("configData.is_only_wallet_payment")) ? t("token") : t("amount")}
                    min="1"
                    step="any"
                    value={amount}
                    onChange={(event) => handleChangeAmount(event.currentTarget.value)}
                  />
                  <span className="highlight"></span>
                  <label className="default-label">{Number(configuration.get("configData.is_only_wallet_payment")) ? t("enter_token") : t("enter_amount")}</label>
                </div>
                {Number(configuration.get("configData.is_only_wallet_payment")) ?
                  <div className="floating-label">
                    <label className="label-default-1">{t("amount")} ({configuration.get("configData.token_amount")} * {amount}) = {configuration.get("configData.currency")}{configuration.get("configData.token_amount") * amount}
                    </label>
                  </div>
                  : ""}

                <div className="floating-label">
                  <label className="label-default-1">{t("payment_type")}</label>
                  <Form className="mt-4">
                    {["radio"].map((type) => (
                      <div key={`custom-inline-${type}`} className="mb-3">
                        <Form.Check
                          custom
                          inline
                          label="Card"
                          type={type}
                          id="card"
                          value="card"
                          name="payment_type"
                          defaultChecked={true}
                          onChange={() => setPaymentType("card")}
                        />
                        {configuration.get("configData.is_paypal_enabled") ==
                          1 ? (
                          <Form.Check
                            custom
                            inline
                            label="Paypal"
                            type={type}
                            id="paypal"
                            value="paypal"
                            name="payment_type"
                            onChange={() => setPaymentType("paypal")}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </Form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>

              {paymentType === "paypal" && amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={Number(configuration.get("configData.is_only_wallet_payment")) ? configuration.get("configData.token_amount") * amount : amount}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}

              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closeAddWalletAmountModal}
              >
                {t("cancel")}
              </Button>
              {paymentType === "card" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.addAmount.buttonDisable}
                >
                  {props.addAmount.loadingButtonContent != null
                    ? props.addAmount.loadingButtonContent
                    : t("submit")}
                </Button>
              ) : ''}

            </Modal.Footer>
          </Form>
          : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  payments: state.wallet.walletData,
  addAmount: state.wallet.addMoneyInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(AddWalletAmountModal);
