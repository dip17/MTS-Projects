import React, { useEffect, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import Background from "../LiveStreaming/live-streaming-bg.png";
import LiveStreamingList from "./LiveStreamingList";
import RecomendedForYou from "./RecomendedForYou";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import GoLiveModal from "../helper/GoLiveModal";
import { fetchLiveVideosListStart } from "../../store/actions/LiveVideoAction";
import LiveStreamingLoader from "../Loader/LiveStreamingLoader";

const LiveStreamingIndex = (props) => {
  const [goLive, setGoLive] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [search, setSearch] = useState("");

  useEffect(() => {
    props.dispatch(fetchLiveVideosListStart());
  }, []);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  return (
    <>
      <div className="live-streaming-sec">
        {/* <div className="live-streaming-banner-sec" style={{
                    background: `url(${Background})`,
                }}>
                    <Container fluid>
                        <Row>
                            <Col md={4}>
                                <div className="live-streaming-banner-content">
                                    <h3>Live Videos</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div> */}
        <div className="live-streaming-header-sec">
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="live-streaming-header-sec">
                  {props.profile.loading ? (
                    t("loading")
                  ) : props.profile.data.is_content_creator === 2 ? (
                    <div>
                      <div className="live-streaming-left-sec">
                        <Link
                          to="/live-videos"
                          className="new-live-history-btn"
                        >
                          {t("onlive")}
                        </Link>

                        <Link
                          to="/live-videos-history"
                          className="new-live-history-btn align-right"
                        >
                          {t("my_live_streams")}
                        </Link>

                        <Link
                          to="#"
                          className="new-go-live-btn align-right"
                          onClick={() => setGoLive(true)}
                        >
                          {t("go_live")}
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {props.liveVideosList.loading ? (
          <LiveStreamingLoader />
        ) : (
          <>
            <LiveStreamingList
              liveVideos={props.liveVideosList.data.private_videos}
              loadMore={false}
              title={"Private Videos"}
              link={"/live-videos/private"}
              showNoData={false}
            />
            <LiveStreamingList
              liveVideos={props.liveVideosList.data.public_videos}
              loadMore={false}
              title={"Public Videos For You"}
              link={"/live-videos/public"}
              showNoData={true}
            />
          </>
        )}
      </div>
      {props.profile.loading ? (
        t("loading")
      ) : (
        <GoLiveModal
          goLive={goLive}
          closeGoLiveModal={closeGoLiveModal}
          username={props.profile.data.username}
          userPicture={props.profile.data.picture}
          name={props.profile.data.name}
          user_id={props.profile.data.user_id}
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideosList: state.liveVideo.liveVideosList,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingIndex));
