import React, { useState, useRef, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Image, Media, Form } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import { twoStepAuthUpdateStart } from '../../../store/actions/UserAction';
import { translate, t } from "react-multi-lang";
import SettingsSidebar from "./SettingsSidebar";
import { connect } from "react-redux";
import { set } from "date-fns";

const TwoStepAuthentication = (props) => {

    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [initialValue, setInitialValue] = useState(localStorage.getItem("is_two_step_auth_enabled") != undefined ? localStorage.getItem("is_two_step_auth_enabled") == 1 ? true : false : false);
    const [twoFactor, setTwoFactor] = useState(localStorage.getItem("is_two_step_auth_enabled") != undefined ? localStorage.getItem("is_two_step_auth_enabled") == 1 ? true : false : false)

    const handleChange = (event) => {
        setTwoFactor(!twoFactor)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(twoStepAuthUpdateStart({ password: password }))
        setPassword("")
    };

    useEffect(() => {
        console.log("entered");
        if (!props.twoStepAuthUpdate.loading && props.twoStepAuthUpdate.data){
            setInitialValue(props.twoStepAuthUpdate.data.is_two_step_auth_enabled === 1 ? true : false);
            setPasswordVisible(false);
        }
    }, [props.twoStepAuthUpdate]);


    return (
        <>
            <div className="new-settings-sec new-change-password">
                <div className="new-settings-box">
                    <SettingsSidebar />
                    <div className="new-settings-main-wrapper">
                        <div className="new-changes-password-box">
                            <div className="settings-personal-info-card">
                                <div className="settings-personal-info-header">
                                    <h3>{t("two_step_authentication")}</h3>
                                    <p>{t("two_step_authentication_note")}</p>
                                </div>
                                <div className="change-password-sec">
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
                                {initialValue !== twoFactor &&
                                    <div className="edit-profile-form">
                                        <Row className="justify-content-center">
                                            <Col xl={6}>
                                                <Form autoComplete="new-password" onSubmit={handleSubmit}>
                                                    <Form.Group>
                                                        <Form.Label for="password">{t("password")}</Form.Label>
                                                        <div class="input-group">
                                                            <Form.Control
                                                                className="form-control"
                                                                id="password"
                                                                type={passwordVisible ? "text" : "password"}
                                                                placeholder={t("enter_your_password")}
                                                                name="password"
                                                                value={password}
                                                                onChange={(event) =>
                                                                    setPassword(event.currentTarget.value)
                                                                }
                                                                autoFocus={true}
                                                            />
                                                            <div class="input-group-append">
                                                                <div
                                                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                                                    className="btn input-group-text"
                                                                    type="button">
                                                                    {passwordVisible ?
                                                                        <i className="fas fa-eye-slash align-self-center"></i>
                                                                        : <i className="fas fa-eye align-self-center"></i>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                    <Row>
                                                        <Col sm={12} xs={12} md={12}>
                                                            <div className="settings-btn-sec-1">
                                                                <Button
                                                                    className="settings-submit-btn"
                                                                    type="submit"
                                                                    disabled={props.twoStepAuthUpdate.buttonDisable || password != "" ? false : true}
                                                                >
                                                                    {props.twoStepAuthUpdate.loadingButtonContent !== null
                                                                        ? props.twoStepAuthUpdate.loadingButtonContent
                                                                        : t("submit")}
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </div>
                        </div>
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
)(translate(TwoStepAuthentication));
