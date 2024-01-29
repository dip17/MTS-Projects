import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import { saveVideoCallRequestStart } from "../../store/actions/VideoCallAction";
import DateTimePicker from "react-datetime-picker";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

const ScheduleVideoCallModal = (props) => {
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState(new Date(dayjs(new Date()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("YYYY-MM-DD H:m:s")));

  const handleSubmit = (event) => {
    console.log(startTime);

    console.log(props.user_id);

    // event.preventDefault();
    props.dispatch(
      saveVideoCallRequestStart({
        start_time: startTime,
        model_id: props.user_id,
      })
    );
    // props.closeScheduleVideoCallModal();
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
        show={props.scheduleVideoCall}
        onHide={props.closeScheduleVideoCallModal}
      >
        {props.scheduleVideoCall === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("schedule_video_call")}</Modal.Title>
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

              <div className="row col-12">
                <p className="text-muted">
                  {t("video_call_amount")}: {props.videoAmount}
                </p>
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
                    minDate={new Date()}
                    format={"y-MM-dd h:mm:ss a"}
                  />
                </div>

                <div className="floating-label hidden">
                  <input
                    className="floating-input"
                    type="text"
                    placeholder={t("message_optional")}
                    onChange={(event) => {
                      setMessage(event.currentTarget.value);
                    }}
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
                onClick={props.closeScheduleVideoCallModal}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
                disabled={props.videocall.buttonDisable}
              >
                {props.videocall.loadingButtonContent !== null
                  ? props.videocall.loadingButtonContent
                  : t("schedule")}
              </Button>
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  videocall: state.videocall.saveVideoCallRequest,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ScheduleVideoCallModal));
