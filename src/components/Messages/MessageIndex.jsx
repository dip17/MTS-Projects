import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  Image,
  Media,
  InputGroup,
  FormControl,
  Modal,
  Tab,
  Nav,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  addMessageContent,
  fetchChatMessageStart,
  fetchChatUsersStart,
} from "../../store/actions/ChatAction";
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

const $ = window.$;

let chatSocket;

const MessageIndex = (props) => {
  const [activeChat, setActiveChat] = useState(0);
  const [toUserId, setToUserId] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const [initialHeight, setInitialHeight] = useState(0);

  const messageRef = useRef();

  useEffect(() => {
    props.dispatch(fetchChatUsersStart());
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl === "") {
      const notificationMessage = getErrorNotificationMessage(
       t("socket_url_is_not_configured")
      );
      props.dispatch(createNotification(notificationMessage));
      window.location.assign("/home");
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

  const chatInputChange = (value) => {
    setInputMessage(value);
  };

  const [chatAssetUpload, setChatAssetUpload] = useState(false);
  const [fileType, setFileType] = useState("picture");

  const closeChatAssetUploadModal = () => {
    setChatAssetUpload(false);
  };

  const handleAssetUploadModal = (fileType) => {
    setChatAssetUpload(true);
    setFileType(fileType);
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

  const [paymentData, setPaymentData] = useState({
    chat_message_id: 0,
    from_user_id: localStorage.getItem("userId"),
    to_user_id: toUserId,
    amount_formatted: 0,
    amount: 0,
  });

  const [chatPayment, setPaymentModal] = useState(false);

  const handleAssetPayment = (
    event,
    chat_message_id,
    amount_formatted,
    amount
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
  return (
    <>
      <div className="message-page">
        <Container>
          <Row>
            {props.chatUsers.loading ? (
              <InboxLoader></InboxLoader>
            ) : props.chatUsers.data.users.length > 0 ? (
              <ChatUserList
                chatUsers={props.chatUsers.data}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                changeUser={changeUser}
              />
            ) : (
              <InboxNoDataFound />
            )}
            <Col
              sm={12}
              md={12}
              lg={7}
              xl={8}
              className="resp-mrg-btn-xs margin-col col8-sm"
            >
              {props.chatMessages.loading ? (
                ""
              ) : (
                <Row className="msg-row-chat">
                  <div className="msg-header">
                    {/* <Button className="chat-header-back">
                    <Image
                      src={window.location.origin + "/assets/images/icons/back.svg"}
                      className="svg-clone"
                    />
                  </Button> */}
                    <h1 className="chat-section-title">
                      <div className="chat-section-title-width">
                        <Link
                          to={`/` + props.chatMessages.data.user.user_unique_id}
                          className="chat-user-name"
                        >
                          {props.chatMessages.data.user.name}{" "}
                          {props.chatMessages.data.user.is_verified_badge ==
                          1 ? (
                            // <img
                            //   className="verified-badge"
                            //   alt="verified-badge"
                            //   src={
                            //     window.location.origin +
                            //     "/assets/images/verified.svg"
                            //   }
                            // />
                            <VerifiedBadgeNoShadow />
                          ) : null}
                        </Link>
                      </div>
                    </h1>
                    <div className="drop-down-chat-sec">
                      <Dropdown>
                        <Dropdown.Toggle
                          className="btn btn-default dropdown-toggle btn-normal-2"
                          type="button"
                          id="dropdown-basic"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu btn-normal-2-menu dropdown-menu-right">
                          <Media as="li">
                            <Link
                              to={
                                `/` +
                                props.chatMessages.data.user.user_unique_id
                              }
                            >
                              {("view_profile")}
                            </Link>
                          </Media>
                          {/* <Media as="li" className="divider"></Media> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <span
                      className="post-icons padding-top-lg"
                      style={{ display: "none" }}
                    >
                      <Dropdown>
                        <Dropdown.Toggle
                          className="btn btn-default dropdown-toggle"
                          type="button"
                          id="dropdown-basic"
                        >
                          <Image
                            src="assets/images/icons/vertical-dots.svg"
                            className="svg-clone vertical-dots"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                          <Media as="li">
                            <Link to="#"> {t("copy_link_to_post")} </Link>
                          </Media>
                          <Media as="li">
                            <Link to="#">
                              {" "}
                              {t("hide_paid_blurred_from_the_home_feed")}{" "}
                            </Link>
                          </Media>
                          <Media as="li" className="divider"></Media>
                          <Media as="li">
                            <Link to="#"> {t("i_dont_like_this_post")} </Link>
                          </Media>
                          <Media as="li">
                            <Link to="#">
                              {" "}
                              {t("hide_users_posts_from_feed")}{" "}
                            </Link>
                          </Media>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                    <div className="chat-subheader hidden">
                      <div className="chat-user-status">
                        {t("last_seen")}{" "}
                        <span title="Sep 7, 3:12 pm"> 1 {t("hour_ago")} </span>
                      </div>

                      <Button type="button" className="chat-subheader-btn">
                        <Image
                          src="assets/images/icons/star.svg"
                          className="svg-clone"
                          width="12"
                        />
                      </Button>
                      <Button type="button" className="chat-subheader-btn">
                        <Image
                          src="assets/images/icons/notification.svg"
                          className="svg-clone"
                          width="12"
                        />
                      </Button>
                      <Button type="button" className="chat-subheader-btn">
                        <Image
                          src="assets/images/icons/gallery.svg"
                          className="svg-clone"
                          width="12"
                        />

                        <span>{t("gallery")}</span>
                      </Button>
                      <Button type="button" className="chat-subheader-btn">
                        <Image
                          src="assets/images/icons/search.svg"
                          className="svg-clone"
                          width="12"
                        />

                        <span>{t("find")}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="chat-area">
                    <div className="chat-wrapper scrollbar" id="options-holder">
                      <div
                        className="chat-message padding overflow"
                        id="check"
                        ref={messageRef}
                      >
                        {props.chatMessages.data.messages.length > 0
                          ? props.chatMessages.data.messages.map(
                              (chatMessage, index) => (
                                <>
                                  {chatMessage.from_user_id ==
                                  localStorage.getItem("userId") ? (
                                    <div className="chat-message chat-message-sender">
                                      <Image
                                        className="chat-image chat-image-default"
                                        src={localStorage.getItem(
                                          "user_picture"
                                        )}
                                      />

                                      <div className="chat-message-wrapper">
                                        <div className="chat-message-content">
                                          <p>{chatMessage.message}</p>
                                        </div>
                                        {chatMessage.chat_asset_url &&
                                        chatMessage.file_type == "video" ? (
                                          <ReactPlayer
                                            url={chatMessage.chat_asset_url}
                                            controls={true}
                                            width="450px"
                                            height="450px"
                                            className="post-video-size"
                                          />
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
                                        <div className="chat-details">
                                          <span className="chat-message-localization font-size-small">
                                            {chatMessage.created}
                                          </span>
                                          <span className="chat-message-read-status font-size-small"></span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="chat-message chat-message-recipient">
                                      <Image
                                        className="chat-image chat-image-default"
                                        src={
                                          props.chatMessages.data.user.picture
                                        }
                                      />

                                      <div className="chat-message-wrapper gallery js-gallery">
                                        <div className="chat-message-content">
                                          <p>{chatMessage.message}</p>
                                        </div>
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
                                              width="450px"
                                              height="450px"
                                              className="post-video-size chat-room-video-display"
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
                                        <div className="chat-details">
                                          <span className="chat-message-localization font-size-small">
                                            {chatMessage.created}
                                          </span>
                                          {/* <span className="chat-message-read-status font-size-small">
                                          , $69 not paid yet
                                        </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  )}{" "}
                                </>
                              )
                            )
                          : ""}
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: "1px solid rgba(138, 150, 163, 0.2)",
                      }}
                    >
                      <div className="chats-post-footer">
                        <div></div>
                        <div className="chat-post">
                          <div className="chat-textarea-price-wrapper">
                            <div className="">
                              <InputGroup className="mb-3">
                                <FormControl
                                  controlId="chat-input-area"
                                  placeholder={t("type_a_message")}
                                  name="text"
                                  rows="1"
                                  className="form-control chat-input"
                                  style={{
                                    overflow: "hidden",
                                    overflowWrap: "break-word",
                                    height: "48px",
                                  }}
                                  value={inputMessage}
                                  onChange={(event) => {
                                    chatInputChange(event.currentTarget.value);
                                  }}
                                />
                                {configuration.get(
                                  "configData.is_chat_asset_enabled"
                                ) == 1 ? (
                                  <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">
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
                                            "/assets/images/icons/picture.svg"
                                          }
                                          className="svg-clone  wh-32"
                                        />
                                      </Button>
                                    </InputGroup.Text>
                                  </InputGroup.Append>
                                ) : (
                                  ""
                                )}
                                {configuration.get(
                                  "configData.is_chat_asset_enabled"
                                ) == 1 ? (
                                  <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">
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
                                            "/assets/images/icons/movie.svg"
                                          }
                                          className="svg-clone  wh-32"
                                        />
                                      </Button>
                                    </InputGroup.Text>
                                  </InputGroup.Append>
                                ) : (
                                  ""
                                )}
                                <InputGroup.Append>
                                  <InputGroup.Text id="basic-addon2">
                                    <Button
                                      type="button"
                                      data-can_send="true"
                                      className="btn gradient-btn gradientcolor messagebtn"
                                      onClick={handleChatSubmit}
                                    >
                                      <Image
                                        src="assets/images/icons/send.svg"
                                        className="svg-clone"
                                      />
                                    </Button>
                                  </InputGroup.Text>
                                </InputGroup.Append>
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              )}
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
          <AssetPaymentModal
            chatPayment={chatPayment}
            closePaymentModal={closePaymentModal}
            paymentData={paymentData}
          />
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
)(translate(MessageIndex));
