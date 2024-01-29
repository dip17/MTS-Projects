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
import "../Orders/Orders.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleProductOrdersStart } from "../../../store/actions/ProductsAction";
import { useParams } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../../NoDataFound/NoDataFound";
import ProductHeader from "./ProductHeader";

const SingleProductOrders = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.dispatch(fetchSingleProductOrdersStart({ user_product_id: id }));
  }, []);

  return (
    <>
      <div className="order-list-sec">
        <Container>
          <h2>{t("orders_list")}</h2>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>
          {props.singleProductOrders.loading ? (
       t("loading")
          ) : (
            <>
              {props.singleProductOrders.data.total > 0 ? (
                <Row>
                  <Col md={12}>
                    <div className="table-wrap">
                      <Form>
                        <Row>
                          <Col md={9}>
                            <h2>
                              {t("showing_orders_for")}{" "}
                              {props.singleProductOrders.data.user_product.name}
                            </h2>
                          </Col>
                          <Col md={3} className="text-right">
                            <div className="form-group explore-location-dropdown mb-4">
                              <input
                                type="text"
                                placeholder={t("search")}
                                className="form-control edit-reset"
                              ></input>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Table responsive="md" responsive="sm">
                        <thead className="thead-primary">
                          <tr>
                            <th>{t("shipping_address")}</th>
                            <th>{t("phone_number")}</th>
                            <th>{t("amount")}</th>
                            <th>{t("quantity")}</th>
                            <th className="text-right">{t("action")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.singleProductOrders.data.orders.map(
                            (order, index) => (
                              <>
                                <tr className="alert" role="alert" key={index}>
                                  <td className="address">
                                    {order.delivery_address.landmark}, <br />
                                    {order.delivery_address.address}-
                                    {order.delivery_address.pincode} <br />
                                  </td>
                                  <td>
                                    {order.delivery_address.contact_number}
                                  </td>
                                  <td className="quantity">
                                    {order.total_formatted}
                                  </td>
                                  <td>{order.order_product.quantity}</td>
                                  <td className="text-right">
                                    <Link
                                      className="order-view-btn"
                                      to={`/order-view/${order.unique_id}`}
                                    >
                                      {t("view")}
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div>
                  <NoDataFound></NoDataFound>
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  singleProductOrders: state.userProducts.singleProductOrders,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SingleProductOrders));
