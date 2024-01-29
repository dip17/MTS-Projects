import React, { useEffect, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Media,
  Image,
} from "react-bootstrap";
import "./Orders.css";
import { Link } from "react-router-dom";
import { fetchUserOrderPaymentsStart } from "../../../store/actions/ProductsAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import ProductHeader from "../Product/ProductHeader";
import NoDataFound from "../../NoDataFound/NoDataFound";

const OrderTransaction = (props) => {
  useEffect(() => {
    props.dispatch(fetchUserOrderPaymentsStart());
  }, []);

  return (
    <>
      <div className="order-transaction-sec">
        <Container>
          <h2>{t("order_transactions")}</h2>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>
          <Row>
            <Col md={12}>
              <div className="table-wrap">
                <Table responsive="md" responsive="sm">
                  <thead className="thead-primary">
                    <tr>
                      <th className="text-center">{t("date")}</th>
                      <th>{t("payment_id")}</th>
                      <th>{t("mode")}</th>
                      {/* <th>Message</th> */}
                      <th>{t("amount")}</th>
                      <th>{t("delivery_fee")}</th>
                      <th>{t("taxes")}</th>
                      <th>{t("total")}</th>
                      <th>{t("status")}</th>
                      <th className="text-center">{t("action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.userOrderPayments.loading ? (
                     t("loading")
                    ) : (
                      <>
                        {props.userOrderPayments.data.orders.length > 0 ? (
                          <>
                            {props.userOrderPayments.data.orders.map(
                              (transaction, index) => (
                                <>
                                  {transaction.order_payment ? (
                                    <tr
                                      className="alert"
                                      role="alert"
                                      key={index}
                                    >
                                      <td>
                                        {transaction.order_payment.paid_date_formatted}
                                      </td>
                                      <td>
                                        {transaction.order_payment.payment_id}
                                      </td>
                                      <td>
                                        {transaction.order_payment.payment_mode}
                                      </td>
                                      {/* <td>Added to wallet</td> */}
                                      <td>
                                        {
                                          transaction.order_payment
                                            .sub_total_formatted
                                        }
                                      </td>
                                      <td>
                                        {
                                          transaction.order_payment
                                            .delivery_price_formatted
                                        }
                                      </td>
                                      <td>{transaction.tax_price_formatted}</td>
                                      <td>
                                        {
                                          transaction.total_formatted
                                        }
                                      </td>
                                      <td>
                                        {transaction.order_payment.status ==
                                        1 ? (
                                          <>
                                            <p>
                                              <i className="far fa-check-circle mr-2"></i>
                                              {t('success')}
                                            </p>
                                          </>
                                        ) : (
                                          <>
                                            <p>
                                              <i className="far fa-times-circle text-danger mr-2"></i>
                                              {t('failed')}
                                            </p>
                                          </>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        <Link
                                          className="order-view-btn"
                                          to={`/order-view/${transaction.unique_id}`}
                                        >
                                          {t('view')}
                                        </Link>
                                      </td>
                                    </tr>
                                  ) : null}
                                </>
                              )
                            )}
                          </>
                        ) : (
                          <div>
                            <NoDataFound></NoDataFound>
                          </div>
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  userOrderPayments: state.userProducts.userOrderPayments,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(OrderTransaction));
