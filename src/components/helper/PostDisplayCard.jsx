import React, { useRef, useState } from "react";
import {
  Dropdown,
  Image,
  Media,
  Form,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import {
  fetchCommentsStart,
  fetchCommentRepliesStart,
  saveCommentStart,
} from "../../store/actions/CommentsAction";
import { savePostLikeStart } from "../../store/actions/PostLikesAction";
import ImageLoader from "./ImageLoader";
import SendTipModal from "./SendTipModal";
import ReportModeModal from "./ReportModeModal";
import PPVPaymentModal from "./PPVPaymentModal";
import ReactPlayer from "react-player/lazy";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getSuccessNotificationMessage,getErrorNotificationMessage } from "../helper/NotificationMessage";
import {
  deletePostStart,
  saveReportPostStart,
  fetchSinglePostStart,
} from "../../store/actions/PostAction";
import { saveBlockUserStart } from "../../store/actions/UserAction";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { translate, t } from "react-multi-lang";
import CommentReplies from "./CommentReplies";
import Slider from "react-slick";
import { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import CommonCenterLoader from "../Loader/CommonCenterLoader";
import Comments from "./Comments";

const PostDisplayCard = (props) => {
  const { post } = props;
  let totalLikes = props.post.total_likes ? props.post.total_likes : 0;

  const [PPVPayment, setPPVPayment] = useState(false);
  const [sendTip, setSendTip] = useState(false);
  const [commentInputData, setCommentInputData] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [commentActiveIndex, setCommentActiveIndex] = useState(null);

  const [reportMode, setReportMode] = useState(false);

  const closeReportModeModal = () => {
    setReportMode(false);
  };

  const [bookmarkStatus, setBookmarkStatus] = useState("");
  const [postDisplayStatus, setPostDisplayStatus] = useState(true);
  const [likeStatus, setLikeStatus] = useState("");
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [modalStatus, setModalStatus] = useState('');
  const [initialRender, setInitialRender] = useState(false);
  const [likeFormatted, setLikeFormatted] = useState(post.liked_by_formatted);

  useEffect(() => {
    if (initialRender) {
      props.dispatch(
        fetchSinglePostStart({ post_unique_id: post.post_unique_id })
      );
    }
    setInitialRender(true);
  }, [likeStatus]);

  useEffect(() => {
    setLikeFormatted(
      props.singlePost.data.post
        ? props.singlePost.data.post.liked_by_formatted
        : post.liked_by_formatted
    );
    
  }, [props.singlePost.data]);

  const closeSendTipModal = () => {
    setSendTip(false);
  };
  const closePPVPaymentModal = () => {
    setPPVPayment(false);
  };

  const handleImagePreview = (event, paymentStatus,post_file) => {
    event.preventDefault();
    if (paymentStatus == 0) {
      setModalStatus(post_file);
    }
  };

  const showCommentSection = (event, post_id) => {
    if(!localStorage.getItem("userId")) {
      const notificationMessage = getErrorNotificationMessage(
        t('login_to_continue')
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      setCommentInputData({ post_id: post_id });
      setIsVisible(true);
      props.dispatch(fetchCommentsStart({ post_id: post_id }));
    }
  };

  const showCommentReplySection = (event, post_id, post_comment_id) => {
    props.dispatch(
      fetchCommentRepliesStart({
        post_id: post_id,
        post_comment_id: post_comment_id,
      })
    );
  };

  const handleLike = (event, status) => {
    event.preventDefault();

    if(!localStorage.getItem("userId")) {
      const notificationMessage = getErrorNotificationMessage(
        t('login_to_continue')
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      setLikeStatus(status);
      props.dispatch(savePostLikeStart({ post_id: post.post_id }));
      if (status == "added") {
        let currentLikeCount = likeCount + 1;
        setLikeCount(currentLikeCount);
      } else {
        let currentLikeCount = likeCount - 1;
        setLikeCount(currentLikeCount);
      }
    }
  };

  const handlePPVPayment = (event, status,post_file) => {
    event.preventDefault();
    if (status && status == 1) {
      setModalStatus('');
      setPPVPayment(true);
    } else {
      setModalStatus(post_file);
      setPPVPayment(false);
    }
  };

  const handleBookmark = (event, post, status) => {
    event.preventDefault();
    if(!localStorage.getItem("userId")) {
      const notificationMessage = getErrorNotificationMessage(
        t('login_to_continue')
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      setBookmarkStatus(status);
      props.dispatch(saveBookmarkStart({ post_id: post.post_id }));
    }
  };

  const handleReportPost = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(saveReportPostStart({ post_id: post.post_id }));
  };
  const handleBlockUser = (event, post) => {
    event.preventDefault();
    if(localStorage.getItem("userId")) {
      setPostDisplayStatus(false);
      props.dispatch(saveBlockUserStart({ user_id: post.user_id }));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t('login_to_continue')
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };

  const handleDeletePost = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(deletePostStart({ post_id: post.post_id }));
  };

  const closeCommentSection = (event) => {
    setIsVisible(false);
  };
  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t('profile_link_copied')
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleCommentActiveIndex = (index) => {
    setCommentActiveIndex(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    // autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 2000,
    fade:true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // function triggerPicker(event) {
  //   event.preventDefault();
  //   SetEmojiPicker(!emojiPickerState);
  // }

  // const handleEmojiSelect = (emoji) => {
  //   SetEmojiPicker(false);
  //   setEditorState(insertCharacter(emoji.native, editorState));
  // };

  // const insertCharacter = (emoji, editorState) => {
  //   const currentContent = editorState.getCurrentContent();
  //   const currentSelection = editorState.getSelection();

  //   const newContent = Modifier.insertText(
  //     currentContent,
  //     currentSelection,
  //     emoji
  //   );

  //   const newEditorState = EditorState.push(
  //     editorState,
  //     newContent,
  //     "insert-characters"
  //   );

  //   return EditorState.forceSelection(
  //     newEditorState,
  //     newContent.getSelectionAfter()
  //   );
  // };
  
  return (
    <>
      {postDisplayStatus == true ? (
        <div className="post-list post-view-sec">
          <div className="post-header">
            <div className="alignleft">
              <Link className="title-container" to={`/${post.user_unique_id}`}>
                <ImageLoader
                  image={post.user_picture}
                  className="user-image img-responsive"
                />

                <div className="user-name">
                  <span className="post-user-name">
                    <span className="user-name-post">
                      {post.user_displayname}
                    </span>
                    {"  "}
                    {post.is_verified_badge == 1 ? (
                      <VerifiedBadgeNoShadow />
                    ) : null}
                  </span>
                  <span className="post-user-">@{post.username}</span>
                </div>
              </Link>
            </div>
            <div className="alignright">
              <div className="post-header-right-side">
                <span className="post-time flex-content">
                  <span className="post-time">
                    {post.publish_time_formatted}
                  </span>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="btn btn-default dropdown-toggle"
                      type="button"
                      id="dropdown-basic"
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/vertical-dots.svg"
                        }
                        className="svg-clone vertical-dots"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <CopyToClipboard text={post.share_link} onCopy={onCopy}>
                        <Media as="li">
                          <Link to="#" className="dropdown-a">
                            {" "}
                            {t("copy_link_to_post")}{" "}
                          </Link>
                        </Media>
                      </CopyToClipboard>
                      <Media as="li" className="divider"></Media>

                      {localStorage.getItem("userId") != post.user_id ? (
                        <Media as="li">
                          <Link
                            to="#"
                            // onClick={(event) => handleReportPost(event, post)}
                            onClick={() => 
                              {
                                if(localStorage.getItem("userId")) {
                                  setReportMode(true)
                                } else {
                                  const notificationMessage = getErrorNotificationMessage(
                                    t('login_to_continue')
                                  );
                                  props.dispatch(createNotification(notificationMessage));
                                }
                              }
                            }
                            className="dropdown-a"
                          >
                            {t("report")}
                          </Link>
                        </Media>
                      ) : null}
                      {/* Report Post with reasons start */}
                      {/* <Media as="li">
                        <Link onClick={() => setReportMode(true)}>
                          {" "}
                          Report{" "}
                        </Link>
                      </Media> */}
                      {/* Report Post with reasons end */}

                      {localStorage.getItem("userId") != post.user_id ? (
                        <Media as="li">
                          <Link
                            to="#"
                            onClick={(event) => handleBlockUser(event, post)}
                            className="dropdown-a"
                          >
                            {" "}
                            {t("add_to_blocklist_para")}
                          </Link>
                        </Media>
                      ) : null}
                      {post.delete_btn_status == 1 ? (
                        <>
                          <Media as="li" className="divider"></Media>

                          <Media as="li">
                            <Link
                              to="#"
                              onClick={(event) => handleDeletePost(event, post)}
                              className="dropdown-a"
                            >
                              {t("delete_post")}
                            </Link>
                          </Media>
                        </>
                      ) : null}
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                {post.is_user_needs_pay === 1 ? (
                  post.payment_info.post_payment_type === "ppv" ? (
                    <span
                      className="post-time"
                      onClick={(event) =>
                        handlePPVPayment(event, post.is_user_needs_pay)
                      }
                    >
                      <span className="post-tip-lock">
                        {post.amount_formatted}{" "}
                      </span>
                      <Link
                        to="#"
                        onClick={(event) =>
                          handlePPVPayment(event, post.is_user_needs_pay)
                        }
                      >
                        <i className="fa fa-lock"></i>
                      </Link>
                    </span>
                  ) : (
                    <Link to="#">
                      <i className="fa fa-unlock text-success"></i>
                    </Link>
                  )
                ) : post.amount > 0 ? (
                  <span className="post-time">
                    <span className="post-tip-lock">
                      {post.amount_formatted}{" "}
                    </span>
                    <Link to="#">
                      <i className="fa fa-unlock text-success"></i>
                    </Link>
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="post-content">
            {/* <p>{post.content != undefined ? post.content : ""}</p> */}
            <p
              dangerouslySetInnerHTML={{
                __html: post.content != undefined ? post.content : "",
              }}
            ></p>
            <Slider {...settings} className="tab-home-post-slider">
              {post.postFiles
                ? post.postFiles.length > 0
                  ? post.postFiles.map((postFile, index) =>
                      postFile.file_type === "image" ? (
                        <Link
                          to="#"
                          key={index}
                          onClick={(event) =>
                            post.payment_info.post_payment_type === "ppv" &&
                            post.payment_info.is_user_needs_pay === 1
                              ? handlePPVPayment(
                                  event,
                                  post.payment_info.is_user_needs_pay,
                                  postFile.post_file
                                )
                              : handleImagePreview(
                                  event,
                                  post.payment_info.is_user_needs_pay,
                                  postFile.post_file
                                )
                          }
                        >
                          <div className="post-image" key={index}>
                            <div className="">
                              <div className="gallery js-gallery">
                                {post.payment_info.is_user_needs_pay == 1 ? (
                                  <Image
                                    src={postFile.post_file}
                                    className="post-view-image"
                                    style={{ filter: "blur(20px)" }}
                                  />
                                ) : (
                                  <Image
                                    src={postFile.post_file}
                                    className="post-view-image"
                                    onClick={(event) =>
                                      handleImagePreview(event,post.payment_info.is_user_needs_pay,postFile.post_file)
                                    }
                                  />
                                )}
                              </div>
                              {post.payment_info.is_user_needs_pay === 1 &&
                              post.payment_info.post_payment_type === "ppv" ? (
                                <div className="gallery-top-btn-sec">
                                  <Button
                                    className="subscribe-post-btn-sec"
                                    onClick={(event) =>
                                      handlePPVPayment(event, 1,postFile.post_file)
                                    }
                                  >
                                    {post.payment_info.payment_text}
                                  </Button>
                                </div>
                              ) : (
                                ""
                              )}
                              {post.payment_info.is_user_needs_pay === 1 &&
                              post.payment_info.post_payment_type ===
                                "subscription" ? (
                                  props.scrollToTop ? 
                                    <div
                                      className="gallery-top-btn-sec"
                                      onClick={props.scrollToTop}
                                    >
                                      <Button className="subscribe-post-btn-sec">
                                        {post.payment_info.payment_text}
                                      </Button>
                                    </div>
                                  : 
                                    <Link
                                      to={`/` + post.user.unique_id}
                                    >
                                      <div
                                        className="gallery-top-btn-sec"
                                      >
                                        <Button className="subscribe-post-btn-sec">
                                          {post.payment_info.payment_text}
                                        </Button>
                                      </div>
                                    </Link>
                                
                              ) : (
                                ""
                              )}
                            </div>
                            {modalStatus ? (
                              <Lightbox
                                mainSrc={modalStatus}
                                // nextSrc={images[(photoIndex + 1) % images.length]}
                                // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                onCloseRequest={() => setModalStatus('')}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </Link>
                      ) : postFile.file_type === "video" ? (
                        <div className="post-image post-video" key={index}>
                          <div className="">
                            <div className="gallery js-gallery">
                              {post.payment_info.is_user_needs_pay == 1 ? (
                                postFile.video_preview_file ? 
                                  <ReactPlayer
                                    // light={postFile.preview_file}
                                    url={postFile.video_preview_file}
                                    controls={false}
                                    width="100%"
                                    height="100%"
                                    playing={true} 
                                    loop={true}
                                    muted={true}
                                    autoplay={true}
                                    className="post-video-size video-bg-black"
                                  />
                                : 
                                  <div className="gallery-img-sec">
                                    <Image
                                      src={
                                        postFile.preview_file
                                          ? postFile.preview_file
                                          : postFile.post_file
                                      }
                                      className="post-view-image"
                                    />
                                    <div className="gallery-play-icon"></div>
                                  </div>
                              ) : (
                                props.isVideoAutoPlay ?
                                  <ReactPlayer
                                    // light={postFile.preview_file}
                                    url={postFile.post_file}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    playing={true} 
                                    muted={true}
                                    autoplay={true}
                                    className="post-video-size video-bg-black"
                                  />
                                : 
                                  <Link
                                    to={localStorage.getItem("userId") ? "/post/" + post.post_unique_id : '#'}
                                    onClick= {() =>
                                      {
                                        if(!localStorage.getItem("userId")) {
                                          
                                          const notificationMessage = getErrorNotificationMessage(
                                            t('login_to_continue')
                                          );
                                          props.dispatch(createNotification(notificationMessage));
                                        }
                                      }
                                    }
                                  >
                                    <div className="gallery-img-sec">
                                      <Image
                                        src={
                                          postFile.preview_file
                                            ? postFile.preview_file
                                            : postFile.post_file
                                        }
                                        className="post-view-image"
                                      />
                                      <div className="gallery-play-icon"></div>
                                    </div>
                                  </Link>                                  
                              )}
                              {post.payment_info.is_user_needs_pay === 1 &&
                              post.payment_info.post_payment_type === "ppv" ? (
                                <div className={postFile.video_preview_file ? "gallery-top-btn-sec top-right" : "gallery-top-btn-sec"}>
                                  <Button
                                    className="subscribe-post-btn-sec"
                                    onClick={(event) =>
                                      handlePPVPayment(event, 1,postFile.post_file)
                                    }
                                  >
                                    {post.payment_info.payment_text}
                                  </Button>
                                </div>
                              ) : (
                                ""
                              )}
                              {post.payment_info.is_user_needs_pay === 1 &&
                              post.payment_info.post_payment_type ===
                                "subscription" ? (
                                  props.scrollToTop ? 
                                    <div
                                      className="gallery-top-btn-sec"
                                      onClick={props.scrollToTop}
                                    >
                                      <Button className="subscribe-post-btn-sec">
                                        {post.payment_info.payment_text}
                                      </Button>
                                    </div>
                                  :
                                  <Link
                                    to={`/` + post.user.unique_id}
                                  >
                                    <div
                                      className="gallery-top-btn-sec"
                                    >
                                      <Button className="subscribe-post-btn-sec">
                                        {post.payment_info.payment_text}
                                      </Button>
                                    </div>
                                  </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ) : postFile.file_type === "audio" ? (
                        <div className="post-image post-video" key={index}>
                          <div className="">
                            <div className="gallery js-gallery">
                              {post.payment_info.is_user_needs_pay == 1 ? (
                                <div className="gallery-img-sec">
                                  <Image
                                    src={
                                      postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file
                                    }
                                    className="post-view-image"
                                  />
                                  <div className="gallery-play-icon"></div>
                                </div>
                              ) : (
                                <ReactAudioPlayer
                                  // light={postFile.preview_file}
                                  src={postFile.post_file}
                                  // file="forceAudio"
                                  controls={true}
                                  width="100%"
                                  height="100%"
                                  autoPlay={false}
                                  className="post-video-size"
                                  controlsList={"nodownload"}
                                />
                              )}
                              {post.payment_info.is_user_needs_pay === 1 &&
                              post.payment_info.post_payment_type === "ppv" ? (
                                <div className="gallery-top-btn-sec">
                                  <Button
                                    className="subscribe-post-btn-sec"
                                    onClick={(event) =>
                                      handlePPVPayment(event, 1,postFile.post_file)
                                    }
                                  >
                                    {post.payment_info.payment_text}
                                  </Button>
                                </div>
                              ) : (
                                ""
                              )}
                              {post.payment_info.is_user_needs_pay === 1 &&
                              post.payment_info.post_payment_type ===
                                "subscription" ? (
                                  props.scrollToTop ?
                                    <div
                                      className="gallery-top-btn-sec"
                                      onClick={props.scrollToTop}
                                    >
                                      <Button className="subscribe-post-btn-sec">
                                        {post.payment_info.payment_text}
                                      </Button>
                                    </div>
                                  :
                                  <Link
                                      to={`/` + post.user.unique_id}
                                    >
                                    <div
                                      className="gallery-top-btn-sec"
                                    >
                                      <Button className="subscribe-post-btn-sec">
                                        {post.payment_info.payment_text}
                                      </Button>
                                    </div>
                                  </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : null
                : null}
            </Slider>
          </div>

          <div className="post-icons">
            <div className="alignleft">
              {likeStatus !== "" ? (
                <>
                  <>
                    {likeStatus === "added" ? (
                      <Link
                        to="#"
                        onClick={(event) => handleLike(event, "removed")}
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/heart-active.svg"
                          }
                          className="svg-clone"
                        />
                      </Link>
                    ) : null}
                  </>
                  <>
                    {likeStatus === "removed" ? (
                      <Link
                        to="#"
                        onClick={(event) => handleLike(event, "added")}
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/heart.svg"
                          }
                          className="svg-clone"
                        />
                      </Link>
                    ) : null}
                  </>
                </>
              ) : post.is_user_liked == 1 ? (
                <Link to="#" onClick={(event) => handleLike(event, "removed")}>
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/heart-active.svg"
                    }
                    className="svg-clone"
                  />
                </Link>
              ) : (
                <Link to="#" onClick={(event) => handleLike(event, "added")}>
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/heart.svg"
                    }
                    className="svg-clone"
                  />
                </Link>
              )}

              <Link
                to="#"
                onClick={(event) => showCommentSection(event, post.post_id)}
              >
                <Image
                  src={
                    window.location.origin + "/assets/images/icons/comment.svg"
                  }
                  className="svg-clone"
                />
              </Link>
              
              {localStorage.getItem("userId") != post.user_id ? (
                <Button
                  type="button"
                  className="g-icon"
                  onClick={() => 
                    {
                      if(localStorage.getItem("userId")) {
                        setSendTip(true)
                      } else {
                        const notificationMessage = getErrorNotificationMessage(
                          t('login_to_continue')
                        );
                        props.dispatch(createNotification(notificationMessage));
                      }
                    }
                  }
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/tips.png"
                    }
                    className="svg-clone"
                  />

                  {/* <span className="post-tip">{t("send_tip")}</span> */}
                </Button>
              ) : null}
            </div>
            <div className="alignright">
              {bookmarkStatus !== "" ? (
                <>
                  <>
                    {bookmarkStatus === "added" ? (
                      <Link
                        to="#"
                        onClick={(event) =>
                          handleBookmark(event, post, "removed")
                        }
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/bookmark-active.svg"
                          }
                          className="svg-clone"
                        />
                      </Link>
                    ) : null}
                  </>
                  <>
                    {bookmarkStatus === "removed" ? (
                      <Link
                        to="#"
                        onClick={(event) =>
                          handleBookmark(event, post, "added")
                        }
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/bookmark.svg"
                          }
                          className="svg-clone"
                        />
                      </Link>
                    ) : null}
                  </>
                </>
              ) : post.is_user_bookmarked == 1 ? (
                <Link
                  to="#"
                  onClick={(event) => handleBookmark(event, post, "removed")}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/bookmark-active.svg"
                    }
                    className="svg-clone"
                  />
                </Link>
              ) : (
                <Link
                  to="#"
                  onClick={(event) => handleBookmark(event, post, "added")}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/bookmark.svg"
                    }
                    className="svg-clone"
                  />
                </Link>
              )}
            </div>
          </div>
          {post.like_count > 0 && (
            <div className="likes alignleft">
              {/* <p>
                  {likeCount} {t("likes")}
                </p> */}
              <p className="post-like-text">{likeFormatted}</p>
            </div>
          )}
          {isVisible && commentInputData.post_id === post.post_id  ? (
            post.total_comments > 0 && (
            <Link
              to="#"
              className="Show view-comments  d-block pt-3"
              onClick={closeCommentSection}
            >
              {t("close_comments")}
            </Link>)
          ) : (
            <>
              {post.total_comments > 0 && (
                <Link
                  to="#"
                  className="Show view-comments text-muted d-block pt-3"
                  onClick={(event) => showCommentSection(event, post.post_id)}
                >
                  {t("view_comments")}
                </Link>
              )}
            </>
          )}
          {isVisible && commentInputData.post_id === post.post_id ? (
            <div id="target">
              {props.comments.loading
                ? <CommonCenterLoader />
                : props.comments.data.post_comments && props.comments.data.post_comments.length > 0
                ? props.comments.data.post_comments.map((comment, index) => (
                    <div className="row comment-row" key={index}>
                      <div className="alignleft">
                        <Link
                          className="title-container"
                          to={`/` + comment.user_unique_id}
                        >
                          
                          <Image
                            src={comment.user_picture}
                            className="user-image img-responsive"
                          />
                        </Link>
                        <div className="user-name">
                          <span className="card-title">
                            <Link
                              className="title-container-1"
                              to={`/` + comment.user_unique_id}
                            >
                              {comment.user_displayname}{" "}
                              {/* <p>@{comment.username}</p> */}
                            </Link>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  comment.comment != undefined
                                    ? comment.comment
                                    : "",
                              }}
                              className="comment-message"
                            ></span>
                          </span>
                          <div className="comment-info-sec">
                            <ul className="list-unstyled comment-info-link">
                              <Media as="li">
                                <p>{comment.created}</p>
                              </Media>
                              {/* <Media as="li">
                                  <p>1 Like</p>
                              </Media>*/}
                              <Media as="li">
                                {commentActiveIndex != index ? 
                                  <Link
                                    to="#"
                                    onClick={(event) => {
                                      showCommentReplySection(
                                        event,
                                        post.post_id,
                                        comment.post_comment_id
                                      );
                                      handleCommentActiveIndex(index);
                                    }}
                                  >
                                    <p>{comment.total_comment_replies > 0 ? (
                                      <>
                                      {comment.total_comment_replies}{t("replies")}
                                      </>
                                    ) : (
                                      <>
                                     {t("reply")}
                                      </>
                                    )} </p>
                                  </Link>
                                : 
                                  <Link
                                    to="#"
                                    onClick={(event) => {
                                      handleCommentActiveIndex(null);
                                    }}
                                  >
                                    <p>{t("hide")}</p>
                                  </Link>
                                }  
                              </Media>
                            </ul>
                          </div>

                          <CommentReplies
                            key="index"
                            commentReplies={props.commentReplies}
                            comment={comment}
                            currentIndex={index}
                            commentActiveIndex={commentActiveIndex}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          ) : null}
          
          <Comments key="index" post={post} currentIndex={props.index}/>

          {localStorage.getItem("userId") !== "" &&
          localStorage.getItem("userId") !== null &&
          localStorage.getItem("userId") !== undefined ? (
            <>
              <SendTipModal
                sendTip={sendTip}
                closeSendTipModal={closeSendTipModal}
                username={post.username}
                userPicture={post.user_picture}
                name={post.user_displayname}
                post_id={post.post_id}
                user_id={post.user_id}
              />
              <PPVPaymentModal
                PPVPayment={PPVPayment}
                closePPVPaymentModal={closePPVPaymentModal}
                post={post}
                username={post.username}
                userPicture={post.user_picture}
                name={post.user_displayname}
                post_id={post.post_id}
                user_id={post.user_id}
                amount={post.amount}
              />
              <ReportModeModal
                reportMode={reportMode}
                closeReportModeModal={closeReportModeModal}
                post={post}
              />
            </>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  singlePost: state.post.singlePost,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PostDisplayCard));
