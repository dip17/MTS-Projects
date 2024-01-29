import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { fetchLiveVideosStart } from "../../store/actions/LiveVideoAction";
import { Link } from "react-router-dom";
import NoDataFound from "../NoDataFound/NoDataFound";
import BillingAccountLoader from "../Loader/BillingAccountLoader";
import { translate, t } from "react-multi-lang";
import GoLiveModal from "../helper/GoLiveModal";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import LiveDataCard from "./LiveDataCard";
import UserLiveVideoLoader from "../Loader/UserLiveVideoLoader";
import "../Wallet/Wallet.css";
import Skeleton from "react-loading-skeleton";

const UserLiveVideosIndex = (props) => {
  const [goLive, setGoLive] = useState(false);

  useEffect(() => {
    if (props.userDetails.loading) props.dispatch(fetchUserDetailsStart());
    props.dispatch(fetchLiveVideosStart());
  }, []);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  return (
    <>
      <div className="wallet-sec live-video-list-header-sec">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="wallet-header-sec">
                <Row className="align-items-center">
                  <Col sm={12} md={12} xl={2}>
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
                      <h3 className="ml-2 mb-0">{t("on_live")}</h3>
                    </Link>
                  </Col>
                  <Col sm={12} md={12} xl={10} className="text-right">
                    <div className="resp-btn-align">
                      <Link
                        className="live-history-btn mr-2"
                        to={"/live-videos-history"}
                      >
                        {t("my_live_streams")}
                      </Link>

                      <Link
                        className="go-live-btn"
                        onClick={() => setGoLive(true)}
                      >
                        {t("go_live")}
                      </Link>
                      <Link
                        to={"/audio-calls-history"}
                        className="audio-call-btn"
                      >
                    {t("audio_call")}
                      </Link>
                      <Link
                        to={"/video-calls-history"}
                        className="video-call-btn"
                      >
                       {t("video_call")}
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
            <div className="video-list-sec">
              {[...Array(6)].map(() => (
                <Skeleton width={350} height={240} />
              ))}
            </div>
          ) : props.liveVideos.data.videos.filter(
              (liveVideo) => liveVideo.user_id != localStorage.getItem("userId")
            ).length > 0 ? (
            <div className="video-list-sec">
              {props.liveVideos.data.videos
                .filter(
                  (liveVideo) =>
                    localStorage.getItem("userId") != String(liveVideo.user_id)
                )
                .map((video) => (
                  <LiveDataCard video={video} key={video.live_video_id} />
                ))}
            </div>
          ) : (
            <NoDataFound />
          )}
        </Container>
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
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideos: state.liveVideo.liveVideos,
  userDetails: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(UserLiveVideosIndex));
