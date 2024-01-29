import React from "react";
import {Form, Button, Image, Modal, Media} from "react-bootstrap";
import { Link } from "react-router-dom";

const MobileUserListEarningModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center user-list-free-modal"
        size="md"
        centered
        show={props.mobileUserListEarning}
        onHide={props.closeMobileUserListEarningModal}
      >
          <Modal.Header closeButton>
            <Modal.Title>User List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="live-streaming-user-list-header-sec">
                    <h4>Audience <span>23</span></h4>
                    <h4>Earnings - <span className="text-primary">$ 5,556</span></h4>
                </div>
                <div className="live-streaming-user-list-box" style={{
                  maxHeight: 'calc(100vh - 345px)',
                  overflowY: 'auto',
                  paddingRight: '1em',
                //   marginTop: '1em'
                }}>
                    <ul className="live-streaming-user-list-card-1 list-unstyled">
                        <Media as="li">
                            <Link to="#">
                                <div className="live-streaming-user-list-item">
                                    <Image
                                        className="live-streaming-user-list-img"
                                        src={
                                            window.location.origin + "/assets/images/live-streaming/user-list-1.png"
                                        }
                                    />
                                    <p>Isabella Olivia</p>
                                </div>
                                <p className="live-streaming-user-list-earning">
                                    +30 $
                                </p>
                            </Link>
                        </Media>
                        <Media as="li">
                            <Link to="#">
                                <div className="live-streaming-user-list-item">
                                    <Image
                                        className="live-streaming-user-list-img"
                                        src={
                                            window.location.origin + "/assets/images/live-streaming/user-list-2.png"
                                        }
                                    />
                                    <p>Isabella Olivia</p>
                                </div>
                                <p className="live-streaming-user-list-earning">
                                    +30 $
                                </p>
                            </Link>
                        </Media>
                        <Media as="li">
                            <Link to="#">
                                <div className="live-streaming-user-list-item">
                                    <Image
                                        className="live-streaming-user-list-img"
                                        src={
                                            window.location.origin + "/assets/images/live-streaming/user-list-3.png"
                                        }
                                    />
                                    <p>Isabella Olivia</p>
                                </div>
                                <p className="live-streaming-user-list-earning">
                                    +30 $
                                </p>
                            </Link>
                        </Media>
                        <Media as="li">
                            <Link to="#">
                                <div className="live-streaming-user-list-item">
                                    <Image
                                        className="live-streaming-user-list-img"
                                        src={
                                            window.location.origin + "/assets/images/live-streaming/user-list-4.png"
                                        }
                                    />
                                    <p>Isabella Olivia</p>
                                </div>
                                <p className="live-streaming-user-list-earning">
                                    +30 $
                                </p>
                            </Link>
                        </Media>
                    </ul>
                </div>
          </Modal.Body>
      </Modal>
    </>
  );
};

export default MobileUserListEarningModal;