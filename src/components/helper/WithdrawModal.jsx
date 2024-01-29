import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getBankAccountStart } from "../../store/actions/BankAccountAction";
import { sendWithDrawRequestStart } from "../../store/actions/WithDrawAction";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";

const WithdrawModel = (props) => {
  useEffect(() => {
    props.dispatch(getBankAccountStart());
  }, []);

  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(sendWithDrawRequestStart(inputData));
    props.closeWithdrawModal();
    setInputData({})
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <Modal
        className={`modal-dialog-center withdraw-modal 
        ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.withdrawModal}
        onHide={props.closeWithdrawModal}
      >
        {props.withdrawModal === true ?
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("send_request_to_admin")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.payments.loading ? (
                t("loading")
              ) : (
                <Row>
                  <Col md="12">
                    <div className="mb-5">
                      {configuration.get("configData.is_only_wallet_payment") == 1 ?
                        <h4 className="mb-2">
                          {t("min_token_required")}:{" "}
                          <span className="text-muted">
                            {
                              props.payments.data
                                .user_withdrawals_min_amount_formatted
                            }
                          </span>
                        </h4>
                        :
                        <h4 className="mb-2">
                          {t("min_amount_required")}:{" "}
                          <span className="text-muted">
                            {
                              props.payments.data
                                .user_withdrawals_min_amount_formatted
                            }
                          </span>
                        </h4>
                      }
                      <h4 className="text-muted">
                        {t("wallet_balance")}:{" "}
                        <span className="text-muted">
                          {props.payments.data.user_wallet
                            ? props.payments.data.user_wallet.remaining_formatted
                            : ""}
                        </span>
                      </h4>
                    </div>
                  </Col>
                </Row>
              )}
              <div className="floating-form">
                <div className="floating-label">
                  <input
                    className="floating-input"
                    type="number"
                    placeholder={configuration.get("configData.is_only_wallet_payment") == 1 ? t("token") : t("amount")}
                    value={inputData.requested_amount}
                    min="1"
                    step="any"
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        requested_amount: event.currentTarget.value,
                      })
                    }
                  />
                  <span className="highlight"></span>
                  <label className="default-label">{configuration.get("configData.is_only_wallet_payment") == 1 ? t("enter_token") : t("enter_amount")}</label>
                </div>
                <div className="floating-label">
                  <label className="label-default-1">{t("choose_bank_account")}</label>
                  <Form>
                    {["radio"].map((type) => (
                      <div key={`custom-inline-${type}`}>
                        {props.bankAccount.loading ? (
                          t("loading")
                        ) : props.bankAccount.data.billing_accounts.length > 0 ? (
                          props.bankAccount.data.billing_accounts.map((account) => (
                            <Form.Check
                              custom
                              inline
                              label={account.first_name}
                              type={type}
                              id={account.user_billing_account_id}
                              value={account.user_billing_account_id}
                              name="user_billing_account_id"
                              onChange={(event) =>
                                setInputData({
                                  ...inputData,
                                  user_billing_account_id:
                                    account.user_billing_account_id,
                                })
                              }
                            />
                          ))
                        ) : (
                          <h4>
                            {t("no_bank_accounts_added")}. {t("to_add_account")}{" "}
                            <Link className="text-sm" to={`/add-bank`}>
                              {t("click_here")}
                            </Link>
                          </h4>
                        )}
                      </div>
                    ))}
                  </Form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closeWithdrawModal}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
                disabled={props.sendWithDraw.buttonDisable ? props.sendWithDraw.buttonDisable : inputData.user_billing_account_id ? false : true}
              >
                {props.sendWithDraw.loadingButtonContent !== null
                  ? props.sendWithDraw.loadingButtonContent
                  : t("send_request")}
              </Button>
            </Modal.Footer>
          </Form>
          : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  sendWithDraw: state.withDraw.sendWithDraw,
  bankAccount: state.bankAccount.bankAccount,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(WithdrawModel));
