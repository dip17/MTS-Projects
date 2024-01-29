import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Image,
  Media,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { saveCartDetailsStart } from "../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";

const QuickViewModal = (props) => {
  const { product } = props;

  // Set the initial count state to zero, 0
  const [count, setCount] = useState(1);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    if (product.quantity > count) setCount((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    if (count > 1) setCount((prevCount) => prevCount - 1);
  };

  const handleSubmit = () => {
    props.dispatch(
      saveCartDetailsStart({
        user_product_id: product.user_product_id,
        quantity: count,
        type: props.type,
        otherUserUniquId: props.otherUserUniquId,
      })
    );
  };

  return (
    <>
      <Modal
        show={props.quickViewModal}
        onHide={props.closeQuickViewModal}
        centered
        size="lg"
        className={`quick-view-modal-sec 
        ${localStorage.getItem("theme") !== "" &&
            localStorage.getItem("theme") !== null &&
            localStorage.getItem("theme") !== undefined &&
            localStorage.getItem("theme") === "dark" ?
            "dark-theme-modal" : ""
          }
        `}
      >
        {props.quickViewModal === true ? (
          <>
            <div className="quick-modal-close-sec">
              <Link
                className="close-modal-btn"
                onClick={props.closeQuickViewModal}
              >
                <i className="fas fa-times"></i>
              </Link>
            </div>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Carousel
                    showStatus={false}
                    showIndicators={true}
                    className="ecom-orderview-carousel"
                  >
                    <div className="d-flex align-items-center h-100">
                      <img
                        className="quick-view-modal-img"
                        src={product.picture}
                      />
                    </div>
                    {product.userProductFiles.map((product_picture) => (
                      <div>
                        <img
                          className="quick-view-modal-img"
                          src={product_picture.picture}
                        />
                      </div>
                    ))}
                  </Carousel>
                </Col>
                <Col md={6}>
                  <div className="quick-view-modal-info">
                    <h4>{product.name}</h4>
                    {/* <div className="rating-star-card">
												<ul className="rating-star-sec">
														<Media as="li">
																<i className="fas fa-star"></i>
														</Media>
														<Media as="li">
																<i className="fas fa-star"></i>
														</Media>
														<Media as="li">
																<i className="fas fa-star"></i>
														</Media>
														<Media as="li">
																<i className="fas fa-star"></i>
														</Media>
														<Media as="li">
																<i className="fas fa-star"></i>
														</Media>
												</ul>
												<h6>No Reviews</h6>
										</div> */}
                    <div className="border-line"></div>
                    <p className="quick-view-modal-desc">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></p>
                    </p>
                    <Link
                      to={"/single-product/" + product.unique_id}
                      className="show-more-btn"
                    >
                      {t("show_more")}
                    </Link>
                    <div className="quick-view-modal-price-sec">
                      {/* <del>
														<span>$59.00</span>
												</del> */}
                      <ins>
                        <span>{product.user_product_price_formatted}</span>
                      </ins>
                    </div>
                    <div className="availability-sec">
                      <h5 className="text-dark">
                        {t("availability")}:{" "}
                        <span className={product.is_outofstock === 0 ? "text-danger" : "text-success"}>
                          {product.is_outofstock == 0
                            ? t("out_of_stock")
                            : t("in_stock")}
                        </span>
                      </h5>
                    </div>
                    <div className="availability-sec">
                      <h5 className="text-dark">
                        {t("available_quantity")}:{" "}
                        <span className="text">{product.quantity}</span>
                      </h5>
                    </div>
                    {product.add_to_cart == 1 ? (
                      <>
                        {product.is_outofstock == 1 && (
                          <div className="quick-view-modal-add-to-cart">
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text onClick={handleDecrement}>
                                  <i className="fas fa-minus"></i>
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl placeholder={count}></FormControl>
                              <InputGroup.Append>
                                <InputGroup.Text onClick={handleIncrement}>
                                  <i className="fas fa-plus"></i>
                                </InputGroup.Text>
                              </InputGroup.Append>
                            </InputGroup>
                            <div className="banner-btn-sec">
                              <Button
                                onClick={handleSubmit}
                                className="quick-view-modal"
                              >
                                {t("add_to_cart")}
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="quick-view-modal-add-to-cart">
                        <div className="banner-btn-sec">
                          <Button
                            href="/ecom-cart"
                            className="quick-view-modal"
                          >
                            {t("view_cart")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        ) : null}
      </Modal>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(QuickViewModal));
