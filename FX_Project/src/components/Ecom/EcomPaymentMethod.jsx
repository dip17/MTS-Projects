import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";

const EcomPaymentMethod = (props) => {

    return (
        <>
            <div className="ecom-payment-method-sec">
                <Container>
                    <h2>Ecom Payment Method</h2>
                    <Form className="add-product-form">
                        <Row>
                            <Col md={6}>
                                <div className="border-right-divider add-product-form-sec">
                                    <Row className="payment-method">
                                        <Col md={6} className="resp-mrg-btn-xs">
                                            <div className="radiobtn payment-method-card-1">
                                                <Form.Control type="radio" id="inline-radio-1" className="form-check-input" checked="checked" />
                                                <label type="radio" for="inline-radio-1" className="form-check-label card-label">
                                                    <p className="no-margin"><span className="card-option">Card</span></p>
                                                </label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="radiobtn payment-method-card-1">
                                                <Form.Control type="radio" id="inline-radio-2" className="form-check-input" />
                                                <label type="radio" for="inline-radio-2" className="form-check-label">Paypal</label>
                                            </div>
                                        </Col>
                                        <Col md={6} className="mt-4">
                                            <div className="radiobtn payment-method-card-1">
                                                <Form.Control type="radio" id="inline-radio-3" className="form-check-input" />
                                                <label type="radio" for="inline-radio-3" className="form-check-label">Wallet</label>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="radiobtn mb-4 payment-method-card">
                                                <div>
                                                    <h3 className="payment-head-tit">Beno darry</h3>
                                                    <p className="desc">XXXX XXXX XXXX X567</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="ecom-payment-product-details-sec mt-4">
                                    <div className="product-details-header-sec">
                                        <div className="product-details-header-card">
                                            <div className="product-details-info">
                                                <Image
                                                    className="product-thumbnail-img"
                                                    src={
                                                        window.location.origin + "/assets/images/ecom/ecom-1.jpg"
                                                    }
                                                />
                                                <h6>Light Brown Shoes</h6>
                                            </div>
                                            <div className="ecom-payment-product-amount">
                                                <p>$49.00</p>
                                            </div>
                                        </div>
                                        <div className="product-details-header-card">
                                            <div className="product-details-info">
                                                <Image
                                                    className="product-thumbnail-img"
                                                    src={
                                                        window.location.origin + "/assets/images/ecom/ecom-1.jpg"
                                                    }
                                                />
                                                <h6>Light Brown Shoes</h6>
                                            </div>
                                            <div className="ecom-payment-product-amount">
                                                <p>$49.00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details-body-sec">
                                        <div className="product-details-card">
                                            <h5>Subtotal</h5>
                                            <p className="product-amount">$49.00</p>
                                        </div>
                                        <div className="product-details-card">
                                            <h5>Shipping</h5>
                                            <p>Calculated at next step</p>
                                        </div>
                                    </div>
                                    <div className="product-details-footer-sec">
                                        <h5>Total</h5>
                                        <div className="product-details-final-amount">
                                            <span>USD</span>
                                            <p>$49.00</p>
                                        </div>
                                    </div>
                                    <div className="ecom-payment-method-btn-sec">
                                        <Link to="#" className="continue-shipping-btn">Pay Now</Link>
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

export default EcomPaymentMethod;
