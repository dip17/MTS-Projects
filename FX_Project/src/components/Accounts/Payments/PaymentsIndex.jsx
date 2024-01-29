import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tabs,
  Table,
  Tab,
  Image,
  Button,
} from "react-bootstrap";
import "./PaymentsIndex.css";
import { fetchAllTransactionStart , fetchMoreAllTransactionStart} from "../../../store/actions/TransactionAction";
import {
  cancelWithDrawRequestStart,
  fetchWithDrawalsStart,
} from "../../../store/actions/WithDrawAction";
import WithdrawModal from "../../helper/WithdrawModal";
import CancelWithdrawModal from "../../helper/CancelWithdrawModal";
import { fetchPaymentsStart } from "../../../store/actions/UserAction";
import configuration from "react-global-configuration";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import InfiniteScroll from "react-infinite-scroll-component";

const PaymentsIndex = (props) => {

  useEffect(() => {
    props.dispatch(
      fetchAllTransactionStart({
        skip: 0,
        take: 12,
      })
    );
  }, []);

  const fetchMoreData = () => {
    props.dispatch(
      fetchMoreAllTransactionStart({
        skip: props.transaction.data.history.length,
        take: 12,
      })
    );
  };

  useEffect(() => {
    // props.dispatch(fetchAllTransactionStart());
    props.dispatch(fetchWithDrawalsStart());
    props.dispatch(fetchPaymentsStart());
  }, []);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const closeWithdrawModal = () => {
    setWithdrawModal(false);
  };

  const [data, setData] = useState("");
  const [cancelWithdrawModal, setCancelWithdrawModal] = useState(false);
  const closeCancelWithdrawModal = () => {
    setCancelWithdrawModal(false);
    setIsLoading(false);
  };

  const showCancelWithdrawModel = (event, data) => {
    setCancelWithdrawModal(true);
    setData(data);
    setIsLoading(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="payment-sec">
      <Container>
        <Row>
          <Col sm={12} md={12} xl={8}>
            <div className="bookmarkes-list bookmarks-right-side">
              <div className="pull-left">
                <Link
                  className="bookmarkes-list notify-title back-button"
                  onClick={() => props.history.goBack()}
                >
                  <img
                    src={window.location.origin + "/assets/images/icons/back.svg"}
                    className="svg-clone"
                  />
                  <h3 className="ml-2 mb-0">{t("payments")}</h3>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} xl={12} lg={12}>
            <div className="payment-tabs-card">
              <div className="flex-content">
                <h2>{t("statements")}</h2>
                <Button
                  className="send-withdraw-btn"
                  onClick={() => setWithdrawModal(true)}
                >
                  {t("send_withdraw")}
                </Button>
              </div>
              <Tabs defaultActiveKey="earnings" id="uncontrolled-tab-example">
                <Tab eventKey="earnings" title="Transactions">
                  <div className="payment-tabs-content">
                    {props.transaction.loading ? (
                      t("loading")
                    ) : props.transaction.data.history.length > 0 ? (
                      <InfiniteScroll
                      dataLength={props.transaction.data.history.length}
                      next={fetchMoreData}
                      hasMore={
                        props.transaction.data.history.length <
                          props.transaction.data.total &&
                        props.transaction.errorCount < 2
                      }
                      loader={<h4>{t("loading")}</h4>}
                    >
                      <Table borderedless responsive>
                        <thead>
                          <tr className="bg-white">
                            <th>{t("date")}</th>
                            <th>{t("transaction_id")}</th>
                            <th>{t("mode")}</th>
                            <th>{t("message")}</th>
                            <th>{t("amount")}</th>
                            <th>{t("service_fee")}</th>
                            <th>{t("status")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.transaction.data.history.map((history) => (
                            <tr>
                              <td>{history.paid_date}</td>
                              <td>{history.payment_id}</td>
                              <td>{history.payment_mode}</td>
                              <td>{history.message}</td>
                              <td>{history.paid_amount_formatted}</td>
                              <td>{history.admin_amount_formatted}</td>
                              <td>
                                <p>
                                  <i className="far fa-check-circle mr-2"></i>
                                  {history.status_formatted}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      </InfiniteScroll>
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                </Tab>

                <Tab eventKey="payments" title="Withdraws">
                  <div className="payment-tabs-content">
                    {props.withDrawals.loading ? (
                      t("loading")
                    ) : props.withDrawals.data.history.length > 0 ? (
                      <Table borderedless responsive>
                        <thead>
                          <tr className="bg-white">
                            <th>{t("date")}</th>
                            <th>{t("transaction_id")}</th>
                            <th>{t("billing_account")}</th>
                            <th>{t("requested")}</th>
                            <th>{t("paid")}</th>
                            <th>{t("status")}</th>
                            <th>{t("action")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.withDrawals.data.history.map(
                            (withDrawRequest) => (
                              <tr>
                                <td>{withDrawRequest.created}</td>
                                <td>
                                  {withDrawRequest.user_withdrawal_unique_id}
                                </td>
                                <td>{withDrawRequest.billing_account_name}</td>
                                <td>
                                  {withDrawRequest.requested_amount_formatted}
                                </td>
                                <td>{withDrawRequest.paid_amount_formatted}</td>
                                <td>{withDrawRequest.status_formatted}</td>
                                <td>
                                  {withDrawRequest.cancel_btn_status == 1 ? (
                                    <Button
                                      onClick={(event) =>
                                        showCancelWithdrawModel(
                                          event,
                                          withDrawRequest
                                        )
                                      }
                                      className="cancel-btn"
                                    >
                                      {t("cancel")}
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
      <WithdrawModal
        withdrawModal={withdrawModal}
        closeWithdrawModal={closeWithdrawModal}
        payments={props.payments}
      />
      <CancelWithdrawModal
        closeCancelWithdrawModal={closeCancelWithdrawModal}
        cancelWithdrawModal={cancelWithdrawModal}
        data={data}
        loading={isLoading}
      />
    </div>
  );
};

const mapStateToPros = (state) => ({
  withDrawals: state.withDraw.withDrawals,
  transaction: state.transaction.allTransaction,
  payments: state.users.payments,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PaymentsIndex));
