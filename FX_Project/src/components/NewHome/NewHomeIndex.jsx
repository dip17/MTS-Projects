import React, { useState, useEffect } from "react";
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
  Media
} from "react-bootstrap";
import "./NewHome.css";
import { Link } from "react-router-dom";
import NewFeatureStoryIndex from "./NewFeatureStoryIndex";
import NewFeedIndex from "./NewFeedIndex";
import NewFeedRightIndex from "./NewFeedRightIndex";
import {
  fetchHomePostsStart,
  fetchMoreHomePostsStart,
  fetchTrendingUsersStart,
  searchUserStart,
} from "../../store/actions/HomeAction";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import {
  fetchCommentsStart,
  saveCommentStart,
} from "../../store/actions/CommentsAction";
import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import CommonCenterLoader from "../Loader/CommonCenterLoader";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import NewHomeSearch from "./NewSingleView/NewHomeSearch";
import HomeLoader from "../Loader/HomeLoader";
import NoDataFound from "../NoDataFound/NoDataFound";
import NewFeedDisplayCard from "./NewFeedDisplayCard";
import InfiniteScroll from "react-infinite-scroll-component";
import NewFeedSuggestionCard from "./NewFeedSuggestionCard";
import NewFeedTrendingCard from "./NewFeedTrendingCard";


const NewHomeIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchHomePostsStart({
      skip: 0,
      take: 12,
    }));
  }, []);

  const fetchMoreData = () => {
    props.dispatch(fetchMoreHomePostsStart({
      skip: props.posts.data.posts.length,
      take: 12,
    }))
  }

  // const fetchHomeData = () => {
  //   setTimeout(() => {
  //     if (props.posts.length !== 0) {
  //       props.dispatch(fetchHomePostsStart());
  //       setIsFetching(false);
  //     } else {
  //       setNoMoreData(true);
  //     }
  //   }, 3000);
  // };

  // useEffect(() => {
  //   const installGoogleAds = () => {
  //     const elem = document.createElement("script");
  //     elem.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  //     elem.async = true;
  //     elem.defer = true;
  //     document.body.insertBefore(elem, document.body.firstChild);
  //   };
  //   installGoogleAds();
  // }, []);

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchHomeData);

  const [noMoreData, setNoMoreData] = useState(false);

  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const [commentInputData, setCommentInputData] = useState({});

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    props.dispatch(saveCommentStart(commentInputData));
  };

  const [isVisible, setIsVisible] = React.useState(true);

  const showCommentSection = (event, post_id) => {
    setCommentInputData({ post_id: post_id });
    setIsVisible(true);
    props.dispatch(fetchCommentsStart({ post_id: post_id }));
  };

  const handleLike = (event) => {
    event.preventDefault();
  };

  const handleBookmark = (event, post) => {
    event.preventDefault();
    props.dispatch(saveBookmarkStart({ post_id: post.post_id }));
  };

  const closeCommentSection = (event) => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="new-home-page-sec">
        <Container>
          <Row>
            <Col md={12}>
   
              <div className="new-home-page-box">
                <div className="new-home-page-left">
                  {/* <div className="mobile-visible">
                    <div className="new-feed-search-sec">
                      <InputGroup className="mb-0">
                        <FormControl
                          placeholder="Search"
                          aria-describedby="basic-addon2"
                          onChange={handleSearch}
                        />
                        <InputGroup.Text id="basic-addon2">
                          <Image
                            className="new-feeds-search-icon"
                            src={
                              window.location.origin +
                              "/assets/images/feed-story/search-icon.svg"
                            }
                          />
                        </InputGroup.Text>
                      </InputGroup>
                    
                    </div>
                  </div> */}
                  <NewHomeSearch />
                  {/* <NewFeedIndex /> */}
                  <NewFeatureStoryIndex />

                  {props.posts.loading ?
                    <HomeLoader />
                    : props.posts.data.posts.length > 0 ?
                      <InfiniteScroll
                        dataLength={props.posts.data.posts}
                        next={fetchMoreData}
                        hasMore={props.posts.data.posts.length < props.posts.data.total}
                        loader={<HomeLoader />}
                        style={{ height: 'auto', overflow: 'hidden' }}
                      >
                        <div className="new-feed-sec">
                          {props.posts.data.posts.map((post, index) =>
                            <NewFeedDisplayCard post={post} key={index} index={index} />
                          )}
                        </div>
                      </InfiniteScroll>
                      : <NoDataFound />
                  }
                </div>
                <div className="new-home-page-right">
                  <div className="new-feed-right-sec">
                    <NewHomeSearch desktop />
                    <div className="new-feed-suggestions-trending-sec">
                      <NewFeedSuggestionCard />
                      {/* <NewFeedTrendingCard /> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  posts: state.home.homePost,
  searchUser: state.home.searchUser,
  trendingUsers: state.home.trendingUsers,
  postSug: state.home.postSug,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewHomeIndex));
