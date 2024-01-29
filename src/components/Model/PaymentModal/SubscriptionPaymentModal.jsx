import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import PaymentMethodCard from "./PaymentMethodCard";
import AddCardModalSec from "./AddCardModalSec";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import {
  subscriptionPaymentPaypalStart,
  subscriptionPaymentStripeStart,
  subscriptionPaymentWalletStart,
} from "../../../store/actions/SubscriptionAction";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";

const SubscriptionPaymentModal = (props) => {
  const nullData = ["", null, undefined, "light"];
  const [skipRender, setSkipRender] = useState(true);

  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      subscriptionPaymentPaypalStart({
        payment_id: payment.paymentID,
        user_unique_id: props.user_unique_id,
        plan_type: props.subscriptionData.plan_type,
        is_free: props.subscriptionData.is_free,
      });
    }, 1000);
    props.closePPVPaymentModal();
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      t("payment_cancelled_please_try_again")
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const handleSubmit = () => {
    if (paymentType === "CARD")
      props.dispatch(
        subscriptionPaymentStripeStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        subscriptionPaymentWalletStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
  };

  useEffect(() => {
    if (
      !skipRender &&
      !props.subPayStripe.loading &&
      Object.keys(props.subPayStripe.success).length > 0
    ) {
      props.closepaymentsModal();
    }
  }, [props.subPayStripe]);

  useEffect(() => {
    if (
      !skipRender &&
      !props.subPayWallet.loading &&
      Object.keys(props.subPayWallet.success).length > 0
    ) {
      props.closepaymentsModal();
    }
    setSkipRender(false);
  }, [props.subPayWallet]);

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
                      title={t("subscription_payment")}
                      message={t("subscription_payment_note")}
                      paymentType={paymentType}
                      amount_formatted={props.subscriptionData.amount_formatted}
                      amount={props.subscriptionData.amount}
                      payNowAction={handleSubmit}
                      paypalOnError={paypalOnError}
                      paypalOnSuccess={paypalOnSuccess}
                      paypalOnCancel={paypalOnCancel}
                      btnDisable={
                        props.subPayStripe.ButtonDisable ||
                        props.subPayWallet.ButtonDisable
                      }
                      btnText={
                        props.subPayStripe.loadingButtonContent
                          ? props.subPayStripe.loadingButtonContnet
                          : props.subPayWallet.loadingButtonContent
                          ? props.subPayWallet.loadingButtonContent
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
  subPayStripe: state.subscriptions.subPayStripe,
  subPayWallet: state.subscriptions.subPayWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SubscriptionPaymentModal));
