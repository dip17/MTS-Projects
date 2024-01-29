import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import { fetchBookmarksAudioStart } from "../../store/actions/BookmarkAction";
import PostDisplayCard from "../helper/PostDisplayCard";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import BookmarkLoader from "../Loader/BookmarkLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { translate, t } from "react-multi-lang";

const BookmarkAudio = (props) => {
  const [skip, setSkip] = useState({
    skip: 0,
    take: 12,
  });

  useEffect(() => {
    props.dispatch(
      fetchBookmarksAudioStart({
        type: "audio",
        skip: skip.skip,
        take: skip.take,
      })
    );
    setSkip({
      ...skip,
      skip: skip.skip + skip.take,
    });
  }, []);

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkAudioData);

  // const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkAudioData() {
    props.dispatch(
      fetchBookmarksAudioStart({
        type: "audio",
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
                  <h3>{t("audios")}</h3>
                </div>
              </div>
            </div>
            {props.bookmarkAudio.loading ? (
              <BookmarkLoader />
            ) : props.bookmarkAudio.data.posts.length > 0 ? (
              <InfiniteScroll
                dataLength={props.bookmarkAudio.data.posts.length}
                next={fetchBookMarkAudioData}
                hasMore={props.bookmarkAudio.data.posts.length < props.bookmarkAudio.data.total}
                loader={<BookmarkLoader />}
                style={{ height: 'auto', overflow: 'hidden' }}
              >
                {props.bookmarkAudio.data.posts.map((post) =>
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
  bookmarkAudio: state.bookmark.bookmarkAudio,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(BookmarkAudio));
