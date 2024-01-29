import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./AddBankIndex.css";
import { addBankAccountStart } from "../../../store/actions/BankAccountAction";
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddBankIndex = (props) => {
  const [inputData, setInputData] = useState({});

  const validationSchema = Yup.object().shape({
    route_number: Yup.string().required(t("route_number_required")),
    account_number: Yup.number()
      .required(t("account_number_required"))
      .min(0, t("invalid_account_number")),
    first_name: Yup.string()
      .required(t("first_name_is_required"))
      .matches(/^[aA-zZ\s]+$/, t("only_alphabets_are_allowed_for_this_field")),
    last_name: Yup.string()
      .required(t("last_name_is_required"))
      .matches(/^[aA-zZ\s]+$/, t("only_alphabets_are_allowed_for_this_field")),
    bank_type: Yup.string().required(t("bank_type_is_required")),
    business_name: Yup.string(),
    acceptTerms: Yup.bool().oneOf(
      [true],
      t("accept_terms_conditions_is_required")
    ),
  });

  const handleSubmit = (values) => {
    // event.preventDefault();
    props.dispatch(addBankAccountStart(values));
  };

  return (
    <div className="card-list-sec">
      <Container>
        <Link
          className="bookmarkes-list notify-title back-button head-title"
          onClick={() =>
            props.location.state && props.location.state.prevPath
              ? props.history.goBack()
              : props.history.push("/home")
            // props.history.goBack()
          }
        >
          <img
            src={window.location.origin + "/assets/images/icons/back.svg"}
            className="svg-clone"
          />
          {t("add_bank")}
        </Link>
        {/* <h4 className="head-title">{t("add_bank")}</h4> */}
        <Row>
          <Col sm={12} md={12}>
            <div className="add-bank-box">
              <Formik
                initialValues={{
                  route_number: "",
                  account_number: "",
                  first_name: "",
                  last_name: "",
                  bank_type: "savings",
                  business_name: "",
                  acceptTerms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {({ touched, errors, isSubmitting, setFieldValue, values }) => (
                  <Form noValidate>
                    <Col md={6}>
                     <div className="form-group">
                        <label className="form-label">
                          {t("first_name")}: (*)
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder={t("first_name")}
                          name="first_name"
                          value={values.first_name}
                          autoFocus={true}
                        />
                        <ErrorMessage
                          component={"div"}
                          name="first_name"
                          className="error-msg text-danger text-right"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          {t("last_name")}: (*)
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder={t("last_name")}
                          name="last_name"
                          value={values.last_name}
                        />
                        <ErrorMessage
                          component={"div"}
                          name="last_name"
                          className="error-msg text-danger text-right"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          {t("routing_number")}: (*)
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          placeholder={t("routing_number")}
                          name="route_number"
                          value={values.route_number}
                        />
                        <ErrorMessage
                          component={"div"}
                          name="route_number"
                          className="error-msg text-danger text-right"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          {t("account_number")}: (*)
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          placeholder={t("account_number")}
                          name="account_number"
                          value={values.account_number}
                        />
                        <ErrorMessage
                          component={"div"}
                          name="account_number"
                          className="error-msg text-danger text-right"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          {t("type_of_bank")}: (*)
                        </label>
                        <Field
                          as="select"
                          name="bank_type"
                          className="form-control"
                          value={values.bank_type}
                        >
                          <option value="savings">{t("savings")}</option>
                          <option value="checking">{t("checking")}</option>
                        </Field>
                        <ErrorMessage
                          component={"div"}
                          name="bank_type"
                          className="error-msg text-danger text-right"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          {t("business_name")}: ({t("optional")})
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder={t("business_name")}
                          name="business_name"
                          value={values.business_name}
                        />
                        <ErrorMessage
                          component={"div"}
                          name="business_name"
                          className="error-msg text-danger text-right"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div class="check-terms custom-control custom-checkbox custom-control-inline">
                        <Field
                          type="checkbox"
                          id="acceptterms"
                          name="acceptTerms"
                          custom
                          required={true}
                          className="custom-control-input"
                        />
                        <label
                          title=""
                          for="acceptterms"
                          class="custom-control-label"
                        ></label>
                      </div>
                      <label className="form-label">
                        {t("i_agree_to")}
                        <Link
                          target="_blank"
                          to="/page/terms"
                          className="terms-link"
                        >
                          {" "}
                          {t("terms_conditions")}{" "}
                        </Link>
                      </label>
                      <ErrorMessage
                        component={"div"}
                        name="acceptTerms"
                        className="error-msg text-danger text-right"
                      />
                    </Col>

                    <div className="edit-save">
                      <Button
                        className="btn gradient-btn gradientcolor addBank"
                        type="submit"
                        disabled={props.bankAccount.buttonDisable}
                      >
                        {props.bankAccount.loadingButtonContent !== null
                          ? props.bankAccount.loadingButtonContent
                          : t("submit")}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bankAccount: state.bankAccount.addBankAccountInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AddBankIndex));
