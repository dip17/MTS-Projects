import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Media } from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import BookmarkPhotoLoader from "../Loader/BookmarkPhotoLoader";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import { fetchBookmarksPhotoStart } from "../../store/actions/BookmarkAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { translate, t } from "react-multi-lang";

const BookmarkPhoto = (props) => {
  const [skip, setSkip] = useState({
    skip: 0,
    take: 12,
  });

  useEffect(() => {
    props.dispatch(
      fetchBookmarksPhotoStart({
        type: "image",
        skip: skip.skip,
        take: skip.take,
      })
    );
    setSkip({
      ...skip,
      skip: skip.skip + skip.take,
    });
  }, []);

  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkPhotoData);

  // const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkPhotoData() {
    props.dispatch(
      fetchBookmarksPhotoStart({
        type: "image",
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
          <Col xs={12} sm={12} md={8}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>{t("photos")}</h3>
                </div>
                <div className="pull-right">
                  <Link className="bookmarks-filter" href="#">
                    {/* <Image
                        src="assets/images/icons/sort.svg"
                        className="svg-clone"
                      /> */}
                  </Link>
                </div>
              </div>
              {props.bookmarkPhoto.loading ? (
                <BookmarkPhotoLoader />
              ) : props.bookmarkPhoto.data.posts.length > 0 ? (
                <div className="bookmarks-photos">
                  <InfiniteScroll
                    dataLength={props.bookmarkPhoto.data.posts.length}
                    next={fetchBookMarkPhotoData}
                    hasMore={props.bookmarkPhoto.data.posts.length < props.bookmarkPhoto.data.total}
                    loader={<BookmarkPhotoLoader />}
                    style={{ height: 'auto', overflow: 'hidden' }}
                  >
                    <ul className="box-container three-cols">
                      {props.bookmarkPhoto.data.posts.map((post) =>
                        post.postFiles.length > 0
                          ? (post.postFiles.filter((post) => post.file_type !== "image").length === 0 ?
                            <Media as="li" className="box" key={post.postFiles[0].post_id}>
                              <div className="inner">
                                <a
                                  href={post.postFiles[0].post_file}
                                  target="_blank"
                                  className="glightbox"
                                >
                                  <Image src={post.postFiles[0].post_file} />
                                </a>
                              </div>
                            </Media>
                            : null
                          ) : ""
                      )}
                    </ul>
                  </InfiniteScroll>
                </div>
              ) : (
                <BookmarkNoDataFound />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bookmarkPhoto: state.bookmark.bookmarkPhoto,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(BookmarkPhoto));
