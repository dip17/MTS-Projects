import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Badge,
  Media,
  Image,
} from "react-bootstrap";
import "./Product.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProductsProOwnerStart } from "../../../store/actions/ProductOwnerAction";
import { deleteUserProductStart } from "../../../store/actions/ProductsAction";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./ProductHeader";

const ProductList = (props) => {
  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    props.dispatch(fetchProductsProOwnerStart());
  }, []);

  const handleChange = (event) => {
    setSearchKey(event.target.value);
    props.dispatch(
      fetchProductsProOwnerStart({ search_key: event.target.value })
    );
  };

  return (
    <>
      <div className="product-list-sec">
        <Container>
          <h2>{t("product_list")}</h2>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>
          <Row>
            <Col md={12}>
              <div className="table-wrap">
                <Form>
                  <Row>
                    <Col md={9}></Col>
                    <Col md={3} className="text-right">
                      <div className="form-group explore-location-dropdown mb-4">
                        <input
                          type="text"
                          placeholder={t("search")}
                          className="form-control edit-reset"
                          value={searchKey}
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        ></input>
                      </div>
                    </Col>
                  </Row>
                </Form>
                {props.products.loading ? (
                t("loading")
                ) : (
                  <Table responsive="md" responsive="sm">
                    <thead className="thead-primary">
                      <tr>
                        <th>{t("product_image")}</th>
                        <th>{t("product_details")}</th>
                        <th>{t("price")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("in_stock")}</th>
                        <th className="text-center">{t("action")}</th>
                      </tr>
                    </thead>
                    {props.products.data.user_products.length > 0 ? (
                      <tbody>
                        {props.products.data.user_products.map((product) => (
                          <tr className="alert" role="alert">
                            <td>
                              <div
                                className="img"
                                style={{
                                  backgroundImage: `url(${product.picture})`,
                                }}
                              ></div>
                            </td>
                            <td>
                              <div className="email">
                                <span>{product.name} </span>
                                <span>
                                <p dangerouslySetInnerHTML={{__html: product.description}}></p>
                                </span>
                              </div>
                            </td>
                            <td>{product.user_product_price_formatted}</td>
                            <td className="quantity">{product.quantity}</td>
                            <td>
                              {product.is_outofstock == "0" ? (
                                <Badge className="unconfirmed-badge">
                                  {t("no")}
                                </Badge>
                              ) : (
                                <Badge className="confirmed-badge">
                                  {t("yes")}
                                </Badge>
                              )}
                            </td>
                            <td>
                              <div className="product-list-action-icons">
                              <Button
                                type="button"
                                className="close"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      t("delete_product_confirmation")
                                    )
                                  ) {
                                    props.dispatch(
                                      deleteUserProductStart({
                                        user_product_id:
                                          product.user_product_id,
                                      })
                                    );
                                  }
                                }}
                              >
                                <span aria-hidden="true">
                                  <i className="fa fa-close"></i>
                                </span>
                              </Button>
                              <Button
                                type="button"
                                className="view"
                                href={"/single-product/" + product.unique_id}
                              >
                                <span>
                                  <i className="fa fa-eye"></i>
                                </span>
                              </Button>
                              <Button
                                type="button"
                                className="edit"
                                href={
                                  "/edit-product/" + product.user_product_id
                                }
                              >
                                <span>
                                  <i className="fa fa-edit"></i>
                                </span>
                              </Button>
                              </div>
                              <Link
                                to={`/view-order/${product.unique_id}/${product.user_product_id}`}
                                className="single-orders-view"
                              >
                                <span>{t("view_orders")}</span>
                              </Link>
                              <Link
                                to={`/product-gallery/${product.unique_id}/${product.user_product_id}`}
                                className="single-orders-view"
                              >
                                <span>{t("gallery")}</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
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
  products: state.proOwner.products,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ProductList));
