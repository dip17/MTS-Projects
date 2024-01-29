import React from "react";
import {InputGroup, FormControl, Image, Modal, Media} from "react-bootstrap";
import { Link } from "react-router-dom";

const MobileUserCommentsModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center user-comments-free-modal"
        size="md"
        centered
        show={props.mobileUserComments}
        onHide={props.closeMobileUserCommentsModal}
      >
          <Modal.Header closeButton>
            <Modal.Title>User Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <div className="live-streaming-user-comments-box" style={{
                  maxHeight: 'calc(100vh - 260px)',
                  overflowY: 'auto',
                  overflowX:"hidden",
                  paddingRight: '1em',
                //   marginTop: '1em'
                }}>
                    <div className="live-streaming-user-comments-card">
                        <div className="live-streaming-user-comments-img-sec">
                            <Image
                                className="live-streaming-user-comments-img"
                                src={
                                    window.location.origin + "/assets/images/live-streaming/comments-user-1.png"
                                }
                            />
                        </div>
                        <div className="live-streaming-user-comments-info">
                            <h5>Isabella Olivia</h5>
                            <p>You Are Looking So Beautiful</p>
                        </div>
                    </div>
                    <div className="live-streaming-user-comments-card">
                        <div className="live-streaming-user-comments-img-sec">
                            <Image
                                className="live-streaming-user-comments-img"
                                src={
                                    window.location.origin + "/assets/images/live-streaming/comments-user-2.png"
                                }
                            />
                        </div>
                        <div className="live-streaming-user-comments-info">
                            <h5>Isabella Olivia</h5>
                            <p>You Are Looking So Beautiful....Stunnig o</p>
                        </div>
                    </div>
                    <div className="live-streaming-user-comments-card">
                        <div className="live-streaming-user-comments-img-sec">
                            <Image
                                className="live-streaming-user-comments-img"
                                src={
                                    window.location.origin + "/assets/images/live-streaming/comments-user-3.png"
                                }
                            />
                        </div>
                        <div className="live-streaming-user-comments-info">
                            <h5>Isabella Olivia</h5>
                            <p>Awesome</p>
                        </div>
                    </div>
                     <div className="live-streaming-user-comments-card">
                        <div className="live-streaming-user-comments-img-sec">
                            <Image
                                className="live-streaming-user-comments-img"
                                src={
                                    window.location.origin + "/assets/images/live-streaming/comments-user-4.png"
                                }
                            />
                        </div>
                        <div className="live-streaming-user-comments-info">
                            <h5>Isabella Olivia</h5>
                            <p>You Are Looking So Beautiful....Stunnig o</p>
                        </div>
                    </div>
                </div>
                <div className="live-streaming-user-add-comments-sec">
                    <InputGroup className="mb-0">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                            <Image
                                className="live-streaming-user-add-comments-icon"
                                src={
                                    window.location.origin + "/assets/images/live-streaming/ad-comments-icon.svg"
                                }
                            />
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Type Your Comment Here"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
          </Modal.Body>
      </Modal>
    </>
  );
};

export default MobileUserCommentsModal;