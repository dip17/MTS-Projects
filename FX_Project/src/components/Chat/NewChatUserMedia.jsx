import React, { useEffect, useState, useRef } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./NewChat.css";
import { Link } from "react-router-dom";
import FancyBox from "../NewHome/NewSingleView/FancyBox";
import { connect, useDispatch } from "react-redux";
import { changeChatAudio, fetchMoreUserChatAssetsStart, fetchUserChatAssetsStart } from "../../store/actions/ChatAction";
import { translate, t } from "react-multi-lang";
import CommonCenterLoader from "../Loader/CommonCenterLoader";
import NoDataFound from "../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";
import AltraAudioPlayer from "../AudioPlayer/AltraAudioPlayer";
import Skeleton from 'react-loading-skeleton';
import CustomLazyLoad from "../helper/CustomLazyLoad";
import ChatAssetPaymentModal from '../Model/PaymentModal/ChatAssetPaymentModal';

const NewChatUserMedia = (props) => {
  const [section, setSection] = useState("image");
  const [skipRender, setSkipRender] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [paidAudios, setPaidAudios] = useState([]);
  const [chatPayment, setChatPayment] = useState(null);

  const closePaymentModal = () => {
    setChatPayment(null);
  }

  useEffect(() => {
    fetchDetails();
  }, [section]);

  useEffect(() => {
    if (!skipRender) {
      if (section === "image")
        fetchDetails();
      else
        setSection("image");
    }
  }, [props.selectedUser.user_id]);

  const fetchDetails = () => {
    props.dispatch(fetchUserChatAssetsStart({
      from_user_id: localStorage.getItem("userId"),
      to_user_id: props.selectedUser.user_id,
      file_type: section,
    }));
  }

  useEffect(() => {
    if (!skipRender && !props.chatAssets.loading && Object.keys(props.chatAssets.data).length > 0) {
      setPaidAudios(props.chatAssets.data.chat_assets.filter(file =>
        file.file_type === "audio" && file.is_user_needs_pay == 0)
      );
    }
    setSkipRender(false);
  }, [props.chatAssets]);

  const fetchMoreAssets = () => {
    props.dispatch(fetchMoreUserChatAssetsStart({
      skip: props.chatAssets.data.chat_assets.length,
      take: 12,
      from_user_id: localStorage.getItem("userId"),
      to_user_id: props.selectedUser.user_id,
      file_type: section,
    }));
  }

  const showAudioPlayer = (assetId) => {
    setAudioPlayer(paidAudios.findIndex(item => item.chat_asset_id === assetId));
  }

  const closeAudioPlayer = () => {
    setAudioPlayer(null);
  }

  return (
    <>
      <div className="new-chat-user-media-sec">
        <div className="new-chat-user-media-header-sec">
          <div className={`new-chat-media-tab-nav-link ${section === "image" ? "active" : ""}`} onClick={() => setSection("image")}>
            <span>
              <Image
                className="profile-post-tab-icon"
                src={
                  window.location.origin + "/assets/images/new-home/icon/image-post-1.svg"
                }
              />
            </span>
            <span className="resp-display-none">{t("images")}</span>
          </div>
          <div className={`new-chat-media-tab-nav-link ${section === "video" ? "active" : ""}`} onClick={() => setSection("video")}>
            <span>
              <Image
                className="profile-post-tab-icon"
                src={
                  window.location.origin + "/assets/images/new-home/icon/video-post-1.svg"
                }
              />
            </span>
            <span className="resp-display-none">{t("videos")}</span>
          </div>
          <div className={`new-chat-media-tab-nav-link ${section === "audio" ? "active" : ""}`} onClick={() => setSection("audio")}>
            <span>
              <Image
                className="profile-post-tab-icon"
                src={
                  window.location.origin + "/assets/images/new-home/icon/audio-post-1.svg"
                }
              />
            </span>
            <span className="resp-display-none">{t("audios")}</span>
          </div>
          <div className={`new-chat-media-tab-nav-link ${section === "document" ? "active" : ""}`} onClick={() => setSection("document")}>
            <span>
              <Image
                className="profile-post-tab-icon"
                src={
                  window.location.origin + "/assets/images/new-home/icon/file-attachment.svg"
                }
              />
            </span>
            <span className="resp-display-none">{t("documents")}</span>
          </div>
        </div>
        {props.chatAssets.loading ?
          <div className="new-chat-user-media-box">
            {[...Array(9)].map((val, i) =>
              <Skeleton className="new-chat-user-media-img" />
            )}
          </div>
          : props.chatAssets.data.chat_assets ?
            <FancyBox delegate={"[data-fancybox-asset]"} options={{ groupAll: true }}>
              {props.chatAssets.data.chat_assets.length > 0 ?
                <div className="new-chat-user-media-box-container" id="assetDiv">
                  <InfiniteScroll
                    dataLength={props.chatAssets.data.chat_assets.length}
                    next={fetchMoreAssets}
                    hasMore={props.chatAssets.data.chat_assets.length < props.chatAssets.data.total}
                    loader={<div className="new-chat-user-media-box">
                      {[...Array(9)].map((val, i) =>
                        <Skeleton className="new-chat-user-media-img" />
                      )}
                    </div>}
                    // style={{ padding: '2em', display: "flex", flexDirection: "column-reverse", overflow: "inherit" }}
                    scrollableTarget="assetDiv"
                  >
                    <div className="new-chat-user-media-box">
                      {props.chatAssets.data.chat_assets.map((asset, i) =>
                        <ChatAsset
                          asset={asset}
                          key={i}
                          showAudioPlayer={showAudioPlayer}
                          setChatPayment={setChatPayment}
                        />
                      )}
                    </div>
                  </InfiniteScroll>
                </div>
                : <div className="text-center">
                  <Image
                    src={
                      section === "image" ?
                        window.location.origin + "/assets/images/new-chat/no-image-found.png"
                        : section === "video" ?
                          window.location.origin + "/assets/images/new-chat/no-video-found.png"
                          : section === "audio" ?
                            window.location.origin + "/assets/images/new-chat/no-audio-found.png"
                            : null
                    }
                    className="no-data-media-img"
                  />
                </div>
              }
            </FancyBox>
            : null
        }
      </div >
      {audioPlayer !== null ?
        <AltraAudioPlayer
          src={paidAudios}
          srcKey="asset_file"
          initialIndex={audioPlayer}
          imageKey="blur_file"
          listLoop={true}
          closeAudioPlayer={closeAudioPlayer}
        />
        : null
      }
      {
        chatPayment ?
          <ChatAssetPaymentModal
            paymentsModal={true}
            closepaymentsModal={closePaymentModal}
            paymentData={chatPayment}
          />
          : null
      }
    </>
  );
};

const ChatAsset = ({ asset, showAudioPlayer, setChatPayment }) => {
  const dispatch = useDispatch();
  const assetImage = useRef(null);

  const stopAudio = () => {
    dispatch(changeChatAudio({ src: "" }));
  }

  return <>
    {asset.file_type === "image" ?
      <div className="new-chat-user-media-card">
        {asset.is_user_needs_pay == 0 ?
          <div className="new-chat-user-media-img-sec">
            <CustomLazyLoad
              src={asset.asset_file}
              className={"new-chat-user-media-img"}
              data-fancybox-asset
              onClick={() => stopAudio()}
            />
          </div>
          : <div className="new-chat-user-media-img-sec"
            onClick={() => setChatPayment({
              chat_message_id: asset.chat_message_id,
              amount_formatted: asset.amount_formatted,
              amount: asset.amount,
            })}>
            <CustomLazyLoad
              src={asset.asset_file}
              className={"new-chat-user-media-img"}
            />
            <div className="new-chat-user-media-video-icon-sec">
              <Image
                src={window.location.origin + "/assets/images/new-home/icon/lock-icon.png"}
                className="new-chat-user-media-video-icon"
              />
            </div>
          </div>
        }
      </div>
      : asset.file_type === "video" ?
        <div className="new-chat-user-media-card">
          {asset.is_user_needs_pay == 0 ?
            <div className="new-chat-user-media-img-sec">
              {/* <CustomLazyLoad
                src={asset.blur_file}
                className={"new-chat-user-media-img"}
                data-fancybox-asset
                ref={assetImage}
                href={asset.asset_file}
              /> */}
              <Image
                className="new-chat-user-media-img"
                src={asset.blur_file}
                data-fancybox-asset
                ref={assetImage}
                href={asset.asset_file}
                onClick={() => stopAudio()}
              />
              <div className="new-chat-user-media-video-icon-sec cursor-pointer" onClick={() => assetImage.current.click()}>
                <Image
                  src={window.location.origin + "/assets/images/new-home/icon/video-icon.png"}
                  className="new-chat-user-media-video-icon"
                />
              </div>
            </div>
            : <div className="new-chat-user-media-img-sec"
              onClick={() => setChatPayment({
                chat_message_id: asset.chat_message_id,
                amount_formatted: asset.amount_formatted,
                amount: asset.amount,
              })}
            >
              <Image
                className="new-chat-user-media-img"
                src={asset.blur_file}
              />
              <div className="new-chat-user-media-video-icon-sec">
                <Image
                  src={window.location.origin + "/assets/images/new-home/icon/lock-icon.png"}
                  className="new-chat-user-media-video-icon"
                />
              </div>
            </div>
          }
        </div>
        : asset.file_type === "audio" ?
          <div className="new-chat-user-media-card">
            {asset.is_user_needs_pay == 0 ?
              <div className="new-chat-user-media-img-sec" onClick={() => {
                stopAudio();
                showAudioPlayer(asset.chat_asset_id)
              }}>
                <Image
                  className="new-chat-user-media-img"
                  src={asset.blur_file}
                />
                <div className="new-chat-user-media-video-icon-sec">
                  <Image
                    src={window.location.origin + "/assets/images/new-home/icon/audio-icon.png"}
                    className="new-chat-user-media-video-icon"
                  />
                </div>
              </div>
              : <div className="new-chat-user-media-img-sec"
                onClick={() => setChatPayment({
                  chat_message_id: asset.chat_message_id,
                  amount_formatted: asset.amount_formatted,
                  amount: asset.amount,
                })}
              >
                <Image
                  className="new-chat-user-media-img"
                  src={asset.blur_file}
                />
                <div className="new-chat-user-media-video-icon-sec">
                  <Image
                    src={window.location.origin + "/assets/images/new-home/icon/lock-icon.png"}
                    className="new-chat-user-media-video-icon"
                  />
                </div>
              </div>
            }
          </div>
          : <div className="new-chat-user-media-card chat-document-list">
            {asset.is_user_needs_pay == 0 ?
              <div className="new-chat-user-media-img-sec">
                <a href={asset.asset_file} download target="_blank">
                  <Image
                    className="new-chat-user-media-img"
                    src={asset.blur_file}
                    onClick={() => stopAudio()}
                  />
                  <div className="upload-multiple-file-name">
                    {asset.file_name}
                  </div>
                  {/* <div className="new-chat-user-media-video-icon-sec cursor-pointer">
                    <Image
                      src={window.location.origin + "/assets/images/new-home/icon/video-icon.png"}
                      className="new-chat-user-media-video-icon"
                    />
                  </div> */}
                </a>
              </div>
              : <div className="new-chat-user-media-img-sec chat-document-unpaid"
                onClick={() => setChatPayment({
                  chat_message_id: asset.chat_message_id,
                  amount_formatted: asset.amount_formatted,
                  amount: asset.amount,
                })}
              >
                <Image
                  className="new-chat-user-media-img"
                  src={asset.blur_file}
                />
                <div className="upload-multiple-file-name">
                  {asset.file_name}
                </div>
                <div className="new-chat-user-media-video-icon-sec">
                  <Image
                    src={window.location.origin + "/assets/images/new-home/icon/lock-icon.png"}
                    className="new-chat-user-media-video-icon"
                  />
                </div>
              </div>
            }
          </div>
    }
  </>
}

const mapStateToPros = (state) => ({
  chatAssets: state.chat.chatAssets,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewChatUserMedia));
