import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Media } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import BookmarkVideoLoader from "../Loader/BookmarkVideoLoader";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import { fetchBookmarksVideoStart } from "../../store/actions/BookmarkAction";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactPlayer from "react-player/lazy";
import BookmarkLoader from "../Loader/BookmarkLoader";
import PostDisplayCard from "../helper/PostDisplayCard";
import { translate, t } from "react-multi-lang";

const BookmarkVideo = (props) => {
  const [skip, setSkip] = useState({
    skip: 0,
    take: 12,
  })

  useEffect(() => {
    props.dispatch(
      fetchBookmarksVideoStart({
        type: "video",
        skip: skip.skip,
        take: skip.take,
      })
    );
    setSkip({
      ...skip,
      skip: skip.skip + skip.take,
    });
  }, []);

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkVideoData);

  // const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkVideoData() {
    props.dispatch(
      fetchBookmarksVideoStart({
        type: "video",
        skip: skip.skip,
        take: skip.take,
        append: true,
      })
    );
    setSkip({
      ...skip,
      skip: skip.skip + skip.take,
    });
  }

  return (
    <div className="edit-profile book-photo">
      <Container>
        <Row>
          <BookmarkNav />
          <Col sm={12} xs={12} md={8}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>{t("Videos")}</h3>
                </div>
              </div>
            </div>
            {props.bookmarkVideo.loading ? (
              <BookmarkLoader />
            ) : props.bookmarkVideo.data.posts.length > 0 ? (
              <InfiniteScroll
                dataLength={props.bookmarkVideo.data.posts.length}
                next={fetchBookMarkVideoData}
                hasMore={props.bookmarkVideo.data.posts.length < props.bookmarkVideo.data.total}
                loader={<BookmarkLoader />}
                style={{ height: 'auto', overflow: 'hidden' }}
              >
                {props.bookmarkVideo.data.posts.map((post) =>
                  <PostDisplayCard post={post} key={post.post_id} />
                )}
              </InfiniteScroll>
            ) : (
              <BookmarkNoDataFound />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bookmarkVideo: state.bookmark.bookmarkVideo,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(BookmarkVideo));
