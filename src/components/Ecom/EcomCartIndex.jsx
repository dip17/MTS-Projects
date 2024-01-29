import React, { useState, useEffect } from "react";
import { Container, Breadcrumb, Row, Col, Table, Image, InputGroup, FormControl, Button, Form, Media } from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";
import { fetchCartListStart,
  removeCartDetailsStart
 } from "../../store/actions/ProductsAction";
 import { connect } from "react-redux";
 import SingleCartCard from "./SingleCartCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";

const EcomCartIndex = (props) => {

  useEffect(() => {
    props.dispatch(fetchCartListStart());
  }, []);

  return (
    <>
      <div className="ecom-cart-sec">
        <Container>
        <div className="ecom-navbar">
            <ul className="list-unstyled ecom-nav-link">
              <Media as="li">
                {localStorage.getItem("is_content_creator") == 2 ? (
                  <Link to="/product-list">
                    <Image
                      className="add-product-img"
                      src={
                        window.location.origin +
                        "/assets/images/ecom/product-list.svg"
                      }
                    />
                    <span>{t("products")}</span>
                  </Link>
                ): null}
                <Link to="/order-list">
                  <Image
                    className="add-product-img"
                    src={
                      window.location.origin +
                      "/assets/images/ecom/orders-list.svg"
                    }
                  />
                  <span>{t("orders")}</span>
                </Link>
                <Link to="/order-transaction">
                  <Image
                    className="add-product-img"
                    src={
                      window.location.origin +
                      "/assets/images/ecom/transaction-list.svg"
                    }
                  />
                  <span>{t("ecom_transactions")}</span>
                </Link>
              </Media>
            </ul>
          </div>
          <Breadcrumb className="ecom-cart-header">
              <Breadcrumb.Item active>{t("shopping_cart")}</Breadcrumb.Item>
              <Breadcrumb.Item>
                {t("proceed_to_checkout")}
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t("order_completed")}</Breadcrumb.Item>
          </Breadcrumb>
          {props.cartList.loading ? t("loading") : (
            <Row>
              {props.cartList.data.carts.length > 0 ? (
                <>
                  <Col md={8}>
                    <div className="ecom-cart-table">
                        <Table size="sm" className="ecom-cart-table">
                          <thead>
                            <tr>
                                <th class='text-center'>{t('product_image')}</th>
                                <th>{t("name")}</th>
                                <th>{t("Price")}</th>
                                <th>{t("quantity")}</th>
                                <th>{t("subtotal")}</th>
                                <th class='text-center'>{t("action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <>
                              {props.cartList.data.carts.map((cart) => (
                                <SingleCartCard cart={cart}></SingleCartCard>
                              ))}
                              <tr >
                                <td colspan="10">
                                  <div className="ecom-cart-action-btn-sec">
                                    <Link to="ecom" className="btn-button">
                                        {t("continue_shopping")}
                                    </Link>
                                    <Button type="submit" className="btn-button btn-update tiny"
                                    onClick={() => {
                                      if (window.confirm(t("remove_cart_confirmation"))) {
                                        props.dispatch(removeCartDetailsStart());
                                      }
                                    }}>
                                      {t("remove_all_cart")}
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          </tbody>
                        </Table>
                        {/* <Row>
                          <Col md={12}>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Special instructions for seller</Form.Label>
                                    <Form.Control as="textarea" rows={5} />
                                </Form.Group>
                            </Form>
                          </Col>
                        </Row> */}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="cart-summary-sec">
                        <h4>{t("price_details")}</h4>
                        <div className="cart-sub-total">
                            <h5>{t("subtotal")}</h5>
                            <p>{props.cartList.data.sub_total_formatted}</p>
                        </div>
                        <div className="estimate-shipping-tax-sec">
                            {/* <h5>Estimate Shipping and Tax</h5>
                            <p>Enter your destination to get a shipping estimate.</p>
                            <Form className="check-out-form">
                                <Form.Group>    
                                    <Form.Label className="mr-sm-2">
                                        Country <span>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="mr-sm-2"
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        <option value="0">India</option>
                                        <option value="1">USA</option>
                                        <option value="2">UAE</option>
                                        <option value="3">Spin</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="mr-sm-2">
                                        State<span>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="mr-sm-2"
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        <option value="0">Tamil Nadu</option>
                                        <option value="1">Kerala</option>
                                        <option value="2">Andhra</option>
                                        <option value="3">Telegana</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="mr-sm-2">
                                        Zip/Postal Code
                                    </Form.Label>
                                    <Form.Control size="lg" type="text" placeholder="" />
                                </Form.Group>
                                <Button type="submit" className="btn-button">
                                    GET A QUOTE
                                </Button>
                            </Form> */}
                            <div className="ecom-cart-total-amount">
                                <h5>{t("total")}</h5>
                                <h3>{props.cartList.data.total_formatted}</h3>
                            </div>
                            <div className="ecom-cart-checkout-btn-sec">
                                <Button type="submit" className="check-out-btn" href="/ecom-payment">
                                    {t("proceed_to_checkout")}
                                </Button>
                            </div>
                        </div>
                    </div>
                  </Col>
                </>
              )
              : (
                <Col md={12}>
                  <NoDataFound></NoDataFound>
                </Col>) }
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  cartList: state.userProducts.cartList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(EcomCartIndex));
