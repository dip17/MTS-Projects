import React from "react";
import { Form, Button, Image, Modal, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewVideoAudioCallChatIndex from "./NewVideoAudioCallChatIndex";

const MobileVideoAudioChatModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center user-list-free-modal"
        size="md"
        centered
        show={props.mobileVideoAudioChat}
        onHide={props.closeMobileVideoAudioChatModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div classname="mobile-video-audio-chat-modal">
            <div className="video-call-chat-header-sec">
              <div className="video-call-user-info">
                <Image
                  className="video-call-user-img"
                  src={
                    window.location.origin + "/assets/images/video-call/user-img.png"
                  }
                />
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
                  <div className="video-user-follow-count">
                    <Image
                      className="user-follow-count"
                      src={
                        window.location.origin + "/assets/images/video-call/users.svg"
                      }
                    />
                    <span>200K</span>
                  </div>
                </div>
              </div>
              <div className="video-user-earned-sec">
                <h4>You Earned- <span className="text-primary">$ 55.00</span></h4>
              </div>
            </div>
            <NewVideoAudioCallChatIndex />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MobileVideoAudioChatModal;