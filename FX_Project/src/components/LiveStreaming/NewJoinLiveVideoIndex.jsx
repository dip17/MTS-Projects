import React, { useEffect, useState } from "react";
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
} from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import LiveStreamingStore from "./LiveStreamingStore";
import LiveStreamingCard from "./LiveStreamingCard";
import LiveStreamingPost from "./LiveStreamingPost";
import LiveStreamingRecomendedForYou from "./LiveStreamingRecomendedForYou";
import LiveStreamingCommentsPaidIndex from "./LiveStreamingCommentsPaidIndex";
import MobileUserListPaidModal from "./MobileUserListPaidModal";
import MobileUserCommentsModal from "./ModalUserCommentsModal";

import { singleLiveVideoViewStart } from "../../store/actions/LiveVideoAction";
import DurationTimer from "./DurationTimer";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { unFollowUserStart } from "../../store/actions/FollowAction";
import LiveStreamingCommentsUserPaidList from "./LiveStreamingCommentsUserPaidList";
import LiveStreamingComments from "./LiveStreamingComments";
import SendTipPaymentModal from "../Model/PaymentModal/SendTipPaymentModal";
import ReportModeModal from "../helper/ReportModeModal";
import LiveStreamingInfoModal from "./Modal/LiveStreamingInfoModal";
import { saveBlockUserStart } from "../../store/actions/UserAction";

const NewJoinLiveVideoIndex = (props) => {
  const params = useParams();
  const history = useHistory();

  const [showTipModal, setShowTipModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [skipFirst, setSkipFirst] = useState(true);

  const closeTipModal = () => {
    setShowTipModal(false);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  //responsive
  const [mobileUserListPaid, setMobileUserListPaid] = useState(false);
  const [mobileUserComments, setMobileUserComments] = useState(false);

  useEffect(() => {
    props.dispatch(
      singleLiveVideoViewStart({
        live_video_unique_id: params.live_video_unique_id,
      })
    );
  }, [params.live_video_unique_id]);

  useEffect(() => {
    if (!skipFirst) {
      if (!props.liveVideoView.loading) {
        if (Object.keys(props.liveVideoView.data).length == 0) {
          history.push("/live-streaming");
        }
      }
    }
  }, [props.liveVideoView]);

  // responsive functions
  const closeMobileUserListPaidModal = () => {
    setMobileUserListPaid(false);
  };

  const closeMobileUserCommentsModal = () => {
    setMobileUserComments(false);
  };

  const onCopy = () => {
    const notificationMessage =
      getSuccessNotificationMessage("Live link copied");
    props.dispatch(createNotification(notificationMessage));
  };

  const handleUnfollowUser = (e) => {
    e.preventDefault();
    props.dispatch(
      unFollowUserStart({
        user_id: props.liveVideoView.data.live_video_details.user_id,
      })
    );
  };

  const blockUser = () => {
    props.dispatch(
      saveBlockUserStart({
        user_id: props.liveVideoView.data.live_video_details.user_id,
      })
    );
  };

  useEffect(() => {
    if (!skipFirst) {
      if (
        !props.saveBlockUser.loading &&
        Object.keys(props.saveBlockUser.data).length > 0
      ) {
        history.push("/live-streaming");
      }
    }
    setSkipFirst(false);
  }, [props.saveBlockUser]);

  return (
    <>
      {!props.liveVideoView.loading &&
      Object.keys(props.liveVideoView.data).length > 0 ? (
        <>
          <div className="live-streaming-free-user-sec">
            <div className="live-streaming-user-box">
              <div className="live-streaming-user-card-left">
                <div className="live-streaming-header-1-sec">
                  <div className="live-streaming-header-info">
                    {props.liveVideoView.data.live_video_details.is_owner ===
                    0 ? (
                      <div className="live-streaming-user-img-sec">
                        <Image
                          className="live-streaming-user-img"
                          src={
                            props.liveVideoView.data.live_video_details
                              .user_picture
                          }
                        />
                      </div>
                    ) : null}
                    <div className="live-streaming-user-details">
                      {props.liveVideoView.data.live_video_details.is_owner ===
                      0 ? (
                        <h4>
                          {
                            props.liveVideoView.data.live_video_details
                              .user_displayname
                          }
                          {props.liveVideoView.data.live_video_details
                            .is_verified_badge === 1 ? (
                            <span>
                              <Image
                                className="sidebar-verified-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/verified-icon.svg"
                                }
                              />
                            </span>
                          ) : null}
                        </h4>
                      ) : null}
                      <h3>
                        {props.liveVideoView.data.live_video_details.title}
                      </h3>
                    </div>
                  </div>
                  <div className="live-streaming-user-action-btn-sec">
                    <ul className="list-unstyled">
                      {props.liveVideoView.data.live_video_details.is_owner ===
                      0
                        ? props.liveVideoView.data.live_video_details
                            .is_following === 1 && (
                            <Media as="li">
                              <Link
                                to="#"
                                className="new-live-history-btn"
                                onClick={handleUnfollowUser}
                              >
                                Unfollow
                              </Link>
                            </Media>
                          )
                        : null}
                      <Media as="li">
                        <CopyToClipboard
                          text={
                            window.location.origin +
                            "/join-live/" +
                            props.liveVideoView.data.live_video_details
                              .live_video_unique_id
                          }
                          onCopy={onCopy}
                        >
                          <Link to="#" className="new-go-live-btn">
                            Share
                            <Image
                              className="new-go-live-btn-icon"
                              src={
                                window.location.origin +
                                "/assets/images/live-streaming/share-icon.svg"
                              }
                            />
                          </Link>
                        </CopyToClipboard>
                      </Media>
                      {props.liveVideoView.data.live_video_details.is_owner ===
                      0 ? (
                        <Media as="li">
                          <Dropdown className="live-streaming-dropdown">
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              <Image
                                className="live-streaming-dropdown-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/live-streaming/three-dots.svg"
                                }
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => blockUser()}>
                                {t("block")}
                              </Dropdown.Item>
                              {/* <Dropdown.Item onClick={() => setShowReportModal(true)}>Report</Dropdown.Item> */}
                              <Dropdown.Item
                                onClick={() => setShowInfoModal(true)}
                              >
                                {t("view_info")}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Media>
                      ) : null}
                    </ul>
                  </div>
                </div>
                <div className="live-streaming-desc">
                  <p>
                    {props.liveVideoView.data.live_video_details.description}
                  </p>
                </div>
                <div className="live-streaming-live-notify-sec">
                  <div className="live-streaming-count">
                    {props.liveVideoView.data.live_video_details
                      .is_streaming === 1 ? (
                      <Button className="join-now-btn">{t("live")}</Button>
                    ) : null}
                    <p>
                      <DurationTimer
                        time={
                          props.liveVideoView.data.live_video_details.started_at
                        }
                      />
                    </p>
                  </div>
                  <div className="live-streaming-started-info">
                    <h5>
                      {t("stream_started_at")}{" "}
                      <span>
                        {props.liveVideoView.data.live_video_details.started_at}
                      </span>
                    </h5>
                  </div>
                  {/* <div className="mobile-view-comment-sec">
                    <Link to="#" onClick={() => setMobileUserListPaid(true)}>
                      <div className="live-streaming-view-count">
                        <Image
                          className="live-streaming-view-count-icon"
                          src={
                            window.location.origin + "/assets/images/live-streaming/view-count.svg"
                          }
                        />
                        <p>(63)</p>
                      </div>
                    </Link>
                    <Link to="#" onClick={() => setMobileUserComments(true)}>
                      <div className="live-streaming-comments-mobile-display">
                        <Button className="view-comments-btn">
                          View Comments
                        </Button>
                      </div>
                    </Link>
                  </div> */}
                </div>
                <LiveStreamingCard
                  liveVideoDetails={props.liveVideoView.data.live_video_details}
                  isOwner={
                    props.liveVideoView.data.live_video_details.is_owner === 0
                      ? false
                      : true
                  }
                  setTipModal={setShowTipModal}
                />
                {props.liveVideoView.data.live_video_details.is_owner === 0 ? (
                  <>
                    <LiveStreamingStore
                      displayName={
                        props.liveVideoView.data.live_video_details
                          .user_displayname
                      }
                      userUniqueId={
                        props.liveVideoView.data.live_video_details
                          .user_unique_id
                      }
                      products={props.liveVideoView.data.user_products}
                    />
                    <LiveStreamingPost
                      displayName={
                        props.liveVideoView.data.live_video_details
                          .user_displayname
                      }
                      userUniqueId={
                        props.liveVideoView.data.live_video_details
                          .user_unique_id
                      }
                      posts={props.liveVideoView.data.user_posts}
                    />
                    <LiveStreamingRecomendedForYou
                      suggestedUsers={props.liveVideoView.data.suggested_users}
                    />
                  </>
                ) : null}
              </div>
              {/* <LiveStreamingCommentsPaidIndex /> */}
              <div className="live-streaming-user-card-right">
                <LiveStreamingCommentsUserPaidList
                  isOwner={
                    props.liveVideoView.data.live_video_details.is_owner === 0
                      ? false
                      : true
                  }
                  liveVideoUniqueId={
                    props.liveVideoView.data.live_video_details
                      .live_video_unique_id
                  }
                  liveVideoDetails={props.liveVideoView.data.live_video_details}

                  // viewerCnt={props.liveVideoView.data.live_video_details.viewer_cnt}
                  // isPaidLive={props.liveVideoView.data.live_video_details.amount === 0 ? false : true}
                  // amount={props.liveVideoView.data.live_video_details.live_video_paid_amount_formatted}
                />
                <LiveStreamingComments
                  liveVideoId={
                    props.liveVideoView.data.live_video_details.live_video_id
                  }
                  liveVideoDetails={props.liveVideoView.data.live_video_details}
                  isOwner={
                    props.liveVideoView.data.live_video_details.is_owner === 0
                      ? false
                      : true
                  }
                  liveAudienceList={props.liveAudienceList}
                />
              </div>
            </div>
          </div>
          <MobileUserListPaidModal
            mobileUserListPaid={mobileUserListPaid}
            closeMobileUserListPaidModal={closeMobileUserListPaidModal}
            setMobileUserListPaid={setMobileUserListPaid}
          />
          <MobileUserCommentsModal
            mobileUserComments={mobileUserComments}
            closeMobileUserCommentsModal={closeMobileUserCommentsModal}
            setMobileUserComments={setMobileUserComments}
          />
          {showTipModal ? (
            <SendTipPaymentModal
              paymentsModal={showTipModal}
              closepaymentsModal={closeTipModal}
              user_id={props.liveVideoView.data.live_video_details.user_id}
              type="live"
            />
          ) : null}
          {showReportModal ? (
            <ReportModeModal
              reportMode={showReportModal}
              closeReportModeModal={closeReportModal}
              // post={post}
            />
          ) : null}
          {showInfoModal ? (
            <LiveStreamingInfoModal
              liveVideoDetails={props.liveVideoView.data.live_video_details}
              infoModal={showInfoModal}
              closeInfoModal={closeInfoModal}
            />
          ) : null}
        </>
      ) : (
        t("loading")
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideoView: state.liveVideo.singleLiveVideoView,
  saveBlockUser: state.users.saveBlockUser,
  liveAudienceList: state.liveVideo.liveAudienceList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewJoinLiveVideoIndex));
