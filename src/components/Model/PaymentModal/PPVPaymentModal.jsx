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
import { Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import AddCardModalSec from "./AddCardModalSec";
import PaymentMethodCard from "./PaymentMethodCard";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import {
  PPVPaymentStripeStart,
  PPVPaymentWalletStart,
  PPVPaymentPaypalStart,
  PPVPaymentCCBillStart,
  PPVPaymentCoinPaymentStart,
} from "../../../store/actions/PostAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const PPVPaymentModal = (props) => {
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
      props.dispatch(
        PPVPaymentPaypalStart({
          payment_id: payment.paymentID,
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
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
        PPVPaymentStripeStart({
          user_card_id: selectedCard,
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        PPVPaymentWalletStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          user_id: props.user_id,
        })
      );
    // props.closePPVPaymentModal();
  };

  useEffect(() => {
    if (
      !skipRender &&
      !props.ppvPayStripe.loading &&
      Object.keys(props.ppvPayStripe.data).length > 0
    ) {
      props.closePPVPaymentModal();
    }
  }, [props.ppvPayStripe]);

  useEffect(() => {
    if (
      !skipRender &&
      !props.ppvPayWallet.loading &&
      Object.keys(props.ppvPayWallet.success).length > 0
    ) {
      props.closePPVPaymentModal();
    }
    setSkipRender(false);
  }, [props.ppvPayWallet]);

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
          show={props.PPVPayment}
          onHide={props.closePPVPaymentModal}
        >
          {/* <Modal.Header closeButton>
            {/* <Modal.Title>User List</Modal.Title> *
          </Modal.Header> */}
          <Modal.Body className="wallet-card-body">
            <Button
              className="modal-close"
              onClick={() => props.closePPVPaymentModal()}
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
                      title={t("post_payment")}
                      message={t("post_payment_note")}
                      paymentType={paymentType}
                      amount_formatted={props.amount_formatted}
                      amount={props.amount}
                      payNowAction={handleSubmit}
                      paypalOnError={paypalOnError}
                      paypalOnSuccess={paypalOnSuccess}
                      paypalOnCancel={paypalOnCancel}
                      btnDisable={
                        props.ppvPayWallet.ButtonDisable ||
                        props.ppvPayStripe.ButtonDisable
                      }
                      btnText={
                        props.ppvPayWallet.loadingButtonContent
                          ? props.ppvPayWallet.loadingButtonContnet
                          : props.ppvPayStripe.loadingButtonContent
                          ? props.ppvPayStripe.loadingButtonContent
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
  liveVideoDetails: state.liveVideo.singleLiveVideo,
  ppvPayWallet: state.post.ppvPayWallet,
  ppvPayStripe: state.post.ppvPayStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PPVPaymentModal));
