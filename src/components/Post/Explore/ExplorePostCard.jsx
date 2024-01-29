import React, { useState } from "react";
import {
  Dropdown,
  Image,
  Media,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { savePostLikeStart } from "../../../store/actions/PostLikesAction";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { saveReportPostStart } from "../../../store/actions/PostAction";
import ReportModeModal from "../../helper/ReportModeModal";

const ExplorePostCard = (props) => {
  const { post } = props;
  let totalLikes = props.post.total_likes ? props.post.total_likes : 0;

  const [likeStatus, setLikeStatus] = useState("");
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [postDisplayStatus, setPostDisplayStatus] = useState(true);
  const [reportMode, setReportMode] = useState(false);

  const closeReportModeModal = () => {
    setReportMode(false);
  };

  const handleLike = (event, status) => {
    event.preventDefault();
    setLikeStatus(status);
    props.dispatch(savePostLikeStart({ post_id: post.post_id }));
    if (status == "added") {
      let currentLikeCount = likeCount + 1;
      setLikeCount(currentLikeCount);
    } else {
      let currentLikeCount = likeCount - 1;
      setLikeCount(currentLikeCount);
    }
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleReportPost = (event, post) => {
    event.preventDefault();
    setPostDisplayStatus(false);
    props.dispatch(saveReportPostStart({ post_id: post.post_id }));
  };

  return (
    <>
      <div className="live-streaming-post-card">
        <Link
          to={`/${post.user_unique_id}`}
          className="live-streaming-post-img-sec"
        >
          <Image
            src={
              post.postFiles.post_file ??
              window.location.origin +
                "/assets/images/live-stream-post/live-stream-post-1.jpg"
            }
            alt=""
            className="live-streaming-post-img"
          />
        </Link>
        <div className="live-streaming-post-info">
          <div className="live-streaming-post-user-info">
            <div className="live-streaming-post-user-img-sec">
              <Image
                src={post.user_picture}
                alt=""
                className="live-streaming-post-user-img"
              />
            </div>
            <div className="live-streaming-post-user-details">
              <Link to={`/${post.user_unique_id}`}>
                <h4>{post.user_displayname}</h4>
              </Link>
              <p>{post.created}</p>
            </div>
          </div>
          <div className="live-streaming-post-action-sec">
            <ul className="list-unstyled live-streaming-post-action-icons">
              <Media as="li">{likeCount} likes</Media>
              <Media as="li">
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
                ) : (
                  <Link to="#" onClick={(event) => handleLike(event, "added")}>
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/heart.svg"
                      }
                      className="svg-clone"
                    />
                  </Link>
                )}
              </Media>
              <Media as="li">
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

                    <Media as="li">
                      <Link
                        to={`/${post.user_unique_id}`}
                        className="dropdown-a"
                      >
                        {" "}
                        {t("profile")}{" "}
                      </Link>
                    </Media>

                    {/* {localStorage.getItem("userId") != post.user_id ? (
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => setReportMode(true)}
                          //   onClick={(event) => handleReportPost(event, post)}
                          className="dropdown-a"
                        >
                          {t("report")}
                        </Link>
                      </Media>
                    ) : null} */}
                  </Dropdown.Menu>
                </Dropdown>
              </Media>
            </ul>
          </div>
        </div>
      </div>

      <ReportModeModal
        reportMode={reportMode}
        closeReportModeModal={closeReportModeModal}
        post={post}
      ></ReportModeModal>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapDispatchToProps)(translate(ExplorePostCard));
