import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Nav, Tab, InputGroup, FormControl } from "react-bootstrap";
import "./NewExplore.css";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { fetchExploreStart } from "../../../store/actions/PostAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../../NoDataFound/NoDataFound";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewExploreCard = (props) => {

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);


  useEffect(() => {
    props.dispatch(fetchExploreStart({
      ...props.location,
      skip: 0,
      take: take,
    }));
    setSkip(take);
  }, [props.location]);

  const fetchMoreExplore = () => {
    props.dispatch(fetchExploreStart({
      ...props.location,
      skip: skip,
      take: take,
      append: true,
    }));
    setSkip(skip + take);
  }

  const options = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 5,

      }
    },
  };


  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        gutter="3"
      >

        {props.explorePosts.loading ?
          <Masonry>
            {[...Array(7)].map(() =>
              <Skeleton className="new-explore-img" height={Math.floor(Math.random() * (700 - 150 + 1)) + 150} />
            )}
          </Masonry> :
          props.explorePosts.data.posts && props.explorePosts.data.posts.length > 0 ?
            <InfiniteScroll
              dataLength={props.explorePosts.data.posts.length}
              next={fetchMoreExplore}
              hasMore={props.explorePosts.data.posts.length < props.explorePosts.data.total}
              loader={
                <div className="profile-all-post-box">
                  {[...Array(4)].map(() =>
                    <Skeleton
                      className="profile-post-card-loader" />
                  )}
                </div>
              }
              style={{ height: "auto", overflow: "hidden" }}
            >

              <Masonry>
                {props.explorePosts.data.posts.map((post) =>
                  <Link to={`/post/${post.post_unique_id}`}>
                    {post.postFiles.file_type == "image" &&
                      <div >
                        <LazyLoadImage
                          className="new-explore-img"
                          src={post.postFiles.post_file}
                          effect="blur"
                        />
                      </div>
                    }

                    {post.postFiles.file_type == "video" &&
                      <div className="explore-video-img-sec" >
                        <LazyLoadImage
                          className="new-explore-img"
                          src={post.postFiles.preview_file}
                          effect="blur"
                        />
                        <div className="explore-icon-sec">
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/new-explore/video-icon.png"
                            }
                            alt=""
                            className="explore-icon-top-right"
                          />
                        </div>
                      </div>
                    }
                    {post.postFiles.file_type == "audio" &&
                      <div className="explore-audio-img-sec" >

                        <LazyLoadImage
                          className="new-explore-img"
                          src={post.postFiles.preview_file ?
                            post.postFiles.preview_file :
                            window.location.origin + "/assets/images/new-explore/audio-placeholder.jpg"
                          }
                          effect="blur"
                        />
                        <div className="explore-icon-sec">
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/new-explore/audio-icon.png"
                            }
                            alt=""
                            className="explore-icon-top-right"
                          />
                        </div>
                      </div>
                    }
                  </Link>
                )}
              </Masonry>
            </InfiniteScroll>
            : <NoDataFound />

        }
        {/* 
          post.postFiles.file_type == "image" ?
          <div className="explore-multiple-img-sec">
                  <Image
                    className="new-explore-img"
                    src={post.postFiles.post_file}
                  />
                  <div className="explore-icon-sec">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/new-explore/multiple-img-post.png"
                      }
                      alt=""
                      className="explore-icon-top-right"
                    />
                  </div>
                </div>
            <div className="explore-video-img-sec">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/225497/05.jpg"
            />
            <div className="explore-icon-sec">
              <Image
                src={
                  window.location.origin +
                  "/assets/images/new-explore/video-icon.png"
                }
                alt=""
                className="explore-icon-top-right"
              />
            </div>
          </div>
          <div className="explore-audio-img-sec">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/225497/07.jpg"
            />
            <div className="explore-icon-sec">
              <Image
                src={
                  window.location.origin +
                  "/assets/images/new-explore/audio-icon.png"
                }
                alt=""
                className="explore-icon-top-right"
              />
            </div>
          </div>
          <div className="">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/225497/04.jpg"
            />
          </div>
          <div className="">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/225497/03.jpg"
            />
          </div>
          <div className="">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/3_copy.jpg"
            />
          </div>
          <div className="">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/225497/10.jpg"
            />
          </div>
          <div className="">
            <Image
              className="new-explore-img"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/225497/08.jpg"
            />
          </div> */}
        {/* </Masonry> */}
      </ResponsiveMasonry>
    </>
  );
};

const mapStateToPros = (state) => ({
  explorePosts: state.post.explorePosts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(NewExploreCard));

