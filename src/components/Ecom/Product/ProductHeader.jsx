import React from "react";
import { translate, t } from "react-multi-lang";
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
import { Link } from "react-router-dom";

const ProductHeader = () => {
  return (
    <>
      <ul className="list-unstyled ecom-nav-link">
        <Media as="li">
          {localStorage.getItem("is_content_creator") == 2 && (
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
          )}
          <Link to="/order-list">
            <Image
              className="add-product-img"
              src={
                window.location.origin + "/assets/images/ecom/orders-list.svg"
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
        <Media as="li">
          {localStorage.getItem("is_content_creator") == 2 && (
            <Link to="/add-product">
              <Image
                className="add-product-img"
                src={
                  window.location.origin + "/assets/images/ecom/add-product.svg"
                }
              />
              <span>{t("add_product")}</span>
            </Link>
          )}
          <Link to="/ecom-cart">
            <Image
              className="navbar-link-svg"
              src={
                window.location.origin + "/assets/images/ecom/shopping-bag.svg"
              }
            />
            <span>{t("cart")}</span>
          </Link>
        </Media>
      </ul>
    </>
  );
};

export default translate(ProductHeader);
