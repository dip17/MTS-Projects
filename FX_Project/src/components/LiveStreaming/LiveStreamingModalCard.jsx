import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";

const LiveStreamingModalCard = (props) => {

    return (
        <>
            <div className="live-streaming-card">
                <div className="live-streaming-bg-img-sec">
                    <Image
                        className="live-streaming-bg-img"
                        src={
                            window.location.origin + "/assets/images/live-streaming/live-bg-img.png"
                        }
                    />
                </div>
                <div className="live-streaming-close-btn-sec">
                    <Button className="close-btn">
                        <Image
                            className="close-btn-icon"
                            src={
                                window.location.origin + "/assets/images/live-streaming/close.svg"
                            }
                        />
                        <span>Close</span>
                    </Button>
                </div>
                <div className="live-streaming-modal-action-btn-sec">
                   <ul className="list-unstyled">
                        <Media as="li">
                            <Button className="modal-action-btn">
                                <Image
                                    className="modal-action-btn-icon"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/audio-icon.svg"
                                    }
                                />
                            </Button>
                        </Media>
                        <Media as="li">
                            <Button className="modal-action-btn">
                                <Image
                                    className="modal-action-btn-icon"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/video-hide.svg"
                                    }
                                />
                            </Button>
                        </Media>
                        <Media as="li">
                            <Button className="modal-action-btn">
                                <Image
                                    className="modal-action-btn-icon"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/refresh-icon.svg"
                                    }
                                />
                            </Button>
                        </Media>
                   </ul>
                </div>
                <div className="live-streaming-full-screen-sec">
                    <Button className="close-btn">
                        <Image
                            className="live-streaming-full-screen-icon"
                            src={
                                window.location.origin + "/assets/images/live-streaming/full-screen.svg"
                            }
                        />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LiveStreamingModalCard;
