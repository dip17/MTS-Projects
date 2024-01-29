import React, { useEffect, useRef } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeChatAudio } from '../../store/actions/ChatAction';
import AltraChatAudioPlayer from '../CustomComponents/AudioPlayer/AltraChatAudioPlayer';
import CustomLazyLoad from '../helper/CustomLazyLoad';
import ChatDocument from './ChatDocument';

const SendChat = ({ message }) => {
  return (
    <>
      <div className="new-chat-room-right-sec">
        <div className="new-chat-room-right-msg-card">
          <div className="new-chat-room-right-msg-container">
            {message.chat_assets?.length > 0 ?
              <>
                {message.file_type === "image" || message.file_type === "video" ?
                  <div className={
                    message.chat_assets.length > 1 ?
                      "uploaded-chat-room-multiple-img-card" : "uploaded-chat-room-single-img-card"
                  }>
                    {message.chat_assets.map((chatAsset, i) =>
                      <SendChatAsset
                        chatAsset={chatAsset}
                        key={i}
                        i={i}
                        length={message.chat_assets.length}
                      />
                    )}
                  </div>
                  : <div className="uploaded-chat-room-audio-card">
                    {message.chat_assets.map((chatAsset, i) =>
                      message.file_type === "audio" ?
                        <AltraChatAudioPlayer src={chatAsset.asset_file} />
                        : <ChatDocument chatAsset={chatAsset} />
                    )}
                  </div>
                }
              </> : null
            }
            {message.message ?
              <h6>{message.message}</h6>
              : null
            }
            <p>
              <span>
                {message.amount > 0 ?

                  message.is_user_paid === 1 ?
                    <span className="text-success">
                      {message.amount_formatted}{" "}
                      <Image
                        className="new-chat-room-time-tick"
                        src={
                          window.location.origin + "/assets/images/new-chat/ppv_paid.svg"
                        }
                      />
                    </span>
                    : <span className="text-danger">
                      {message.amount_formatted}{" "}
                      <Image
                        className="new-chat-room-time-tick"
                        src={
                          window.location.origin + "/assets/images/new-chat/token-icon-new.svg"
                        }
                      />
                    </span>
                  : null}
              </span>
              <span className='text-uppercase'>{message.time_formatted}</span>
            </p>
          </div>
          {/* <div className="new-chat-room-time-tick-card">
            <Image
              className="new-chat-room-time-tick"
              src={
                window.location.origin + "/assets/images/new-chat/msg-tick.svg"
              }
            />
            
          </div> */}
        </div>
      </div >
    </>
  );
}

const SendChatAsset = ({ chatAsset, i, length }) => {
  const dispatch = useDispatch();
  const assetImage = useRef(null);

  const triggerFancyBox = e => {
    e.preventDefault();
    console.log("Ref", assetImage.current);
    if (assetImage.current) {
      assetImage.current.click();
      stopAudio();
    }
  }

  const stopAudio = () => {
    dispatch(changeChatAudio({ src: "" }));
  }

  return (
    chatAsset.file_type === "image" ?
      <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
        <Image
          className="uploaded-chat-room-multiple-img"
          src={chatAsset.asset_file}
          data-fancybox-chat
          ref={assetImage}
          onClick={() => stopAudio()}
        />
        {length > 4 && i === 3 ? <div
          className="uploaded-chat-room-video-icon-sec"
          onClick={triggerFancyBox}>
          <div className="chat-more-sec">+{length - 3}</div>
        </div>
          : null
        }
      </div>
      : <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
        <Image
          ref={assetImage}
          className={`uploaded-chat-room-multiple-img`}
          src={chatAsset.blur_file}
          data-fancybox-chat
          href={chatAsset.asset_file}
          onClick={() => stopAudio()}
        />
        <div
          className="uploaded-chat-room-video-icon-sec cursor-pointer"
          onClick={triggerFancyBox}>
          {length > 4 && i === 3 ?
            <div className="chat-more-sec">+{length - 3}</div>
            : <Image
              src={window.location.origin + "/assets/images/new-home/icon/video-icon.png"}
              className="uploaded-chat-room-video-icon"
            />
          }
        </div>
      </div>
  );
}

export default SendChat;