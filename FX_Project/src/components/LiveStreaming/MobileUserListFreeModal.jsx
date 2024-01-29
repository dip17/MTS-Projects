import React from "react";
import {Form, Button, Image, Modal, Media} from "react-bootstrap";
import { Link } from "react-router-dom";

const MobileUserListFreeModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center user-list-free-modal"
        size="md"
        centered
        show={props.mobileUserListFree}
        onHide={props.closeMobileUserListFreeModal}
      >
          <Modal.Header closeButton>
            <Modal.Title>User List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="live-streaming-user-list-header-sec">
                <h4>Audience <span>23</span></h4>
                <h4 className="text-primary">Free Live</h4>
            </div>
            <div className="live-streaming-user-list-box" style={{
                  maxHeight: 'calc(100vh - 345px)',
                  overflowY: 'auto',
                  paddingRight: '1em',
                //   marginTop: '1em'
                }}>
                    <ul className="live-streaming-user-list-card list-unstyled">
                        <Media as="li">
                            <Link to="#">
                                <Image
                                    className="live-streaming-user-list-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-list-1.png"
                                    }
                                />
                                <p>Isabella Olivia</p>
                            </Link>
                        </Media>
                        <Media as="li">
                            <Link to="#">
                                <Image
                                    className="live-streaming-user-list-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-list-2.png"
                                    }
                                />
                                <p>Isabella Olivia</p>
                            </Link>
                        </Media>
                        <Media as="li">
                            <Link to="#">
                                <Image
                                    className="live-streaming-user-list-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-list-3.png"
                                    }
                                />
                                <p>Isabella Olivia</p>
                            </Link>
                        </Media>
                        <Media as="li">
                            <Link to="#">
                                <Image
                                    className="live-streaming-user-list-img"
                                    src={
                                        window.location.origin + "/assets/images/live-streaming/user-list-4.png"
                                    }
                                />
                                <p>Isabella Olivia</p>
                            </Link>
                        </Media>
                    </ul>
                </div>
          </Modal.Body>
      </Modal>
    </>
  );
};

export default MobileUserListFreeModal;