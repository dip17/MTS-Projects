import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { fetchCardDetailsStart } from "../../../store/actions/CardsAction";
import { fetchWalletDetailsStart } from "../../../store/actions/WalletAction";
import AddWalletAmountModal from "../../Model/PaymentModal/AddWalletAmountModal";

const PaymentMethodCard = (props) => {
  const { showWallet = true, cardElements = {}, setCardComplete = () => { } } = props;

  const [isOnlyWalletPayment, setIsOnlyWalletPayment] = useState(
    configuration.get("configData.is_only_wallet_payment")
  );
  const [skipRender, setSkipRender] = useState(true);

  const changePaymentType = (type, card = null) => {
    props.setPaymentType(type);
    if (type === "CARD") {
      props.setSelectedCard(card);
    } else {
      props.setSelectedCard(null);
    }
  };

  const [addWalletAmountModal, setAddWalletAmountModal] = useState(false);

  useEffect(() => {
    if (
      !skipRender &&
      !showWallet &&
      !props.cards.loading &&
      Object.keys(props.cards.data).length > 0
    ) {
      if (props.cards.data.cards && props.cards.data.cards.length > 0) {
        props.cards.data.cards.map((card, i) => {
          if (card.is_default === 1) props.setSelectedCard(card.id);
        });
      }
    }
    setSkipRender(false);
  }, [props.cards]);

  useEffect(() => {
    props.dispatch(fetchWalletDetailsStart());
    props.dispatch(fetchCardDetailsStart());
  }, []);

  const closeAddWalletAmountModal = () => {
    setAddWalletAmountModal(false);
  };

  return (
    <Col md={12} xl={6}>
      <div className="payment-method-sec">
        <h4 className="payment-modal-title">{t("payment_methods")}</h4>
        <div className="wallet-grid-card">
          {showWallet ? (
            <label class="card" onClick={() => changePaymentType("WALLET")}>
              <div className="wallet-payment-title">{t("wallet")}</div>
              {!props.wallet.loading ? (
                <div className="wallet-balance">
                  <img src="assets/images/money-bag.png" alt="" />
                  <p>{props.wallet.data.user_wallet.remaining_formatted}</p>
                </div>
              ) : null}
              <input
                name="plan"
                className="radio"
                type="radio"
                checked={props.paymentType === "WALLET"}
              />
            </label>
          ) : null}
          {isOnlyWalletPayment == 0 || !showWallet ? (
            <>
              {configuration.get("configData.is_ccbill_enabled") == 1 &&
                configuration.get("configData.flex_form_id") !== "" &&
                configuration.get("configData.salt_key") !== "" ? (
                <label
                  className="card"
                  onClick={() => changePaymentType("CCBILL")}
                >
                  <div className="wallet-payment-title">{t("ccbill")}</div>
                  <input
                    name="plan"
                    className="radio"
                    type="radio"
                    checked={props.paymentType === "CCBILL"}
                  />
                </label>
              ) : null}
              {configuration.get("configData.is_paypal_enabled") == 1 &&
                configuration.get("configData.PAYPAL_ID") !== "" ? (
                <label
                  className="card"
                  onClick={() => changePaymentType("PAYPAL")}
                >
                  <div className="paypal-logo-img">
                    <img
                      src={
                        window.location.origin +
                        "/assets/images/Paypal-logo.png"
                      }
                      alt=""
                    />
                  </div>

                  <input
                    name="plan"
                    className="radio"
                    type="radio"
                    checked={props.paymentType === "PAYPAL"}
                  />
                </label>
              ) : null}
              {configuration.get("configData.is_stripe_enabled") == 1 &&
                configuration.get("configData.stripe_publishable_key") !== "" &&
                configuration.get("configData.stripe_secret_key") !== "" ? (
                <label
                  className="card"
                  onClick={() => changePaymentType("CARD")}
                >
                  <div className="paypal-logo-img">
                    <h5 className="wallet-payment-title mb-3">Card</h5>
                  </div>

                  <input
                    name="plan"
                    className="radio"
                    type="radio"
                    checked={props.paymentType === "CARD"}
                  />
                </label>
              ) : null}
            </>
          ) : null}
        </div>
        {!props.wallet.loading &&
          props.tipAmount > props.wallet.data.user_wallet.remaining && (
            <div className="add-card-btn mt-4">
              <Button
                disabled={
                  !(props.tipAmount > props.wallet.data.user_wallet.remaining)
                }
                onClick={() => setAddWalletAmountModal(true)}
              >
                {" "}
                {t("add_wallet_amount")}
              </Button>
            </div>
          )}
        {/* {isOnlyWalletPayment == 0 || !showWallet ? (
          configuration.get("configData.is_stripe_enabled") == 1 &&
            configuration.get("configData.stripe_publishable_key") !== "" &&
            configuration.get("configData.stripe_secret_key") !== "" ? (
            <div className="payment-multiple-card">
              <div className="wallet-grid-card">
                <label
                  className="card"
                  onClick={() => changePaymentType("CARD")}
                >
                  <h5 className="wallet-payment-title mb-3">Card</h5>
                  <input
                    name="plan"
                    className="radio"
                    type="radio"
                    checked={props.paymentType === "CARD"}
                  />
                </label>
              </div>
              {/* <>
                {props.cards.loading ? (
                  "Loading"
                ) : (
                  <div className="payment-multiple-box">
                    {props.cards.data.cards.length > 0
                      ? props.cards.data.cards.map((card, i) => (
                        <label
                          className="card"
                          onClick={() => changePaymentType("CARD", card.id)}
                          key={i}
                        >
                          <div className="payment-card-details">
                            <img src={card.picture} alt="" />
                            <h5>{card.card_holder_name}</h5>
                            <p>xxxx-xxxx-xxxx-{card.last_four}</p>
                            {card.is_default === 1 && (
                              <p className="text-success">
                                {t("default_card")}
                              </p>
                            )}
                          </div>
                          <input
                            name="plan"
                            className="radio"
                            type="radio"
                            checked={
                              props.paymentType === "CARD" &&
                              props.selectedCard === card.id
                            }
                          />
                        </label>
                      ))
                      : t("no_card")}
                  </div>
                )}
                <div className="add-card mt-4">
                  <Button onClick={() => props.setShowAddCard(true)}>
                    {t("add_card")}{" "}
                    <span>
                      <img src="assets/images/plus.png" alt="" />
                    </span>
                  </Button>
                </div>
              </> *
            </div>
          ) : null
        ) : null} */}
      </div>
      {addWalletAmountModal && (
        <AddWalletAmountModal
          paymentsModal={addWalletAmountModal}
          closepaymentsModal={closeAddWalletAmountModal}
          payments={props.wallet}
        />
      )}
    </Col>
  );
};

const mapStateToPros = (state) => ({
  wallet: state.wallet.walletData,
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PaymentMethodCard));
