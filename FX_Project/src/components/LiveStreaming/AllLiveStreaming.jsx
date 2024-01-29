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
import {
  fetchRecommendedLiveVideosStart,
  fetchMoreRecommendedLiveVideosStart,
} from "../../store/actions/LiveVideoAction";
import {
  fetchLiveVideosListStart,
  fetchMoreLiveVideosListStart,
} from "../../store/actions/LiveVideoAction";
import { useParams } from "react-router-dom";
import LiveStreamingLoader from "../Loader/LiveStreamingLoader";

const AllLiveStreaming = (props) => {
  const [goLive, setGoLive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const params = useParams();

  useEffect(() => {
    props.dispatch(
      fetchLiveVideosListStart({
        skip: 0,
        take: 12,
        category_id: selectedCategory ? selectedCategory.value : "",
        search_key: search,
        type: params.type,
      })
    );
  }, [selectedCategory, search, params.type]);

  const fetchMoreLive = () => {
    props.dispatch(
      fetchMoreLiveVideosListStart({
        skip: props.liveVideos.data.videos.length,
        take: 12,
        category_id: selectedCategory ? selectedCategory.value : "",
        search_key: search,
        type: params.type,
      })
    );
  };

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  return (
    <>
      <div className="live-streaming-sec">
        <div className="live-streaming-header-sec">
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="live-streaming-header-sec">
                  {props.profile.loading ? (
                    t("loading")
                  ) : props.profile.data.is_content_creator === 2 ? (
                    <div className="live-streaming-left-sec">
                      <Link
                        to="#"
                        className="new-go-live-btn"
                        onClick={() => setGoLive(true)}
                      >
                        {t("go_live")}
                      </Link>
                      <Link to="#" className="new-live-history-btn">
                        {t("live_history")}
                      </Link>
                    </div>
                  ) : null}
                  <div className="live-streaming-right-sec">
                    <div className="new-profile-store-btn-sec">
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {selectedCategory
                            ? selectedCategory.name
                            :
                             t("select_a_category")
                             }
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <h4
                            className="dropdown-item"
                            onClick={() => setSelectedCategory(null)}
                          >
                         { t("all")}
                          </h4>
                          {!props.profile.loading &&
                            props.profile.data.categories.map((option) => (
                              <h4
                                class="dropdown-item"
                                onClick={() =>
                                  setSelectedCategory({
                                    name: option.name,
                                    value: option.unique_id,
                                  })
                                }
                              >
                                {option.name}
                              </h4>
                            ))}
                        </div>
                      </div>
                      <div className="new-explore-search-sec">
                        <div className="new-explore-search-card">
                          <InputGroup className="mb-0">
                            <InputGroup.Text>
                              <Image
                                className="new-explore-search-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/search.svg"
                                }
                              />
                            </InputGroup.Text>
                            <FormControl
                              placeholder={t("search_live_video")}
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {props.liveVideos.loading ? (
          <LiveStreamingLoader />
        ) : (
          <LiveStreamingList
            liveVideos={props.liveVideos.data.videos}
            loadMore={true}
            fetchMorePost={fetchMoreLive}
            title={`${params.type} Live Videos`}
            showNoData={true}
            total={props.liveVideos.data.total}
            errorCount={props.liveVideos.errorCount}
          />
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
  liveVideos: state.liveVideo.liveVideosList,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AllLiveStreaming));
