import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { translate, t } from 'react-multi-lang';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import PaymentMethodCard from './PaymentMethodCard';
import PaymentModelMsgSec from './PaymentModelMsgSec';
import { audioCallPayByWalletStart, videoCallPayByWalletStart } from '../../../store/actions/PrivateCallAction';


const CallPaymentModal = (props) => {
  const { isVideo = false } = props;

  const nullData = ["", null, undefined, "light"];

  const [skipRender, setSkipRender] = useState(true);
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const paypalOnError = () => { }
  const paypalOnSuccess = () => { }
  const paypalOnCancel = () => { }

  const handleSubmit = () => {
    if (isVideo) {
      props.dispatch(
        videoCallPayByWalletStart({
          video_call_request_id: props.callDetails.video_call_request_id,
        })
      );
    } else {
      props.dispatch(
        audioCallPayByWalletStart({
          audio_call_request_id: props.callDetails.audio_call_request_id,
        })
      );
    }
  }

  useEffect(() => {
    if (!skipRender && !props.audioCallPayByWallet.loading && Object.keys(props.audioCallPayByWallet.data).length > 0) {
      props.closepaymentsModal();
    }
  }, [props.audioCallPayByWallet]);

  useEffect(() => {
    if (!skipRender && !props.videoCallPayByWallet.loading && Object.keys(props.videoCallPayByWallet.data).length > 0) {
      props.closepaymentsModal();
    }
    setSkipRender(false);
  }, [props.videoCallPayByWallet]);

  return (
    <>
      <div className="payment-modal-sec">
        <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${nullData.includes(localStorage.getItem("theme"))
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
                  <PaymentModelMsgSec
                    title={t(isVideo ? "video_payment" : "audio_payment")}
                    message={t(isVideo ? "video_payment_note" : "audio_payment_note")}
                    paymentType={paymentType}
                    amount_formatted={props.callDetails.amount_formatted}
                    amount={props.callDetails.amount}
                    payNowAction={handleSubmit}
                    paypalOnError={paypalOnError}
                    paypalOnSuccess={paypalOnSuccess}
                    paypalOnCancel={paypalOnCancel}
                    btnDisable={
                      props.audioCallPayByWallet.ButtonDisable ||
                      props.videoCallPayByWallet.ButtonDisable
                    }
                    btnText={
                      props.audioCallPayByWallet.loadingButtonContent
                        ? props.audioCallPayByWallet.loadingButtonContent
                        : props.videoCallPayByWallet.loadingButtonContent
                          ? props.videoCallPayByWallet.loadingButtonContent
                          : t("pay")
                    }
                  />
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

const mapStateToPros = (state) => ({
  audioCallPayByWallet: state.privateCall.audioCallPayByWallet,
  videoCallPayByWallet: state.privateCall.audioCallPayByWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(CallPaymentModal));