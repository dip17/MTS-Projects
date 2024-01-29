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
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Picker, EmojiData } from "emoji-mart3";

const NewVideoAudioCallChatIndex = (props) => {
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    props.setInputMessage(props.inputMessage + emoji.native);
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  return (
    <>
      <div className="video-call-chat-sec">
        <div
          className="video-call-chat-box"
          style={
            props.audio
              ? {}
              : {
                  height: "calc(100vh - 108px)",
                }
          }
        >
          <div className="video-call-chat-header">
            <h3>{t("chat")}</h3>
          </div>
          <div className="video-call-chat-body">
            <div
              className={
                props.audio ? "video-call-chat-box" : "new-video-call-chat-box"
              }
              id="chat-container"
              style={
                props.audio
                  ? {
                      maxHeight: "calc(100vh - 192px)",
                      overflowY: "auto",
                      paddingRight: "1em",
                    }
                  : {
                      maxHeight: "calc(100vh - 249px)",
                      overflowY: "auto",
                      paddingRight: "1em",
                    }
              }
            >
              {/* <div className="video-call-date">Today</div> */}
              <div className="video-call-chat-room">
                {props.data.length > 0 ? (
                  <>
                    {props.data.map((message, index) => (
                      <div key={index}>
                        {message.user_id == localStorage.getItem("userId") ? (
                          <>
                            <div className="video-call-chat-right">
                              <div className="video-call-chat-bg">
                                <p>{message.message}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="video-call-chat-left">
                              <div className="video-call-chat-bg">
                                <p>{message.message}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <NoDataFound />
                )}
              </div>
            </div>
          </div>
          <div className="video-call-chat-footer">
            <div className="video-call-add-message-sec">
              <form onSubmit={props.handleChatSubmit}>
                <InputGroup className="mb-0">
                  {/* <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <div className="upload-btn-wrapper">
                        <div className="icon-btn">
                          <Image
                            className="attach-icon"
                            src={
                              window.location.origin +
                              "/assets/images/video-call/attach.svg"
                            }
                          />
                        </div>
                        <input type="file" name="myfile" />
                      </div>
                    </InputGroup.Text>
                  </InputGroup.Prepend> */}
                  <FormControl
                    placeholder={t("type_your_message_here")}
                    aria-describedby="basic-addon1"
                    value={props.inputMessage}
                    onChange={(event) =>
                      props.setInputMessage(event.target.value)
                    }
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <Button className="icon-btn" onClick={triggerPicker}>
                        <Image
                          className="smiley-icon"
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
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  videoCallChatMessage: state.videocall.videoCallChatMessage,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewVideoAudioCallChatIndex));
