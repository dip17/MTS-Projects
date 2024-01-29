import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Nav, Tab, InputGroup, FormControl } from "react-bootstrap";
import "./NewExplore.css";
import { Link } from "react-router-dom";
import NewExploreCard from "./NewExploreCard";
import NewCategoryCard from "./NewCategoryCard";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { apiConstants } from "../../Constant/constants";
import { fetchUserCategoryListStart } from "../../../store/actions/UserCategoryAction";

const NewExploreCategoryIndex = (props) => {


    useEffect(() => {
        props.dispatch(fetchUserCategoryListStart());
    }, []);

    return (
        <>
            <div className="new-explore-sec">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="new-explore-tab-sec">
                                <Tab.Container id="left-tabs-example" defaultActiveKey="explore">
                                    <Row>
                                        <Col sm={12}>
                                            <div className="new-explore-tab-header-sec">
                                                <Nav variant="pills">
                                                    <Nav.Item>
                                                        <Link
                                                            className="nav-link"
                                                            eventKey="explore"
                                                            to="/explore"
                                                        >{t("explore")}</Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Link
                                                            className="nav-link active"
                                                            eventKey="category"
                                                            to="/explore-categories"
                                                        >{t("category")}</Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                        </Col>
                                        <Col sm={12}>
                                            <NewCategoryCard />
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


function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(
    null,
    mapDispatchToProps
)(translate(NewExploreCategoryIndex));
