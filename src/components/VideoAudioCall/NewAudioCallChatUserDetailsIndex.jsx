import React, { useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./VideoAudioCall.css";
import { Link } from "react-router-dom";
import NewVideoAudioCallChatIndex from "./NewVideoAudioCallChatIndex";
import NewAudioCallChatUserDetails from "./NewAudioCallChatUserDetails";
import MobileVideoAudioChatModal from "./MobileVideoAudioChatModal";
import MobileAudioUserDetailsModal from "./MobileAudioUserDetailsModal";

const NewAudioCallChatUserDetailsIndex = (props) => {
  const [mobileVideoAudioChat, setMobileVideoAudioChat] = useState(false);

  const closeMobileVideoAudioChatModal = () => {
    setMobileVideoAudioChat(false);
  };

  const [mobileAudioUserDetails, setMobileAudioUserDetails] = useState(false);

  const closeMobileAudioUserDetailsModal = () => {
    setMobileAudioUserDetails(false);
  };

  return (
    <>
      <div className="audio-call-chat-sec">
        <div className="video-call-mobile-sec">
          <Link to="#" onClick={() => setMobileAudioUserDetails(true)}>
            <div className="live-streaming-comments-mobile-display">
              <Button className="view-comments-btn">User Details</Button>
            </div>
          </Link>
          <Link to="#" onClick={() => setMobileVideoAudioChat(true)}>
            <div className="live-streaming-comments-mobile-display">
              <Button className="view-comments-btn">View Chat</Button>
            </div>
          </Link>
        </div>
        <div className="audio-call-chat-box">
          <div className="audio-call-chat-left-sec">
            <div className="audio-call-box">
              <div className="audio-call-card-center">
                <div className="audio-call-card">
                  {/* <Image
                                        src={
                                            window.location.origin + "/assets/images/video-call/live-bg.png"
                                        }
                                        className="audio-call-bg-img"
                                    /> */}
                  <div className="audio-call-bg"></div>
                  <div className="audio-call-action-btn-sec">
                    <ul className="list-unstyled audio-call-action-btn">
                      <Media as="li">
                        <Link>
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/video-call/mic-off.svg"
                            }
                            alt="action-icons"
                            className="action-icon-img"
                          />
                        </Link>
                      </Media>
                      <Media as="li" className="call-animation">
                        <Link>
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/video-call/end-call.svg"
                            }
                            alt="action-icons"
                            className="action-icon-img"
                          />
                        </Link>
                      </Media>
                    </ul>
                  </div>
                  <div className="back-btn-sec">
                    <Link to="#">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/video-call/back-icon.svg"
                        }
                        alt="action-icons"
                        className="back-btn-img"
                      />
                    </Link>
                  </div>
                  <div className="audio-call-send-tip-sec">
                    <Image
                      className="audio-call-send-tip-icon"
                      src={
                        window.location.origin +
                        "/assets/images/live-streaming/send-tip.svg"
                      }
                    />
                    <Button className="send-tip-btn">Send Tips</Button>
                  </div>
                  <div className="audio-call-connected-box">
                    <div className="audio-call-connected-left-sec">
                      <Image
                        className="audio-call-user-img"
                        src={
                          window.location.origin +
                          "/assets/images/video-call/user-1.png"
                        }
                      />
                      <h4>John David</h4>
                    </div>
                    <div className="audio-call-connected-center-sec">
                      <div className="connected-status">
                        <p>Connected</p>
                      </div>
                      <div className="audio-call-connected-icon-sec">
                        <Image
                          className="audio-call-connected-icon"
                          src={
                            window.location.origin +
                            "/assets/images/video-call/connected-arrow.svg"
                          }
                        />
                      </div>
                      <div className="audio-call-amount-spend-details">
                        <h4>
                          You Spent -{" "}
                          <span className="text-primary">$56.00</span>
                        </h4>
                      </div>
                    </div>
                    <div className="audio-call-connected-right-sec">
                      <Image
                        className="audio-call-user-img"
                        src={
                          window.location.origin +
                          "/assets/images/video-call/user-2.png"
                        }
                      />
                      <h4>Robert Petricia</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="audio-call-chat-right-sec">
            <NewAudioCallChatUserDetails />
            <NewVideoAudioCallChatIndex />
          </div>
        </div>
      </div>
      <MobileAudioUserDetailsModal
        mobileAudioUserDetails={mobileAudioUserDetails}
        closeMobileAudioUserDetailsModal={closeMobileAudioUserDetailsModal}
        setMobileAudioUserDetails={setMobileAudioUserDetails}
      />
      <MobileVideoAudioChatModal
        mobileVideoAudioChat={mobileVideoAudioChat}
        closeMobileVideoAudioChatModal={closeMobileVideoAudioChatModal}
        setMobileVideoAudioChat={setMobileVideoAudioChat}
      />
    </>
  );
};

export default NewAudioCallChatUserDetailsIndex;
