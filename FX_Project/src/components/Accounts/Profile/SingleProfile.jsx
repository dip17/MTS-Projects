import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Tab,
  Nav,
  Media,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./NewProfile.css";
import { fetchPostsStart } from "../../../store/actions/PostAction";
import {
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../../store/actions/OtherUserAction";
import { connect } from "react-redux";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";
import "./NewProfile.css";
import ProfileSinglePost from "../../helper/ProfileSinglePost";
import { saveChatUserStart } from "../../../store/actions/ChatAction";
import SendTipModal from "../../helper/SendTipModal";
import PaymentModal from "../../helper/PaymentModal";
import PrivateCallModal from "../../helper/PrivateCallModal";
import PrivateAudioCallModal from "../../helper/PrivateAudioCallModal";
import { subscriptionPaymentStripeStart } from "../../../store/actions/SubscriptionAction";
import { unFollowUserStart } from "../../../store/actions/FollowAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NoDataFound from "../../NoDataFound/NoDataFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileLoader from "../../Loader/ProfileLoader";
import { saveBlockUserStart } from "../../../store/actions/UserAction";
import ModelProfileStoreSec from "../../Model/ModelProfileStoreSec";
import SendTipPaymentModal from "../../Model/PaymentModal/SendTipPaymentModal";
import SubscriptionPaymentModal from "../../Model/PaymentModal/SubscriptionPaymentModal";

const SingleProfile = (props) => {
  const history = useHistory();

  const [skipRender, setSkipRender] = useState(true);
  const [badgeStatus, setBadgeStatus] = useState(0);
  const [activeSec, setActiveSec] = useState("all");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [requestVideoCall, setRequestVideoCall] = useState(false);
  const [requestAudioCall, setRequestAudioCall] = useState(false);
  const [sendTip, setSendTip] = useState(false);
  const [subscrptionPayment, setPaymentModal] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(false);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);

  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });

  const toggleVisibility = () => {};

  useEffect(() => {
    props.dispatch(
      fetchSingleUserProfileStart({
        user_unique_id: props.match.params.username,
      })
    );
    props.dispatch(
      fetchSingleUserPostsStart({
        user_unique_id: props.match.params.username,
        type: "all",
        skip: 0,
        take: take,
      })
    );
    setSkip(take);

    window.addEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (
      !skipRender &&
      !props.saveChatUser.loading &&
      Object.keys(props.saveChatUser.data).length > 0
    ) {
      history.push("/inbox");
    }
    setSkipRender(false);
  }, [props.saveChatUser]);

  const setActiveSection = (event, key) => {
    setActiveSec(key);
    if (key !== "product") {
      props.dispatch(
        fetchSingleUserPostsStart({
          type: key,
          user_unique_id: props.match.params.username,
          skip: 0,
          take: take,
        })
      );
      setSkip(take);
    }
  };

  const fetchMorePost = () => {
    props.dispatch(
      fetchSingleUserPostsStart({
        type: activeSec,
        user_unique_id: props.match.params.username,
        append: true,
        skip: skip,
        take: take,
      })
    );
    setSkip(skip + take);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleUnfollow = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      unFollowUserStart({
        user_id: user_id,
      })
    );
  };

  const handleChatUser = (event, user_id) => {
    event.preventDefault();
    if (!localStorage.getItem("userId")) {
      const notificationMessage = getErrorNotificationMessage(
        t("login_to_continue")
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      props.dispatch(
        saveChatUserStart({
          from_user_id: localStorage.getItem("userId"),
          to_user_id: user_id,
        })
      );
    }
  };

  const subscriptionPayment = (
    event,
    plan_type,
    amount,
    amount_formatted,
    is_free = 0
  ) => {
    event.preventDefault();
    if (localStorage.getItem("userId")) {
      setSubscriptionData({
        ...subscriptionData,
        is_free: is_free,
        plan_type: plan_type,
        amount: amount,
        amount_formatted: amount_formatted,
      });
      setPaymentModal(true);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("login_to_continue")
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };

  const handleBlockUser = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const handleUnfollowModalClose = () => setShowUnfollow(false);
  const handleUnfollowModalShow = () => setShowUnfollow(true);

  const { userDetails } = props;

  const closePrivateCallModal = () => {
    setRequestVideoCall(false);
    setRequestAudioCall(false);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="new-home-sec">
        {userDetails.loading ? (
          <ProfileLoader />
        ) : (
          <div className="new-home-box">
            <div className="new-home-sidebar">
              <div className="profile-logo-sec">
                <Image
                  className="profile-logo-img"
                  src={configuration.get("configData.site_logo")}
                />
              </div>
              <div className="sibebar-header-sec">
                {userDetails.data.user.featured_story ? (
                  <div className="sidebar-user-img-sec">
                    <div
                      data-fancybox="gallery"
                      href={userDetails.data.user.featured_story}
                    >
                      <Image
                        className="sidebar-user-img profile-image"
                        src={userDetails.data.user.picture}
                        alt={userDetails.data.user.name}
                      />
                    </div>
                    {userDetails.data.user.is_user_live === 1 && (
                      <Link
                        to={`/join/${userDetails.data.user.ongoing_live_video.live_video_unique_id}`}
                        className="sidebar-live-btn"
                      >
                        {t("live")}
                      </Link>
                    )}
                    {userDetails.data.user.is_online_status === 1 &&
                      userDetails.data.user.is_user_online === 1 && (
                        <div className="dot-circle"></div>
                      )}
                  </div>
                ) : (
                  <div className="sidebar-user-no-fea-img-sec">
                    <Image
                      className="sidebar-user-img profile-image"
                      src={userDetails.data.user.picture}
                      alt={userDetails.data.user.name}
                    />
                    {userDetails.data.user.is_user_live === 1 && (
                      <Link
                        to={`/join/${userDetails.data.user.ongoing_live_video.live_video_unique_id}`}
                        className="sidebar-live-btn"
                      >
                        {t("live")}
                      </Link>
                    )}
                    {userDetails.data.user.is_online_status === 1 &&
                      userDetails.data.user.is_user_online === 1 && (
                        <div className="dot-circle"></div>
                      )}
                  </div>
                )}
                <h4>
                  {userDetails.data.user.name}
                  <span>
                    {userDetails.data.user.is_verified_badge == 1 && (
                      <Image
                        className="sidebar-verified-icon"
                        src={
                          window.location.origin +
                          "/assets/images/new-home/verified-icon.png"
                        }
                      />
                    )}
                  </span>
                </h4>
                <Link to="#" className="sidebar-user-name">
                  @{userDetails.data.user.username}
                </Link>
                <div className="sidebar-total-count-info-box">
                  <div className="sidebar-total-count-card">
                    <h5>{userDetails.data.user.total_posts}</h5>
                    <p>{t("posts")}</p>
                  </div>
                  <div className="sidebar-total-count-card">
                    <h5>{userDetails.data.user.total_followers}</h5>
                    <p>{t("fans")}</p>
                  </div>
                  <div className="sidebar-total-count-card">
                    <h5>{userDetails.data.user.total_followings}</h5>
                    <p>{t("following")}</p>
                  </div>
                </div>
              </div>
              {/* <div className="sidebar-links">
                                <ul className="list-unstyled">
                                    <Media as="li">
                                        <Link to={"/edit-profile"}>
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/video-call.png"
                                                    }
                                                />
                                            </span>
                                            {t("edit_profile")}
                                        </Link>
                                    </Media>
                                    <Media as="li">
                                        <Link to="#" onClick={handleShareClick}>
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/share.png"
                                                    }
                                                />
                                            </span>
                                            {t("share")}
                                        </Link>
                                    </Media>
                                    <Popover
                                        id={popoverId}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                    >
                                        <Typography>
                                            <div className="social-share-sec m-3">
                                                <div className="text-center social-link">
                                                    <div className="Demo__some-network">
                                                        <EmailShareButton
                                                            url={userDetails.data.share_link}
                                                            subject={configuration.get(
                                                                "configData.site_name"
                                                            )}
                                                            body={userDetails.data.share_message}
                                                            className="Demo__some-network__share-button"
                                                        >
                                                            <EmailIcon size={32} round />
                                                        </EmailShareButton>
                                                    </div>
                                                     <h6 className="social-desc">{t("email")}</h6> 
                                                </div>
                                                <div className="text-center social-link">
                                                    <WhatsappShareButton
                                                        url={userDetails.data.share_link}
                                                        title={userDetails.data.share_message}
                                                        separator=":: "
                                                        className="Demo__some-network__share-button"
                                                    >
                                                        <WhatsappIcon size={32} round />
                                                    </WhatsappShareButton>
                                                    <h6 className="social-desc">{t("whatsapp")}</h6>
                                                </div>
                                                <div className="text-center social-link">
                                                    <FacebookShareButton
                                                        url={userDetails.data.share_link}
                                                        quote={userDetails.data.share_message}
                                                        className="Demo__some-network__share-button"
                                                    >
                                                        <FacebookIcon size={32} round />
                                                    </FacebookShareButton>
                                                    <h6 className="social-desc">{t("facebook")}</h6>
                                                </div>
                                                <div className="text-center social-link">
                                                    <TwitterShareButton
                                                        url={userDetails.data.share_link}
                                                        title={userDetails.data.share_message}
                                                        className="Demo__some-network__share-button"
                                                    >
                                                        <TwitterIcon size={32} round />
                                                    </TwitterShareButton>
                                                    <h6 className="social-desc">{t("twitter")}</h6>
                                                </div>
                                                <div className="text-center social-link">
                                                    <RedditShareButton
                                                        url={userDetails.data.share_link}
                                                        title={userDetails.data.share_message}
                                                        windowWidth={660}
                                                        windowHeight={460}
                                                        className="Demo__some-network__share-button"
                                                    >
                                                        <RedditIcon size={32} round />
                                                    </RedditShareButton>
                                                    <h6 className="social-desc">{t("reddit")}</h6>
                                                </div>
                                                <div className="text-center social-link">
                                                    <TelegramShareButton
                                                        url={userDetails.data.share_link}
                                                        title={userDetails.data.share_message}
                                                        windowWidth={660}
                                                        windowHeight={460}
                                                        className="Demo__some-network__share-button"
                                                    >
                                                        <TelegramIcon size={32} round />
                                                    </TelegramShareButton>
                                                    <h6 className="social-desc">{t("telegram")}</h6>
                                                </div>
                                                <div className="text-center social-link">
                                                    <CopyToClipboard
                                                        onCopy={onCopy}
                                                        text={userDetails.data.share_link}
                                                        windowWidth={660}
                                                        windowHeight={460}
                                                        className="Demo__some-network__share-button"
                                                    >
                                                        <button className="react-share__ShareButton Demo__some-network__share-button">
                                                            <i className="fas fa-copy"></i>
                                                        </button>
                                                    </CopyToClipboard>
                                                </div>
                                            </div>
                                        </Typography>
                                    </Popover>
                                    {userDetails.data.is_content_creator == 2 ? (
                                        <Media as="li">
                                            <Link to={"/dashboard"}>
                                                <span>
                                                    <Image
                                                        className="sidebar-links-icon"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/message.png"
                                                        }
                                                    />
                                                </span>
                                                {t("dashboard")}
                                            </Link>
                                        </Media>)
                                        : (
                                            <Media as="li">
                                                <Link to={"/become-a-content-creator"}>
                                                    <span>
                                                        <Image
                                                            className="sidebar-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/share.png"
                                                            }
                                                        />
                                                    </span>
                                                    {t("become_a_content_creator")}
                                                </Link>
                                            </Media>
                                        )
                                    }
                                </ul>
                            </div> */}
              {userDetails.data.is_block_user === 0 ? (
                <div className="sidebar-links">
                  <ul className="list-unstyled">
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={() => {
                          if (localStorage.getItem("userId")) {
                            setRequestVideoCall(true);
                          } else {
                            const notificationMessage =
                              getErrorNotificationMessage(
                                t("login_to_continue")
                              );
                            props.dispatch(
                              createNotification(notificationMessage)
                            );
                          }
                        }}
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/video-call-1.svg"
                            }
                          />
                        </span>
                        {t("video_call")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={() => {
                          if (localStorage.getItem("userId")) {
                            setRequestAudioCall(true);
                          } else {
                            const notificationMessage =
                              getErrorNotificationMessage(
                                t("login_to_continue")
                              );
                            props.dispatch(
                              createNotification(notificationMessage)
                            );
                          }
                        }}
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/audio-call-1.svg"
                            }
                          />
                        </span>
                        {t("voice_call")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={() => {
                          if (localStorage.getItem("userId")) {
                            setSendTip(true);
                          } else {
                            const notificationMessage =
                              getErrorNotificationMessage(
                                t("login_to_continue")
                              );
                            props.dispatch(
                              createNotification(notificationMessage)
                            );
                          }
                        }}
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/sent-tip-1.svg"
                            }
                          />
                        </span>
                        {t("tip_me")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={(event) =>
                          handleChatUser(event, userDetails.data.user.user_id)
                        }
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/message-1.svg"
                            }
                          />
                        </span>
                        {t("message")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link to="#" onClick={handleShareClick}>
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/share-theme-1.svg"
                            }
                          />
                        </span>
                        {t("share")}
                      </Link>
                    </Media>
                    <Popover
                      id={popoverId}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography>
                        <div className="social-share-sec m-3">
                          <div className="text-center social-link">
                            <div className="Demo__some-network">
                              <EmailShareButton
                                url={userDetails.data.user.share_link}
                                subject={configuration.get(
                                  "configData.site_name"
                                )}
                                body={userDetails.data.user.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <EmailIcon size={32} round />
                              </EmailShareButton>
                            </div>
                            {/* <h6 className="social-desc">{t("email")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <WhatsappShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              separator=":: "
                              className="Demo__some-network__share-button"
                            >
                              <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            {/* <h6 className="social-desc">{t("whatsapp")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <FacebookShareButton
                              url={userDetails.data.user.share_link}
                              quote={userDetails.data.user.share_message}
                              className="Demo__some-network__share-button"
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            {/* <h6 className="social-desc">{t("facebook")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <TwitterShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              className="Demo__some-network__share-button"
                            >
                              <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            {/* <h6 className="social-desc">{t("twitter")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <RedditShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <RedditIcon size={32} round />
                            </RedditShareButton>
                            {/* <h6 className="social-desc">{t("reddit")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <TelegramShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <TelegramIcon size={32} round />
                            </TelegramShareButton>
                            {/* <h6 className="social-desc">{t("telegram")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <CopyToClipboard
                              onCopy={onCopy}
                              text={userDetails.data.user.share_link}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <button className="react-share__ShareButton Demo__some-network__share-button primary-share-btn">
                                <i className="fas fa-copy"></i>
                              </button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </Typography>
                    </Popover>
                  </ul>
                </div>
              ) : null}
              {userDetails.data.youtube_link ||
              userDetails.data.pinterest_link ||
              userDetails.data.linkedin_link ||
              userDetails.data.snapchat_link ||
              userDetails.data.twitter_link ||
              userDetails.data.instagram_link ||
              userDetails.data.amazon_wishlist ||
              userDetails.data.facebook_link ||
              userDetails.data.twitch_link ||
              userDetails.data.website ? (
                <div className="sidebar-social-links">
                  <ul className="list-unstyled">
                    {userDetails.data.youtube_link && (
                      <Media as="li">
                        <a href={userDetails.data.youtube_link} target="_blank">
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/you-tube.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.pinterest_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.pinterest_link}
                          target="_blank"
                        >
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/pintrest.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.linkedin_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.linkedin_link}
                          target="_blank"
                        >
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/linked-in.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.snapchat_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.snapchat_link}
                          target="_blank"
                        >
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/snap-chat.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.twitter_link && (
                      <Media as="li">
                        <a href={userDetails.data.twitter_link} target="_blank">
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/twitter.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.instagram_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.instagram_link}
                          target="_blank"
                        >
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/instagram.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.amazon_wishlist && (
                      <Media as="li">
                        <a
                          href={userDetails.data.amazon_wishlist}
                          target="_blank"
                        >
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/amazon.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.facebook_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.facebook_link}
                          target="_blank"
                        >
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/facebook.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.twitch_link && (
                      <Media as="li">
                        <a href={userDetails.data.twitch_link} target="_blank">
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/twitch.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                    {userDetails.data.website && (
                      <Media as="li">
                        <a href={userDetails.data.website} target="_blank">
                          <Image
                            className="sidebar-social-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/website.png"
                            }
                          />
                        </a>
                      </Media>
                    )}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="new-home-main-wrapper">
              <div className="user-cover-img-sec">
                <Image
                  className="user-cover-img"
                  src={userDetails.data.user.cover}
                  alt={userDetails.data.user.name}
                />
                <div className="website-hide-sec">
                  {userDetails.data.user.featured_story ? (
                    <a
                      data-fancybox="gallery"
                      href={userDetails.data.user.featured_story}
                    >
                      <Image
                        src={userDetails.data.user.picture}
                        alt={userDetails.data.user.name}
                        className="single-profile-user-img border-red"
                      />
                    </a>
                  ) : (
                    <Image
                      src={userDetails.data.user.picture}
                      alt={userDetails.data.user.name}
                      className="single-profile-user-img"
                    />
                  )}
                </div>
              </div>
              <div className="user-right-content-sec">
                <div className="user-right-info">
                  <div className="website-hide-sec">
                    <div className="mobile-header-sec">
                      <h4>
                        {userDetails.data.user.name}
                        <span>
                          {userDetails.data.user.is_verified_badge == 1 && (
                            <Image
                              className="sidebar-verified-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/verified-icon.png"
                              }
                            />
                          )}
                        </span>
                      </h4>
                      {/* <Link to="#" className="sidebar-user-name">
                        {userDetails.data.user.email}
                      </Link> */}
                      <div className="sidebar-total-count-info-box">
                        <div className="sidebar-total-count-card">
                          <h5>{userDetails.data.user.total_posts}</h5>
                          <p>{t("posts")}</p>
                        </div>
                        <div className="sidebar-total-count-card">
                          <h5>{userDetails.data.user.total_followers}</h5>
                          <p>{t("fans")}</p>
                        </div>
                        <div className="sidebar-total-count-card">
                          <h5>{userDetails.data.user.total_followings}</h5>
                          <p>{t("following")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="user-info-desc">
                    <p>
                      {userDetails.data.user.about_formatted}
                      {/* <a href="#">Read More</a> */}
                    </p>
                  </div>
                  <div className="user-info-list">
                    <ul className="list-unstyled">
                      {userDetails.data.user.selected_category &&
                        userDetails.data.user.selected_category.name && (
                          <Media as="li">
                            <Link to="#">
                              <Image
                                className="user-info-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/fashion.svg"
                                }
                              />
                              <span>
                                {userDetails.data.user.selected_category.name}
                              </span>
                            </Link>
                          </Media>
                        )}
                      {userDetails.data.user.date_of_birth && (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/date-icon.svg"
                              }
                            />
                            <span>{userDetails.data.user.date_of_birth}</span>
                          </Link>
                        </Media>
                      )}
                      {userDetails.data.user.gender &&
                        userDetails.data.user.gender != "rather-not-select" && (
                          <Media as="li">
                            <Link to="#">
                              <Image
                                className="user-info-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/gender.svg"
                                }
                              />
                              <span>{userDetails.data.user.gender}</span>
                            </Link>
                          </Media>
                        )}
                      {userDetails.data.user.eyes_color_formatted && (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/eye.svg"
                              }
                            />
                            <span>
                              {userDetails.data.user.eyes_color_formatted}
                            </span>
                          </Link>
                        </Media>
                      )}
                      {userDetails.data.user.height ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/scale.svg"
                              }
                            />
                            <span>
                              {userDetails.data.user.height_formatted}
                            </span>
                          </Link>
                        </Media>
                      ) : null}
                      {userDetails.data.user.weight ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/weight.svg"
                              }
                            />
                            <span>
                              {userDetails.data.user.weight_formatted}
                            </span>
                          </Link>
                        </Media>
                      ) : null}
                      {userDetails.data.user.address ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-settings/map-marker-icon.svg"
                              }
                            />
                            <span>{userDetails.data.user.address}</span>
                          </Link>
                        </Media>
                      ) : null}
                    </ul>
                  </div>
                </div>
                {userDetails.data.is_block_user == 0 ? (
                  <div className="user-subscription-plans-details">
                    <h3>{t("subscription_plans")}</h3>
                    {userDetails.data.payment_info.is_user_needs_pay == 1 &&
                    userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? (
                      userDetails.data.payment_info.is_free_account == 0 ? (
                        <div className="user-subscription-btn-sec">
                          <div
                            className="subscription-outline-btn"
                            onClick={(event) =>
                              subscriptionPayment(
                                event,
                                "months",
                                userDetails.data.payment_info.subscription_info
                                  .monthly_amount,
                                userDetails.data.payment_info.subscription_info
                                  .monthly_amount_formatted
                              )
                            }
                          >
                            {
                              userDetails.data.payment_info.subscription_info
                                .monthly_amount_formatted
                            }{" "}
                            /{t("month")}
                          </div>
                          <div
                            className="subscription-btn"
                            onClick={(event) =>
                              subscriptionPayment(
                                event,
                                "years",
                                userDetails.data.payment_info.subscription_info
                                  .yearly_amount,
                                userDetails.data.payment_info.subscription_info
                                  .yearly_amount_formatted
                              )
                            }
                          >
                            {
                              userDetails.data.payment_info.subscription_info
                                .yearly_amount_formatted
                            }{" "}
                            /{t("year")}
                          </div>
                        </div>
                      ) : (
                        <div className="user-subscription-btn-sec">
                          <div
                            className="subscription-btn"
                            onClick={(event) => {
                              if (localStorage.getItem("userId")) {
                                props.dispatch(
                                  subscriptionPaymentStripeStart({
                                    user_unique_id:
                                      userDetails.data.user.user_unique_id,
                                    plan_type: "months",
                                    is_free: 0,
                                  })
                                );
                              } else {
                                const notificationMessage =
                                  getErrorNotificationMessage(
                                    t("login_to_continue")
                                  );
                                props.dispatch(
                                  createNotification(notificationMessage)
                                );
                              }
                            }}
                          >
                            {t("subscribe_for_free")}
                          </div>
                        </div>
                      )
                    ) : null}

                    {userDetails.data.payment_info.unsubscribe_btn_status ==
                      1 && (
                      <>
                        <div className="user-subscription-btn-sec">
                          <div
                            className="subscription-btn"
                            onClick={() => handleUnfollowModalShow()}
                          >
                            {t("unfollow")}
                          </div>
                        </div>
                        <Modal
                          show={showUnfollow}
                          onHide={handleUnfollowModalClose}
                          backdrop="static"
                          keyboard={false}
                          centered
                          className={`${
                            localStorage.getItem("theme") !== "" &&
                            localStorage.getItem("theme") !== null &&
                            localStorage.getItem("theme") !== undefined &&
                            localStorage.getItem("theme") === "dark"
                              ? "dark-theme-modal"
                              : ""
                          }
        `}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>{t("unsubscribe")}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {t("cancel_subscription_conformation")}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              size="lg"
                              onClick={handleUnfollowModalClose}
                            >
                              {t("close")}
                            </Button>
                            <Button
                              variant="primary"
                              size="lg"
                              onClick={(event) =>
                                handleUnfollow(
                                  event,
                                  userDetails.data.user.user_id
                                )
                              }
                            >
                              {t("yes")}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="user-subscription-plans-details">
                    <div className="user-subscription-btn-sec">
                      <div
                        className="subscription-btn"
                        onClick={(event) =>
                          handleBlockUser(event, userDetails.data.user.user_id)
                        }
                      >
                        {t("unblock_the_user")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mobile-display">
                {userDetails.data.is_block_user === 0 ? (
                  <div className="sidebar-links">
                    <ul className="list-unstyled">
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => {
                            if (localStorage.getItem("userId")) {
                              setRequestVideoCall(true);
                            } else {
                              const notificationMessage =
                                getErrorNotificationMessage(
                                  t("login_to_continue")
                                );
                              props.dispatch(
                                createNotification(notificationMessage)
                              );
                            }
                          }}
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/video-call.svg"
                              }
                            />
                          </span>
                          {t("video_call")}
                        </Link>
                      </Media>
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => {
                            if (localStorage.getItem("userId")) {
                              setRequestAudioCall(true);
                            } else {
                              const notificationMessage =
                                getErrorNotificationMessage(
                                  t("login_to_continue")
                                );
                              props.dispatch(
                                createNotification(notificationMessage)
                              );
                            }
                          }}
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/audio-call.svg"
                              }
                            />
                          </span>
                          {"voice_call"}
                        </Link>
                      </Media>
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => {
                            if (localStorage.getItem("userId")) {
                              setSendTip(true);
                            } else {
                              const notificationMessage =
                                getErrorNotificationMessage(
                                  t("login_to_continue")
                                );
                              props.dispatch(
                                createNotification(notificationMessage)
                              );
                            }
                          }}
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/sent-tip.svg"
                              }
                            />
                          </span>
                          {t("tip_me")}
                        </Link>
                      </Media>
                      <Media as="li">
                        <Link to="#" onClick={handleShareClick}>
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/share-theme.svg"
                              }
                            />
                          </span>
                          {t("share")}
                        </Link>
                      </Media>
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={(event) =>
                            handleChatUser(event, userDetails.data.user.user_id)
                          }
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/message.svg"
                              }
                            />
                          </span>
                          {t("message")}
                        </Link>
                      </Media>
                    </ul>
                  </div>
                ) : null}
                {userDetails.data.youtube_link ||
                userDetails.data.pinterest_link ||
                userDetails.data.linkedin_link ||
                userDetails.data.snapchat_link ||
                userDetails.data.twitter_link ||
                userDetails.data.instagram_link ||
                userDetails.data.amazon_wishlist ||
                userDetails.data.facebook_link ||
                userDetails.data.twitch_link ||
                userDetails.data.website ? (
                  <div className="sidebar-social-links">
                    <ul className="list-unstyled">
                      {userDetails.data.youtube_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.youtube_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/you-tube.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.pinterest_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.pinterest_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/pintrest.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.linkedin_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.linkedin_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/linked-in.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.snapchat_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.snapchat_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/snap-chat.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.twitter_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.twitter_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/twitter.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.instagram_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.instagram_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/instagram.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.amazon_wishlist && (
                        <Media as="li">
                          <a
                            href={userDetails.data.amazon_wishlist}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/amazon.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.facebook_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.facebook_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/facebook.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.twitch_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.twitch_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/twitch.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {userDetails.data.website && (
                        <Media as="li">
                          <a href={userDetails.data.website} target="_blank">
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/website.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
              {userDetails.data.is_block_user == 0 && (
                <div className="profile-tab-sec">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                    <Row>
                      <Col sm={12}>
                        <Nav
                          variant="pills"
                          className={
                            userDetails.data.user.is_content_creator == 2
                              ? "grid-five-col"
                              : "grid-four-col"
                          }
                        >
                          <Nav.Item>
                            <Nav.Link
                              eventKey="all"
                              onClick={(event) =>
                                setActiveSection(event, "all")
                              }
                            >
                              <span>
                                <Image
                                  className="profile-post-tab-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/icon/all-post-1.svg"
                                  }
                                />
                              </span>
                              <span className="resp-display-none">
                                {t("all")}
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="image"
                              onClick={(event) =>
                                setActiveSection(event, "image")
                              }
                            >
                              <span>
                                <Image
                                  className="profile-post-tab-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/icon/image-post-1.svg"
                                  }
                                />
                              </span>
                              <span className="resp-display-none">
                                {t("images")}
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="video"
                              onClick={(event) =>
                                setActiveSection(event, "video")
                              }
                            >
                              <span>
                                <Image
                                  className="profile-post-tab-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/icon/video-post-1.svg"
                                  }
                                />
                              </span>
                              <span className="resp-display-none">
                                {" "}
                                {t("videos")}
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="audio"
                              onClick={(event) =>
                                setActiveSection(event, "audio")
                              }
                            >
                              <span>
                                <Image
                                  className="profile-post-tab-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/icon/audio-post-1.svg"
                                  }
                                />
                              </span>
                              <span className="resp-display-none">
                                {t("musics")}
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          {userDetails.data.user.is_content_creator == 2 && (
                            <Nav.Item>
                              <Nav.Link
                                eventKey="product"
                                onClick={(event) =>
                                  setActiveSection(event, "product")
                                }
                              >
                                <span>
                                  <Image
                                    className="profile-post-tab-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/new-home/icon/store-icon-1.svg"
                                    }
                                  />
                                </span>
                                <span className="resp-display-none">
                                  {t("store")}
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                          )}
                        </Nav>
                      </Col>
                      {activeSec === "product" ? (
                        <Col md={12}>
                          <ModelProfileStoreSec
                            activeSec={activeSec}
                            setActiveSec={setActiveSec}
                            products={props.products}
                            otherUserUniquId={props.match.params.username}
                          />
                        </Col>
                      ) : (
                        <Col sm={12}>
                          {props.userPosts.loading ? (
                            <div className="profile-all-post-box">
                              {[...Array(8)].map(() => (
                                <Skeleton className="profile-post-card-loader" />
                              ))}
                            </div>
                          ) : (
                            <>
                              {props.userPosts.data.posts.length > 0 ? (
                                <InfiniteScroll
                                  dataLength={props.userPosts.data.posts.length}
                                  next={fetchMorePost}
                                  hasMore={
                                    props.userPosts.data.posts.length <
                                    props.userPosts.data.total
                                  }
                                  loader={
                                    <div className="profile-all-post-box">
                                      {[...Array(4)].map(() => (
                                        <Skeleton className="profile-post-card-loader" />
                                      ))}
                                    </div>
                                  }
                                  style={{ height: "auto", overflow: "hidden" }}
                                >
                                  <div className="profile-all-post-box">
                                    {props.userPosts.data.posts.map((post) => (
                                      <>
                                        {post.postFiles &&
                                          post.postFiles.length > 0 && (
                                            // post.postFiles.map((postFile, index) =>
                                            <ProfileSinglePost post={post} />
                                          )}
                                      </>
                                    ))}
                                  </div>
                                </InfiniteScroll>
                              ) : (
                                <NoDataFound />
                              )}
                            </>
                          )}
                        </Col>
                      )}
                    </Row>
                  </Tab.Container>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {userDetails.loading ? (
        t("loading")
      ) : localStorage.getItem("userId") !== "" &&
        localStorage.getItem("userId") !== null &&
        localStorage.getItem("userId") !== undefined ? (
        <>
          {/* <SendTipModal
                            sendTip={sendTip}
                            closeSendTipModal={closeSendTipModal}
                            username={userDetails.data.user.username}
                            userPicture={userDetails.data.user.picture}
                            name={userDetails.data.user.name}
                            post_id={null}
                            user_id={userDetails.data.user.user_id}
                        /> */}
          {sendTip ? (
            <SendTipPaymentModal
              paymentsModal={sendTip}
              closepaymentsModal={closeSendTipModal}
              user_id={userDetails.data.user.user_id}
              type="profile"
            />
          ) : null}
          {/* <PaymentModal
                            subscrptionPayment={subscrptionPayment}
                            closePaymentModal={closePaymentModal}
                            userPicture={userDetails.data.user.picture}
                            name={userDetails.data.user.name}
                            user_unique_id={userDetails.data.user.user_unique_id}
                            subscriptionData={subscriptionData}
                            username={userDetails.data.user.username}
                        /> */}
          {subscrptionPayment ? (
            <SubscriptionPaymentModal
              paymentsModal={subscrptionPayment}
              closepaymentsModal={closePaymentModal}
              name={userDetails.data.user.name}
              user_unique_id={userDetails.data.user.user_unique_id}
              subscriptionData={subscriptionData}
            />
          ) : null}
          <PrivateCallModal
            requestVideoCall={requestVideoCall}
            closePrivateCallModal={closePrivateCallModal}
            username={userDetails.data.user.username}
            userPicture={userDetails.data.user.picture}
            videoAmount={userDetails.data.user.video_call_amount_formatted}
            name={userDetails.data.user.name}
            post_id={null}
            user_id={userDetails.data.user.user_id}
          />
          <PrivateAudioCallModal
            requestAudioCall={requestAudioCall}
            closePrivateCallModal={closePrivateCallModal}
            username={userDetails.data.user.username}
            userPicture={userDetails.data.user.picture}
            AudioAmount={userDetails.data.user.audio_call_amount_formatted}
            name={userDetails.data.user.name}
            post_id={null}
            user_id={userDetails.data.user.user_id}
          />
        </>
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  saveChatUser: state.chat.saveChatUser,
  userDetails: state.otherUser.userDetails,
  userPosts: state.otherUser.userPosts,
  products: state.userProducts.otherModelProducts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SingleProfile));
