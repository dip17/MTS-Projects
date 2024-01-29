import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";
import "../../Wallet/Wallet.css";
import {
  deleteBankAccountStart,
  getBankAccountStart,
  makeDefaultBankAccountStart,
} from "../../../store/actions/BankAccountAction";
import { Link } from "react-router-dom";
import NoDataFound from "../../NoDataFound/NoDataFound";
import BillingAccountLoader from "../../Loader/BillingAccountLoader";
import { translate, t } from "react-multi-lang";

const BillingAccountIndex = (props) => {
  useEffect(() => {
    props.dispatch(getBankAccountStart());
  }, []);
  return (
    <>
      <div className="wallet-sec">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="wallet-header-sec">
                <Row>
                  <Col sm={12} md={12} xl={9}>
                    <Link
                      className="bookmarkes-list notify-title back-button"
                      onClick={() => props.history.goBack()}
                    >
                      <img
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                      />
                      <h3 className="ml-2 mb-0">{t("billing_accounts")}</h3>
                    </Link>
                    <p className="text-muted f-2">
                      {t("billing_accounts_para")}
                    </p>
                  </Col>
                  <Col sm={12} md={12} xl={3}>
                    <div className="edit-save">
                      <Link className="receive-btn-blue" to={"/add-bank"}>
                        {t("add_new_account")}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="trans-table-sec">
        <Container>
          {props.bankAccount.loading ? (
            <BillingAccountLoader />
          ) : props.bankAccount.data.billing_accounts.length > 0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-center text-nowrap">
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
                      {props.bankAccount.data.billing_accounts.map(
                        (accounts) => (
                          <tr key={accounts.user_billing_account_id} className="justify-content-center">
                            <td className="text-capitalize">
                              {accounts.first_name ? accounts.first_name : "-"}
                            </td>
                            <td className="text-capitalize">
                              {accounts.last_name ? accounts.last_name : "-"}
                            </td>
                            <td>
                              {accounts.route_number
                                ? accounts.route_number
                                : "-"}
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
                              <div className="row">
                                {accounts.is_default === 0 ? (
                                  <Button
                                    variant="success"
                                    className="col-12 mb-2"
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
                                  className="col-12"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        t("delete_billing_acc_confirmation")
                                      )
                                    ) {
                                      props.dispatch(
                                        deleteBankAccountStart({
                                          user_billing_account_id:
                                            accounts.user_billing_account_id,
                                        })
                                      );
                                    }
                                  }}
                                >
                                  {t("delete")}
                                </Button>{" "}
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          ) : (
            <NoDataFound />
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  bankAccount: state.bankAccount.bankAccount,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(BillingAccountIndex));
