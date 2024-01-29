import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, InputGroup, FormControl } from "react-bootstrap";
import "./VideoAudioCall.css";
import { Link } from "react-router-dom";

const NewAudioCallChatUserDetails = (props) => {

    return (
        <>
            <div className="audio-call-chat-user-details-sec">
                <div className="audio-call-chat-user-card">
                    <div className="audio-call-chat-user-cover-img-sec">
                        <Image
                            className="audio-call-chat-user-cover-img-sec"
                            src={
                                window.location.origin + "/assets/images/video-call/bg-img.png"
                            }
                        />
                    </div>
                    <div className="audio-call-chat-user-img-sec">
                        <Image
                            className="audio-call-chat-user-img"
                            src={
                                window.location.origin + "/assets/images/video-call/user-img.png"
                            }
                        />
                    </div>
                    <div className="audio-call-chat-user-item">
                        <div>
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
                            <Link to="#">
                                Isabella@olivia.com
                            </Link>
                        </div>
                        <div className="audio-total-count-info-box">
                            <div className="audio-total-count-card">
                                <h5>
                                    6,188
                                </h5>
                                <p>POST</p>
                            </div>
                            <div className="audio-total-count-card">
                                <h5>
                                    6,188
                                </h5>
                                <p>FANS</p>
                            </div>
                            <div className="audio-total-count-card">
                                <h5>
                                    6,188
                                </h5>
                                <p>FOLLOWING</p>
                            </div>
                        </div>
                        <div className="view-details-btn-sec">
                            <Link to="#" className="view-details-btn">
                                    View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewAudioCallChatUserDetails;
