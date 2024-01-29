import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import {
  editUserDetails,
  updateUserDetailsStart,
} from "../../../store/actions/UserAction";

const OldAvailabitityStatusCard = (props) => {
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
      <div
        role="tabpanel"
        className={
          props.activeSec === "availability_status"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="availabitiy"
      >
        <div className="change-password-sec">
          <div className="card-header bg-transparent">
            <h4>{t("availability_status")}</h4>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="online_status"
          >
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Label className="edit-input-label">
                {t("online_status")}{" "}
              </Form.Label>
              <div className="">
                <select
                  className="form-control mw-200 mb-3"
                  onChange={(event) => {
                    props.dispatch(
                      editUserDetails(
                        event.currentTarget.name,
                        event.currentTarget.value
                      )
                    );
                    // handleAvailableStatus(event.currentTarget.value);
                  }}
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
              <Row className="mt-5">
                  <Button
                    className="save-btn mx-auto"
                    onClick={handleSubmit}
                    disabled={props.profileInputData.buttonDisable}
                  >
                    {props.profileInputData.loadingButtonContent !== null
                      ? props.profileInputData.loadingButtonContent
                      : t("submit")}
                  </Button>
              </Row>
            </Form>
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
)(translate(OldAvailabitityStatusCard));
