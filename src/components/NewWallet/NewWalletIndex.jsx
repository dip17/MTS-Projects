import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Tab, Nav, Table } from "react-bootstrap";
import "./NewWallet.css";
import { Link } from "react-router-dom";
import NewWalletTransaction from "./NewWalletTransaction";

const NewWalletIndex = (props) => {

    return (
        <>
            <div className="new-wallet-sec">
                <Container>
                    <Row>
                        <Col md={8}>
                            <div className="new-wallet-current-balance-box">
                                <div className="new-wallet-current-balance-info-sec">
                                    <h4>Current Balance</h4>
                                    <div className="current-balance-info">
                                        {/* <i className="fas fa-wallet"></i> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/></svg>
                                        <p>3,2056.48 $</p>
                                    </div>
                                </div>
                                <div className="new-wallet-action-btn">
                                    <Button className="add-token-btn">
                                        Add Token
                                    </Button>
                                    <Button className="withdraw-btn">
                                        Withdraw
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="refferal-bonus-card">
                                <h4>Current Balance</h4>
                                <div className="refferal-balance-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/></svg>
                                    <p>3,2056.48 $</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NewWalletTransaction/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default NewWalletIndex;
