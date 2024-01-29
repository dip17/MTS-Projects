import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Container,
  Image,
  Media,
} from "react-bootstrap";
import "./NewEcom.css";
import { Link } from "react-router-dom";

const NewEcomIndex = () => {
  return (
    <>
      <div className="new-ecom-sec">
        <div className="new-ecom-banner">
          <Container>
            <div className="new-ecom-search-bar">
              <Form>
                <InputGroup>
                  <Form.Control
                    placeholder="Search Product"
                    aria-label="Search Product"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Text id="basic-addon1">
                    <Image
                      src={window.location.origin + "/assets/images/search.png"}
                      alt=""
                    />
                  </InputGroup.Text>
                </InputGroup>

                <Button>
                  <span>My Cart </span>
                  <Image
                    src={window.location.origin + "/assets/images/add-cart.png"}
                    alt=""
                  />
                </Button>
              </Form>
            </div>
          </Container>
        </div>
        <div className="new-ecom-product">
          <Container>
            <div className="new-ecom-list">
              <h3 className="mb-4">Featured Profiles</h3>
              <div className="new-ecom-card">
                <div className="new-ecom-box">
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/ecom/product-1.png"
                    }
                    className="ecom-product-img"
                    alt=""
                  />
                  <div className="new-ecom-box-bottom">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/ecom/profile.png"
                      }
                      alt=""
                    />
                    <div className="profile-content">
                      <h5>Isabella Olivia</h5>
                      <p>Total Products - 23</p>
                    </div>
                  </div>
                </div>
                <div className="new-ecom-box">
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/ecom/product-1.png"
                    }
                    className="ecom-product-img"
                    alt=""
                  />
                  <div className="new-ecom-box-bottom">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/ecom/profile.png"
                      }
                      alt=""
                    />
                    <div className="profile-content">
                      <h5>Isabella Olivia</h5>
                      <p>Total Products - 23</p>
                    </div>
                  </div>
                </div>
                <div className="new-ecom-box">
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/ecom/product-1.png"
                    }
                    className="ecom-product-img"
                    alt=""
                  />
                  <div className="new-ecom-box-bottom">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/ecom/profile.png"
                      }
                      alt=""
                    />
                    <div className="profile-content">
                      <h5>Isabella Olivia</h5>
                      <p>Total Products - 23</p>
                    </div>
                  </div>
                </div>
                <div className="new-ecom-box">
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/ecom/product-1.png"
                    }
                    className="ecom-product-img"
                    alt=""
                  />
                  <div className="new-ecom-box-bottom">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/ecom/profile.png"
                      }
                      alt=""
                    />
                    <div className="profile-content">
                      <h5>Isabella Olivia</h5>
                      <p>Total Products - 23</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="new-ecom-list">
              <h3>Top Products</h3>
              <div className="live-streaming-store-product-box mt-4">
                <div className="live-streaming-store-product-item">
                  <div className="live-streaming-store-product-img-bg-sec">
                    <Image
                      className="live-streaming-store-product-img"
                      src={
                        window.location.origin +
                        "/assets/images/live-streaming/product-1.png"
                      }
                    />
                  </div>
                  <div className="live-streaming-store-add-cart-link">
                    <div className="live-streaming-store-cart-icon-sec">
                      <Link to="#">
                        <Image
                          className="live-streaming-store-cart-icon"
                          src={
                            window.location.origin +
                            "/assets/images/new-home/icon/cart-icon.svg"
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="live-streaming-store-product-info-sec">
                    <div className="live-streaming-store-product-info-card">
                      <div className="live-streaming-store-product-details">
                        <h3>Product Name</h3>
                        <p>$178.00</p>
                      </div>
                      <div className="rating-star-card">
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
                      </div>
                    </div>
                  </div>
                  <div className="live-streaming-stock-sec">
                    <p>IN STOCK</p>
                  </div>
                </div>
                <div className="live-streaming-store-product-item">
                  <div className="live-streaming-store-product-img-bg-sec">
                    <Image
                      className="live-streaming-store-product-img"
                      src={
                        window.location.origin +
                        "/assets/images/live-streaming/product-2.png"
                      }
                    />
                  </div>
                  <div className="live-streaming-store-add-cart-link">
                    <div className="live-streaming-store-cart-icon-sec">
                      <Link to="#">
                        <Image
                          className="live-streaming-store-cart-icon"
                          src={
                            window.location.origin +
                            "/assets/images/new-home/icon/cart-icon.svg"
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="live-streaming-store-product-info-sec">
                    <div className="live-streaming-store-product-info-card">
                      <div className="live-streaming-store-product-details">
                        <h3>Product Name</h3>
                        <p>$178.00</p>
                      </div>
                      <div className="rating-star-card">
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
                      </div>
                    </div>
                  </div>
                  <div className="live-streaming-stock-sec">
                    <p>IN STOCK</p>
                  </div>
                </div>
                <div className="live-streaming-store-product-item">
                  <div className="live-streaming-store-product-img-bg-sec">
                    <Image
                      className="live-streaming-store-product-img"
                      src={
                        window.location.origin +
                        "/assets/images/live-streaming/product-3.png"
                      }
                    />
                  </div>
                  <div className="live-streaming-store-add-cart-link">
                    <div className="live-streaming-store-cart-icon-sec">
                      <Link to="#">
                        <Image
                          className="live-streaming-store-cart-icon"
                          src={
                            window.location.origin +
                            "/assets/images/new-home/icon/cart-icon.svg"
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="live-streaming-store-product-info-sec">
                    <div className="live-streaming-store-product-info-card">
                      <div className="live-streaming-store-product-details">
                        <h3>Product Name</h3>
                        <p>$178.00</p>
                      </div>
                      <div className="rating-star-card">
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
                      </div>
                    </div>
                  </div>
                  <div className="live-streaming-stock-sec">
                    <p>IN STOCK</p>
                  </div>
                </div>
                <div className="live-streaming-store-product-item">
                  <div className="live-streaming-store-product-img-bg-sec">
                    <Image
                      className="live-streaming-store-product-img"
                      src={
                        window.location.origin +
                        "/assets/images/live-streaming/product-1.png"
                      }
                    />
                  </div>
                  <div className="live-streaming-store-add-cart-link">
                    <div className="live-streaming-store-cart-icon-sec">
                      <Link to="#">
                        <Image
                          className="live-streaming-store-cart-icon"
                          src={
                            window.location.origin +
                            "/assets/images/new-home/icon/cart-icon.svg"
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="live-streaming-store-product-info-sec">
                    <div className="live-streaming-store-product-info-card">
                      <div className="live-streaming-store-product-details">
                        <h3>Product Name</h3>
                        <p>$178.00</p>
                      </div>
                      <div className="rating-star-card">
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
                      </div>
                    </div>
                  </div>
                  <div className="live-streaming-stock-sec">
                    <p>IN STOCK</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default NewEcomIndex;
