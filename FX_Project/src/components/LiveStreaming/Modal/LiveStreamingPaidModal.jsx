import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Dropdown } from "react-bootstrap";
import "../LiveStreaming.css";
import { Link } from "react-router-dom";
import LiveStreamingModalCard from "../LiveStreamingModalCard";
import LiveStreamingCommentsPaidModalIndex from "../LiveStreamingCommentsPaidModalIndex";
import MobileUserListEarningModal from "../MobileUserListEarningModal";
import MobileUserCommentsModal from "../ModalUserCommentsModal";


const LiveStreamingPaidModal = (props) => {

    const [mobileUserListEarning, setMobileUserListEarning] = useState(false);

    const closeMobileUserListEarningModal = () => {
        setMobileUserListEarning(false);
    };

    const [mobileUserComments, setMobileUserComments] = useState(false);

    const closeMobileUserCommentsModal = () => {
        setMobileUserComments(false);
    };

    return (
        <>
            <div className="live-streaming-modal-sec">
                <div className="live-streaming-free-user-sec">
                    <div className="live-streaming-user-box">
                        <div className="live-streaming-user-card-left">
                            <div className="live-streaming-header-1-sec">
                                <div className="live-streaming-header-info">
                                    <div className="live-streaming-user-details">
                                        <h3>
                                            Product Promotion
                                        </h3>
                                    </div>
                                </div>
                                <div className="live-streaming-user-action-btn-sec">
                                    <ul className="list-unstyled">
                                        <Media as="li">
                                            <Link to="#" className="new-go-live-btn">
                                                Share
                                                <Image
                                                    className="new-go-live-btn-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/share-icon.svg"
                                                    }
                                                />
                                            </Link>
                                        </Media>
                                    </ul>
                                </div>
                            </div>
                            <div className="live-streaming-desc">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                            </div>
                            <div className="live-streaming-live-notify-sec">
                                <div className="live-streaming-count">
                                    <Button className="join-now-btn">
                                        Live
                                    </Button>
                                    <p>09.23</p>
                                </div>
                                <div className="live-streaming-started-info">
                                    <h5>
                                        Stream Started at <span>10.32 AM</span>
                                    </h5>
                                </div>
                                <div className="mobile-view-comment-sec">
                                    <Link to="#" onClick={() => setMobileUserListEarning(true)}>
                                        <div className="live-streaming-view-count">
                                            <Image
                                                className="live-streaming-view-count-icon"
                                                src={
                                                    window.location.origin + "/assets/images/live-streaming/view-count.svg"
                                                }
                                            />
                                            <p>(63)</p>
                                        </div>
                                    </Link>
                                    <Link to="#" onClick={() => setMobileUserComments(true)}>
                                        <div className="live-streaming-comments-mobile-display">
                                            <Button className="view-comments-btn">
                                                View Comments
                                            </Button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <LiveStreamingModalCard />
                        </div>
                        <LiveStreamingCommentsPaidModalIndex />
                    </div>
                </div>
            </div>
            <MobileUserListEarningModal
                mobileUserListEarning={mobileUserListEarning}
                closeMobileUserListEarningModal={closeMobileUserListEarningModal}
                setMobileUserListEarning={setMobileUserListEarning}
            />
            <MobileUserCommentsModal
                mobileUserComments={mobileUserComments}
                closeMobileUserCommentsModal={closeMobileUserCommentsModal}
                setMobileUserComments={setMobileUserComments}
            />
        </>
    );
};

export default LiveStreamingPaidModal;
