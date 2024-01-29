import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import "./NewChat.css";
import { Link, useHistory } from "react-router-dom";
import NewChatUploadModal from "./NewChatUploadModal";
import AltraChatAudioPlayer from "../CustomComponents/AudioPlayer/AltraChatAudioPlayer";
import SendChat from "./SendChat";
import ReceivedChat from "./ReceivedChat";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import FancyBox from "../NewHome/NewSingleView/FancyBox";
import {
  changeChatAudio,
  fetchChatMessagesStart,
  fetchMoreChatMessagesStart,
  updateChatMessagesSuccess,
} from "../../store/actions/ChatAction";
import InfiniteScroll from "react-infinite-scroll-component";
import configuration from "react-global-configuration";
import io from "socket.io-client";
import dayjs from "dayjs";
import PrivateAudioCallModal from "../helper/PrivateAudioCallModal";
import PrivateCallModal from "../helper/PrivateCallModal";
import { saveBlockUserStart } from "../../store/actions/UserAction";
import NewChatUserInfo from "./NewChatUserInfo";
import useWindowDimensions from "../helper/WindowHelper";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import { getSuccessNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

let chatSocket;

const NewChatRoom = (props) => {
  const history = useHistory();
  const { height, width } = useWindowDimensions();

  const userId = localStorage.getItem("userId");

  const chatSocketUrl = configuration.get("configData.chat_socket_url");
  const [skipRender, setSkipRender] = useState(true);
  const [requestVideoCall, setRequestVideoCall] = useState(false);
  const [requestAudioCall, setRequestAudioCall] = useState(false);
  const [newChatUpload, setNewChatUpload] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPointer, setCursorPointer] = useState(0);
  const [isChat, setIsChat] = useState(true);
  const [newMsg, setNewMsg] = useState(false);

  const messageField = useRef();
  const latest = useRef();

  let chatDate = "";
  let index = 0;

  useEffect(() => {
    if (width >= 992) {
      setIsChat(true);
    }
  }, [width]);

  useEffect(() => {
    if (newMsg) {
      const rect = latest.current.getBoundingClientRect();
      const container = document
        .getElementById("scrollableDiv")
        .getBoundingClientRect();
      if (rect.bottom > container.bottom + 10) {
        // showNewMsg(true);
        // const notificationMessage = getSuccessNotificationMessage("New Message Received");
        // props.dispatch(createNotification(notificationMessage));
      }
    }
    setNewMsg(false);
  }, [newMsg]);

  useEffect(() => {
    props.dispatch(
      fetchChatMessagesStart({
        from_user_id: userId,
        to_user_id: props.selectedUser.user_id,
      })
    );

    chatSocketConnect(props.selectedUser.user_id);

    if (chatSocket) {
      chatSocket.disconnect();
    }

    setIsChat(true);


    return () => {
      chatSocket.disconnect();
    };
  }, [props.selectedUser.user_id]);

  useEffect(() => {
    if (!skipRender) {
      messageField.current.selectionEnd = cursorPointer;
    }
  }, [cursorPointer]);

  const fetchMoreMessages = () => {
    props.dispatch(
      fetchMoreChatMessagesStart({
        skip: props.chatMessages.data.messages.length,
        take: 12,
        from_user_id: userId,
        to_user_id: props.selectedUser.user_id,
      })
    );
  };

  useEffect(() => {
    if (!skipRender && !props.chatMessages.loading) {
      if (!Object.keys(props.chatMessages.data).length > 0) {
        props.setShowContent(false);
      }
    }
    setSkipRender(false);
  }, [props.chatMessages]);

  const closeNewChatUploadModal = () => {
    setNewChatUpload(false);
  };

  const closePrivateCallModal = () => {
    setRequestVideoCall(false);
    setRequestAudioCall(false);
  };

  const handleBlockUser = () => {
    props.dispatch(saveBlockUserStart({ user_id: props.selectedUser.user_id }));
  };

  const chatSocketConnect = (to_user_id) => {
    // check the socket url is configured
    console.log("chatSocket", chatSocketUrl);
    console.log("Input ID", to_user_id);
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
          query: `commonid:'user_id_${userId}_to_user_id_${props.selectedUser.user_id}',myid:${userId}`

      });
      console.log("chatSocket", chatSocket);
      chatSocket.emit("update sender", {
        commonid: `user_id_${userId}_to_user_id_${props.selectedUser.user_id}`,
        myid: userId,
      });
      chatSocket.on("message", (newData) => {
        console.log(newData);
        setNewMsg(true);
        props.dispatch(updateChatMessagesSuccess(newData));
      });
    }
  };

  // Message Send verifiedp
  const handleMessageSubmit = ({
    msgAmount = 0,
    fileType = "text",
    chatAssets = [],
  }) => {
    if (chatSocket && (message && message.trim()) || chatAssets.length > 0) {
      const now = new Date();
      const date = `${("0" + now.getDate()).slice(-2)} ${now.toLocaleString(
        "default",
        { month: "short" }
      )} ${now.getFullYear()}`;
      const time = dayjs(now).format("hh:mm a");

      const chatData = {
        from_user_id: userId,
        to_user_id: props.selectedUser.user_id,
        message: message,
        amount: msgAmount,
        is_user_needs_pay: msgAmount > 0 ? 1 : 0,
        file_type: fileType,
        loggedin_user_id: userId,
        chat_asset_id: chatAssets
          .map((asset) => asset.chat_asset_id)
          .toString(),
        date_formatted: date,
        time_formatted: time,
        amount_formatted:
          msgAmount + " " + configuration.get("configData.token_symbol"),
      };
      chatSocket.emit("message", chatData);

      setMessage("");
      props.dispatch(
        updateChatMessagesSuccess({ ...chatData, chat_assets: chatAssets })
      );
      setNewChatUpload(false);
      setShowEmojis(false);
      messageField.current.focus();
      latest.current.scrollIntoView();
    }
  };

  const handleToggleEmojis = () => {
    messageField.current.focus();
    setShowEmojis(!showEmojis);
  };

  const onEmojiPick = (data) => {
    const ref = messageField.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + data.native + end;
    setMessage(text);
    setCursorPointer(start.length + data.native.length);
  };

  if (
    props.chatMessages.data.messages &&
    props.chatMessages.data.messages.length > 0
  ) {
    chatDate = props.chatMessages.data.messages[0].date_formatted;
    index = props.chatMessages.data.messages.length;
  }

  const updateChatDate = (newDate) => {
    chatDate = newDate;
    index--;
  };

  return (
    <>
      <div className="new-chat-room-header-sec">
        <div
          className="new-chat-room-user-details"
          onClick={(e) =>
            width < 992 ? setIsChat(!isChat) : e.preventDefault()
          }
        >
          <div
            className="back-btn-mobile-show"
            onClick={() => history.push("/inbox")}
          >
            <Image
              className="back-btn-mobile"
              src={
                window.location.origin + "/assets/images/new-chat/back-icon.svg"
              }
            />
          </div>
          <div className="new-chat-room-user-img-sec">
            <CustomLazyLoad
              src={props.selectedUser.picture}
              className={"new-chat-room-user-img"}
            />
          </div>
          <div className="new-chat-room-user-name">
            <h4>{props.selectedUser.name}</h4>
            {/* {props.chatMessages.loading ?
              <>
                {props.selectedUser.is_online_status == 1 ?
                  <p>{props.selectedUser.is_user_online == 1 ? "Online" : "Offline"}</p>
                  : ""}
              </>
              :  */}
            <>
              {props.chatMessages.data.user &&
              props.chatMessages.data.user.is_online_status == 1 ? (
                <p>
                  {props.chatMessages.data.user.is_user_online == 1
                    ? "Online"
                    : "Offline"}
                </p>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
        <div className="new-chat-room-user-action-btn-sec">
          <ul className="new-chat-room-user-action-btn-list list-unstyled">
            <Media as="li">
              <Link to="#" onClick={() => setRequestAudioCall(true)}>
                <Image
                  className="new-chat-room-user-action-icon"
                  src={
                    window.location.origin +
                    "/assets/images/new-chat/audio-call.svg"
                  }
                />
              </Link>
            </Media>
            <Media as="li">
              <Link to="#" onClick={() => setRequestVideoCall(true)}>
                <Image
                  className="new-chat-room-user-action-icon"
                  src={
                    window.location.origin +
                    "/assets/images/new-chat/video-call.svg"
                  }
                />
              </Link>
            </Media>
            <Media as="li">
              <Link to="#">
                <Dropdown className="new-chat-room-dropdown">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="new-chat-room-dropdown-btn"
                  >
                    <Image
                      className="three-dots-icon"
                      src={
                        window.location.origin +
                        "/assets/images/new-chat/three-dots.svg"
                      }
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      className="dropdown-item"
                      to={`/${props.selectedUser.user_unique_id}`}
                    >
                      {t("view_profile")}
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={() => handleBlockUser()}
                    >
                      {t("block_user")}
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Link>
            </Media>
          </ul>
        </div>
      </div>
      {isChat ? (
        <>
          {props.chatMessages.data.messages ? (
            <>
              <div
                className="new-chat-room-message-sec"
                id="scrollableDiv"
                style={{
                  minHeight: "calc(100vh - 220px)",
                  maxHeight: "calc(100vh - 215px)",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                  marginTop: "0em",
                }}
              >
                <InfiniteScroll
                  dataLength={props.chatMessages.data.messages.length}
                  next={fetchMoreMessages}
                  hasMore={
                    props.chatMessages.data.messages.length <
                    props.chatMessages.data.total
                  }
                  loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                  inverse={true}
                  style={{
                    padding: "2em",
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflow: "inherit",
                  }}
                  scrollableTarget="scrollableDiv"
                >
                  <div ref={latest} />
                  <FancyBox
                    delegate={"[data-fancybox-chat]"}
                    options={{ groupAll: true }}
                  >
                    {props.chatMessages.data.messages.map((message, i) => (
                      <>
                        {chatDate != message.date_formatted ? (
                          <div
                            className="chat-day-container"
                            style={{ zIndex: index }}
                          >
                            <div className="chat-day">
                              {chatDate}
                              {updateChatDate(message.date_formatted)}
                            </div>
                          </div>
                        ) : null}
                        {message.from_user_id == userId ? (
                          <SendChat message={message} key={i} />
                        ) : (
                          <ReceivedChat message={message} key={i} />
                        )}
                      </>
                    ))}
                    {chatDate ? (
                      <div
                        className="chat-day-container"
                        style={{ zIndex: index }}
                      >
                        <div className="chat-day">{chatDate}</div>
                      </div>
                    ) : null}
                  </FancyBox>
                </InfiniteScroll>
              </div>
              <div className="new-chat-room-input-sec">
                <Form
                  className="new-chat-room-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleMessageSubmit({});
                  }}
                >
                  <div
                    className={`emoji-container ${
                      showEmojis ? "show" : "hide"
                    }`}
                  >
                    <Picker
                      data={data}
                      onEmojiSelect={onEmojiPick}
                      onClickOutside={() => {
                        console.log("Outside triggered");
                        if (showEmojis) setShowEmojis(false);
                      }}
                    />
                  </div>
                  <InputGroup className="mb-0">
                    <InputGroup.Text onClick={() => handleToggleEmojis()}>
                      <Image
                        className="new-chat-emoji-icon"
                        src={
                          window.location.origin +
                          "/assets/images/feed-story/comments-emoji.svg"
                        }
                      />
                    </InputGroup.Text>
                    <Form.Control
                      ref={messageField}
                      placeholder={t("type_something")}
                      value={!newChatUpload ? message : ""}
                      onChange={(e) => setMessage(e.target.value)}
                      // onKeyPress={e => {
                      //   if (e.key === "Enter")
                      //     handleMessageSubmit({})
                      // }}
                      autoFocus={true}
                      on
                    />
                    <InputGroup.Text onClick={() => setNewChatUpload(true)}>
                      <Image
                        className="new-chat-file-icon"
                        src={
                          window.location.origin +
                          "/assets/images/new-chat/attach-file.png"
                        }
                      />
                    </InputGroup.Text>
                    <InputGroup.Text onClick={() => handleMessageSubmit({})}>
                      <Image
                        className="new-chat-send-icon"
                        src={
                          window.location.origin +
                          "/assets/images/feed-story/comments-send.svg"
                        }
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <NewChatUserInfo selectedUser={props.selectedUser} />
      )}
      {newChatUpload ? (
        <NewChatUploadModal
          newChatUpload={newChatUpload}
          selectedUser={props.selectedUser}
          message={message}
          setMessage={setMessage}
          handleMessageSubmit={handleMessageSubmit}
          closeNewChatUploadModal={closeNewChatUploadModal}
          setNewChatUpload={setNewChatUpload}
        />
      ) : null}
      {requestVideoCall ? (
        <PrivateCallModal
          requestVideoCall={requestVideoCall}
          closePrivateCallModal={closePrivateCallModal}
          username={props.selectedUser.username}
          userPicture={props.selectedUser.picture}
          videoAmount={props.selectedUser.video_call_amount_formatted}
          name={props.selectedUser.name}
          post_id={null}
          user_id={props.selectedUser.user_id}
        />
      ) : null}
      {requestAudioCall ? (
        <PrivateAudioCallModal
          requestAudioCall={requestAudioCall}
          closePrivateCallModal={closePrivateCallModal}
          username={props.selectedUser.username}
          userPicture={props.selectedUser.picture}
          AudioAmount={props.selectedUser.audio_call_amount_formatted}
          name={props.selectedUser.name}
          post_id={null}
          user_id={props.selectedUser.user_id}
        />
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  chatMessages: state.chat.chatMessages,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewChatRoom));
