import React, { useEffect, useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import "./NewChat.css";
import { Link, useHistory } from "react-router-dom";
import NewChatList from "./NewChatList";
import NewChatRoom from "./NewChatRoom";
import NewChatUserInfo from "./NewChatUserInfo";
import { connect } from "react-redux";
import { changeChatAudio, chatUser } from "../../store/actions/ChatAction";
import useWindowDimensions from "../helper/WindowHelper";
import { translate, t } from "react-multi-lang";

const NewChatIndex = (props) => {
  const history = useHistory();

  const [showContent, setShowContent] = useState(true);
  const [skipRender, setSkipRender] = useState(true);
  const [selectedUser, setSelectedUser] = useState();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (props.chatUser) {
      props.dispatch(changeChatAudio({ src: "" }));
      setTimeout(() => {
        setSelectedUser(props.chatUser);
        if (!skipRender && width < 768) {
          history.push("/chat-room");
        }
      }, 100);
    }
    setSkipRender(false);
  }, [props.chatUser]);

  // useEffect(() => {
  //   if (selectedUser) {
  //     props.dispatch(chatUser(selectedUser));
  //   }
  // }, [selectedUser]);

  return (
    <>
      <div className="new-chat-sec">
        {showContent
          ? <div className="new-chat-box">
            <NewChatList
              setShowContent={setShowContent}
              setSelectedUser={setSelectedUser}
            />
            {selectedUser ?
              <>
                <div className="new-chat-room-sec mobile-hide">
                  <NewChatRoom selectedUser={selectedUser} setShowContent={setShowContent} />
                </div>
                <div className="new-chat-user-info">
                  <NewChatUserInfo selectedUser={selectedUser} />
                </div>
              </>
              : <div className="new-chat-room-sec start-conversation-container mobile-hide">
                <Image
                  className="start-conversation"
                  src={window.location.origin + "/assets/images/new-chat/start-new-conversation.png"}
                />
              </div>
            }
          </div>
          : <div className="chat-something-went-wrong">
            <Image
              src={window.location.origin + "/assets/images/new-chat/something-went-wrong.png"}
            />
            <button
              className="btn gradient-btn gradientcolor btn btn-primary retry-btn"
              onClick={() => {
                setSelectedUser(null);
                setShowContent(true)
              }}
            >{t("retry")}</button>
            <Link to="/home">{("home")}</Link>
          </div>
        }
      </div>
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
)(translate(NewChatIndex));
