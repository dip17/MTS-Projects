import React, { useState, useEffect } from "react";
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
import { Link, useHistory } from "react-router-dom";
import {
  fetchSingleAudioCallStart,
  endAudioCallStart,
  joinAudioCallStart,
  addAudioCallMessageContent,
  fetchAudioCallChatMessageStart,
} from "../../store/actions/PrivateCallAction";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgoraRTC from "../../hooks/useAgoraRTC";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import SendTipModal from "../helper/SendTipModal";
import SendTipPaymentModal from "../Model/PaymentModal/SendTipPaymentModal";
import AgoraMediaPlayer from "../helper/AgoraMediaPlayer";
import NewVideoAudioCallChatIndex from "./NewVideoAudioCallChatIndex";
import io from "socket.io-client";

import { createNotification } from "react-redux-notify";
import { getSuccessNotificationMessage } from "../helper/NotificationMessage";

let chatSocket;
const rtcclient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const NewAudioCallIndex = (props) => {
  const history = useHistory();

  const {
    localAudioTrack,
    leaveRtcChannel,
    joinAudio,
    joinState,
    remoteUsers,
    isStreamEnded,
    muteAudio,
    mediaStatus,
  } = useAgoraRTC(rtcclient);

  const [noError, setNoError] = useState(false);

  const [showTipModal, setShowTipModal] = useState(false);

  const [inputMessage, setInputMessage] = useState("");

  const closeTipModal = () => {
    setShowTipModal(false);
  };

  useEffect(() => {
    props.dispatch(
      fetchSingleAudioCallStart({
        audio_call_request_unique_id:
          props.match.params.audio_call_request_unique_id,
      })
    );
  }, []);

  useEffect(() => {
    if (!props.singleAudioCall.loading) {
      handleJoin();
    }
  }, [props.singleAudioCall.loading]);
  const [skipRender, setSkipRender] = useState({
    initial: true,
    completed: false,
  });
  const [skip, setSkip] = useState(true);
  useEffect(() => {
    if (!skip && !props.joinAudioCall.loading) {
      if (Object.keys(props.joinAudioCall.success).length > 0) {
        setNoError(true);
      } else {
        window.location.assign(
          props.singleAudioCall.data.audio_call_request.is_model === 0
            ? "/audio-calls-sent"
            : "/audio-calls-received"
        );
      }
    }
    setSkip(false);
  }, [props.joinAudioCall]);

  useEffect(() => {
    if (
      !skipRender.initial &&
      !skipRender.completed &&
      remoteUsers.length > 0
    ) {
      const notificationMessage =
        getSuccessNotificationMessage("caller Joined");
      props.dispatch(createNotification(notificationMessage));
      setSkipRender({ initial: false, completed: true });
    } else {
      setSkipRender({ initial: false, completed: false });
    }
  }, [remoteUsers]);

  const handleJoin = () => {
    joinAudio(
      configuration.get("configData.agora_app_id"),
      props.singleAudioCall.data.audio_call_request.virtual_id,
      props.singleAudioCall.data.audio_call_request.agora_token
        ? props.singleAudioCall.data.audio_call_request.agora_token
        : null
    );
  };

  const leaveCall = () => {
    if (window.confirm("are you sure to leave call?")) {
      props.dispatch(
        endAudioCallStart({
          audio_call_request_id: props.match.params.audio_call_request_id,
        })
      );
      leaveRtcChannel();
      window.location.assign("/audio-calls-history");
    } else {
    }
  };

  useEffect(() => {
    if (isStreamEnded) {
      props.dispatch(
        endAudioCallStart({
          audio_call_request_id: props.match.params.audio_call_request_id,
        })
      );
      window.location.assign("/audio-calls-history");
    }
  }, [isStreamEnded]);

  useEffect(() => {
    if (joinState) {
      props.dispatch(
        joinAudioCallStart({
          audio_call_request_id:
            props.singleAudioCall.data.audio_call_request.audio_call_request_id,
        })
      );
    }
  }, [joinState]);

  useEffect(() => {
    if (!props.singleAudioCall.loading) {
      props.dispatch(
        fetchAudioCallChatMessageStart({
          audio_call_request_id:
            props.singleAudioCall.data.audio_call_request.audio_call_request_id,
        })
      );
      chatSocketConnect(
        props.singleAudioCall.data.audio_call_request
          .audio_call_request_unique_id
      );
    }
  }, [props.singleAudioCall.loading]);

  const chatSocketConnect = (id) => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl && id) {
      chatSocket = io(chatSocketUrl, {
        query: `room : audio_call_` + id + ``,
      });

      chatSocket.emit("audio call update sender", {
        commonid: `audio_call_` + id + ``,
      });

      chatSocket.on("audio call chat", (newData) => {
        let content = [];
        content.push(newData);
        props.dispatch(addAudioCallMessageContent(content));
      });
    }
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();

    if (inputMessage) {
      let chatData = [
        {
          loggedin_user_id: localStorage.getItem("userId"),
          user_id: localStorage.getItem("userId"),
          model_id: props.singleAudioCall.data.audio_call_request.model_id,
          audio_call_request_id:
            props.singleAudioCall.data.audio_call_request.audio_call_request_id,
          message: inputMessage,
          from_username: localStorage.getItem("username"),
          from_userpicture: localStorage.getItem("user_picture"),
          audio_call_unique_id:
            props.singleAudioCall.data.audio_call_request
              .audio_call_request_unique_id,
          created: new Date(),
        },
      ];
      chatSocket.emit("audio call chat", chatData[0]);
      props.dispatch(addAudioCallMessageContent(chatData));
      setInputMessage("");
    }
  };

  useEffect(() => {
    scrollDownChat();
  }, [props.audioCallChatMessage.data]);

  const scrollDownChat = () => {
    const parent = document.querySelector("#chat-container");
    const objDiv = document.querySelector(".video-call-chat-room");
    if (objDiv != null) {
      parent.scrollTop = objDiv.scrollHeight;
    }
  };

  if (props.singleAudioCall.loading) {
    return null;
  }

  return (
    <>
      <div className="audio-call-sec">
        {noError ? (
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col md={8} lg={9} className="p-0">
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
                      {joinState && (
                        <div className="audio-call-action-btn-sec">
                          <ul className="list-unstyled audio-call-action-btn">
                            <Media as="li">
                              <Button
                                className="btn-link"
                                onClick={() => muteAudio()}
                              >
                                {mediaStatus.audio.muted ? (
                                  <Image
                                    src={
                                      window.location.origin +
                                      "/assets/images/video-call/mic-off.svg"
                                    }
                                    alt="action-icons"
                                    className="action-icon-img"
                                  />
                                ) : (
                                  <Image
                                    src={
                                      window.location.origin +
                                      "/assets/images/video-call/mic.svg"
                                    }
                                    className="action-icon-img"
                                  />
                                )}
                              </Button>
                            </Media>
                            <Media as="li" className="call-animation">
                              <Button
                                className="btn-link"
                                onClick={() => leaveCall()}
                              >
                                <Image
                                  src={
                                    window.location.origin +
                                    "/assets/images/video-call/end-call.svg"
                                  }
                                  alt="action-icons"
                                  className="action-icon-img"
                                />
                              </Button>
                            </Media>
                          </ul>
                        </div>
                      )}

                      <div className="back-btn-sec">
                        <Link
                          to={
                            props.singleAudioCall.data.audio_call_request
                              .is_model === 0
                              ? "/audio-calls-sent"
                              : "/audio-calls-received"
                          }
                        >
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
                      {props.singleAudioCall.data.audio_call_request
                        .is_model === 0 && (
                        <div className="audio-call-send-tip-sec">
                          <Image
                            className="audio-call-send-tip-icon"
                            src={
                              window.location.origin +
                              "/assets/images/live-streaming/send-tip.svg"
                            }
                          />
                          <Button
                            className="send-tip-btn"
                            onClick={() => setShowTipModal(true)}
                          >
                            {t("send_tips")}
                          </Button>
                        </div>
                      )}

                      <div className="audio-call-connected-box">
                        <div className="audio-call-connected-left-sec">
                          <Image
                            className="audio-call-user-img"
                            src={
                              props.singleAudioCall.data.audio_call_request
                                .is_model == 1
                                ? props.singleAudioCall.data.audio_call_request
                                    .model_picture
                                : props.singleAudioCall.data.audio_call_request
                                    .user_picture
                            }
                          />
                          <h4>
                            {props.singleAudioCall.data.audio_call_request
                              .is_model == 1
                              ? props.singleAudioCall.data.audio_call_request
                                  .model_displayname
                              : props.singleAudioCall.data.audio_call_request
                                  .user_displayname}
                          </h4>
                          {/* {joinState && (
                          <AgoraMediaPlayer
                            audioTrack={localAudioTrack}
                            useClassname="d-none"
                          ></AgoraMediaPlayer>
                        )} */}
                        </div>
                        <div className="audio-call-connected-center-sec">
                          <div className="connected-status">
                            <p>
                              {remoteUsers.length > 0
                                ? "Connected"
                                : "Connecting"}
                            </p>
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
                          {props.singleAudioCall.data.audio_call_request
                            .is_user_needs_to_pay === 1 && (
                            <div className="audio-call-amount-spend-details">
                              <h4>
                                {t("you_spent")} -{" "}
                                <span className="text-primary">
                                  {props.singleAudioCall.data.amount_formatted}
                                </span>
                              </h4>
                            </div>
                          )}
                        </div>
                        <div className="audio-call-connected-right-sec">
                          <Image
                            className="audio-call-user-img"
                            src={
                              props.singleAudioCall.data.audio_call_request
                                .is_model == 1
                                ? props.singleAudioCall.data.audio_call_request
                                    .user_picture
                                : props.singleAudioCall.data.audio_call_request
                                    .model_picture
                            }
                          />
                          <h4>
                            {props.singleAudioCall.data.audio_call_request
                              .is_model == 1
                              ? props.singleAudioCall.data.audio_call_request
                                  .user_displayname
                              : props.singleAudioCall.data.audio_call_request
                                  .model_displayname}
                          </h4>
                          {remoteUsers.length > 0 &&
                            remoteUsers.map((user) => (
                              <AgoraMediaPlayer
                                audioTrack={user.audioTrack}
                                useClassname={"d-none"}
                              ></AgoraMediaPlayer>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} lg={3} className="p-0">
                <div className="audio-call-card">
                  {!props.audioCallChatMessage.loading && (
                    <NewVideoAudioCallChatIndex
                      handleChatSubmit={handleChatSubmit}
                      inputMessage={inputMessage}
                      setInputMessage={setInputMessage}
                      data={props.audioCallChatMessage.data}
                      audio
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
      {showTipModal ? (
        <SendTipPaymentModal
          paymentsModal={showTipModal}
          closepaymentsModal={closeTipModal}
          user_id={props.singleAudioCall.data.audio_call_request.model_id}
          type="audiocall"
        />
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  singleAudioCall: state.privateCall.singleAudioCall,
  audioCallChatMessage: state.privateCall.audioCallChatMessage,
  joinAudioCall: state.privateCall.joinAudioCall,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewAudioCallIndex));
