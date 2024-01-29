import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Table, Form, Image, Media } from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";
import {
  userProductsSearchStart,
  fetchProductCategoriesStart,
  fetchProductSubCategoriesStart,
} from "../../store/actions/ProductsAction";
import { connect } from "react-redux";
import SingleDisplayCard from "./Product/SingleDisplayCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";

const EcomCategoryIndex = (props) => {

  const [quickViewModal, setQuickViewModal] = useState(false);

  const [filterData, setFilterData] = useState({ search_key: props.match.params.search_key, });

  useEffect(() => {
    props.dispatch(userProductsSearchStart({ search_key: props.match.params.search_key }));
    props.dispatch(fetchProductCategoriesStart());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(userProductsSearchStart(filterData));
  }

  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name == "product_category_id") {
      setFilterData({
        ...filterData,
        product_category_id: value,
        product_sub_category_id: '',
      });
      props.dispatch(fetchProductSubCategoriesStart({ product_category_id: value }));
    } else {
      setFilterData({
        ...filterData,
        [event.target.name]: value,
      });
    }
  };

  return (
    <>
      <div className="ecom-category-sec">
        <Container>
          <h2>{t("ecom_category")}</h2>
          <div className="ecom-navbar">
            <ul className="list-unstyled ecom-nav-link">
              <Media as="li">
                <Link to="/product-list">
                  <Image
                    className="add-product-img"
                    src={
                      window.location.origin + "/assets/images/ecom/product-list.svg"
                    }
                  />
                  <span>{t('products')}</span>
                </Link>
                <Link to="/order-list">
                  <Image
                    className="add-product-img"
                    src={
                      window.location.origin + "/assets/images/ecom/orders-list.svg"
                    }
                  />
                  <span>{t('orders')}</span>
                </Link>
                <Link to="/order-transaction">
                  <Image
                    className="add-product-img"
                    src={
                      window.location.origin + "/assets/images/ecom/transaction-list.svg"
                    }
                  />
                  <span>{t('transactions')}</span>
                </Link>
              </Media>
              <Media as="li">
                <Link to="/add-product">
                  <Image
                    className="add-product-img"
                    src={
                      window.location.origin + "/assets/images/ecom/add-product.svg"
                    }
                  />
                  <span>{t('add_product')}</span>
                </Link>
                <Link to="/ecom-cart">
                  <Image
                    className="navbar-link-svg"
                    src={
                      window.location.origin + "/assets/images/ecom/shopping-bag.svg"
                    }
                  />
                  <span>{t('add_to_cart')}</span>
                </Link>
              </Media>
            </ul>
          </div>
          <Row>
            <Col md={3}>
              <div className="ecom-category-card">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-4">
                    <Form.Label>{t("search")}</Form.Label>
                    <Form.Control type="text" placeholder={t("search")}
                      value={filterData.search_key}
                      name="search_key"
                      onChange={(event) => {
                        handleChange(event);
                      }} />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>{t("category")}</Form.Label>
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
                      {props.categories.loading ? 'loading' :
                        props.categories.data.product_categories.map((category) => (
                          <option value={category.product_category_id}>{category.name}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>{t("sub_category")}</Form.Label>
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
                      {props.subCategories.loading ? null :
                        props.subCategories.data.product_sub_categories.map((sub_category) => (
                          <option value={sub_category.product_sub_category_id}>{sub_category.name}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <div className="">
                      <Form.Check
                        type="radio"
                        id="customControlAutosizing-1"
                        label="High to Low"
                        value="DESC"
                        name="price_type"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        custom
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="">
                      <Form.Check
                        type="radio"
                        id="customControlAutosizing-2"
                        label="Low to High"
                        value="ASC"
                        name="price_type"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        custom
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                  <Button type="reset" className="submit-btn">{t("reset")}</Button>
                    <Button type="submit" className="submit-btn">{t("submit")}</Button>
                  </Form.Group>
                </Form>
              </div>
            </Col>
            <Col md={9}>
              <Row>
                <Col md={12}>
                  {props.productSearch.loading ? (
                   t("loading")
                  ) : (
                    <div className="ecom-featured-box">
                      {props.productSearch.data.user_products.length > 0 ? (
                        props.productSearch.data.user_products.map((product) => (
                          <SingleDisplayCard product={product}></SingleDisplayCard>
                        ))) : (
                        <NoDataFound></NoDataFound>
                      )}
                    </div>)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  categories: state.userProducts.productCategories,
  subCategories: state.userProducts.productSubCategories,
  productSearch: state.userProducts.productSearch,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(EcomCategoryIndex));
