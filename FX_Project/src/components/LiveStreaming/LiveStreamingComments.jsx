import React, { useState, useEffect, useRef } from "react";
import { Image, InputGroup, FormControl, Button } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import {
  addLiveVideoMessageContent,
  fetchLiveAudienceListSuccess,
  fetchLiveVideoChatMessagesStart,
  updateLiveAudianceCount,
  updateLiveAudianceEarnings,
  updateLiveAudianceList,
} from "../../store/actions/LiveVideoAction";
import configuration from "react-global-configuration";
import io from "socket.io-client";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Picker } from "emoji-mart3";
import { useCallback } from "react";
import LiveStreamCommentsLoader from "../Loader/LiveStreamCommentsLoader";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";

let chatSocket;

const LiveStreamingComments = (props) => {
  const [inputMessage, setInputMessage] = useState("");

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const [liveStreamState, setLiveStreamState] = useState({
    update: false,
    data: null,
  });

  const chatInputRef = useRef();

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    setInputMessage(inputMessage + emoji.native);
    chatInputRef.current.focus();
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  useEffect(() => {
    props.dispatch(
      fetchLiveVideoChatMessagesStart({
        live_video_id: props.liveVideoId,
      })
    );
    chatSocketConnect(props.liveVideoDetails.live_video_unique_id);
  }, []);

  window.onbeforeunload = function (e) {
    if (!props.isOwner) {
      chatSocket.emit("livestream-exit", {
        viewer_id: localStorage.getItem("userId"),
        user_id: localStorage.getItem("userId"),
        live_video_id: props.liveVideoId,
        live_user_id: props.liveVideoDetails.user_id,
        eventType: "exit",
      });
    }
  };

  const chatSocketConnect = useCallback((live_video_unique_id) => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl && live_video_unique_id) {
      chatSocket = io(chatSocketUrl, {
        query: `room: 'livestream_` + live_video_unique_id + `'`,
      });

      chatSocket.emit("livestream-updates", {
        room: live_video_unique_id,
      });

      chatSocket.on("livestream-broadcast-message", (newData) => {
        let content = [];
        content.push(newData);
        props.dispatch(addLiveVideoMessageContent(content));
      });

      chatSocket.on("livestream-join", (data) => {
        console.log("Join Data", data);
        let newViewerHtml =
          "<li id='livestream-viewer-'" + data.sender_username + "'>";
        newViewerHtml += "<a href=''>";
        newViewerHtml +=
          "<img className='live-streaming-user-list-img'src=" +
          data.sender_picture +
          "/>";
        newViewerHtml += "<p>" + data.sender_name + "</p></a>";
        newViewerHtml += "</li>";

        // const div = document.querySelector("#livestream-viewers-ul");
        // const buttonElement = React.createElement("div", {
        //   dangerouslySetInnerHTML: { __html: newViewerHtml },
        // });

        // document
        //   .getElementById("livestream-viewers-ul")
        //   .append(newViewerHtml);

        // let content = [];
        // content.push(newData);
        // props.dispatch(addLiveVideoMessageContent(content));
      });

      chatSocket.on("livestream-updates", (data) => {
        if (Object.keys(data).length > 0) {
          setLiveStreamState((prev) => {
            return {
              ...prev,
              update: true,
              data: data,
            };
          });
        }
      });

      if (!props.isOwner) {
        console.log("viewer joined");
        const emitUser = {
          viewer_id: localStorage.getItem("userId"),
          live_video_id: props.liveVideoId,
          live_user_id: props.liveVideoDetails.user_id,
          sender_name: localStorage.getItem("name"),
          sender_username: localStorage.getItem("username"),
          sender_picture: localStorage.getItem("user_picture"),
          eventType: "join",
          user_id: localStorage.getItem("userId"),
          user_unique_id: localStorage.getItem("user_unique_id"),
        };

        chatSocket.emit("livestream-join", {
          ...emitUser,
        });

        //if want to show own user in the list uncomment

        // setLiveStreamState((prev) => {
        //   return {
        //     ...prev,
        //     update: true,
        //     data: emitUser,
        //   };
        // });
      }
    }
  }, []);

  const handleChatSubmit = (event) => {
    event.preventDefault();

    if (inputMessage) {
      let chatData = [
        {
          live_video_id: props.liveVideoId,
          user_id: localStorage.getItem("userId"),
          message: inputMessage,
          sender_name: localStorage.getItem("name"),
          sender_username: localStorage.getItem("username"),
          sender_picture: localStorage.getItem("user_picture"),
        },
      ];
      chatSocket.emit("livestream-broadcast-message", chatData[0]);
      props.dispatch(addLiveVideoMessageContent(chatData));
      setInputMessage("");
    }
  };

  useEffect(() => {
    scrollDownChat();
  }, [props.liveVideoChatMessages.data]);

  useEffect(() => {
    if (liveStreamState.update && !props.liveAudienceList.loading) {
      console.log(
        "update received",
        props.liveAudienceList,
        liveStreamState.data
      );

      const isUserExist = props.liveAudienceList.viewers
        .map((viewer) => Number(viewer.user_id))
        .includes(Number(liveStreamState.data.user_id));

      if (liveStreamState.data.eventType === "exit") {
        console.log("user left");
        const removedUser = props.liveAudienceList.viewers.filter(
          (viewer) =>
            Number(viewer.user_id) != Number(liveStreamState.data.user_id)
        );
        console.log(removedUser);
        props.dispatch(updateLiveAudianceList(removedUser));
        if (liveStreamState.data.viewer_cnt) {
          props.dispatch(
            updateLiveAudianceCount(liveStreamState.data.viewer_cnt)
          );
        }
      } else if (liveStreamState.data.eventType === "join") {
        if (!isUserExist) {
          props.dispatch(
            updateLiveAudianceList([
              ...props.liveAudienceList.viewers,
              liveStreamState.data,
            ])
          );
        }

        if (liveStreamState.data.viewer_cnt) {
          props.dispatch(
            updateLiveAudianceCount(liveStreamState.data.viewer_cnt)
          );
        }

        if (liveStreamState.data.total_earnings_formatted) {
          props.dispatch(
            updateLiveAudianceEarnings({
              total_earnings: liveStreamState.data.total_earnings,
              total_earnings_formatted:
                liveStreamState.data.total_earnings_formatted,
            })
          );
        }
      } else {
        const notificationMessage =
          getErrorNotificationMessage(t("live_stream_ended"));

        props.dispatch(createNotification(notificationMessage));

        setTimeout(() => {
          window.location.assign(window.location.origin + "/live-videos");
        }, 1000);
      }

      setLiveStreamState((prev) => {
        return {
          ...prev,
          update: false,
          data: null,
        };
      });
    }
  }, [liveStreamState.update, props.liveAudienceList.loading]);

  useEffect(() => {
    if (
      !props.liveEnd.loading &&
      Number(props.liveEnd.data.live_video_id) === Number(props.liveVideoId) &&
      props.isOwner
    ) {
      chatSocket.emit("livestream-exit", {
        viewer_id: localStorage.getItem("userId"),
        user_id: localStorage.getItem("userId"),
        live_video_id: props.liveVideoId,
        live_user_id: props.liveVideoDetails.user_id,
        eventType: "end",
      });
    }
  }, [props.liveEnd.data]);

  const scrollDownChat = () => {
    const parent = document.querySelector("#live-chat-container");
    const objDiv = document.querySelector(".live-video-call-chat-room");
    if (objDiv != null) {
      parent.scrollTop = objDiv.scrollHeight;
    }
  };

  return (
    <>
      <div className="live-streaming-user-comments-sec">
        {/* <div className="live-streaming-user-comments-header-sec">
          <h4>Comments</h4>
        </div> */}
        {props.liveVideoChatMessages.loading ? (
          <div className="live-streaming-user-comments-box">
            <LiveStreamCommentsLoader count={4} />
          </div>
        ) : (
          <div
            className="live-streaming-user-comments-box"
            id="live-chat-container"
            style={{
              maxHeight: "calc(100vh - 260px)",
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: "1em",
              //   marginTop: '1em'
            }}
          >
            <div className="live-video-call-chat-room">
              {props.liveVideoChatMessages.data.length > 0 ? (
                <>
                  {props.liveVideoChatMessages.data.map((message) => (
                    <>
                      <div className="live-streaming-user-comments-card">
                        <div className="live-streaming-user-comments-img-sec">
                          <Image
                            className="live-streaming-user-comments-img"
                            src={
                              message.sender_picture
                                ? message.sender_picture
                                : message.from_userpicture
                            }
                          />
                        </div>
                        <div className="live-streaming-user-comments-info">
                          <h5>
                            {message.sender_username
                              ? message.sender_username
                              : message.from_displayname}
                          </h5>
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <NoDataFound />
              )}
            </div>

            {/* <div className="live-streaming-user-comments-card">
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
            </div> */}
          </div>
        )}
        <div className="live-streaming-user-add-comments-sec">
          <form onSubmit={handleChatSubmit}>
            <InputGroup className="mb-0">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Image
                    className="live-streaming-user-add-comments-icon"
                    src={
                      window.location.origin +
                      "/assets/images/live-streaming/ad-comments-icon.svg"
                    }
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={t("type_your_comment_here")}
                aria-describedby="basic-addon1"
                value={inputMessage}
                onChange={(event) => setInputMessage(event.target.value)}
                ref={chatInputRef}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <Button
                    variant="light"
                    className="icon-btn"
                    onClick={triggerPicker}
                  >
                    <Image
                      className="live-streaming-user-add-comments-icon"
                      src={
                        window.location.origin +
                        "/assets/images/video-call/smiley.svg"
                      }
                    />
                  </Button>
                </InputGroup.Text>
              </InputGroup.Append>
              {emojiPickerState && (
                <div className="emojiWrapper chat-emoji">
                  <Picker
                    title=""
                    emoji="point_up"
                    onSelect={(emoji) => handleEmojiSelect(emoji)}
                  />
                </div>
              )}
            </InputGroup>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideoChatMessages: state.liveVideo.liveVideoChatMessages,
  liveEnd: state.liveVideo.liveEnd,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingComments));
