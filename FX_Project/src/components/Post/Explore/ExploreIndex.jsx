import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "./Explore.css";
import { Link } from "react-router-dom";
import Explore from "../Explore/Explore";
import CategoryListingIndex from "../../CategoryListing/CategoryListingIndex";
import { translate, t } from "react-multi-lang";

const ExploreIndex = (props) => {

    return (
        <>
            <div className="explore-tab-sec">
                <Container>
                    <Row>
                        <Col md={12}>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="explore">
                                <Row>
                                    <Col sm={12}>
                                        <Nav variant="pills">
                                            <Nav.Item>
                                                <Nav.Link eventKey="explore">{t('explore')}</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="category-listing">{t('category_n_listing')}</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={12}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="explore">
                                                <Explore/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="category-listing">
                                                <CategoryListingIndex/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ExploreIndex;
