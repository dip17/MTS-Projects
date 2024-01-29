import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Image,
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
  Overlay,
  Tooltip,
  Dropdown,
  Media,
} from "react-bootstrap";
import "./UserChat.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addMessageContent,
  fetchChatMessageStart,
  fetchChatUsersStart,
} from "../../store/actions/ChatAction";
import { saveBlockUserStart } from "../../store/actions/UserAction";
import ChatUserList from "./ChatUserList";
import InboxNoDataFound from "../NoDataFound/InboxNoDataFound";
import io from "socket.io-client";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";

import InboxLoader from "../Loader/InboxLoader";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import ChatAssetModal from "../helper/ChatAssetModal";
import ReactPlayer from "react-player/lazy";
import AssetPaymentModal from "../helper/AssetPaymentModal";
import { Picker, EmojiData } from "emoji-mart3";
import "emoji-mart3/css/emoji-mart.css";
import ReactAudioPlayer from "react-audio-player";
import { isMobile } from "react-device-detect";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import ChatAssetPaymentModal from "../Model/PaymentModal/ChatAssetPaymentModal";

const $ = window.$;

let chatSocket;

const UserChatIndex = (props) => {
  const [activeChat, setActiveChat] = useState(0);
  const [toUserId, setToUserId] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const [initialHeight, setInitialHeight] = useState(0);

  const messageRef = useRef();

  const [chatAssetUpload, setChatAssetUpload] = useState(false);
  const [fileType, setFileType] = useState("picture");
  const [chatPayment, setPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    chat_message_id: 0,
    from_user_id: localStorage.getItem("userId"),
    to_user_id: toUserId,
    amount_formatted: 0,
    amount: 0,
  });

  const closeChatAssetUploadModal = () => {
    setChatAssetUpload(false);
  };

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const invalidMessageRef = useRef(null);

  const [emptyMessageCheck, setEmptyMessageCheck] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    props.dispatch(fetchChatUsersStart({ search_key: searchKey }));
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl === "") {
      // const notificationMessage = getErrorNotificationMessage(
      //   "Socket URL is not configured. Chat wil not work..."
      // );
      // props.dispatch(createNotification(notificationMessage));
      // window.location.assign("/home");
    }
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  useEffect(() => {
    console.log("Number of times called");
    if (
      props.chatUsers.loading === false &&
      props.chatUsers.data.users.length > 0
    ) {
      console.log("Number of times called true  ");
      setToUserId(props.chatUsers.data.users[0].to_user_id);
      chatSocketConnect(props.chatUsers.data.users[0].to_user_id);
    } else {
    }
  }, [!props.chatUsers.loading]);

  // Scroll down function..
  useEffect(() => {
    console.log("Scroll down..");
    const objDiv = document.getElementById("options-holder");
    if (objDiv != null) {
      let differenceNumber =
        objDiv.offsetHeight > objDiv.scrollHeight
          ? objDiv.offsetHeight - objDiv.scrollHeight
          : objDiv.scrollHeight - objDiv.offsetHeight;

      if (differenceNumber > 280) {
        objDiv.scrollTop = objDiv.scrollHeight;
      } else {
        objDiv.scrollTop = initialHeight;
        setInitialHeight(initialHeight + 20);
      }
    }
  }, [props.chatMessages.data.messages]);

  const chatSocketConnect = (to_user_id) => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    console.log("chatSocket", chatSocketUrl);
    console.log("Input ID", to_user_id);
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          localStorage.getItem("userId") +
          `_to_user_id_` +
          to_user_id +
          `',myid:` +
          localStorage.getItem("userId"),
      });
      console.log("chatSocket", chatSocket);
      chatSocket.emit("update sender", {
        commonid:
          "user_id_" +
          localStorage.getItem("userId") +
          "_to_user_id_" +
          to_user_id,
        myid: localStorage.getItem("userId"),
      });
      let chatContent;
      chatSocket.on("message", (newData) => {
        let content = [];
        content.push(newData);
        // chatContent = [...this.state.chatData, ...content];
        // this.setState({ chatData: chatContent });
        console.log(content);
        props.dispatch(addMessageContent(content));
      });
    }
  };

  const changeUser = (event, chat, index) => {
    chatSocket.disconnect();
    if (isMobile) {
      window.location.assign(
        "/user-chat-room/" + chat.from_user_id + "/" + chat.to_user_id
      );
    }
    event.preventDefault();
    setActiveChat(index);
    let to_user_id =
      chat.to_user_id == localStorage.getItem("userId")
        ? chat.from_user_id
        : chat.to_user_id;
    setToUserId(to_user_id);

    props.dispatch(
      fetchChatMessageStart({
        to_user_id: chat.to_user_id,
        from_user_id: chat.from_user_id,
      })
    );
    chatSocketConnect(to_user_id);
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    let chatSocketUrl = configuration.get("configData.chat_socket_url");

    if (inputMessage.length == 0) {
      setEmptyMessageCheck(true);
    }

    if (chatSocketUrl != undefined && inputMessage) {
      let chatData = [
        {
          from_user_id: localStorage.getItem("userId"),
          to_user_id: toUserId,
          message: inputMessage,
          type: "uu",
          user_picture: localStorage.getItem("user_picture"),
          loggedin_user_id: localStorage.getItem("userId"),
          created: Date(),
          from_username: localStorage.getItem("username"),
          from_displayname: localStorage.getItem("name"),
          from_userpicture: localStorage.getItem("user_picture"),
          from_user_unique_id: "",
          to_username: "",
          to_displayname: "",
          to_userpicture: "",
          to_user_unique_id: "",
        },
      ];
      chatSocket.emit("message", chatData[0]);
      let messages;
      if (props.chatMessages.data.messages != null) {
        messages = [...props.chatMessages.data.messages, ...chatData];
      } else {
        messages = [...chatData];
      }

      setInputMessage("");
      props.dispatch(addMessageContent(chatData));
    }
  };

  useEffect(() => {
    props.assetUpload.loading || handleMediaSubmit();
  }, [props.assetUpload.loading]);

  const handleMediaSubmit = () => {
    const assetData = props.assetUpload.data.chat_asset;
    const assetMessage = props.assetUpload.data.chat_message;
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl != undefined && assetData && assetMessage) {
      let chatData = [
        {
          from_user_id: localStorage.getItem("userId"),
          to_user_id: toUserId,
          chat_message_id: assetMessage ? assetMessage.chat_message_id : "",
          message: assetMessage ? assetMessage.message : "",
          type: "uu",
          user_picture: localStorage.getItem("user_picture"),
          loggedin_user_id: localStorage.getItem("userId"),
          created: Date(),
          from_username: localStorage.getItem("username"),
          from_displayname: localStorage.getItem("name"),
          from_userpicture: localStorage.getItem("user_picture"),
          from_user_unique_id: "",
          to_username: "",
          to_displayname: "",
          to_userpicture: "",
          to_user_unique_id: "",
          chat_asset_id: assetData ? assetData.chat_asset_id : "",
          chat_asset_url:
            assetMessage.amount > 0 ? assetData.blur_file : assetData.file,
          file_type: assetData.file_type,
          is_user_needs_pay: assetMessage.amount > 0 ? 1 : 0,
          amount: assetMessage.amount > 0 ? assetMessage.amount : 0,
          amount_formatted:
            assetMessage.amount > 0 ? assetMessage.amount_formatted : 0,
          payment_text:
            assetMessage.amount > 0
              ? "UNLOCK MESSAGE FOR " + assetMessage.amount_formatted
              : "",
        },
      ];

      let chatMessageData = [
        {
          from_user_id: localStorage.getItem("userId"),
          to_user_id: toUserId,
          chat_message_id: assetMessage ? assetMessage.chat_message_id : "",
          message: assetMessage ? assetMessage.message : "",
          type: "uu",
          user_picture: localStorage.getItem("user_picture"),
          loggedin_user_id: localStorage.getItem("userId"),
          created: Date(),
          from_username: localStorage.getItem("username"),
          from_displayname: localStorage.getItem("name"),
          from_userpicture: localStorage.getItem("user_picture"),
          from_user_unique_id: "",
          to_username: "",
          to_displayname: "",
          to_userpicture: "",
          to_user_unique_id: "",
          chat_asset_id: assetData ? assetData.chat_asset_id : "",
          chat_asset_url: assetData.file,
          file_type: assetData.file_type,
          amount: assetMessage.amount > 0 ? assetMessage.amount : 0,
          amount_formatted:
            assetMessage.amount > 0 ? assetMessage.amount_formatted : 0,
          is_user_needs_pay: 0,
          payment_text: "",
        },
      ];
      chatSocket.emit("message", chatData[0]);
      let messages;
      if (props.chatMessages.data.messages != null) {
        messages = [...props.chatMessages.data.messages, ...chatMessageData];
      } else {
        messages = [...chatMessageData];
      }
      if (assetData) {
        closeChatAssetUploadModal();
      }
      setInputMessage("");
      props.dispatch(addMessageContent(chatMessageData));
    }
  };

  const chatInputChange = (value) => {
    setInputMessage(value);
    if (inputMessage.length > 0) {
      setEmptyMessageCheck(false);
    }
  };

  const handleAssetUploadModal = (fileType) => {
    setChatAssetUpload(true);
    setFileType(fileType);
  };

  const handleAssetPayment = (
    event,
    chat_message_id,
    amount,
    amount_formatted
  ) => {
    event.preventDefault();
    setPaymentData({
      ...paymentData,
      chat_message_id: chat_message_id,
      amount: amount,
      amount_formatted: amount_formatted,
    });
    setPaymentModal(true);
  };
  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    setInputMessage(inputMessage + emoji.native);
  };

  const handleBlockUser = (event, status, user_id) => {
    event.preventDefault();
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const searchUser = (value) => {
    setSearchKey(value);
    props.dispatch(fetchChatUsersStart({ search_key: value }));
  };

  return (
    <>
      <div className="user-chat-sec">
        <Container>
          <Row>
            <Col sm="12" md="12">
              <div className="user-chat-box">
                <div className="user-chat-list-sec">
                  <div className="user-chat-list-header">
                    <Link to={`/home`}>
                      <div className="back-icon">
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </Link>
                    <h3>{t("chat")}</h3>
                  </div>
                  <div className="chat-list-search-sec">
                    <InputGroup>
                      <FormControl
                        placeholder={t("search_by_username")}
                        aria-label={t("search_by_username")}
                        aria-describedby="basic-addon2"
                        onChange={(event) => searchUser(event.target.value)}
                        value={searchKey}
                      />
                      <InputGroup.Text id="basic-addon2">
                        <i className="fas fa-search"></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="chat-list-collapse-body">
                    {props.chatUsers.loading ? null : props.chatUsers.data &&
                      props.chatUsers.data.users.length > 0 ? (
                      <ChatUserList
                        chatUsers={props.chatUsers.data}
                        activeChat={activeChat}
                        setActiveChat={setActiveChat}
                        changeUser={changeUser}
                      />
                    ) : (
                      <div className="user-list-card active">
                        <div className="user-list-body">
                          <div className="user-list-info">
                            <h6>{t("no_user_found")}</h6>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {props.chatUsers.loading || props.chatMessages.loading ? (
                  ""
                ) : props.chatMessages.data.user &&
                  props.chatMessages.data.user.user_unique_id ? (
                  <div className="user-chat-room-sec mobile-display-none">
                    <div className="user-chat-room-header">
                      <Link
                        to={`/` + props.chatMessages.data.user.user_unique_id}
                        className="user-chat-msg"
                      >
                        <h3>
                          {props.chatMessages.data.user.name}{" "}
                          {props.chatMessages.data.user.is_verified_badge ==
                            1 ? (
                            <VerifiedBadgeNoShadow />
                          ) : null}
                          {props.chatMessages.data.user.is_online_status ==
                            1 ? (
                            <span className="text-success f-12">
                              {" "}
                              ({t("online")})
                            </span>
                          ) : (
                            ""
                          )}
                        </h3>
                        <Link to="#" className="link-user-name">
                          @{props.chatMessages.data.user.name}{" "}
                        </Link>
                      </Link>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="btn btn-default dropdown-toggle"
                          type="button"
                          id="dropdown-basic"
                        >
                          {/* <Image
                            src={
                              window.location.origin +
                              "/assets/images/icons/vertical-dots.svg"
                            }
                            className="svg-clone vertical-dots"
                          /> */}
                          <i className="fas fa-ellipsis-v svg-clone vertical-dots h-dots"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right r-dropdown-menu">
                          <Media as="li">
                            <Link
                              to={
                                `/` +
                                props.chatMessages.data.user.user_unique_id
                              }
                              className="dropdown-a"
                            >
                              {t("view_profile")}
                            </Link>
                          </Media>
                          <Media as="li" className="divider"></Media>
                          {props.chatMessages.data.is_block_user == 1 && (
                            <Media as="li">
                              <Link
                                to="#"
                                className="dropdown-a"
                                onClick={(event) =>
                                  handleBlockUser(
                                    event,
                                    "unblocked",
                                    props.chatMessages.data.user.user_id
                                  )
                                }
                              >
                                {t("unblock")}
                              </Link>
                            </Media>
                          )}
                          <></>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div
                      className="user-chat-main-wrapper-body"
                      id="options-holder" // Don't remove this id. Get confirmation from vithya
                    >
                      <div
                        className="user-message-content-sec"
                        ref={messageRef}
                      >
                        {props.chatMessages.data.messages.length > 0
                          ? props.chatMessages.data.messages.map(
                            (chatMessage, index) => (
                              <>
                                {chatMessage.from_user_id ==
                                  localStorage.getItem("userId") ? (
                                  <div className="user-message-right-align">
                                    <div className="user-message-user-img-sec">
                                      <Image
                                        src={localStorage.getItem(
                                          "user_picture"
                                        )}
                                        alt=""
                                        className="user-message-img"
                                      />
                                    </div>
                                    <div className="user-message-info">
                                      {chatMessage.chat_asset_url &&
                                        chatMessage.file_type == "video" ? (
                                        <ReactPlayer
                                          url={chatMessage.chat_asset_url}
                                          controls={true}
                                          className="post-video-size chat-video"
                                          width="450px"
                                          height="450px"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      {chatMessage.chat_asset_url &&
                                        chatMessage.file_type == "audio" ? (
                                        <ReactAudioPlayer
                                          src={chatMessage.chat_asset_url}
                                          controls={true}
                                          width="450px"
                                          height="450px"
                                          className="chat-room-audio-display"
                                          autoPlay={false}
                                          controlsList={"nodownload"}
                                        />
                                      ) : (
                                        // <ReactPlayer
                                        //   url={chatMessage.chat_asset_url}
                                        //   controls={true}
                                        //   width="450px"
                                        //   height="450px"
                                        //   className="chat-room-audio-display"
                                        // />
                                        ""
                                      )}
                                      <div>
                                        {chatMessage.chat_asset_url &&
                                          chatMessage.file_type == "image" ? (
                                          <ReactFancyBox
                                            image={chatMessage.chat_asset_url}
                                            className="chat-view-image"
                                          />
                                        ) : (
                                          ""
                                        )}

                                        {chatMessage.is_user_needs_pay ===
                                          1 ? (
                                          <div className="gallery-top-btn-sec">
                                            <Button
                                              className="subscribe-post-btn-sec"
                                              onClick={(event) =>
                                                handleAssetPayment(
                                                  event,
                                                  chatMessage.chat_message_id,
                                                  chatMessage.amount,
                                                  chatMessage.amount_formatted
                                                )
                                              }
                                            >
                                              {chatMessage.payment_text}
                                            </Button>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      {chatMessage.message == "" ? null : (
                                        <>
                                          <p>{t("you")}, {chatMessage.created}</p>
                                          <h6 className="float-right">
                                            {chatMessage.message}
                                          </h6>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="user-message-left-align">
                                    <div className="user-message-user-img-sec">
                                      <Image
                                        src={
                                          props.chatMessages.data.user.picture
                                        }
                                        alt=""
                                        className="user-message-img"
                                      />
                                    </div>
                                    <div className="user-message-info">
                                      {chatMessage.chat_asset_url &&
                                        chatMessage.file_type == "video" ? (
                                        chatMessage.is_user_needs_pay ===
                                          1 ? (
                                          <Image
                                            src={chatMessage.chat_asset_url}
                                            className="chat-view-image"
                                          ></Image>
                                        ) : (
                                          <ReactPlayer
                                            url={chatMessage.chat_asset_url}
                                            controls={true}
                                            className="post-video-size chat-room-video-display chat-video"
                                            width="450px"
                                            height="450px"
                                          />
                                        )
                                      ) : (
                                        ""
                                      )}
                                      <div>
                                        {chatMessage.chat_asset_url &&
                                          chatMessage.file_type == "image" ? (
                                          <Image
                                            src={chatMessage.chat_asset_url}
                                            className="chat-view-image"
                                          // onClick={(event) =>
                                          //   handleImagePreview(event, 1)
                                          // }
                                          />
                                        ) : (
                                          ""
                                        )}
                                        {chatMessage.chat_asset_url &&
                                          chatMessage.file_type == "audio" ? (
                                          chatMessage.is_user_needs_pay ===
                                            1 ? (
                                            <Image
                                              src={chatMessage.chat_asset_url}
                                              className="chat-view-image"
                                            ></Image>
                                          ) : (
                                            <ReactAudioPlayer
                                              src={chatMessage.chat_asset_url}
                                              controls={true}
                                              width="450px"
                                              height="450px"
                                              className="chat-room-audio-display"
                                              autoPlay={false}
                                              controlsList={"nodownload"}
                                            />
                                            // <ReactPlayer
                                            //   url={chatMessage.chat_asset_url}
                                            //   controls={true}
                                            //   width="450px"
                                            //   height="450px"
                                            //   className="chat-room-audio-display"
                                            // />
                                          )
                                        ) : (
                                          ""
                                        )}

                                        {chatMessage.is_user_needs_pay ===
                                          1 ? (
                                          <div className="gallery-top-btn-sec chat-room-pay-display">
                                            <Button
                                              className="subscribe-post-btn-sec"
                                              onClick={(event) =>
                                                handleAssetPayment(
                                                  event,
                                                  chatMessage.chat_message_id,
                                                  chatMessage.amount,
                                                  chatMessage.amount_formatted
                                                )
                                              }
                                            >
                                              {chatMessage.payment_text}
                                            </Button>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      {chatMessage.message == "" ? null : (
                                        <>
                                          <p>
                                            {
                                              props.chatMessages.data.user
                                                .name
                                            }
                                            , {chatMessage.created}
                                          </p>
                                          <h6>{chatMessage.message}</h6>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )}{" "}
                              </>
                            )
                          )
                          : ""}
                      </div>
                      {/* <p className="typing-text mt-5">Jason Doyle is typing...</p> */}
                    </div>
                    <div className="user-chat-main-wrapper-footer">
                      <Form
                        id="chat_post_form"
                        className="has-advanced-upload"
                        onSubmit={handleChatSubmit}
                      >
                        <InputGroup hasValidation>
                          <FormControl
                            placeholder={t("type_a_message")}
                            aria-label="Type a message"
                            aria-describedby="basic-addon2"
                            value={inputMessage}
                            onChange={(event) => {
                              chatInputChange(event.currentTarget.value);
                            }}
                          />
                          <div className="chat-icon-sec">
                            {configuration.get(
                              "configData.is_chat_asset_enabled"
                            ) == 1 ? (
                              <>
                                <InputGroup.Append>
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    className="chat-border-needed border-radius-zero"
                                  >
                                    <Button
                                      type="button"
                                      data-can_send="true"
                                      className="g-btn m-rounded b-chat__btn-submit"
                                      onClick={() =>
                                        handleAssetUploadModal("image")
                                      }
                                    >
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/popover-image.svg"
                                        }
                                        className="svg-clone  wh-32"
                                      />
                                    </Button>
                                  </InputGroup.Text>
                                </InputGroup.Append>
                                <InputGroup.Append>
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    className="border-radius-zero"
                                  >
                                    <Button
                                      type="button"
                                      data-can_send="true"
                                      className="g-btn m-rounded b-chat__btn-submit"
                                      onClick={() =>
                                        handleAssetUploadModal("video")
                                      }
                                    >
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/popover-video.svg"
                                        }
                                        className="svg-clone  wh-32"
                                      />
                                    </Button>
                                  </InputGroup.Text>
                                </InputGroup.Append>
                                <InputGroup.Append>
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    className="chat-border-zero"
                                  >
                                    <Button
                                      type="button"
                                      data-can_send="true"
                                      className="g-btn m-rounded b-chat__btn-submit"
                                      onClick={() =>
                                        handleAssetUploadModal("audio")
                                      }
                                    >
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/popover-mic.svg"
                                        }
                                        className="svg-clone  wh-32"
                                      />
                                    </Button>
                                  </InputGroup.Text>
                                </InputGroup.Append>
                              </>
                            ) : (
                              ""
                            )}
                            <InputGroup.Append>
                              <InputGroup.Text
                                id="basic-addon2"
                                className="position-relative last-child-mobile-icon chat-border-zero"
                              >
                                <Button
                                  type="button"
                                  className="space-between-evenly"
                                  data-can_send="true"
                                  onClick={handleChatSubmit}
                                  ref={invalidMessageRef}
                                >
                                  {/* <i className="far fa-paper-plane"></i> */}
                                  <Image
                                    className="comment-send-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/icons/comment-send-icon.png"
                                    }
                                  />
                                </Button>
                              </InputGroup.Text>
                            </InputGroup.Append>
                            <InputGroup.Append>
                              <InputGroup.Text>
                                <Overlay
                                  target={invalidMessageRef}
                                  show={emptyMessageCheck}
                                  placement="top"
                                >
                                  {(props) => (
                                    <Tooltip id="chat-invalid" {...props}>
                                 {t("please_type_a_message")}
                                    </Tooltip>
                                  )}
                                </Overlay>
                                <Button
                                  className="ml-2"
                                  type="button"
                                  onClick={triggerPicker}
                                >
                                  <i className="far fa-smile"></i>
                                </Button>
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </div>
                        </InputGroup>
                      </Form>
                    </div>
                    {emojiPickerState && (
                      <div className="emojiWrapper chat-emoji">
                        <Picker
                          title=""
                          emoji="point_up"
                          onSelect={(emoji) => handleEmojiSelect(emoji)}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <InboxNoDataFound />
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <ChatAssetModal
          chatAssetUpload={chatAssetUpload}
          closeChatAssetUploadModal={closeChatAssetUploadModal}
          fileType={fileType}
          toUserId={toUserId}
        />
        {props.chatMessages.loading ? (
          t("loading")
        ) : (
          // <AssetPaymentModal
          //   chatPayment={chatPayment}
          //   closePaymentModal={closePaymentModal}
          //   paymentData={paymentData}
          // />
          chatPayment ?
            <ChatAssetPaymentModal
              paymentsModal={chatPayment}
              closepaymentsModal={closePaymentModal}
              paymentData={paymentData}
            />
            : null
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  chatUsers: state.chat.chatUsers,
  chatMessages: state.chat.messages,
  assetUpload: state.chatAsset.saveAssetUpload,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(UserChatIndex));
