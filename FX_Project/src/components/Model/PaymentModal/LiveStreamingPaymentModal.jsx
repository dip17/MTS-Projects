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
import { Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import AddCardModalSec from "./AddCardModalSec";
import PaymentMethodCard from "./PaymentMethodCard";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import {
  livePaymentPaypalStart,
  livePaymentStripeStart,
  livePaymentWalletStart,
} from "../../../store/actions/LiveVideoAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const LiveStreamingPaymentModal = (props) => {

  const nullData = ["", null, undefined, "light"];

  const [paymentType, setPaymentType] = useState(localStorage.getItem("default_payment_method"));
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      props.dispatch(
        livePaymentPaypalStart({
          live_video_id: props.live.live_video_id,
          payment_id: payment.paymentID,
        })
      );
    }, 1000);
    props.closePaymentModal();
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
        livePaymentStripeStart({
          live_video_id: props.live.live_video_id,
          user_card_id: selectedCard,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        livePaymentWalletStart({
          live_video_id: props.live.live_video_id,
        })
      );
    props.closePaymentModal();
  };

  return (
    <>
      <div className="payment-modal-sec">
        <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
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
            <Button className="modal-close"
              onClick={() => props.closepaymentsModal()}>
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
                  {showAddCard ?
                    <AddCardModalSec
                      setShowAddCard={setShowAddCard}
                    />
                    : <PaymentModelMsgSec
                      title={props.live.title}
                      message={props.live.description}
                      paymentType={paymentType}
                      amount_formatted={props.live.amount_formatted}
                      amount={props.live.amount}
                      payNowAction={handleSubmit}
                      paypalOnError={paypalOnError}
                      paypalOnSuccess={paypalOnSuccess}
                      paypalOnCancel={paypalOnCancel}
                      btnDisable={props.liveVideoDetails.buttonDisable}
                      btnText={props.liveVideoDetails.loadingButtonContent !== null
                        ? props.liveVideoDetails.loadingButtonContent
                        : t("pay")}
                    />
                  }
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
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingPaymentModal));
