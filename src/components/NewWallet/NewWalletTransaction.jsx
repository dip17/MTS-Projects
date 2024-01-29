import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Tab, Nav, Table } from "react-bootstrap";
import "./NewWallet.css";
import { Link } from "react-router-dom";

const NewWalletTransaction = (props) => {

    return (
        <>
            <div className="new-wallet-transaction-sec">
                <div className="new-wallet-transaction-box">
                    <Table borderedless responsive>
                        <thead>
                            <tr className="bg-white">
                                <th>Transaction</th>
                                <th>Amount</th>
                                <th>Service Fee</th>
                                <th>Type</th>
                                <th>From</th>
                                <th>Wallet ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Paid</td>
                                <td>18.00 Nuts <span>($180)</span></td>
                                <td>Service Fee : <span>2.00 Nuts</span></td>
                                <td>Credit</td>
                                <td>from : <span>Vedika</span></td>
                                <td>
                                    WPP-1319238789
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default NewWalletTransaction;
