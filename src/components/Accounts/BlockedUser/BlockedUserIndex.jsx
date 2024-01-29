import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Media,
  Dropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { fetchBlockUsersStart } from "../../../store/actions/UserAction";
import { saveBlockUserStart } from "../../../store/actions/UserAction";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
import { translate, t } from "react-multi-lang";
import FollowingLoader from "../../Loader/FollowingLoader";

const BlockedUserIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchBlockUsersStart());
  }, []);

  const handleBlockUser = (event, status, user_id) => {
    event.preventDefault();
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t('profile_link_copied')
    );
    props.dispatch(createNotification(notificationMessage));
  };

  return (
    <div className="lists">
      <Container>
        <Row>
          <Col sm={12} md={12} xs={12}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>
                    <Link
                      className="bookmarkes-list"
                      to={"/home"}
                      onClick={() => props.history.goBack()}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                      />
                      {t("blocked_users")}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="listing-tab">
              <div className="tab">
                <div className="tab-content tabs">
                  <div>
                    {props.followers.loading ? (
                     <FollowingLoader/>
                    ) : (
                      <Row>
                        {props.followers.data.block_users && props.followers.data.block_users.length > 0 ? (
                          props.followers.data.block_users.map((block_user) => (
                            <Col sm={12} md={6} lg={4} xs={12}>
                              <div className="follower-lists">
                                <div className="follower-subscription-lists">
                                  <div className="follower-subscription-inner">
                                    <Link
                                      to={
                                        `/` +
                                        block_user.blockeduser.user_unique_id
                                      }
                                    >
                                      <div className="follower-wrapper">
                                        <Image
                                          className="follower-cover"
                                          src={block_user.blockeduser.cover}
                                        />
                                      </div>
                                    </Link>
                                    <div className="follower-profile-header">
                                      <Link
                                        to={
                                          `/` +
                                          block_user.blockeduser.user_unique_id
                                        }
                                      >
                                        <span className="follower-profile-avatar">
                                          <Image
                                            src={block_user.blockeduser.picture}
                                            className=""
                                          />
                                        </span>
                                      </Link>
                                      <div className="follower-info">
                                        <div className="follower-profile-status">
                                          <div className="follower-profile-toggle-dropdown">
                                            <Dropdown className="btn dropdown-toggle btn-link">
                                              <Dropdown.Toggle
                                                className="user-dropdown-dots dropdown-toggle"
                                                type="button"
                                                id="dropdown-basic"
                                              >
                                                <Image
                                                  src={
                                                    window.location.origin +
                                                    "/assets/images/icons/vertical-dots-white.svg"
                                                  }
                                                  className="svg-clone vertical-dots"
                                                />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                                <CopyToClipboard
                                                  text={
                                                    block_user.blockeduser
                                                      .share_link
                                                  }
                                                  onCopy={onCopy}
                                                >
                                                  <Media as="li">
                                                    <Link to="#">
                                                      {" "}
                                                      {t(
                                                        "copy_link_to_profile"
                                                      )}{" "}
                                                    </Link>
                                                  </Media>
                                                </CopyToClipboard>

                                                <Media as="li">
                                                  <Link
                                                    to="#"
                                                    onClick={(event) =>
                                                      handleBlockUser(
                                                        event,
                                                        "unblocked",
                                                        block_user.blockeduser
                                                          .user_id
                                                      )
                                                    }
                                                  >
                                                    {t("unblock")}
                                                  </Link>
                                                </Media>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                        <div className="follower-wrapper-name">
                                          <div className="follower-profile-names">
                                            <div className="follower-name-row">
                                              <Link
                                                to={
                                                  block_user.blockeduser
                                                    .user_unique_id
                                                }
                                              >
                                                <div className="follower-user-name">
                                                  {block_user.blockeduser.name}{" "}
                                                  {block_user.blockeduser
                                                    .is_verified_badge == 1 ? (
                                                    <VerifiedBadgeNoShadow />
                                                  ) : null}
                                                </div>
                                              </Link>
                                            </div>
                                            <div className="follower-name-row">
                                              <Link
                                                to={
                                                  `/` +
                                                  block_user.blockeduser
                                                    .user_unique_id
                                                }
                                                className="g-user-realname__wrapper"
                                              >
                                                <div className="follower-user-id">
                                                  @
                                                  {
                                                    block_user.blockeduser
                                                      .username
                                                  }
                                                </div>
                                              </Link>
                                            </div>
                                          </div>

                                          <div className="group-follower-btns">
                                            <CopyToClipboard
                                              text={
                                                block_user.blockeduser
                                                  .share_link
                                              }
                                              onCopy={onCopy}
                                            >
                                              <Button
                                                type="button"
                                                className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                                              >
                                                <Image
                                                  src="assets/images/icons/share.svg"
                                                  className="svg-clone "
                                                />
                                              </Button>
                                            </CopyToClipboard>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lists-button-group post-icons">
                                      <Button
                                        type="button"
                                        className="btn gradient-btn gradientcolor"
                                        onClick={(event) =>
                                          handleBlockUser(
                                            event,
                                            "unblocked",
                                            block_user.blockeduser.user_id
                                          )
                                        }
                                      >
                                        <span className="b-btn-text">
                                          {t("unblock")}
                                        </span>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))
                        ) : (
                          <NoDataFound></NoDataFound>
                        )}
                      </Row>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  followers: state.users.blockUsers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(BlockedUserIndex));
