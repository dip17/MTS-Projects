import React, { useState } from "react";
import { Modal, Tab, Nav, Image, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const CreateContentCreatorModal = (props) => {

    const nullData = ["", null, undefined, "light"];

    return (
        <>
            <Modal show={props.createContentCreatorModal}
                onHide={props.closeCreateContentCreatorModal}
                centered
                size="md"
                className={`become-content-creator-modal 
                ${nullData.includes(localStorage.getItem("theme")) ?
                        "" : "dark-theme-modal"
                    }`}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("become_a_content_creator")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <div className="become-content-creator-modal-sec">
                                <Image
                                    className="become-content-creator-modal-img"
                                    src={
                                        window.location.origin + "/assets/images/become-a-content-creator.svg"
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <h4>{t("become_a_content_creator_para")}</h4>
                    <div className="content-creator-btn-sec">
                        <a href={`/become-a-content-creator`} className="btn gradient-btn gradientcolor">
                            {t("start")}
                        </a>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default translate(CreateContentCreatorModal);
