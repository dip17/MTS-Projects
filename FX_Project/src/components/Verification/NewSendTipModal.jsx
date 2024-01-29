import React, { useState } from "react";
import { Modal, Tab, Nav, Image, Row, Col, Form, Button } from "react-bootstrap";
import "./Verification.css";
import { Link } from "react-router-dom";

const NewSendTipModal = (props) => {

    return (
        <>
            <Modal show={props.newSendTipModal}
                onHide={props.closeNewSendTipModal}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tips/Subscription/PPV</Modal.Title>
                </Modal.Header>
                <Modal.Body className="subscription-tip-ppv-tab">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="card">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="card">Card (stripe)</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="paypal">PayPal</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="ccbill">CCBill</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="wallet">Wallet</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="card">
                                        <div className="card-stripe-box">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Control type="number" placeholder="Amount" />
                                                </Form.Group>
                                                <div className="card-stripe-sec">
                                                    <div className="card-stripe-item">
                                                        <div className="add-account-item">
                                                            <Image
                                                                className="add-account-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/icons/new/add-card.svg"
                                                                }
                                                            />
                                                            <h5 className="text-muted">Add Card</h5>
                                                        </div>
                                                    </div>
                                                    <div className="card-stripe-list-box">
                                                        <h5 className="mb-3">XXXX XXXX XXXX 4242</h5>
                                                        <h5 className="text-muted">visa</h5>
                                                        <div className="card-stripe-bottom">
                                                            <div className="card-stripe-action-btn">
                                                                <p className="card-link-text text-success">default card</p>
                                                                <Link className="card-link-text text-info" to="#">
                                                                    <Image
                                                                        className="svg-clone"
                                                                        src={
                                                                            window.location.origin + "/assets/images/icons/new/delete.svg"
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={3} placeholder="Message" className="height-auto" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="paypal">
                                    <div className="card-stripe-box">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Control type="number" placeholder="Amount" />
                                                </Form.Group>
                                                <div className="card-stripe-sec">
                                                    <div className="card-stripe-item">
                                                        <div className="add-account-item">
                                                            <Image
                                                                className="add-account-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/icons/new/add-card.svg"
                                                                }
                                                            />
                                                            <h5 className="text-muted">Add Card</h5>
                                                        </div>
                                                    </div>
                                                    <div className="card-stripe-list-box">
                                                        <h5 className="mb-3">XXXX XXXX XXXX 4242</h5>
                                                        <h5 className="text-muted">visa</h5>
                                                        <div className="card-stripe-bottom">
                                                            <div className="card-stripe-action-btn">
                                                                <p className="card-link-text text-success">default card</p>
                                                                <Link className="card-link-text text-info" to="#">
                                                                    <Image
                                                                        className="svg-clone"
                                                                        src={
                                                                            window.location.origin + "/assets/images/icons/new/delete.svg"
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={3} placeholder="Message" className="height-auto" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="ccbill">
                                    <div className="card-stripe-box">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Control type="number" placeholder="Amount" />
                                                </Form.Group>
                                                <div className="card-stripe-sec">
                                                    <div className="card-stripe-item">
                                                        <div className="add-account-item">
                                                            <Image
                                                                className="add-account-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/icons/new/add-card.svg"
                                                                }
                                                            />
                                                            <h5 className="text-muted">Add Card</h5>
                                                        </div>
                                                    </div>
                                                    <div className="card-stripe-list-box">
                                                        <h5 className="mb-3">XXXX XXXX XXXX 4242</h5>
                                                        <h5 className="text-muted">visa</h5>
                                                        <div className="card-stripe-bottom">
                                                            <div className="card-stripe-action-btn">
                                                                <p className="card-link-text text-success">default card</p>
                                                                <Link className="card-link-text text-info" to="#">
                                                                    <Image
                                                                        className="svg-clone"
                                                                        src={
                                                                            window.location.origin + "/assets/images/icons/new/delete.svg"
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={3} placeholder="Message" className="height-auto" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="wallet">
                                    <div className="card-stripe-box">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Control type="number" placeholder="Amount" />
                                                </Form.Group>
                                                <div className="wallet-balence-amount">
                                                    <h4>Available</h4>
                                                    <p>$0.00</p>
                                                </div>
                                                <div className="card-stripe-sec">
                                                    <div className="card-stripe-item">
                                                        <div className="add-account-item">
                                                            <Image
                                                                className="add-account-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/icons/new/add-card.svg"
                                                                }
                                                            />
                                                            <h5 className="text-muted">Add Card</h5>
                                                        </div>
                                                    </div>
                                                    <div className="card-stripe-list-box">
                                                        <h5 className="mb-3">XXXX XXXX XXXX 4242</h5>
                                                        <h5 className="text-muted">visa</h5>
                                                        <div className="card-stripe-bottom">
                                                            <div className="card-stripe-action-btn">
                                                                <p className="card-link-text text-success">default card</p>
                                                                <Link className="card-link-text text-info" to="#">
                                                                    <Image
                                                                        className="svg-clone"
                                                                        src={
                                                                            window.location.origin + "/assets/images/icons/new/delete.svg"
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className="conv-desc desc">* The balance is less than $1.00 so please and the money to wallet</p>
                                                    <Button className="withdraw-money-btn">Add Money</Button>
                                                </div>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={3} placeholder="Message" className="height-auto" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={props.closeNewSendTipModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="btn btn-success"
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewSendTipModal;
