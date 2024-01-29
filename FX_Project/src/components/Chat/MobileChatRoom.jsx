import React, { useEffect, useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Dropdown, InputGroup } from "react-bootstrap";
import "./NewChat.css";
import { Link } from "react-router-dom";
import FancyBox from "../NewHome/NewSingleView/FancyBox";
import NewChatUploadModal from "./NewChatUploadModal";
import NewChatUserInfo from "./NewChatUserInfo";
import NewChatRoom from "./NewChatRoom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";


const MobileChatRoom = (props) => {

  const [showContent, setShowContent] = useState(true);

  return (
    // <>
    //     <div className="new-chat-room-sec webiste-hide">
    //         <div className="new-chat-room-header-sec">
    //             <div className="new-chat-room-user-details">
    //                 <div className="new-chat-room-user-img-sec"onClick={() => setIsVisible(!isVisible)}>
    //                     <Image
    //                         className="new-chat-room-user-img"
    //                         src={
    //                             window.location.origin +
    //                             "/assets/images/new-chat/user-1.png"
    //                         }
    //                     />
    //                 </div>
    //                 <div className="new-chat-room-user-name">
    //                     <h4>Anna Bella</h4>
    //                     <p>Online</p>
    //                 </div>
    //             </div>
    //             <div className="new-chat-room-user-action-btn-sec">
    //                 <ul className="new-chat-room-user-action-btn-list list-unstyled">
    //                     <Media as="li">
    //                         <Link to="#">
    //                             <Image
    //                                 className="new-chat-room-user-action-icon"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/audio-call.svg"
    //                                 }
    //                             />
    //                         </Link>
    //                     </Media>
    //                     <Media as="li">
    //                         <Link to="#">
    //                             <Image
    //                                 className="new-chat-room-user-action-icon"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/video-call.svg"
    //                                 }
    //                             />
    //                         </Link>
    //                     </Media>
    //                     <Media as="li">
    //                         <Link to="#">
    //                             <Dropdown className="new-chat-room-dropdown">
    //                                 <Dropdown.Toggle variant="success" id="dropdown-basic" className="new-chat-room-dropdown-btn">
    //                                     <Image
    //                                         className="three-dots-icon"
    //                                         src={
    //                                             window.location.origin + "/assets/images/new-chat/three-dots.svg"
    //                                         }
    //                                     />
    //                                 </Dropdown.Toggle>

    //                                 <Dropdown.Menu>
    //                                     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //                                     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //                                     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //                                 </Dropdown.Menu>
    //                             </Dropdown>
    //                         </Link>
    //                     </Media>
    //                 </ul>
    //             </div>
    //         </div>
    //         <div className="new-chat-room-message-sec" style={{
    //             maxHeight: 'calc(100vh - 235px)',
    //             overflowY: 'auto',
    //             padding: '2em',
    //             marginTop: '0em'
    //         }}>
    //             <FancyBox>
    //                 <div className="new-chat-room-right-sec">
    //                     <div className="new-chat-room-right-msg-card">
    //                         <h6>How’s the Design ?</h6>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <h6>Yeah We need to discuss about it in the meantime</h6>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <h6>Yeah We need to discuss about it in the meantime</h6>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-right-sec">
    //                     <div className="new-chat-room-right-msg-card">
    //                         <h6>How’s the Design ?</h6>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-double-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <h6>Yeah We need to discuss about it in the meantime</h6>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <h6>Yeah We need to discuss about it in the meantime</h6>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-right-sec">
    //                     <div className="new-chat-room-right-msg-card">
    //                         <div className="uploaded-chat-room-single-img-card">
    //                             <Image
    //                                 className="uploaded-chat-room-single-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <div className="uploaded-chat-room-single-img-card">
    //                             <Image
    //                                 className="uploaded-chat-room-single-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-right-sec">
    //                     <div className="new-chat-room-right-msg-card">
    //                         <div className="uploaded-chat-room-single-video-card">
    //                             <Image
    //                                 className="uploaded-chat-room-single-video"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                             <div className="uploaded-chat-room-video-icon-sec">
    //                                 <Image 
    //                                     src={ window.location.origin + "/assets/images/new-home/icon/video-icon.png" } 
    //                                     className="uploaded-chat-room-video-icon"
    //                                 />
    //                             </div>
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <div className="uploaded-chat-room-single-video-card">
    //                             <Image
    //                                 className="uploaded-chat-room-single-video"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                             <div className="uploaded-chat-room-video-icon-sec">
    //                                 <Image 
    //                                     src={ window.location.origin + "/assets/images/new-home/icon/video-icon.png" } 
    //                                     className="uploaded-chat-room-video-icon"
    //                                 />
    //                             </div>
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-right-sec">
    //                     <div className="new-chat-room-right-msg-card">
    //                         <div className="uploaded-chat-room-multiple-img-card">
    //                             <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                             <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                              <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                              <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                     <div className="uploaded-chat-room-multiple-img-card">
    //                             <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                             <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                              <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                              <Image
    //                                 className="uploaded-chat-room-multiple-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/upload-msg-img.png"
    //                                 }
    //                                 data-fancybox
    //                             />
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-right-sec">
    //                     <div className="new-chat-room-right-msg-card">
    //                         <div className="uploaded-chat-room-audio-card">
    //                             <Image
    //                                 className="uploaded-chat-room-audio-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/audio-preview.png"
    //                                 }
    //                             />
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="new-chat-room-left-sec">
    //                     <div className="new-chat-room-left-msg-card">
    //                         <div className="uploaded-chat-room-audio-card">
    //                             <Image
    //                                 className="uploaded-chat-room-audio-img"
    //                                 src={
    //                                 window.location.origin +
    //                                 "/assets/images/new-chat/audio-preview.png"
    //                                 }
    //                             />
    //                         </div>
    //                         <div className="new-chat-room-time-tick-card">
    //                             <Image
    //                                 className="new-chat-room-time-tick"
    //                                 src={
    //                                     window.location.origin + "/assets/images/new-chat/msg-marked-tick.svg"
    //                                 }
    //                             />
    //                             <p>11:55 PM</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </FancyBox>
    //         </div>
    //         <div className="new-chat-room-input-sec">
    //             <Form className="new-chat-room-form">
    //                 <InputGroup className="mb-0">
    //                     <InputGroup.Text>
    //                         <Image
    //                             className="new-feed-wishlist-icon"
    //                             src={
    //                                 window.location.origin + "/assets/images/feed-story/comments-emoji.svg"
    //                             }
    //                         />
    //                     </InputGroup.Text>
    //                     <Form.Control aria-label="Amount (to the nearest dollar)" placeholder="Type something" />
    //                     <InputGroup.Text onClick={() => setNewChatUpload(true)}>
    //                         <Image
    //                             className="new-feed-wishlist-icon"
    //                             src={
    //                                 window.location.origin + "/assets/images/new-chat/attach-file.png"
    //                             }
    //                         />
    //                     </InputGroup.Text>
    //                     <InputGroup.Text>
    //                         <Image
    //                             className="new-feed-wishlist-icon"
    //                             src={
    //                                 window.location.origin + "/assets/images/feed-story/comments-send.svg"
    //                             }
    //                         />
    //                     </InputGroup.Text>
    //                 </InputGroup>
    //             </Form>
    //         </div>
    //     </div>
    //     {isVisible && (
    //     <div className="mobile-new-chat-info">
    //         <div className="close-icon-mobile">
    //             <Button className="icon-close-img" 
    //             onClick={() => setIsVisible(false)}>
    //                 <Image
    //                     className="close-icon"
    //                     src={
    //                         window.location.origin + "/assets/images/new-chat/modal-close.svg"
    //                     }
    //                 />
    //             </Button>
    //         </div>
    //         <NewChatUserInfo/>
    //     </div>
    //     )}
    //     <NewChatUploadModal
    //         newChatUpload={newChatUpload}
    //         closeNewChatUploadModal={closeNewChatUploadModal}
    //         setNewChatUpload={setNewChatUpload}
    //     />
    // </>
    <>
      {props.chatUser ?
        showContent ?
          <>
            <div className="new-chat-room-sec webiste-hide">
              <NewChatRoom selectedUser={props.chatUser} setShowContent={setShowContent} />
            </div>
          </>
          : <div className="d-flex justify-content-center">
            <Image
              className="start-conversation"
              src={window.location.origin + "/assets/images/new-chat/something-went-wrong.png"}
            />
          </div>
        : <div className="mobile-new-conversation-sec">
          <Image
            className="start-conversation"
            src={window.location.origin + "/assets/images/new-chat/start-new-conversation.png"}
          />
          <Link to="inbox">{t("chat")}</Link>
        </div>
      }
    </>
  );
};

const mapStateToPros = (state) => ({
  chatUser: state.chat.chatUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(MobileChatRoom));
