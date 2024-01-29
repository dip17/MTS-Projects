import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { deleteAccountStart } from "../../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const OldDeleteAccountCard = (props) => {
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
      .min(6, t("password_must_be_characters_at_minimum"))
      .required(t("new_password_is_required")),
  });


  const validatePassword = (password) => {
    let msg = "";
    if (password !== password.trim())
      msg = "Invalid password";
    return msg;
  }

  const handleSubmit = (values) => {
    if (window.confirm(t("delete_account_confirm")))
      props.dispatch(deleteAccountStart(values));
  };

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "delete-account-card"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section4"
      >
        <div className="delete-account-sec">
          <Row>
            <Col sm={12} md={12}>
              <div className="card">
                <div className="card-header bg-transparent">
                  <h4>{t("delete_account")}</h4>
                </div>
                <div className="card-body">
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="card-details">
                        <h5>
                          <b>{t("hope_see_you_soon")}</b>
                        </h5>
                        <p>
                          {t("delete_account_note")}
                        </p>
                      </div>
                      <Formik
                        innerRef={formikRef}
                        initialValues={{ password: '' }}
                        validationSchema={deleteAccountSchema}
                        onSubmit={(values) => handleSubmit(values)}
                      >
                        {({ errors, touched, setFieldValue, resetForm }) => (
                          <Form noValidate>
                            <div className="form-group">
                              <label><h3>{t("password")}</h3></label>
                              <div class="input-group">
                                <Field
                                  type={deletePasswordVisible ? "text" : "password"}
                                  name="password"
                                  placeholder={t("enter_your_password")}
                                  className={`no-padding form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                  validate={validatePassword}
                                />
                                <div class="input-group-append">
                                  <button
                                    onClick={() => setDeletePasswordVisible(!deletePasswordVisible)}
                                    class="btn"
                                    type="button">
                                    {deletePasswordVisible ?
                                      <i className="fas fa-eye-slash align-self-center"></i>
                                      : <i className="fas fa-eye align-self-center"></i>}
                                  </button>
                                </div>
                                <ErrorMessage
                                  component="div"
                                  name="password"
                                  className="invalid-feedback mt-3"
                                />
                              </div>
                            </div>
                            <Row className="mt-5">
                              <Col sm={12} xs={12} md={6} className="mx-auto">
                                <Button
                                  className="btn gradient-btn gradientcolor"
                                  type="submit"
                                  disabled={props.deleteAcc.buttonDisable}
                                >
                                  {props.deleteAcc.loadingButtonContent !== null
                                    ? props.deleteAcc.loadingButtonContent
                                    : t("delete_account")}
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
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

export default connect(mapStateToPros, mapDispatchToProps)(translate(OldDeleteAccountCard));
