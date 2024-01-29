import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import {
  Button,
  Container,
  Row,
  Col,
  Table,
  Badge,
  Image,
} from "react-bootstrap";
import NoDataFound from "../NoDataFound/NoDataFound";
import BillingAccountLoader from "../Loader/BillingAccountLoader";
import GoLiveModal from "../helper/GoLiveModal";
import {
  fetchLiveVideosHistoryStart,
  fetchMoreLiveVideoHistoryStart,
} from "../../store/actions/LiveVideoAction";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import "../Wallet/Wallet.css";
import LiveStreamingDataCard from "../LiveStreaming/LiveStreamingDataCard";
import LiveStreamingLoader from "../Loader/LiveStreamingLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const LiveVideosIndex = (props) => {
  const [goLive, setGoLive] = useState(false);

  useEffect(() => {
    if (props.userDetails.loading) props.dispatch(fetchUserDetailsStart());
    props.dispatch(
      fetchLiveVideosHistoryStart({
        skip: 0,
        take: 12,
      })
    );
  }, []);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  const fetchMoreLiveVideoHistory = () => {
    props.dispatch(
      fetchMoreLiveVideoHistoryStart({
        skip: props.liveVideos.data.videos.length,
        take: 12,
      })
    );
  };

  return (
    <>
      {/* <div className="wallet-sec live-video-list-header-sec">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="wallet-header-sec">
                <Row>
                  <Col sm={12} md={12} xl={8}>
                    <Link
                      className="bookmarkes-list notify-title back-button"
                      onClick={() => props.history.goBack()}
                    >
                      <img
                        src={
                          window.location.origin +
                          "/assets/images/icons/back-white.svg"
                        }
                        className="svg-clone"
                      />
                      <h3 className="ml-2 mb-0">{t("live_history")}</h3>
                    </Link>
                    <h3></h3>
                  </Col>
                  <Col sm={12} md={12} xl={4} className="align-right">
                    <div>
                      <Link
                        className="live-history-btn mr-2"
                        to={"/live-videos"}
                      >
                        {t("live_videos")}
                      </Link>

                      <Link
                        className="go-live-btn"
                        onClick={() => setGoLive(true)}
                      >
                        {t("go_live")}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="trans-table-sec">
        <Container>
          {props.liveVideos.loading ? (
            <LiveStreamingLoader />
          ) : props.liveVideos.data.videos &&
            props.liveVideos.data.videos.length > 0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-center">
                        <th>{t("title")}</th>
                        <th>{t("username")}</th>
                        <th>{t("streamed_date")}</th>
                        <th>{t("view_count")}</th>
                        <th>{t("status")}</th>
                        <th>{t("amount")}</th>
                        <th>{t("revenue")}</th>
                        <th>{t("action")}</th> 
                      </tr>
                    </thead>
                    <tbody>
                      {props.liveVideos.data.videos.map((videos) => (
                        <tr key={videos.user_billing_account_id}>
                          <td>{videos.title}</td>
                          <td>{videos.user_displayname}</td>
                          <td>{videos.created_at_formatted}</td>
                          <td>{videos.viewer_cnt}</td>
                          <td>{videos.payment_type_text}</td>
                          <td>{videos.amount_formatted}</td>
                          <td>{videos.user_amount_formatted}</td>
                          <td>

                                <Button
                                  style={{ marginBottom: "1rem" }}
                                >
                                  {t("view")}
                                </Button>

                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
        
          ) : (
            <NoDataFound />
          )}
        </Container>
        
      </div> */}

      <div className="live-streaming-sec">
        <div className="live-streaming-header-sec">
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="live-streaming-header-sec">
                  {props.userDetails.loading ? (
                    t("loading")
                  ) : props.userDetails.data.is_content_creator === 2 ? (
                    <div className="live-streaming-left-sec">
                      <Link to="/live-videos" className="new-live-history-btn">
                        {t("onlive")}
                      </Link>

                      <Link
                        to="/live-videos-history"
                        className="new-live-history-btn pull-right"
                      >
                        {t("my_live_streams")}
                      </Link>
                      <Link
                        to="#"
                        className="new-go-live-btn pull-right"
                        onClick={() => setGoLive(true)}
                      >
                        {t("go_live")}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid>
          {props.liveVideos.loading ? (
            <LiveStreamingLoader />
          ) : props.liveVideos.data.videos &&
            props.liveVideos.data.videos.length > 0 ? (
            <>
              <div className="most-popular-header-sec">
                <h4>{t("my_live_streams")}</h4>
              </div>
              <InfiniteScroll
                dataLength={props.liveVideos.data.videos.length}
                next={fetchMoreLiveVideoHistory}
                hasMore={
                  props.liveVideos.data.videos.length <
                  props.liveVideos.data.total
                }
                loader={<LiveStreamingLoader />}
                style={{ height: "auto", overflow: "hidden" }}
              >
                <div className="most-popular-live-box">
                  {props.liveVideos.data.videos.map((live, index) => (
                    <div className="most-popular-live-card">
                      <div className="most-popular-thumbnail-img-sec">
                        <Image
                          className="most-popular-thumbnail-img"
                          src={live.snapshot}
                        />
                      </div>

                      <div className="most-popular-user-info-card">
                        <Link to={`/${live.username}`} className="most-popular-user-name">
                          <div className="most-popular-user-info">
                            <Image
                              className="most-popular-user-img"
                              src={live.user_picture}
                            />

                            <div className="most-popular-user-details">
                              <h4>
                                {live.user_displayname}
                                <span>
                                  <Image
                                    className="sidebar-verified-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/new-home/verified-icon.png"
                                    }
                                  />
                                </span>
                              </h4>
                              <span className="most-popular-user-name">
                                @{live.username}
                              </span>
                            </div>
                          </div>
                        </Link>
                        {live.status === 0 && (
                          <div className="most-popular-user-btn-sec">
                            <Link
                              className="join-now-btn"
                              to={`/join-live/${live.live_video_unique_id}`}
                            >
                              {t("join_now")}
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="most-popular-product-info">
                        <h3>{live.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </>
          ) : (
            <NoDataFound />
          )}
        </Container>
      </div>
      {props.userDetails.loading ? (
        t("loading")
      ) : (
        <GoLiveModal
          goLive={goLive}
          closeGoLiveModal={closeGoLiveModal}
          username={props.userDetails.data.username}
          userPicture={props.userDetails.data.picture}
          name={props.userDetails.data.name}
          user_id={props.userDetails.data.user_id}
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideos: state.liveVideo.liveVideosHistory,
  userDetails: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveVideosIndex));
