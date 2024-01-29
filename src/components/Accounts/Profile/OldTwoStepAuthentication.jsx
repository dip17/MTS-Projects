import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import {twoStepAuthUpdateStart} from '../../../store/actions/UserAction'

const OldTwoStepAuthentication = (props) => {
  const [password, setPassword] = useState("");

  const [twoFactor, setTwoFactor] = useState(localStorage.getItem("is_two_step_auth_enabled") != undefined ? localStorage.getItem("is_two_step_auth_enabled") == 1 ? true : false : false)

  const handleChange = (event) => {
    setTwoFactor(!twoFactor)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(twoStepAuthUpdateStart({ password : password}))
    setPassword("")
  };

  return (
    <>
      <div
        role="two_factor"
        className={
          props.activeSec === "two_factor"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section3"
      >
        <div className="change-password-sec">
          <div className="card-header bg-transparent">
            <h4>{t("two_step_authentication")}</h4>
            <Form className="switch-flex">
              <Form.Check
                type="switch"
                id="change-enable"
                label="Enable"
                checked={twoFactor}
                onChange={(event) => handleChange(event)}
              />
            </Form>
            <div className="two-step-auth-img-sec">
              <Image
                src={
                  window.location.origin +
                  "/assets/images/two-step-auth.svg"
                }
                alt=""
                className="two-step-auth-img"
              />
            </div>
          </div>
          <div className="card-body">
            <Row>
              <Col sm={12} md={12}>
                <Form autoComplete="new-password" onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label for="password">{t("password")}</Form.Label>
                    <Form.Control
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder={t("enter_your_password")}
                      name="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                  </Form.Group>
                  <Row className="mt-5">
                    <Col sm={12} xs={12} md={6} className="mx-auto">
                      <Button
                        className="btn gradient-btn gradientcolor"
                        type="submit"
                        disabled={props.twoStepAuthUpdate.buttonDisable || password != "" ? false : true}
                      >
                        {props.twoStepAuthUpdate.loadingButtonContent !== null
                          ? props.twoStepAuthUpdate.loadingButtonContent
                          : t("submit")}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  twoStepAuthUpdate: state.users.twoStepAuthUpdate,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(OldTwoStepAuthentication));
