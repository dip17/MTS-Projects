import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Media,
  Form,
  Table,
  Badge,
} from "react-bootstrap";
import "./BecomeAContentCreator.css";
import { connect } from "react-redux";
import {
  deleteBankAccountContentCreatorFlowStart,
  getBankAccountStart,
  makeDefaultBankAccountStart,
  addBankAccountContentreatorFlowStart,
} from "../../store/actions/BankAccountAction";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { createNotification } from "react-redux-notify";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import NoDataFound from "../NoDataFound/NoDataFound";
import BillingAccountLoader from "../Loader/BillingAccountLoader";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const Step4 = (props) => {
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    if (props.user.data.content_creator_step === 0) {
      const notificationMessage = getErrorNotificationMessage(
        t("upload_doc_message")
      );
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(0);
    } else if (props.user.data.content_creator_step === 1) {
      const notificationMessage = getErrorNotificationMessage(
        t("doc_verification_pending_message")
      );
      props.dispatch(fetchUserDetailsStart());
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(2);
    }
    props.dispatch(getBankAccountStart());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(addBankAccountContentreatorFlowStart(inputData));
  };

  useEffect(() => {
    if (
      props.addBankAccount.data.success &&
      props.user.data.content_creator_step === 2
    ) {
      props.dispatch(fetchUserDetailsStart());
    }
  }, [props.addBankAccount.data]);

  return (
    <>
      <div className="step-5-payout-method-sec">
        <div className="step-5-info">
          <h4>{t("payout_methods")}</h4>
          <p>
            {t("payout_methods_description")}
            {/* {t('there_are_two_different_payment_types_available_to_you_below')} */}
          </p>
        </div>
        {props.bankAccount.loading ? (
          <BillingAccountLoader />
        ) : props.bankAccount.data.billing_accounts.length > 0 ? (
          <Row>
            <Col sm={12} md={12}>
              <div className="trans-table">
                <Table borderedless responsive>
                  <thead>
                    <tr className="bg-white text-muted text-center">
                      <th>{t("first_name")}</th>
                      <th>{t("last_name")}</th>
                      <th>{t("route_number")}</th>
                      <th>{t("account_number")}</th>
                      <th>{t("bank_type")}</th>
                      <th>{t("business_name")}</th>
                      <th>{t("is_default")}</th>
                      <th>{t("status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.bankAccount.data.billing_accounts.map((accounts) => (
                      <tr key={accounts.user_billing_account_id}>
                        <td className="text-capitalize">
                          {accounts.first_name ? accounts.first_name : "-"}
                        </td>
                        <td className="text-capitalize">
                          {accounts.last_name ? accounts.last_name : "-"}
                        </td>
                        <td>
                          {accounts.route_number ? accounts.route_number : "-"}
                        </td>
                        <td className="amount">
                          {accounts.account_number
                            ? accounts.account_number
                            : "-"}
                        </td>
                        <td className="text-capitalize">
                          {accounts.bank_type ? accounts.bank_type : "-"}
                        </td>
                        <td className="text-capitalize">
                          {accounts.business_name
                            ? accounts.business_name
                            : "-"}
                        </td>
                        {accounts.is_default === 1 ? (
                          <td>
                            <Badge className="confirmed-badge">
                              {t("yes")}
                            </Badge>
                          </td>
                        ) : (
                          <td>
                            <Badge className="unconfirmed-badge">
                              {t("no")}
                            </Badge>
                          </td>
                        )}
                        <td>
                          {accounts.is_default === 0 ? (
                            <Button
                              variant="success"
                              onClick={() =>
                                props.dispatch(
                                  makeDefaultBankAccountStart({
                                    user_billing_account_id:
                                      accounts.user_billing_account_id,
                                  })
                                )
                              }
                            >
                              {t("make_default")}
                            </Button>
                          ) : null}{" "}
                          <Button
                            variant="danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  t("delete_billing_acc_confirmation")
                                )
                              ) {
                                props.dispatch(
                                  deleteBankAccountContentCreatorFlowStart({
                                    user_billing_account_id:
                                      accounts.user_billing_account_id,
                                  })
                                );
                              }
                            }}
                          >
                            {t("delete")}
                          </Button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        ) : null}
        <div className="step-5-payment-method">
          {/* <h5>Bank Transfer</h5> */}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formHorizontalNickname">
                  <Form.Label>{t("routing_number")}: (*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("routing_number")}
                    value={inputData.route_number}
                    name="route_number"
                    onChange={(event) => {
                      setInputData({
                        ...inputData,
                        route_number: event.currentTarget.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formHorizontalAccountNumber">
                  <Form.Label>{t("account_number")}: (*)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={t("account_number")}
                    value={inputData.account_number}
                    min="0"
                    name="account_number"
                    onChange={(event) => {
                      setInputData({
                        ...inputData,
                        account_number: event.currentTarget.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formHorizontalFirstname">
                  <Form.Label>{t("first_name")}: (*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("first_name")}
                    value={inputData.first_name}
                    name="first_name"
                    onChange={(event) => {
                      setInputData({
                        ...inputData,
                        first_name: event.currentTarget.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formHorizontalLastname">
                  <Form.Label>{t("last_name")}: (*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("last_name")}
                    value={inputData.last_name}
                    name="last_name"
                    onChange={(event) => {
                      setInputData({
                        ...inputData,
                        last_name: event.currentTarget.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>
                    {t("type_of_bank")}{" "}
                    <span className="text-capitalize">(*)</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="bank_type"
                    onChange={(event) => {
                      setInputData({
                        ...inputData,
                        bank_type: event.currentTarget.value,
                      });
                    }}
                  >
                    <option value="savings">{t("savings")}</option>
                    <option value="checking">{t("checking")}</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formHorizontalBusinessname">
                  <Form.Label>
                    {t("business_name")}: ({t("optional")})
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("business_name")}
                    value={inputData.business_name}
                    name="business_name"
                    onChange={(event) => {
                      setInputData({
                        ...inputData,
                        business_name: event.currentTarget.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Label>
                  <Link target="_blank" to="/page/terms" className="terms-link">
                    {" "}
                    {t("billing_account_agree_terms")}{" "}
                  </Link>
                </Form.Label>
              </Col>
            </Row>

            <div className="edit-save">
              <Button
                className="btn gradient-btn gradientcolor addBank"
                type="submit"
                disabled={props.addBankAccount.buttonDisable}
              >
                {props.addBankAccount.loadingButtonContent !== null
                  ? props.addBankAccount.loadingButtonContent
                  : t("add_account")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  bankAccount: state.bankAccount.bankAccount,
  addBankAccount: state.bankAccount.addBankAccountInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(Step4));
