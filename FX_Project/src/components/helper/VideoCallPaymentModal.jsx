import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import { getErrorNotificationMessage } from "../../components/helper/NotificationMessage";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import {
  videoCallRequestsPaymentPaypalStart,
  videoCallRequestsPaymentStripeStart,
} from "../../store/actions/VideoCallAction";

const VideoCallPaymentModal = (props) => {
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("card");
  const [showPayPal, payPal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "paypal") showPayPal(true);

    if (paymentType === "card")
      props.dispatch(
        videoCallRequestsPaymentStripeStart({
          video_call_request_id:
            props.video_call_request_id != undefined ||
              props.video_call_request_id != null
              ? props.video_call_request_id
              : "",
          amount: amount,
        })
      );
    // if (paymentType === "wallet")
    //   props.dispatch(
    //     VideoCallPaymentWalletStart({
    //       post_id:
    //         props.post_id != undefined || props.post_id != null
    //           ? props.post_id
    //           : "",
    //       amount: props.amount,
    //       user_id: props.user_id,
    //     })
    //   );
    if (paymentType === "paypal") props.closeVideoCallPaymentModal();
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        videoCallRequestsPaymentPaypalStart({
          payment_id: payment.paymentID,
          video_call_request_id:
            props.video_call_request_id != undefined ||
              props.video_call_request_id != null
              ? props.video_call_request_id
              : "",
          amount: props.amount,
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

  const choosePaymentOption = (event) => {
    console.log(amount);
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
        className={`modal-dialog-center sent-tip-modal 
        ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.VideoCallPayment}
        onHide={props.closeVideoCallPaymentModal}
      >
        {props.VideoCallPayment === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("pay_and_see_the_Post")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="floating-form">
                <h4>
                  {t("pay_amount")}:{" "}
                  <span className="text-info">
                    {props.post.amount_formatted}
                  </span>
                </h4>

                <Form className="mt-4">
                  <label className="text-muted f-12">
                    {t("choose_payment_mode")}
                  </label>
                  {["radio"].map((type) => (
                    <div key={`custom-inline-${type}`} className="mb-3">
                      <Form.Check
                        custom
                        inline
                        label="Card"
                        type={type}
                        // id={`custom-inline-${type}-2`}
                        id="card"
                        value="card"
                        name="payment_type"
                        defaultChecked={true}
                        onChange={(event) => {
                          choosePaymentOption(event.currentTarget.value);
                        }}
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
                          onChange={(event) => {
                            choosePaymentOption(event.currentTarget.value);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {paymentType === "paypal" && props.amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={props.amount}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closeVideoCallPaymentModal}
              >
                {t("cancel")}
              </Button>
              {paymentType !== "paypal" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.videoCallRequestPayStripe.buttonDisable}
                >
                  {props.videoCallRequestPayStripe.loadingButtonContent !== null
                    ? props.videoCallRequestPayStripe.loadingButtonContent
                    : t("confirm")}
                </Button>
              ) : (
                ""
              )}
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  videoCallRequestPayStripe: state.videocall.videoCallRequestPayStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(VideoCallPaymentModal));
