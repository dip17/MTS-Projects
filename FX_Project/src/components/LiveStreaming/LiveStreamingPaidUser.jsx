import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Dropdown } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import LiveStreamingStore from "./LiveStreamingStore";
import LiveStreamingCard from "./LiveStreamingCard";
import LiveStreamingPost from "./LiveStreamingPost";
import LiveStreamingRecomendedForYou from "./LiveStreamingRecomendedForYou";
import LiveStreamingCommentsPaidIndex from "./LiveStreamingCommentsPaidIndex";
import MobileUserListPaidModal from "./MobileUserListPaidModal";
import MobileUserCommentsModal from "./ModalUserCommentsModal";

const LiveStreamingPaidUser = (props) => {

    const [mobileUserListPaid, setMobileUserListPaid] = useState(false);

    const closeMobileUserListPaidModal = () => {
      setMobileUserListPaid(false);
    };

    const [mobileUserComments, setMobileUserComments] = useState(false);

    const closeMobileUserCommentsModal = () => {
      setMobileUserComments(false);
    };

    return (
        <>
            <div className="live-streaming-free-user-sec">
                <div className="live-streaming-user-box">
                    <div className="live-streaming-user-card-left">
                        <div className="live-streaming-header-1-sec">
                            <div className="live-streaming-header-info">
                                <div className="live-streaming-user-img-sec">
                                    <Image
                                        className="live-streaming-user-img"
                                        src={
                                            window.location.origin + "/assets/images/live-streaming/user-img.png"
                                        }
                                    />
                                </div>
                                <div className="live-streaming-user-details">
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
                                    <h3>
                                        Product Promotion
                                    </h3>
                                </div>
                            </div>
                            <div className="live-streaming-user-action-btn-sec">
                                <ul className="list-unstyled">
                                    <Media as="li">
                                        <Link to="#" className="new-live-history-btn">
                                            Unfollow
                                        </Link>
                                    </Media>
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
                                    <Media as="li">
                                        <Dropdown className="live-streaming-dropdown">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <Image
                                                    className="live-streaming-dropdown-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/live-streaming/three-dots.svg"
                                                    }
                                                />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                                <Link to="#" onClick={() => setMobileUserListPaid(true)}>
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
                        <LiveStreamingCard/>
                        <LiveStreamingStore/>
                        <LiveStreamingPost/>
                        <LiveStreamingRecomendedForYou/>
                    </div>
                    <LiveStreamingCommentsPaidIndex/>
                </div>
            </div>
            <MobileUserListPaidModal
                mobileUserListPaid={mobileUserListPaid}
                closeMobileUserListPaidModal={closeMobileUserListPaidModal}
                setMobileUserListPaid={setMobileUserListPaid}
            />
            <MobileUserCommentsModal
                mobileUserComments={mobileUserComments}
                closeMobileUserCommentsModal={closeMobileUserCommentsModal}
                setMobileUserComments={setMobileUserComments}
            />
        </>
    );
};

export default LiveStreamingPaidUser;
