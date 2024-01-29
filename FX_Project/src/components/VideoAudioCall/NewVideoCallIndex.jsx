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
import { Link } from "react-router-dom";
import NewVideoAudioCallChatIndex from "./NewVideoAudioCallChatIndex";
import MobileVideoAudioChatModal from "./MobileVideoAudioChatModal";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgoraRTC from "../../hooks/useAgoraRTC";
import {
  fetchSingleVideoCallStart,
  joinVideoCallStart,
  endVideoCallStart,
} from "../../store/actions/PrivateCallAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import AgoraMediaPlayer from "../helper/AgoraMediaPlayer";
import SendTipPaymentModal from "../Model/PaymentModal/SendTipPaymentModal";
import {
  addVideoCallMessageContent,
  fetchVideoCallChatMessageStart,
} from "../../store/actions/VideoCallAction";
import io from "socket.io-client";

const rtcclient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let chatSocket;
const VideoCallIndex = (props) => {
  const {
    localAudioTrack,
    localVideoTrack,
    leaveRtcChannel,
    join,
    joinState,
    remoteUsers,
    isStreamEnded,
    muteAudio,
    muteVideo,
    mediaStatus,
  } = useAgoraRTC(rtcclient);

  const [mobileVideoAudioChat, setMobileVideoAudioChat] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [initialHeight, setInitialHeight] = useState(0);

  const closeMobileVideoAudioChatModal = () => {
    setMobileVideoAudioChat(false);
  };

  const closeTipModal = () => {
    setShowTipModal(false);
  };

  useEffect(() => {
    props.dispatch(
      fetchSingleVideoCallStart({
        video_call_request_unique_id:
          props.match.params.video_call_request_unique_id,
      })
    );
  }, []);

  useEffect(() => {
    if (!props.singleVideoCall.loading) {
      handleJoin();
    }
  }, [props.singleVideoCall.loading]);

  useEffect(() => {
    if (joinState) {
      props.dispatch(
        joinVideoCallStart({
          video_call_request_id:
            props.singleVideoCall.data.video_call_request.video_call_request_id,
        })
      );
    }
  }, [joinState]);

  const handleJoin = () => {
    join(
      configuration.get("configData.agora_app_id"),
      props.singleVideoCall.data.video_call_request.virtual_id,
      props.singleVideoCall.data.video_call_request.agora_token
        ? props.singleVideoCall.data.video_call_request.agora_token
        : null,
      "host",
      "rtc"
    );
  };

  const leaveCall = () => {
    if (window.confirm(t("are_you_sure_to_leave_call"))) {
      leaveRtcChannel();
      props.dispatch(
        endVideoCallStart({
          video_call_request_id:
            props.singleVideoCall.data.video_call_request.video_call_request_id,
        })
      );
      window.location.assign("/video-calls-history");
    } else {
    }
  };

  useEffect(() => {
    if (isStreamEnded) {
      props.dispatch(
        endVideoCallStart({
          video_call_request_id:
            props.singleVideoCall.data.video_call_request.video_call_request_id,
        })
      );
      window.location.assign("/video-calls-history");
    }
  }, [isStreamEnded]);

  useEffect(() => {
    if (!props.singleVideoCall.loading) {
      props.dispatch(
        fetchVideoCallChatMessageStart({
          video_call_request_id:
            props.singleVideoCall.data.video_call_request.video_call_request_id,
        })
      );
      chatSocketConnect(
        props.singleVideoCall.data.video_call_request
          .video_call_request_unique_id
      );
    }
  }, [props.singleVideoCall.loading]);

  const chatSocketConnect = (id) => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl && id) {
      chatSocket = io(chatSocketUrl, {
        query: `room : video_call_` + id + ``,
      });

      chatSocket.emit("video call update sender", {
        commonid: `video_call_` + id + ``,
      });

      chatSocket.on("video call chat", (newData) => {
        let content = [];
        content.push(newData);
        props.dispatch(addVideoCallMessageContent(content));
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
          model_id: props.singleVideoCall.data.video_call_request.model_id,
          video_call_request_id:
            props.singleVideoCall.data.video_call_request.video_call_request_id,
          message: inputMessage,
          from_username: localStorage.getItem("username"),
          from_userpicture: localStorage.getItem("user_picture"),
          video_call_unique_id:
            props.singleVideoCall.data.video_call_request
              .video_call_request_unique_id,
          created: new Date(),
        },
      ];
      chatSocket.emit("video call chat", chatData[0]);
      props.dispatch(addVideoCallMessageContent(chatData));
      setInputMessage("");
    }
  };

  useEffect(() => {
    scrollDownChat();
  }, [props.videoCallChatMessage.data]);

  const scrollDownChat = () => {
    const parent = document.querySelector("#chat-container");
    const objDiv = document.querySelector(".video-call-chat-room");
    if (objDiv != null) {
      parent.scrollTop = objDiv.scrollHeight;
    }
  };

  if (props.singleVideoCall.loading) {
    return null;
  }

  return (
    <>
      <div className="video-call-sec">
        {/* <div className="video-call-mobile-sec">
          <Link to="#" onClick={() => setMobileVideoAudioChat(true)}>
            <div className="live-streaming-comments-mobile-display">
              <Button className="view-comments-btn">View Chat</Button>
            </div>
          </Link>
        </div> */}
        <div className="video-call-box justify-content-center row m-0">
          <div className="video-call-card-left col-lg-9 col-md-8 p-0">
            {joinState && (
              <div className="video-call-card">
                {remoteUsers.length > 0 ? (
                  remoteUsers.map((user) => (
                    <div className="video-call-user-img-sec">
                      {user._video_muted_ ? (
                        <Image
                          src={
                            props.singleVideoCall.data.video_call_request
                              .is_model == 1
                              ? props.singleVideoCall.data.video_call_request
                                  .user_picture
                              : props.singleVideoCall.data.video_call_request
                                  .model_picture
                          }
                          alt="action-icons"
                          className="video-call-bg-img"
                        />
                      ) : (
                        <AgoraMediaPlayer
                          videoTrack={user.videoTrack}
                          audioTrack={user.audioTrack}
                          useClassname={"video-call-bg-img"}
                        ></AgoraMediaPlayer>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="video-call-user-img-sec">
                    <Image
                      src={
                        props.singleVideoCall.data.video_call_request
                          .is_model == 1
                          ? props.singleVideoCall.data.video_call_request
                              .user_picture
                          : props.singleVideoCall.data.video_call_request
                              .model_picture
                      }
                      alt="action-icons"
                      className="video-call-bg-img"
                    />
                  </div>
                )}

                <div className="video-call-user-img-sec">
                  {mediaStatus.video.muted ? (
                    <Image
                      src={
                        props.singleVideoCall.data.video_call_request
                          .is_model === 1
                          ? props.singleVideoCall.data.video_call_request
                              .model_picture
                          : props.singleVideoCall.data.video_call_request
                              .user_picture
                      }
                      alt="action-icons"
                      className="video-call-user-img"
                    />
                  ) : (
                    <AgoraMediaPlayer
                      videoTrack={localVideoTrack}
                      useClassname={"video-call-user-img"}
                      mirror
                    ></AgoraMediaPlayer>
                  )}
                </div>
                <div className="video-call-action-btn-sec">
                  <ul className="list-unstyled video-call-action-btn">
                    <Media as="li">
                      <Button className="btn-link" onClick={() => muteVideo()}>
                        {mediaStatus.video.muted ? (
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/video-call/camera-off.svg"
                            }
                            alt="action-icons"
                            className="action-icon-img"
                          />
                        ) : (
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/video-call/camera.svg"
                            }
                            alt="action-icons"
                            className="action-icon-img"
                          />
                        )}
                      </Button>
                    </Media>
                    <Media as="li" className="call-animation">
                      <Button className="btn-link" onClick={() => leaveCall()}>
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
                    <Media as="li">
                      <Button className="btn-link" onClick={() => muteAudio()}>
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
                  </ul>
                </div>
                <div className="back-btn-sec">
                  <Link to="/video-calls-history">
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
                {props.singleVideoCall.data.video_call_request.is_model ===
                  0 && (
                  <div className="video-call-send-tip-sec">
                    <Image
                      className="video-call-send-tip-icon"
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
              </div>
            )}
          </div>
          <div className="video-call-card-right col-lg-3 col-md-4 p-0">
            <div className="video-call-chat-header-sec">
              <div className="video-call-user-info">
                <Image
                  className="video-call-user-img"
                  src={
                    props.singleVideoCall.data.video_call_request.is_model === 1
                      ? props.singleVideoCall.data.video_call_request
                          .user_picture
                      : props.singleVideoCall.data.video_call_request
                          .model_picture
                  }
                />
                <div>
                  <h4>
                    {props.singleVideoCall.data.video_call_request.is_model ===
                    1
                      ? props.singleVideoCall.data.video_call_request
                          .user_displayname
                      : props.singleVideoCall.data.video_call_request
                          .model_displayname}
                    {/* <span>
                      <Image
                        className="sidebar-verified-icon"
                        src={
                          window.location.origin +
                          "/assets/images/new-home/verified-icon.png"
                        }
                      />
                    </span> */}
                  </h4>
                  {/* <div className="video-user-follow-count">
                    <Image
                      className="user-follow-count"
                      src={
                        window.location.origin +
                        "/assets/images/video-call/users.svg"
                      }
                    />
                    <span>200K</span>
                  </div> */}
                </div>
              </div>
              {props.singleVideoCall.data.video_call_request
                .is_user_needs_to_pay === 1 && (
                <div className="video-user-earned-sec">
                  <h4>
                    {t("you_earned")}-{" "}
                    <span className="text-primary">
                      {
                        props.singleVideoCall.data.video_call_request
                          .amount_formatted
                      }
                    </span>
                  </h4>
                </div>
              )}
            </div>
            {!props.videoCallChatMessage.loading && (
              <NewVideoAudioCallChatIndex
                handleChatSubmit={handleChatSubmit}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                data={props.videoCallChatMessage.data}
                video
              />
            )}
          </div>
        </div>
      </div>
      <MobileVideoAudioChatModal
        mobileVideoAudioChat={mobileVideoAudioChat}
        closeMobileVideoAudioChatModal={closeMobileVideoAudioChatModal}
        setMobileVideoAudioChat={setMobileVideoAudioChat}
        liveVideoDetails={props.singleVideoCall.data.video_call_request}
      />
      {showTipModal && (
        <SendTipPaymentModal
          paymentsModal={showTipModal}
          closepaymentsModal={closeTipModal}
          user_id={props.singleVideoCall.data.video_call_request.model_id}
          type="videocall"
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  singleVideoCall: state.privateCall.singleVideoCall,
  videoCallChatMessage: state.videocall.videoCallChatMessage,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(VideoCallIndex));
