import React, { useState, useRef, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Image, Media, Form } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import SettingsSidebar from "./SettingsSidebar";
import { connect } from "react-redux";
import {
  editUserDetails,
  updateUserDetailsStart,
} from "../../../store/actions/UserAction";

const AvailabilityStatus = (props) => {

  const [availableStatus, setAvailableStatus] = useState(
    !props.profile.loading && props.profile.data.is_online_status
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(
      updateUserDetailsStart({
        is_online_status: availableStatus,
      })
    );
  };

  const handleAvailableStatus = (status) => {
    setAvailableStatus(status);
  };

  return (
    <>
      <div className="new-settings-sec new-change-password">
        <div className="new-settings-box">
          <SettingsSidebar />
          <div className="new-settings-main-wrapper">
            <div className="new-changes-password-box">
              <div className="settings-personal-info-card">
                <div className="settings-personal-info-header">
                  <h3>{t("availability_status")}</h3>
                  <p>{t("availability_status_note")}</p>
                </div>
                <div className="edit-profile-form">
                  <Row className="justify-content-center">
                    <Col xl={6}>
                      <div
                        className="edit-input-wrapper disabled"
                        data-vv-delay="1000"
                        data-vv-as="online_status"
                      >
                        <Form onSubmit={handleSubmit} className="mt-3">
                          <Form.Label>
                            {t("online_status")}{" "}
                          </Form.Label>
                          <div className="">
                            <select
                              className="form-control mw-200 mb-3"
                              onChange={(event) => setAvailableStatus(event.target.value)}
                              name="is_online_status"
                              defaultValue={props.profile.data.is_online_status}
                            >
                              <option
                                value="1"
                                selected={
                                  props.profile.data.is_online_status == 1 ? true : false
                                }
                              >
                                {t("Online")}
                              </option>
                              <option
                                value="0"
                                selected={
                                  props.profile.data.is_online_status == 0 ? true : false
                                }
                              >
                                {t("offline")}
                              </option>
                            </select>
                          </div>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <div className="settings-btn-sec-1">
                                <Button
                                  className="settings-submit-btn"
                                  onClick={handleSubmit}
                                  disabled={props.profileInputData.buttonDisable}
                                >
                                  {props.profileInputData.loadingButtonContent !== null
                                    ? props.profileInputData.loadingButtonContent
                                    : t("submit")}
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  profileInputData: state.users.profileInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AvailabilityStatus));
