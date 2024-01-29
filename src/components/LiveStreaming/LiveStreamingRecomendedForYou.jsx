import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { translate, t } from "react-multi-lang";

const LiveStreamingRecomendedForYou = (props) => {

    const history = useHistory();

    return (
        <>
            {props.suggestedUsers.length > 0 ?
                <div className="live-streaming-recomended-for-you-sec">
                    <div className="live-streaming-recomended-for-you-header">
                        <h4>{t("recommended_for_you")}</h4>
                        {/* <Link to="#">
                        View All
                    </Link> */}
                    </div>
                    <div className="live-streaming-recomended-for-you-box">
                        {props.suggestedUsers.map((user, i) =>
                            <div className="live-streaming-recomended-for-you-item"
                                key={i}
                                onClick={() => history.push(`/${user.user_unique_id}`)}
                            >
                                <div className="live-streaming-recomended-for-you-img-sec">
                                    <Image
                                        className="live-streaming-recomended-for-you-img"
                                        src={user.picture}
                                    />
                                </div>
                                <h5>{user.name}</h5>
                            </div>
                        )}
                        {/* <div className="live-streaming-recomended-for-you-item">
                            <div className="live-streaming-recomended-for-you-img-sec">
                                <Image
                                    className="live-streaming-recomended-for-you-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-2.png"
                                    }
                                />
                            </div>
                            <h5>Isabella Olivia</h5>
                        </div>
                        <div className="live-streaming-recomended-for-you-item">
                            <div className="live-streaming-recomended-for-you-img-sec">
                                <Image
                                    className="live-streaming-recomended-for-you-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-3.png"
                                    }
                                />
                            </div>
                            <h5>Isabella Olivia</h5>
                        </div>
                        <div className="live-streaming-recomended-for-you-item">
                            <div className="live-streaming-recomended-for-you-img-sec">
                                <Image
                                    className="live-streaming-recomended-for-you-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-4.png"
                                    }
                                />
                            </div>
                            <h5>Isabella Olivia</h5>
                        </div>
                        <div className="live-streaming-recomended-for-you-item">
                            <div className="live-streaming-recomended-for-you-img-sec">
                                <Image
                                    className="live-streaming-recomended-for-you-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-1.png"
                                    }
                                />
                            </div>
                            <h5>Isabella Olivia</h5>
                        </div>
                        <div className="live-streaming-recomended-for-you-item">
                            <div className="live-streaming-recomended-for-you-img-sec">
                                <Image
                                    className="live-streaming-recomended-for-you-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-2.png"
                                    }
                                />
                            </div>
                            <h5>Isabella Olivia</h5>
                        </div>
                        <div className="live-streaming-recomended-for-you-item">
                            <div className="live-streaming-recomended-for-you-img-sec">
                                <Image
                                    className="live-streaming-recomended-for-you-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-3.png"
                                    }
                                />
                            </div>
                            <h5>Isabella Olivia</h5>
                        </div> */}
                    </div>
                </div>
                : null
            }
        </>
    );
};

export default (translate(LiveStreamingRecomendedForYou));
