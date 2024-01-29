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
import { connect } from "react-redux";
import { ordersListForOthersStart } from "../../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../../NoDataFound/NoDataFound";
import ProductHeader from "../Product/ProductHeader";

const OrderList = (props) => {
  useEffect(() => {
    props.dispatch(ordersListForOthersStart());
  }, []);

  return (
    <>
      <div className="order-list-sec">
        <Container>
          <h2>{t("orders_list")}</h2>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>

          <Row>
            <Col md={12}>
              <div className="table-wrap">
                {props.ordersListForOthers.loading ? (
                  t("loading")
                ) : (
                  <Table responsive="md" responsive="sm">
                    <thead className="thead-primary">
                      <tr>
                        <th>{t("products")}</th>
                        <th>{t("order_id")}</th>
                        <th>{t("shipping_address")}</th>
                        <th>{t("phone_number")}</th>
                        <th>{t("amount")}</th>
                        <th className="text-centre">{t("action")}</th>
                      </tr>
                    </thead>
                    {props.ordersListForOthers.data.total > 0 ? (
                      <tbody>
                        {props.ordersListForOthers.data.orders.map(
                          (order, index) => (
                            <>
                              <tr className="alert" role="alert" key={index}>
                                <td>
                                  <div className="order-list-flex">
                                    <div className="orderer-product">
                                      {order.order_product.map(
                                        (product, index) => (
                                          <>
                                            {product.user_product_details ? (
                                              <div
                                                className={`order-list-product ${
                                                  order.total_products > 1
                                                    ? "mb-3"
                                                    : ""
                                                }`}
                                                key={index}
                                              >
                                                <div
                                                  className="img"
                                                  style={{
                                                    backgroundImage: `url(${product.user_product_details.picture})`,
                                                  }}
                                                ></div>
                                                <div className="email">
                                                  <span>
                                                    {
                                                      product
                                                        .user_product_details
                                                        .name
                                                    }{" "}
                                                  </span>
                                                  <span>
                                                    {t("quantity")} :{" "}
                                                    {product.quantity}
                                                  </span>
                                                </div>
                                              </div>
                                            ) : null}
                                          </>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="quantity">{order.unique_id}</td>
                                {order.delivery_address ? 
                                  <>
                                  <td className="address">
                                    {order.delivery_address.landmark}, <br />
                                    {order.delivery_address.address}-
                                    {order.delivery_address.pincode} <br />
                                  </td>
                                  <td>{order.delivery_address.contact_number}</td>
                                  </>
                                : <><td className="address"></td><td></td></>
                                }
                                <td className="quantity">
                                  {order.total_formatted}
                                </td>
                                <td className="text-right">
                                  <Link
                                    className="order-view-btn"
                                    to={`/order-view/${order.unique_id}`}
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            </>
                          )
                        )}
                      </tbody>
                    ) : (
                      <div>
                        <NoDataFound></NoDataFound>
                      </div>
                    )}
                  </Table>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  ordersListForOthers: state.userProducts.ordersListForOthers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(OrderList));
