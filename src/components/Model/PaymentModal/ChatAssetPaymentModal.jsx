import React, { useState, useEffect } from "react";
import AddCardModalSec from "./AddCardModalSec";
import PaymentMethodCard from "./PaymentMethodCard";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import {
  chatAssetPaymentPaypalStart,
  chatAssetPaymentStripeStart,
  chatAssetPaymentWalletStart,
} from "../../../store/actions/ChatAssetAction";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";

const ChatAssetPaymentModal = (props) => {
  const nullData = ["", null, undefined, "light"];
  const [skipRender, setSkipRender] = useState(true);

  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

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
      "Payment cancelled please try again.."
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const handleSubmit = () => {
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
  };

  useEffect(() => {
    console.log(props.paymentData);
    if (
      !skipRender &&
      !props.chatAssetPayWallet.loading &&
      Object.keys(props.chatAssetPayWallet.success).length > 0
    ) {
      props.closepaymentsModal();
    }
  }, [props.chatAssetPayWallet]);

  useEffect(() => {
    if (
      !skipRender &&
      !props.chatAssetPayStripe.loading &&
      Object.keys(props.chatAssetPayStripe.success).length > 0
    ) {
      props.closepaymentsModal();
    }
    setSkipRender(false);
  }, [props.chatAssetPayStripe]);

  return (
    <>
      <div className="payment-modal-sec">
        <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${
            nullData.includes(localStorage.getItem("theme"))
              ? ""
              : "dark-theme-modal"
          }`}
          size="xl"
          centered
          show={props.paymentsModal}
          onHide={props.closepaymentsModal}
        >
          {/* <Modal.Header closeButton>
            {/* <Modal.Title>User List</Modal.Title> *
          </Modal.Header> */}
          <Modal.Body className="wallet-card-body">
            <Button
              className="modal-close"
              onClick={() => props.closepaymentsModal()}
            >
              <i className="fa fa-times" />
            </Button>
            <div className="payment-modal-body">
              <Row className="justify-content-between">
                <PaymentMethodCard
                  paymentType={paymentType}
                  setPaymentType={setPaymentType}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                  setShowAddCard={setShowAddCard}
                />
                <Col md={12} xl={5}>
                  {showAddCard ? (
                    <AddCardModalSec setShowAddCard={setShowAddCard} />
                  ) : (
                    <PaymentModelMsgSec
                      title={t("chat_asset_payment")}
                      message={t("chat_asset_payment_note")}
                      paymentType={paymentType}
                      amount_formatted={props.paymentData.amount_formatted}
                      amount={props.paymentData.amount}
                      payNowAction={handleSubmit}
                      paypalOnError={paypalOnError}
                      paypalOnSuccess={paypalOnSuccess}
                      paypalOnCancel={paypalOnCancel}
                      btnDisable={
                        props.chatAssetPayStripe.ButtonDisable ||
                        props.chatAssetPayWallet.ButtonDisable
                      }
                      btnText={
                        props.chatAssetPayStripe.loadingButtonContent
                          ? props.chatAssetPayStripe.loadingButtonContnet
                          : props.chatAssetPayWallet.loadingButtonContent
                          ? props.chatAssetPayWallet.loadingButtonContent
                          : t("pay")
                      }
                    />
                  )}
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  chatAssetPayStripe: state.chatAsset.chatAssetPayStripe,
  chatAssetPayWallet: state.chatAsset.chatAssetPayWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ChatAssetPaymentModal));
