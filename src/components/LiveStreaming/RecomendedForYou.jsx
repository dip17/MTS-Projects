import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import Background from '../LiveStreaming/live-streaming-bg.png';

const RecomendedForYou = (props) => {

    return (
        <>
            <div className="most-popular-live-streaming">
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <div className="most-popular-header-sec">
                                <h4>Recomended For You</h4>
                                <Link to="#">
                                    See ALL
                                </Link>
                            </div>
                            <div className="most-popular-live-box">
                                <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-1.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-2.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-3.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-4.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                 <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-5.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                 <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-6.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-7.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                 <div className="most-popular-live-card">
                                    <div className="most-popular-thumbnail-img-sec">
                                        <Image
                                            className="most-popular-thumbnail-img"
                                            src={
                                                window.location.origin + "/assets/images/live-streaming/live-8.png"
                                            }
                                        />
                                    </div>
                                    <div className="most-popular-list-sec">
                                        <ul className="list-unstyled">
                                            <Media as="li" className="total-count">
                                                <div className="live-list-count">
                                                    <span>1.25k</span>
                                                </div>
                                            </Media>
                                            <Media as="li" className="user-1">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-1.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-2">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-2.png"
                                                    }
                                                />
                                            </Media>
                                            <Media as="li" className="user-3">
                                                <Image
                                                    className="live-list-img"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/live-list-3.png"
                                                    }
                                                />
                                            </Media>
                                        </ul>
                                    </div>
                                    <div className="most-popular-user-info-card">
                                        <div className="most-popular-user-info">
                                            <Image
                                                className="most-popular-user-img"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/user-img.png"
                                                }
                                            />
                                            <div className="most-popular-user-details">
                                                <h4>Isabella Olivia 
                                                    <span>
                                                        <Image
                                                            className="sidebar-verified-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                            }
                                                        />
                                                    </span>
                                                </h4>
                                                <Link to="#" className="most-popular-user-name">
                                                    @isabellaolivia
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="most-popular-user-btn-sec">
                                            <Button className="join-now-btn">
                                                Join Now
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="most-popular-product-info">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default RecomendedForYou;
