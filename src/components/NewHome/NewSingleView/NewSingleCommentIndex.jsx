import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
  InputGroup,
} from "react-bootstrap";
import "../NewHome.css";
import "./NewSingleComment.css";
import { Link } from "react-router-dom";
import NewSinglePostSlider from "./NewSinglePostSlider";
import { useParams } from "react-router";
import {
  deletePostStart,
  fetchSinglePostStart,
} from "../../../store/actions/PostAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import CopyToClipboard from "react-copy-to-clipboard";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import ReportModeModal from "../../helper/ReportModeModal";
import { saveBlockUserStart } from "../../../store/actions/UserAction";
import {
  fetchCommentRepliesStart,
  fetchMoreCommentRepliesStart,
  fetchCommentsStart,
  fetchMoreCommentsStart,
} from "../../../store/actions/CommentsAction";
import NewComments from "../../helper/NewComments";
import SendTipPaymentModal from "../../Model/PaymentModal/SendTipPaymentModal";
import CommonCenterLoader from "../../Loader/CommonCenterLoader";
import { savePostLikeStart } from "../../../store/actions/PostLikesAction";
import { saveBookmarkStart } from "../../../store/actions/BookmarkAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NewCommentReplies from "../../helper/NewCommentReplies";
import { useHistory } from "react-router";
import { format } from "timeago.js";

const NewSingleCommentIndex = (props) => {
  const params = useParams();
  const history = useHistory();

  const [reportMode, setReportMode] = useState(false);
  const [sendTip, setTipModal] = useState(false);
  const [skipRender, setSkipRender] = useState(true);
  const [lastPostId, setLastPostId] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const closeReportModeModal = () => {
    setReportMode(false);
  };

  const closeSendTipModal = () => {
    setTipModal(false);
  };

  useEffect(() => {
    props.dispatch(
      fetchSinglePostStart({
        post_unique_id: params.post_unique_id,
      })
      );
      setSelectedComment(null);
   
  }, [params.post_unique_id]);

  useEffect(() => {
    if (
      !skipRender &&
      !props.singlePost.loading &&
      Object.keys(props.singlePost.data).length > 0 &&
      lastPostId !== props.singlePost.data.post.post_id
    ) {
      props.dispatch(
        fetchCommentsStart({
          post_id: props.singlePost.data.post.post_id,
          skip: 0,
          take: 4,
        })
      );
      setLastPostId(props.singlePost.data.post.post_id);
    }
  }, [props.singlePost]);

  const fetchMoreComments = () => {
    props.dispatch(
      fetchMoreCommentsStart({
        post_id: props.singlePost.data.post.post_id,
        skip: props.comments.data.post_comments.length,
        take: 4,
      })
    );
  };

  const fetchCommentReply = (commentId) => {
    if (commentId != null) {
      props.dispatch(
        fetchCommentRepliesStart({
          post_id: props.singlePost.data.post.post_id,
          post_comment_id: commentId,
          skip: 0,
          take: 1,
        })
      );
    }
    setSelectedComment(commentId);
  };

  const fetchMoreCommentReply = (commentId) => {
    props.dispatch(
      fetchMoreCommentRepliesStart({
        post_id: props.singlePost.data.post.post_id,
        post_comment_id: commentId,
        skip: props.commentReplies.data.post_comment_replies.length,
        take: 1,
      })
    );
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleDeletePost = (event, post) => {
    event.preventDefault();
    props.dispatch(deletePostStart({ post_id: post.post_id }));
  };

  useEffect(() => {
    if (
      !skipRender &&
      !props.delPost.loading &&
      Object.keys(props.delPost.data).length > 0
    ) {
      history.push(`/profile`);
    }
  }, [props.delPost]);

  const handleBlockUser = (event, post) => {
    event.preventDefault();
    props.dispatch(saveBlockUserStart({ user_id: post.user_id }));
  };

  useEffect(() => {
    if (
      !skipRender &&
      !props.saveBlockUser.loading &&
      Object.keys(props.saveBlockUser.data).length > 0
    ) {
      history.push(`/home`);
    }
    setSkipRender(false);
  }, [props.saveBlockUser]);

  const handleLike = (event, post) => {
    event.preventDefault();
    props.dispatch(savePostLikeStart({ post_id: post.post_id }));
  };

  const handleBookmark = (event, post) => {
    event.preventDefault();
    props.dispatch(saveBookmarkStart({ post_id: post.post_id }));
  };

  return (
    <>
      <div className="new-single-page-sec">
        <Container fluid>
          <Row>
            <Col md={12}>
              {props.singlePost.loading ? (
                t("loading")
              ) : (
                <div className="new-single-page-box">
                  <div className="new-single-page-left">
                    <NewSinglePostSlider
                      post={props.singlePost.data.post}
                      postId={props.singlePost.data.post.post_id}
                    />
          
                  </div>
                  
                  <div className="new-single-page-right">
                    <div className="new-single-post-view-card">
                      <div className="new-single-post-view-header">
                        <div className="new-feed-user-info">
                          <div className="live-streaming-user-img-sec">
                            <Image
                              className="new-feed-user-img"
                              src={props.singlePost.data.post.user_picture}
                            />
                          </div>
                          <div className="new-feed-user-details">
                            <h4>
                              {props.singlePost.data.post.user_displayname}
                              {props.singlePost.data.post.is_verified_badge ==
                              1 ? (
                                <span>
                                  <Image
                                    className="sidebar-verified-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/new-home/verified-icon.png"
                                    }
                                  />
                                </span>
                              ) : null}
                            </h4>
                            <Link
                              to={`/${props.singlePost.data.post.user_unique_id}`}
                            >
                              @{props.singlePost.data.post.username}
                            </Link>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  props.singlePost.data.post.content_formatted,
                              }}
                            ></p>
                          </div>
                        </div>
                        <div className="new-feed-user-btn-sec">
                          {localStorage.getItem("userId") !=
                          props.singlePost.data.post.user_id ? (
                            <Button
                              className="sent-tip-btn"
                              onClick={() => setTipModal(true)}
                            >
                              <Image
                                className="sent-tip-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/feed-story/sent-tip-1.svg"
                                }
                              />
                              <span>{t("send_tip")}</span>
                            </Button>
                          ) : null}
                          <Dropdown className="feed-post-dropdown">
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                              className="feed-post-dropdown-btn"
                            >
                              <Image
                                className="three-dots-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/feed-story/3-vertical-dots.svg"
                                }
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <CopyToClipboard
                                text={props.singlePost.data.post.share_link}
                                onCopy={onCopy}
                              >
                                <Media as="li">
                                  <Link to="#" className="dropdown-a">
                                    {" "}
                                    {t("copy_link_to_post")}{" "}
                                  </Link>
                                </Media>
                              </CopyToClipboard>
                              <Media as="li" className="divider"></Media>
                              {localStorage.getItem("userId") ==
                              props.singlePost.data.post.user_id ? (
                                //Own post
                                <Media as="li">
                                  <Link
                                    to="#"
                                    onClick={(event) =>
                                      handleDeletePost(
                                        event,
                                        props.singlePost.data.post
                                      )
                                    }
                                    className="dropdown-a"
                                  >
                                    {t("delete_post")}
                                  </Link>
                                </Media>
                              ) : (
                                <>
                                  <Media as="li">
                                    <Link
                                      to="#"
                                      // onClick={(event) => handleReportPost(event, post)}
                                      onClick={() => setReportMode(true)}
                                      className="dropdown-a"
                                    >
                                      {t("report")}
                                    </Link>
                                  </Media>
                                  <Media as="li">
                                    <Link
                                      to="#"
                                      onClick={(event) =>
                                        handleBlockUser(
                                          event,
                                          props.singlePost.data.post
                                        )
                                      }
                                      className="dropdown-a"
                                    >
                                      {" "}
                                      {t("add_to_blocklist_para")}
                                    </Link>
                                  </Media>
                                </>
                              )}

                              {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>

                      

                      {/* Comment Section */}
                      <div className="new-single-post-view-body">
                        <div
                          className="scroll-comment-sec"
                          id="commentScrollDiv"
                          style={{
                            maxHeight: "calc(100vh - 350px)",
                            minHeight: "318px",
                            overflowY: "auto",
                          }}
                        >
                          {props.comments.loading ? (
                            <CommonCenterLoader />
                          ) : (
                            <InfiniteScroll
                              dataLength={
                                props.comments.data.post_comments.length
                              }
                              next={fetchMoreComments}
                              hasMore={
                                props.comments.data.post_comments.length <
                                props.comments.data.total
                              }
                              loader={<CommonCenterLoader />}
                              scrollableTarget="commentScrollDiv"
                              style={{ height: "auto", overflow: "hidden" }}
                            >
                              {props.comments.data.post_comments.map(
                                (comment, i) => (
                                  <div className="view-reply-comment">
                                    <div className="comment-profile">
                                      <div className="comment-profile-name">
                                        <div className="comment-profile-img-sec">
                                          <Image
                                            className="comments-profile-img"
                                            src={comment.user_picture}
                                          />
                                        </div>
                                        <div className="comment-profile-details">
                                          <h5>{comment.user_displayname}</h5>
                                          <h6>{comment.username}</h6>
                                          <p>{comment.comment_formatted}</p>
                                          <div className="comment-reply-btn">
                                            {selectedComment ===
                                            comment.post_comment_id ? (
                                              <Button
                                                onClick={() =>
                                                  fetchCommentReply(null)
                                                }
                                              >
                                                {t("hide")}
                                              </Button>
                                            ) : (
                                              <Button
                                                onClick={() =>
                                                  fetchCommentReply(
                                                    comment.post_comment_id
                                                  )
                                                }
                                              >
                                                {comment.total_comment_replies >
                                                0 ? (
                                                  <>
                                                    {" "}
                                                    {t(`view_reply`)}{" "}
                                                    {
                                                      comment.total_comment_replies
                                                    }
                                                  </>
                                                ) : (
                                                  t(`reply`)
                                                )}
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="comment-profile-end">
                                        <p className="time-text">
                                          {format(comment.created_at)}
                                          {/* {comment.created} */}
                                        </p>
                                      </div>
                                    </div>
                                    {/* Comment reply */}
                                    {selectedComment ===
                                    comment.post_comment_id ? (
                                      <div className="new-comment-reply-sec">
                                        {props.commentReplies.loading ? (
                                          <CommonCenterLoader />
                                        ) : props.commentReplies.data
                                            .post_comment_replies.length > 0 ? (
                                          <>
                                            {props.commentReplies.data.post_comment_replies.map(
                                              (reply, i) => (
                                                <div
                                                  className="view-reply-sec"
                                                  key={i}
                                                >
                                                  <div className="comment-profile-name">
                                                    <div className="comment-profile-img-sec">
                                                      <Image
                                                        className="comments-profile-img"
                                                        src={reply.user_picture}
                                                      />
                                                    </div>
                                                    <div className="comment-profile-details">
                                                      <h5>
                                                        {reply.user_displayname}
                                                        <span>
                                                          {
                                                            reply.reply_formatted
                                                          }
                                                        </span>
                                                      </h5>

                                                      <div className="comment-reply-btn">
                                                        <p className="time-text">
                                                          {reply.created}
                                                        </p>
                                                        {/* <Button>Reply</Button> */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                            {props.commentReplies.data
                                              .post_comment_replies.length <
                                            props.commentReplies.data.total ? (
                                              <div className="comment-reply-btn">
                                                <Button
                                                  onClick={() =>
                                                    fetchMoreCommentReply(
                                                      comment.post_comment_id
                                                    )
                                                  }
                                                >
                                                  {t("view_reply")}
                                                </Button>
                                              </div>
                                            ) : (
                                              <Button
                                                onClick={() =>
                                                  fetchCommentReply(null)
                                                }
                                              >
                                                {t("hide")}
                                              </Button>
                                            )}
                                          </>
                                        ) : null}
                                        <NewCommentReplies comment={comment} />
                                      </div>
                                    ) : null}
                                  </div>
                                )
                              )}
                            </InfiniteScroll>
                          )}
                        </div>
                      </div>

                      <div className="new-single-post-view-footer">
                        <div className="new-feed-footer-action-btn-sec">
                          <div className="new-single-post-view-action-btn-sec">
                            <div className="new-feed-footer-action-left-sec">
                              <Button
                                className="new-feed-wishlist-btn"
                                onClick={(e) =>
                                  handleLike(e, props.singlePost.data.post)
                                }
                              >
                                {props.singlePost.data.post.is_user_liked ===
                                1 ? (
                                  <Image
                                    className="new-feed-wishlist-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/feed-story/heart.svg"
                                    }
                                  />
                                ) : (
                                  <Image
                                    className="new-feed-wishlist-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/feed-story/heart-outline.svg"
                                    }
                                  />
                                )}
                                <span>
                                  {props.singlePost.data.post.like_count}
                                </span>
                              </Button>
                              <Button className="new-feed-wishlist-btn">
                                <Image
                                  className="new-feed-wishlist-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/feed-story/comments.svg"
                                  }
                                />
                                <span>
                                  {props.singlePost.data.post.total_comments}
                                </span>
                              </Button>
                            </div>
                            <div className="new-single-post-view-time-sec">
                              <p className="time-text">
                                {props.singlePost.data.post.created}
                              </p>
                            </div>
                          </div>
                          <div className="new-feed-footer-action-right-sec">
                            <Button
                              className="new-feed-bookmark-btn"
                              onClick={(e) =>
                                handleBookmark(e, props.singlePost.data.post)
                              }
                            >
                              {props.singlePost.data.post.is_user_bookmarked ===
                              1 ? (
                                <Image
                                  className="new-feed-bookmark-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/feed-story/bookmark-fill.svg"
                                  }
                                />
                              ) : (
                                <Image
                                  className="new-feed-bookmark-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/feed-story/bookmark-outline.svg"
                                  }
                                />
                              )}
                            </Button>
                          </div>
                        </div>
                        {/* Comment Type Form */}
                        <NewComments post={props.singlePost.data.post} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      {reportMode ? (
        <ReportModeModal
          reportMode={reportMode}
          closeReportModeModal={closeReportModeModal}
          post={props.singlePost.data.post}
        />
      ) : null}
      {sendTip ? (
        <SendTipPaymentModal
          paymentsModal={sendTip}
          closepaymentsModal={closeSendTipModal}
          post_id={props.singlePost.data.post.post_id}
          user_id={props.singlePost.data.post.user_id}
          type="post"
        />
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  singlePost: state.post.singlePost,
  delPost: state.post.delPost,
  comments: state.comment.comments,
  commentReplies: state.comment.commentReplies,
  saveBlockUser: state.users.saveBlockUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewSingleCommentIndex));
