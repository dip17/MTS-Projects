import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Tab, Nav, Table } from "react-bootstrap";
import "./VideoAudioCallRequest.css";
import { Link } from "react-router-dom";

const VideoAudioCallRequestIndex = (props) => {

    return (
        <>
            <div className="video-audio-call-request-sec">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="video-audio-call-request-tabs-card">
                                <Tab.Container id="left-tabs-example" defaultActiveKey="incoming-request">
                                    <Row>
                                        <Col sm={12}>
                                            <Nav variant="pills">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="incoming-request">Incoming Request</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="sent-request">Sent Request</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={12}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="incoming-request">
                                                    <div className="video-audio-call-request-tabs-content">
                                                        <Table borderedless responsive>
                                                            <thead>
                                                                <tr className="bg-white">
                                                                    <th>Requested From</th>
                                                                    <th>Amount</th>
                                                                    <th>Scheduled AT</th>
                                                                    <th>End Time</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Call Request Recieived</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-times-circle"></i>
                                                                            </Button>
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-check-circle"></i>
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Request Accepted Payment Pending</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon payment-pending">
                                                                                Payment Pending
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Start Call</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon start-call">
                                                                                Start Call
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Call Request Recieived</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-times-circle"></i>
                                                                            </Button>
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-check-circle"></i>
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="sent-request">
                                                <div className="video-audio-call-request-tabs-content">
                                                        <Table borderedless responsive>
                                                            <thead>
                                                                <tr className="bg-white">
                                                                    <th>Requested From</th>
                                                                    <th>Amount</th>
                                                                    <th>Scheduled AT</th>
                                                                    <th>End Time</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Call Request Recieived</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-times-circle"></i>
                                                                            </Button>
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-check-circle"></i>
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Request Accepted Payment Pending</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon payment-pending">
                                                                                Payment Pending
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Start Call</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon start-call">
                                                                                Start Call
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Vedhike</td>
                                                                    <td>$0.256</td>
                                                                    <td>03 Jun 2022 03.33 PM</td>
                                                                    <td>-</td>
                                                                    <td>Call Request Recieived</td>
                                                                    <td>
                                                                        <div className="join-decline-btn-sec">
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-times-circle"></i>
                                                                            </Button>
                                                                            <Button className="table-btn-icon">
                                                                                <i className="far fa-check-circle"></i>
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default VideoAudioCallRequestIndex;
