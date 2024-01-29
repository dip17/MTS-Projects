import React from "react";
import {
  InputGroup,
  FormControl,
  Image,
  Modal,
  Media,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import configuration from "react-global-configuration";
import PaypalExpressBtn from "react-paypal-express-checkout";

const PaymentModelMsgSec = (props) => {
  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  return (
    <>
      <div className="wallet-modal-details mt-5">
        <h4 className="payment-modal-title">{props.title}</h4>
        <p>{props.message}</p>
        <Form>
          <div className="wallet-account-balance mt-5 mb-5">
            {props.amount_formatted}
          </div>
          <div className="add-card-btn">
            {props.paymentType === "PAYPAL" ? (
              <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={props.amount}
                onError={props.paypalOnError}
                onSuccess={props.paypalOnSuccess}
                onCancel={props.paypalOnCancel}
              />
            ) : (
              <Button
                onClick={() => props.payNowAction()}
                disabled={props.btnDisable}
              >
                {props.btnText}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default PaymentModelMsgSec;
