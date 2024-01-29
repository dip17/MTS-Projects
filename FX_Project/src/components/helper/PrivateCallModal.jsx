import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  sendTipStripeStart,
  sendTipWalletStart,
  sendTipPaypalStart,
} from "../../store/actions/SendTipAction";
import configuration from "react-global-configuration";

import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "./NotificationMessage";
import { translate, t } from "react-multi-lang";
import DateTimePicker from "react-datetime-picker";
import { requestCallStart } from "../../store/actions/PrivateCallAction";
import dayjs from "dayjs";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

const PrivateCallModal = (props) => {
  const [startTime, setStartTime] = useState(new Date(dayjs(new Date()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("YYYY-MM-DD H:m")));

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(
      requestCallStart({
        start_time: dayjs(startTime).format("YYYY-MM-DD H:m"),
        model_id: props.user_id,
      })
    );
    props.closePrivateCallModal();
  };
  const nullData = ["", null, undefined, "light"];

  const handleClose = () => {
    setStartTime(new Date());
    props.closePrivateCallModal();
  }


  return (
    <>
      <Modal
        className={`modal-dialog-center sent-tip-modal
        ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }
        `}
        size="md"
        centered
        show={props.requestVideoCall}
        onHide={handleClose}
      >
        {props.requestVideoCall === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("request_video_call_model_title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="header-userinfo">
                <div className="g-avatar online_status_class">
                  <Image
                    src={props.userPicture}
                    alt={props.name}
                    className="tips__user__img"
                  />
                </div>
                <div className="body-userinfo">
                  <div className="popup-username-row">
                    <div className="pop-username">
                      <div className="">
                        {props.name}{" "}
                        {props.is_verified_badge == 1 ? (
                          <img
                            className="verified-badge"
                            alt="verified-badge"
                            src={
                              configuration.get(
                                "configData.verified_badge_file"
                              )
                                ? configuration.get(
                                  "configData.verified_badge_file"
                                )
                                : ""
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="popup-username-row">
                    <span className="pop-username popuser-realname">
                      <div className="pop-user-username">@{props.username}</div>
                    </span>
                  </div>
                </div>
              </div>

              <div className="floating-form">
                <div className="floating-label mb-4">
                  <DateTimePicker
                    onChange={setStartTime}
                    className="floating-input"
                    name="start_time"
                    required={true}
                    value={startTime}
                    isClockOpen={true}
                    // minDate={new Date()}
                    format={"y-MM-dd HH:mm"}
                  />
                </div>

                <div className="floating-label" style={{ display: "none" }}>
                  <input
                    className="floating-input"
                    type="text"
                    placeholder={t("message_optional")}
                  />
                  <span className="highlight"></span>
                  <label className="default-label">
                    {t("message")} ({t("optional")})
                  </label>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>

              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleClose}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
                disabled={props.tipStripe.buttonDisable}
              >
                {props.tipStripe.loadingButtonContent !== null
                  ? props.tipStripe.loadingButtonContent
                  : t("request_call")}
              </Button>

            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  tipStripe: state.tip.tipStripe,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PrivateCallModal));
