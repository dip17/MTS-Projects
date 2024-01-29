import React, { useState } from 'react';
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
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import configuration from "react-global-configuration";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { translate, t } from 'react-multi-lang';

const WalletAmountSec = (props) => {

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  return (
    <>
      <div className="wallet-modal-details mt-5">
        <h4 className="payment-modal-title">{t("add_wallet_token")}</h4>
        <p>{t("looking_beatiful_para")}</p>
        <Form onSubmit={props.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text"
              value={props.amount}
              min="50"
              onChange={e => props.setAmount(e.target.value)}
            />
          </Form.Group>
          <div className="wallet-account-balance mt-5 mb-5">
            {t("amount")} ({configuration.get("configData.token_amount")} * {props.amount}) = {configuration.get("configData.currency")}{configuration.get("configData.token_amount") * props.amount}
          </div>
          <div className="add-card-btn">
            {props.paymentType === "PAYPAL" ?
              <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={props.amount}
                onError={props.paypalOnError}
                onSuccess={props.paypalOnSuccess}
                onCancel={props.paypalOnCancel}
              />
              : <Button type="submit"
                disabled={props.amount && props.amount > 0 ? false : true || props.buttonDisable}
              >{
                  props.loadingButtonContent ?
                    props.loadingButtonContent
                    : t("add")
                }</Button>
            }
          </div>
        </Form>
      </div>
    </>
  )

}

export default translate(WalletAmountSec);