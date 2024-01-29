import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Tab, Nav, Media } from "react-bootstrap";
import "./NewProfile.css";
import { Link } from "react-router-dom";

const NewProfileTab = (props) => {

    return (
        <>
            <div className="profile-tab-sec">
                <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                    <Row>
                        <Col sm={12}>
                            <Nav variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="all">
                                        <span>
                                            <Image
                                                className="profile-post-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-home/icon/all-post.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">All</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="images">
                                        <span>
                                            <Image
                                                className="profile-post-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-home/icon/image-post.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">Images</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="videos">
                                        <span>
                                            <Image
                                                className="profile-post-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-home/icon/video-post.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none"> Videos</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="musics">
                                        <span>
                                            <Image
                                                className="profile-post-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-home/icon/audio-post.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">Musics</span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="all">
                                    <div className="profile-all-post-box">
                                        <Link to="#">
                                            <div className="profile-audio-post-card">
                                                <div className="profile-audio-img-sec">
                                                    <Image
                                                        className="profile-audio-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-1.png"
                                                        }
                                                    />
                                                    <div className="profile-audio-icon-sec">
                                                        <Image
                                                            className="profile-audio-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-lock-post-card">
                                                <div className="profile-lock-img-sec">
                                                    <Image
                                                        className="profile-lock-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-2.png"
                                                        }
                                                    />
                                                    <div className="profile-lock-icon-sec">
                                                        <Image
                                                            className="profile-lock-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-video-post-card">
                                                <div className="profile-video-img-sec">
                                                    <Image
                                                        className="profile-video-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-3.png"
                                                        }
                                                    />
                                                    <div className="profile-video-icon-sec">
                                                        <Image
                                                            className="profile-video-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-4.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-5.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-6.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-7.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-8.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="images">
                                    <div className="profile-img-post-box">
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-9.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-10.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-11.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-image-post-card">
                                                <div className="profile-image-img-sec">
                                                    <Image
                                                        className="profile-image-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-12.png"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="videos">
                                    <div className="profile-video-post-box">
                                        <Link to="#">
                                            <div className="profile-video-post-card">
                                                <div className="profile-video-img-sec">
                                                    <Image
                                                        className="profile-video-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-8.png"
                                                        }
                                                    />
                                                    <div className="profile-video-icon-sec">
                                                        <Image
                                                            className="profile-video-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-video-post-card">
                                                <div className="profile-video-img-sec">
                                                    <Image
                                                        className="profile-video-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-9.png"
                                                        }
                                                    />
                                                    <div className="profile-video-icon-sec">
                                                        <Image
                                                            className="profile-video-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-video-post-card">
                                                <div className="profile-video-img-sec">
                                                    <Image
                                                        className="profile-video-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-10.png"
                                                        }
                                                    />
                                                    <div className="profile-video-icon-sec">
                                                        <Image
                                                            className="profile-video-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-video-post-card">
                                                <div className="profile-video-img-sec">
                                                    <Image
                                                        className="profile-video-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-11.png"
                                                        }
                                                    />
                                                    <div className="profile-video-icon-sec">
                                                        <Image
                                                            className="profile-video-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="musics">
                                    <div className="profile-audio-post-box">
                                        <Link to="#">
                                            <div className="profile-audio-post-card">
                                                <div className="profile-audio-img-sec">
                                                    <Image
                                                        className="profile-audio-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-11.png"
                                                        }
                                                    />
                                                    <div className="profile-audio-icon-sec">
                                                        <Image
                                                            className="profile-audio-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-audio-post-card">
                                                <div className="profile-audio-img-sec">
                                                    <Image
                                                        className="profile-audio-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-12.png"
                                                        }
                                                    />
                                                    <div className="profile-audio-icon-sec">
                                                        <Image
                                                            className="profile-audio-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-audio-post-card">
                                                <div className="profile-audio-img-sec">
                                                    <Image
                                                        className="profile-audio-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-1.png"
                                                        }
                                                    />
                                                    <div className="profile-audio-icon-sec">
                                                        <Image
                                                            className="profile-audio-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#">
                                            <div className="profile-audio-post-card">
                                                <div className="profile-audio-img-sec">
                                                    <Image
                                                        className="profile-audio-img"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/posts/post-2.png"
                                                        }
                                                    />
                                                    <div className="profile-audio-icon-sec">
                                                        <Image
                                                            className="profile-audio-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    );
};

export default NewProfileTab;
