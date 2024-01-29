import React, { useEffect, useState } from "react";
import { Modal, Container, Row, Col, Image, Media } from "react-bootstrap";
import "./Orders.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { ordersViewForOthersStart } from "../../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";
import ProductHeader from "../Product/ProductHeader";

const OrderView = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.dispatch(
      ordersViewForOthersStart({
        order_unique_id: id,
      })
    );
  }, []);

  return (
    <>
      <div className="order-view-sec">
        <Container>
          <h2>{t("order_view")}</h2>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>
          {props.ordersViewForOthers.loading ? (
           t("loading")
          ) : (
            <>
              <Row>
                <Col md={6}>
                  {props.ordersViewForOthers.data.order.order_product.map(
                    (product, index) => (
                      <>
                        <div className="order-view-card">
                          <div className="order-view-img-sec" key={index}>
                            <Image
                              className="order-view-img"
                              src={product.user_product_details.picture}
                            />
                          </div>
                          <div className="order-view-info">
                            <h4>
                            {t("order_id")}{" "}
                              <span>
                                {props.ordersViewForOthers.data.order.unique_id}
                              </span>
                            </h4>
                            <h4>
                              {t("product_name")} :{" "}
                              <span>
                                <Link to="#">{product.user_product_details.name}</Link>
                              </span>
                            </h4>
                            <h4>
                              {t("quantity")} :{" "}
                              <span>
                                <Link to="#">{product.quantity}</Link>
                              </span>
                            </h4>
                            <h4>
                            {t("per_quantity_price")} :{" "}
                              <span>
                                {product.per_quantity_price_formatted}
                              </span>
                            </h4>
                            <h4>
                            {t("sub_total_amount")} :{" "}
                              <span>
                                {product.sub_total_formatted}
                              </span>
                            </h4>
                            <h4>
                            {t("order_date")} : <span>{props.ordersViewForOthers.data.order.order_payment.paid_date}</span>
                            </h4>
                            {/* <h4>
                              Shipping Date : <span>10 September 2021</span>
                            </h4> */}
                            <h4 className="border-bottom-zero">
                            {t("payment_method")} :{" "}
                              <span>
                                {
                                  props.ordersViewForOthers.data.order
                                    .order_payment.payment_mode
                                }
                              </span>
                            </h4>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={12}>
                      {props.ordersViewForOthers.data.order.order_payment ? (
                        <div className="order-view-summary-sec">
                          <h3 className="sub-title">{t("order_summary")}</h3>
                          <div className="product-details-body-sec">
                          <div className="product-details-card">
                              <h5>{t("shipping_address")}</h5>
                              <p className="product-amount text-right">
                                <span>
                                  {
                                    props.ordersViewForOthers.data.order
                                      .delivery_address.contact_number
                                  }{" "}
                                  , <br />
                                  {
                                    props.ordersViewForOthers.data.order
                                      .delivery_address.landmark
                                  }{" "}
                                  , <br />
                                  {
                                    props.ordersViewForOthers.data.order
                                      .delivery_address.address
                                  }{" "}
                                  , <br />
                                  {
                                    props.ordersViewForOthers.data.order
                                      .delivery_address.country
                                  }{" "}
                                  -{" "}
                                  {
                                    props.ordersViewForOthers.data.order
                                      .delivery_address.pincode
                                  }
                                  <br />
                                </span>
                              </p>
                            </div>
                            <div className="product-details-card">
                              <h5>{t("order_id")}</h5>
                              <p className="product-amount">
                                <span>
                                  {
                                    props.ordersViewForOthers.data.order
                                      .unique_id
                                  }{" "}
                                </span>
                              </p>
                            </div>
                            <hr></hr>
                            <h3 className="sub-title">{t("price_details")}</h3>
                            <div className="product-details-card">
                              <h5>{t("list_price")}</h5>
                              <p className="product-amount">{props.ordersViewForOthers.data.order.order_payment.sub_total_formatted}</p>
                            </div>
                            <div className="product-details-card">
                              <h5>{t("shipping_fee")}</h5>
                              <p className="product-amount">{props.ordersViewForOthers.data.order.order_payment.delivery_price_formatted}</p>
                            </div>
                            <div className="product-details-card">
                              <h5>{t("taxes")}</h5>
                              <p className="product-amount">{props.ordersViewForOthers.data.order.order_payment.tax_price_formatted}</p>
                            </div>
                            {/* <div className="product-details-card">
                              <h5>Special Price</h5>
                              <p className="product-amount">$375</p>
                            </div>
                            <div className="product-details-card">
                              <h5>Shipping fee</h5>
                              <p className="product-amount">$40</p>
                            </div> */}
                          </div>
                          <div className="product-details-footer-sec">
                            <h5>{t("total")}</h5>
                            <div className="product-details-final-amount">
                              <p>{props.ordersViewForOthers.data.order.order_payment.total_formatted}</p>
                            </div>
                          </div>
                        </div>
                      ) : null }
                    </Col>
                    {/* <Col md={12}>
                  <div className="track">
                    <div className="step active">
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-check"></i>{" "}
                      </span>{" "}
                      <span className="text">Order placed</span>{" "}
                    </div>
                    <div className="step active">
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-user"></i>{" "}
                      </span>{" "}
                      <span className="text"> Order shipped</span>{" "}
                    </div>
                    <div className="step">
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-truck"></i>{" "}
                      </span>{" "}
                      <span className="text">Out for delivery</span>{" "}
                    </div>
                    <div className="step">
                      {" "}
                      <span className="icon">
                        {" "}
                        <i className="fa fa-box"></i>{" "}
                      </span>{" "}
                      <span className="text">Delivered</span>{" "}
                    </div>
                  </div>
                </Col> */}
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  ordersViewForOthers: state.userProducts.ordersViewForOthers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(OrderView));
