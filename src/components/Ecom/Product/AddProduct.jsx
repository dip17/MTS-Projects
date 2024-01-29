import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "./Product.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchProductCategoriesStart,
  fetchProductSubCategoriesStart,
  userProductsSaveStart,
} from "../../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./ProductHeader";
import configuration from "react-global-configuration";

const AddProduct = (props) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    props.dispatch(fetchProductCategoriesStart());
  }, []);

  const handleChange = (event) => {
    let value =
      event.target.name == "picture"
        ? event.target.files[0]
        : event.target.value;
    if (event.target.name == "product_category_id") {
      setProductData({
        ...productData,
        product_category_id: value,
        product_sub_category_id: "",
      });
      props.dispatch(
        fetchProductSubCategoriesStart({ product_category_id: value })
      );
    } else {
      setProductData({
        ...productData,
        [event.target.name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(userProductsSaveStart(productData));
  };

  return (
    <>
      <div className="add-product-sec">
        <Container>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>

          <Form onSubmit={handleSubmit} className="add-product-form">
            <h2>{t("add_product")}</h2>

            <Row>
              <Col md={6}>
                <div className="border-right-divider add-product-form-sec">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t("name")}*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("name")}
                      name="name"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t("quantity")}*</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t("quantity")}
                      min="1"
                      name="quantity"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t("price")}*</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={
                        configuration.get(
                          "configData.is_only_wallet_payment"
                        ) == 1
                          ? t("token")
                          : t("price")
                      }
                      min="1"
                      name="price"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t("category")}*</Form.Label>
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                      name="product_category_id"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    >
                      <option value="">{t("select_category")}</option>
                      {props.categories.loading
                        ? t("loading")
                        : props.categories.data.product_categories.map(
                            (category) => (
                              <option value={category.product_category_id}>
                                {category.name}
                              </option>
                            )
                          )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t("sub_category")}*</Form.Label>
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                      name="product_sub_category_id"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    >
                      <option value="0">{t("select_sub_category")}</option>
                      {props.subCategories.loading
                        ? null
                        : props.subCategories.data.product_sub_categories.map(
                            (sub_category) => (
                              <option
                                value={sub_category.product_sub_category_id}
                              >
                                {sub_category.name}
                              </option>
                            )
                          )}
                    </Form.Control>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div className="add-product-upload-file-sec">
                  <Form.Label>{t("upload_product_image")}</Form.Label>
                  <Form.Group id="file-upload-form" className="uploader">
                    <Form.File
                      id="file-upload"
                      name="picture"
                      accept="image/*"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <label for="file-upload" id="file-drag">
                      <div id="start">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div>{t("select_a_image")}</div>
                      </div>
                    </label>
                    <p className="inuput-help">
                      {t("upload_product_image_para")}
                    </p>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="height-auto"
                      name="description"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  <div className="add-product-btn-sec">
                    <Button
                      type="submit"
                      className="add-product-btn"
                      disabled={props.productSave.buttonDisable}
                    >
                      {!props.productSave.loading ? "Uploading" : t("add")}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  categories: state.userProducts.productCategories,
  subCategories: state.userProducts.productSubCategories,
  productSave: state.userProducts.productSave,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AddProduct));
