import React, { useState, useRef } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeChatAudio } from '../../store/actions/ChatAction';
import AltraChatAudioPlayer from '../CustomComponents/AudioPlayer/AltraChatAudioPlayer';
import CustomLazyLoad from '../helper/CustomLazyLoad';
import ChatAssetPaymentModal from '../Model/PaymentModal/ChatAssetPaymentModal';
import ChatDocument from './ChatDocument';

const ReceivedChat = ({ message }) => {

  const [chatPayment, setChatPayment] = useState(false);

  const closePaymentModal = () => {
    setChatPayment(false);
  }

  return (
    <>
      <div className="new-chat-room-left-sec">
        <div className="new-chat-room-left-msg-card">
          <div className="new-chat-room-left-msg-container">
            {message.chat_assets?.length > 0 ?
              <>
                {message.file_type === "image" || message.file_type === "video" ?
                  <div className={
                    message.chat_assets.length > 1 ?
                      "uploaded-chat-room-multiple-img-card" : "uploaded-chat-room-single-img-card"
                  }>
                    {message.chat_assets.map((chatAsset, i) =>
                      <ReceivedChatAsset
                        chatAsset={chatAsset}
                        key={i}
                        i={i}
                        length={message.chat_assets.length}
                        payment={message.is_user_needs_pay}
                      />
                    )}
                    {message.is_user_needs_pay ?
                      <div className="payment-overlay" onClick={() => setChatPayment(true)}>
                        {message.amount_formatted}
                      </div>
                      : null
                    }
                  </div>
                  : <div className="uploaded-chat-room-audio-card">
                    {message.is_user_needs_pay ?
                      <>
                        {message.chat_assets.map((chatAsset, i) =>
                          <>
                            <Image
                              className="uploaded-chat-room-audio-img"
                              src={message.file_type === "audio" ?
                                window.location.origin +
                                "/assets/images/new-chat/audio-preview.png"
                                : window.location.origin +
                                "/assets/images/new-chat/file-preview.png"
                              }
                            />
                          </>
                        )}
                        <div className="payment-overlay" onClick={() => setChatPayment(true)}>
                          {message.amount_formatted}
                        </div>
                      </>
                      : message.chat_assets.map((chatAsset, i) =>
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
              <span>{message.amount > 0 && message.is_user_needs_pay == 0 ? message.amount_formatted : ""}</span>
              <span>{message.time_formatted}</span>
            </p>
          </div>
        </div>
      </div>
      {
        chatPayment ?
          <ChatAssetPaymentModal
            paymentsModal={chatPayment}
            closepaymentsModal={closePaymentModal}
            paymentData={message}
          />
          : null
      }
    </>
  );
}

const ReceivedChatAsset = ({ chatAsset, i, length, payment }) => {
  const dispatch = useDispatch();
  const assetImage = useRef(null);

  const handleClick = e => {
    e.preventDefault();
    if (assetImage.current) {
      assetImage.current.click();
      stopAudio();
    }
  }

  const stopAudio = () => {
    dispatch(changeChatAudio({ src: "" }));
  }

  return (
    payment ?
      chatAsset.file_type === "image" ?
        <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
          <Image
            className="uploaded-chat-room-multiple-img"
            src={chatAsset.asset_file}
          />
          {length > 4 && i === 3 ?
            <div className="uploaded-chat-room-video-icon-sec">
              <div className="chat-more-sec">+{length - 3}</div>
            </div>
            : null
          }
        </div>
        : <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
          <Image
            className={`uploaded-chat-room-multiple-img`}
            src={chatAsset.blur_file}
          />
          <div className="uploaded-chat-room-video-icon-sec">
            {length > 4 && i === 3 ?
              <div className="chat-more-sec">+{length - 3}</div>
              : <Image
                src={window.location.origin + "/assets/images/new-home/icon/video-icon.png"}
                className="uploaded-chat-room-video-icon"
              />
            }
          </div>
        </div>
      : chatAsset.file_type === "image" ?
        <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
          <Image
            ref={assetImage}
            className="uploaded-chat-room-multiple-img"
            src={chatAsset.asset_file}
            data-fancybox-chat
            onClick={() => stopAudio()}
          />
          {length > 4 && i === 3 ? <div
            className="uploaded-chat-room-video-icon-sec"
            onClick={handleClick}>
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
            className="uploaded-chat-room-video-icon-sec"
            onClick={handleClick}>
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

export default ReceivedChat;
