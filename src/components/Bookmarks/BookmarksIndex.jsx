import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import { fetchBookmarksStart } from "../../store/actions/BookmarkAction";
import PostDisplayCard from "../helper/PostDisplayCard";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import BookmarkLoader from "../Loader/BookmarkLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { translate, t } from "react-multi-lang";

const BookmarksIndex = (props) => {

  const [skip, setSkip] = useState({
    skip: 0,
    take: 12,
  });

  useEffect(() => {
    props.dispatch(
      fetchBookmarksStart({ type: "all", skip: skip.skip, take: skip.take })
    );
    setSkip({
      ...skip,
      skip: skip.skip + skip.take,
    })
  }, []);

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkData);

  // const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkData() {
    props.dispatch(
      fetchBookmarksStart({ type: "all", skip: skip.skip, take: skip.take, append: true })
    );
    setSkip({
      ...skip,
      skip: skip.skip + skip.take,
    })
  }

  return (
    <>
      <div className="edit-profile bookmark-sec">
        <Container>
          <Row>
            <BookmarkNav />
            <Col sm={12} xs={12} md={8}>
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side">
                  <div className="pull-left text-dark">
                    <h3>{t("all_bookmarks")}</h3>
                  </div>
                </div>
              </div>
              {props.bookmark.loading ? (
                <BookmarkLoader />
              ) : props.bookmark.data.posts.length > 0 ? (
                <InfiniteScroll
                  dataLength={props.bookmark.data.posts.length}
                  next={fetchBookMarkData}
                  hasMore={props.bookmark.data.posts.length < props.bookmark.data.total}
                  loader={<BookmarkLoader />}
                  style={{ height: 'auto', overflow: 'hidden' }}
                >
                  {props.bookmark.data.posts.map((post) =>
                    <PostDisplayCard post={post} key={post.post_id} />
                  )}
                </InfiniteScroll>
              ) : (
                <BookmarkNoDataFound />
              )}
            </Col>
          </Row>
          {/* {noMoreData !== true ? (
            <>{isFetching && "Fetching more list items..."}</>
          ) : (
            t("no_more_data")
          )} */}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  bookmark: state.bookmark.bookmark,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(BookmarksIndex));
