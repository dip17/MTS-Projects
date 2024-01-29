import React, { useState, useRef, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Image, Media, Form } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import { deleteAccountStart } from "../../../store/actions/UserAction";
import SettingsSidebar from "./SettingsSidebar";
import { connect } from "react-redux";
import { changePasswordStart } from "../../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import { Form as FORM, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const DeleteAccount = (props) => {

    const [deletePasswordVisible, setDeletePasswordVisible] = useState(false);
    const formikRef = useRef();

    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.resetForm();
            setDeletePasswordVisible(false);
        }
    }, [props.activeSec])

    const deleteAccountSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, t("password_required_note"))
            .required(t("new_password_is_required")),
    });


    const validatePassword = (password) => {
        let msg = "";
        if (password !== password.trim())
            msg = t("invalid_password");
        return msg;
    }

    const handleSubmit = (values) => {
        if (window.confirm(t("delete_account_confirm")))
            props.dispatch(deleteAccountStart(values));
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
                                    <h3>{t("delete_account")}</h3>
                                    <p>{t("delete_account_note")}</p>
                                </div>
                                <div className="">
                                    <Formik
                                        innerRef={formikRef}
                                        initialValues={{ password: '' }}
                                        validationSchema={deleteAccountSchema}
                                        onSubmit={(values) => handleSubmit(values)}
                                    >
                                        {({ errors, touched, setFieldValue, resetForm }) => (
                                            <FORM noValidate className="edit-profile-form">
                                                <Row className="justify-content-center">
                                                    <Col xl={6}>
                                                        <div className="form-group">
                                                            <Form.Label>{t("password")}</Form.Label>
                                                            <div class="input-group">
                                                                <Field
                                                                    type={deletePasswordVisible ? "text" : "password"}
                                                                    name="password"
                                                                    placeholder={t("enter_your_password")}
                                                                    className={`no-padding form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                                                    validate={validatePassword}
                                                                    autoFocus={true}
                                                                />
                                                                <div class="input-group-append">
                                                                    <div
                                                                        onClick={() => setDeletePasswordVisible(!deletePasswordVisible)}
                                                                        className="btn input-group-text"
                                                                        type="button">
                                                                        {deletePasswordVisible ?
                                                                            <i className="fas fa-eye-slash align-self-center"></i>
                                                                            : <i className="fas fa-eye align-self-center"></i>}
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name="password"
                                                                    className="invalid-feedback mt-3"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={12} xs={12} md={12}>
                                                        <div className="settings-btn-sec-1">
                                                            <Button
                                                                className="settings-submit-btn"
                                                                type="submit"
                                                                disabled={props.deleteAcc.buttonDisable}
                                                            >
                                                                {props.deleteAcc.loadingButtonContent !== null
                                                                    ? props.deleteAcc.loadingButtonContent
                                                                    : t("delete_account")}
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </FORM>
                                        )}
                                    </Formik>
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
    deleteAcc: state.users.deleteAccount,
});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(DeleteAccount));
