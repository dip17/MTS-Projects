import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Image,
  Container,
  Media,
  Tab,
  Nav,
  Button,
  Modal,
} from "react-bootstrap";
import "./SingleProfile.css";
import { Link } from "react-router-dom";
import ModelProfilePostSec from "../../Model/ModelProfilePostSec";
import ModelProfileTabSec from "../../Model/ModelProfileTabSec";
import ModelProfilePhotoSec from "../../Model/ModelProfilePhotoSec";
import ModelProfileVideoSec from "../../Model/ModelProfileVideoSec";
import ModelProfileAudioSec from "../../Model/ModelProfileAudioSec";
import ModelProfileStoreSec from "../../Model/ModelProfileStoreSec";
import SendTipModal from "../../helper/SendTipModal";
import PaymentModal from "../../helper/PaymentModal";
import PrivateCallModal from "../../helper/PrivateCallModal";
import PrivateAudioCallModal from "../../helper/PrivateAudioCallModal";
import {
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../../store/actions/OtherUserAction";
import {
  fetchOtherModelProductListStart,
} from "../../../store/actions/ProductsAction";
import { saveFavStart } from "../../../store/actions/FavAction";
import { saveChatUserStart } from "../../../store/actions/ChatAction";
import { subscriptionPaymentStripeStart } from "../../../store/actions/SubscriptionAction";
import { unFollowUserStart } from "../../../store/actions/FollowAction";
import { saveBlockUserStart } from "../../../store/actions/UserAction";
import { getSuccessNotificationMessage, getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ProfileLoader from "../../Loader/ProfileLoader";
import { translate, t } from "react-multi-lang";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
import configuration from "react-global-configuration";
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
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

const OldSingleProfile = (props) => {
  const toggleVisibility = () => { };

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
      })
    );
    props.dispatch(
      fetchOtherModelProductListStart({
        user_unique_id: props.match.params.username,
      })
    );

    window.addEventListener("scroll", toggleVisibility);
  }, []);

  const [activeSec, setActiveSec] = useState("post");
  const [sendTip, setSendTip] = useState(false);
  const [starStatus, setStarStatus] = useState("");
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [blockUserStatus, setBlockUserStatus] = useState("");

  const [requestVideoCall, setRequestVideoCall] = useState(false);
  const [requestAudioCall, setRequestAudioCall] = useState(false);

  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [subscrptionPayment, setPaymentModal] = useState(false);
  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const blockStatusUpdate = () => {
    if (props.loading == false) {
      setBlockUserStatus(
        props.data.is_block_user == 1 ? "blocked" : "unblocked"
      );
    }
  };

  const handleBlockUser = (event, status, user_id) => {
    event.preventDefault();
    setBlockUserStatus(status);
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const setActiveSection = (event, key) => {
    setActiveSec(key);
    if (key === "post")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "all",
        })
      );
    else if (key === "photo")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "image",
        })
      );
    else if (key === "video")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "video",
        })
      );
    else if (key === "audio")
      props.dispatch(
        fetchSingleUserPostsStart({
          user_unique_id: props.match.params.username,
          type: "audio",
        })
      );
    else if (key === "store")
      props.dispatch(
        fetchOtherModelProductListStart({
          user_unique_id: props.match.params.username,
        })
      );
  };

  const handleUnfollowModalClose = () => setShowUnfollow(false);
  const handleUnfollowModalShow = () => setShowUnfollow(true);

  const handleUnfollow = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      unFollowUserStart({
        user_id: user_id,
      })
    );
  };

  const handleStar = (event, user_id, status) => {
    event.preventDefault();
    setStarStatus(status);
    props.dispatch(
      saveFavStart({
        user_id: user_id,
      })
    );
  };

  const handleChatUser = (event, user_id) => {
    event.preventDefault();
    if (!localStorage.getItem("userId")) {
      const notificationMessage = getErrorNotificationMessage(
        t('login_to_continue')
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
        t('login_to_continue')
      );
      props.dispatch(createNotification(notificationMessage));
    }

  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t('profile_link_copied')
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const { userDetails } = props;

  const scrollToTop = () => {
    console.log("adadasdas");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Private Video call

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

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="single-profile-sec">
        {userDetails.loading ? (
          <ProfileLoader></ProfileLoader>
        ) : (
          <div className="single-profile-banner-img-sec">
            <Image
              src={userDetails.data.user.cover}
              alt={userDetails.data.user.name}
              className="single-profile-banner-img"
            />
            <Container>
              <Row>
                <Col sm={12} md={12}>
                  <div className="single-profile-info">
                    <div className="single-profile-user-img-sec">
                      {userDetails.data.user.featured_story ?
                        <a data-fancybox="gallery" href={userDetails.data.user.featured_story}>
                          <Image
                            src={userDetails.data.user.picture}
                            alt={userDetails.data.user.name}
                            className="single-profile-user-img border-red"
                          />
                        </a>
                        :
                        <Image
                          src={userDetails.data.user.picture}
                          alt={userDetails.data.user.name}
                          className="single-profile-user-img"
                        />
                      }
                    </div>
                    <h4>
                      {userDetails.data.user.name}
                      <small>
                        {userDetails.data.user.is_verified_badge == 1 ? (
                          <VerifiedBadgeNoShadow />
                        ) : null}
                      </small>
                    </h4>
                    <Row className="about-me-sec">
                      <Col md={8}>
                        <div className="single-profile-card">
                          <h4 className="text-center">{t("about_me")}</h4>
                          <Row className="justify-content-center">
                            <Col md={4}>
                              <p>
                                <span>
                                  <i className="fas fa-user-friends"></i>
                                  {userDetails.data.total_followers} Followers
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="far fa-eye"></i>
                                  {userDetails.data.user.eyes_color
                                    ? userDetails.data.user.eyes_color
                                    : t("n_a")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fas fa-tag"></i>
                                  {userDetails.data.user.categories.name
                                    ? userDetails.data.user.categories.name
                                    : t("n_a")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fas fa-map-marker"></i>
                                  {userDetails.data.user.address
                                    ? userDetails.data.user.address
                                    : t("n_a")}
                                </span>
                              </p>
                            </Col>
                            <Col md={4}>
                              <p>
                                <span>
                                  <i className="fas fa-user-friends"></i>
                                  {userDetails.data.total_followings}{" "}
                                  {t("following")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fa fa-male"></i>
                                  {userDetails.data.user.height_formatted}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="far fa-user-circle"></i>{t("member_since")}{" "}
                                  {userDetails.data.user.created_formatted}
                                </span>
                              </p>
                            </Col>
                            <Col md={4}>
                              {userDetails.data.user.is_online_status == 1 ? (
                                <p>
                                  <span>
                                    <i className="fa fa-certificate"></i>
                                    {userDetails.data.user.is_user_online == 1
                                      ? t("online")
                                      : t("offline")}
                                  </span>
                                </p>
                              ) : null}
                              <p>
                                <span>
                                  <i className="fa fa-genderless"></i>
                                  {userDetails.data.user.gender
                                    ? userDetails.data.user.gender
                                    : t("n_a")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fa fa-weight"></i>
                                  {userDetails.data.user.weight_formatted}
                                </span>
                              </p>
                            </Col>
                            <Col md={12}>
                              <p>
                                <span>
                                  <i className="fa fa-info-circle"></i>
                                  {userDetails.data.user.about_formatted
                                    ? userDetails.data.user.about_formatted
                                    : t("n_a")}
                                </span>
                              </p>
                            </Col>
                            <Col md={8} className="social-sec">
                              {/* {userDetails.data.user.website ? (
																									<a href={userDetails.data.user.website} target="_blank">
																										<Image
																											className="social-icon"
																											src={
																												window.location.origin + "/assets/social/web-url.png"
																											}
																										/>
																									</a>
																								) : null } */}
                              {userDetails.data.user.amazon_wishlist ? (
                                <a
                                  href={userDetails.data.user.amazon_wishlist}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/amazon-wish-list.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.instagram_link ? (
                                <a
                                  href={userDetails.data.user.instagram_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/instagram.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.facebook_link ? (
                                <a
                                  href={userDetails.data.user.facebook_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/facebook.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.twitter_link ? (
                                <a
                                  href={userDetails.data.user.twitter_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/twitter.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.snapchat_link ? (
                                <a
                                  href={userDetails.data.user.snapchat_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/snapchat.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.linkedin_link ? (
                                <a
                                  href={userDetails.data.user.linkedin_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/linkedin.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.pinterest_link ? (
                                <a
                                  href={userDetails.data.user.pinterest_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/pinterest.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.youtube_link ? (
                                <a
                                  href={userDetails.data.user.youtube_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/youtube.svg"
                                    }
                                  />
                                </a>
                              ) : null}
                              {userDetails.data.user.twitch_link ? (
                                <a
                                  href={userDetails.data.user.twitch_link}
                                  target="_blank"
                                >
                                  <Image
                                    className="social-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/social/twitch.png"
                                    }
                                  />
                                </a>
                              ) : null}
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    {/* <p>{userDetails.data.user.is_user_online ? 'Active Now' : 'Offline'}</p> */}
                    {userDetails.data.is_block_user == 0 ? (
                      <ul className="list-unstyled single-pro-action-sec new-colum-action">
                        {userDetails.data.payment_info.is_user_needs_pay == 1 &&
                          userDetails.data.payment_info.unsubscribe_btn_status ==
                          0 ? (
                          userDetails.data.payment_info.is_free_account == 0 ? (
                            <>
                              <div className="flex-content-colum">
                                <Media as="li" className="active">
                                  <Link
                                    to="#"
                                    onClick={(event) =>
                                      subscriptionPayment(
                                        event,
                                        "months",
                                        userDetails.data.payment_info
                                          .subscription_info.monthly_amount,
                                        userDetails.data.payment_info
                                          .subscription_info
                                          .monthly_amount_formatted
                                      )
                                    }
                                  >
                                    <span>
                                      <i className="fas fa-unlock"></i>
                                    </span>
                                   {t("get_access")}{" "}
                                    {
                                      userDetails.data.payment_info
                                        .subscription_info
                                        .monthly_amount_formatted
                                    }
                                    /{t("mo")}
                                  </Link>
                                </Media>
                                <Media as="li" className="active">
                                  <Link
                                    to="#"
                                    onClick={(event) =>
                                      subscriptionPayment(
                                        event,
                                        "years",
                                        userDetails.data.payment_info
                                          .subscription_info.yearly_amount,
                                        userDetails.data.payment_info
                                          .subscription_info
                                          .yearly_amount_formatted
                                      )
                                    }
                                  >
                                    <span>
                                      <i className="fas fa-unlock"></i>
                                    </span>
                                    {t("get_access")}{" "}
                                    {
                                      userDetails.data.payment_info
                                        .subscription_info
                                        .yearly_amount_formatted
                                    }
                                    /yr
                                  </Link>
                                </Media>
                              </div>
                            </>
                          ) : (
                            <Media as="li" className="active">
                              <Link
                                to="#"
                                onClick={(event) => {
                                  if (localStorage.getItem("userId")) {
                                    props.dispatch(
                                      subscriptionPaymentStripeStart({
                                        user_unique_id:
                                          userDetails.data.user.user_unique_id,
                                        plan_type: "months",
                                        is_free: 0,
                                      })
                                    )
                                  } else {
                                    const notificationMessage = getErrorNotificationMessage(
                                      t('login_to_continue')
                                    );
                                    props.dispatch(createNotification(notificationMessage));
                                  }
                                }
                                }
                              >
                                <span>
                                  <i className="fas fa-unlock"></i>
                                </span>
                                {userDetails.data.payment_info.payment_text}
                              </Link>
                            </Media>
                          )
                        ) : null}

                        {userDetails.data.payment_info.unsubscribe_btn_status ==
                          1 ? (
                          <>
                            <Media as="li" className="active">
                              <Link to="#" onClick={handleUnfollowModalShow}>
                                <span>
                                  <i className="fas fa-user-times"></i>
                                </span>
                                {t("unfollow")}
                              </Link>
                            </Media>
                            <Modal
                              show={showUnfollow}
                              onHide={handleUnfollowModalClose}
                              backdrop="static"
                              keyboard={false}
                              centered
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
                        ) : null}
                        <div>
                          {configuration.get(
                            "configData.is_one_to_one_call_enabled"
                          ) == 1 ? (
                            <>
                              <Media as="li">
                                <Link
                                  to="#"
                                  onClick={() => {
                                    if (localStorage.getItem("userId")) {
                                      setRequestVideoCall(true);
                                    } else {
                                      const notificationMessage = getErrorNotificationMessage(
                                        t('login_to_continue')
                                      );
                                      props.dispatch(createNotification(notificationMessage));
                                    }
                                  }}
                                >
                                  <span>
                                    <i className="fa fa-video-camera"></i>
                                  </span>
                                </Link>
                              </Media>
                              <Media as="li">
                                <Link
                                  to="#"
                                  onClick={() => {
                                    if (localStorage.getItem("userId")) {
                                      setRequestAudioCall(true)
                                    } else {
                                      const notificationMessage = getErrorNotificationMessage(
                                        t('login_to_continue')
                                      );
                                      props.dispatch(createNotification(notificationMessage));
                                    }
                                  }
                                  }
                                >
                                  <span>
                                    <i className="fa fa-phone"></i>
                                  </span>
                                </Link>
                              </Media>
                            </>
                          ) : null}
                          <Media as="li">
                            <Link to="#" onClick={() => {
                              if (localStorage.getItem("userId")) {
                                setSendTip(true)
                              } else {
                                const notificationMessage = getErrorNotificationMessage(
                                  t('login_to_continue')
                                );
                                props.dispatch(createNotification(notificationMessage));
                              }
                            }
                            }>
                              <span>
                                <i className="fa fa-donate"></i>
                              </span>
                           {("tips")}
                            </Link>
                          </Media>
                          <Media as="li">
                            <Link
                              to="#"
                              onClick={(event) =>
                                handleChatUser(
                                  event,
                                  userDetails.data.user.user_id
                                )
                              }
                            >
                              <i className="far fa-paper-plane"></i>
                            </Link>
                          </Media>
                          <Media as="li">
                            <Link to="#" onClick={handleShareClick}>
                              <i className="far fa-share-square"></i>
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
                                    url={userDetails.data.user.share_message}
                                    // title={userDetails.data.user.share_message}
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
                                    url={userDetails.data.user.share_message}
                                    // title={userDetails.data.user.share_message}
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
                        </div>
                      </ul>
                    ) : (
                      <ul className="list-unstyled single-pro-action-sec">
                        <Media as="li">
                          <Link
                            to="#"
                            onClick={(event) =>
                              handleBlockUser(
                                event,
                                "unblocked",
                                userDetails.data.user.user_id
                              )
                            }
                          >
                            <span>
                              <i className="fa fa-ban"></i>
                            </span>
                            {t("unblock_user")}
                          </Link>
                        </Media>
                      </ul>
                    )}
                  </div>

                  {userDetails.data.is_block_user == 0 ? (
                    <div className="single-profile-tab-sec">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="first"
                      >
                        <Row>
                          <Col sm={12}>
                            <Nav variant="pills">
                              <Nav.Item>
                                <Nav.Link
                                  eventKey="first"
                                  onClick={(event) =>
                                    setActiveSection(event, "post")
                                  }
                                >
                                  <div className="flex-nav-link">
                                    <span></span>
                                    <span>
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/new/file-text.svg"
                                        }
                                        alt=""
                                        className="flex-nav-link-icon"
                                      />
                                      <span className="hide-text"> {t('posts')}</span>
                                    </span>
                                  </div>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  eventKey="second"
                                  onClick={(event) =>
                                    setActiveSection(event, "photo")
                                  }
                                >
                                  <div className="flex-nav-link">
                                    <span></span>
                                    <span>
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/new/image.svg"
                                        }
                                        alt=""
                                        className="flex-nav-link-icon"
                                      />
                                      <span className="hide-text">{t("photos")}</span>
                                    </span>
                                  </div>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  eventKey="third"
                                  onClick={(event) =>
                                    setActiveSection(event, "video")
                                  }
                                >
                                  <div className="flex-nav-link">
                                    <span></span>
                                    <span>
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/new/video.svg"
                                        }
                                        alt=""
                                        className="flex-nav-link-icon"
                                      />
                                      <span className="hide-text">{("videos")}</span>
                                    </span>
                                  </div>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  eventKey="fourth"
                                  onClick={(event) =>
                                    setActiveSection(event, "audio")
                                  }
                                >
                                  <div className="flex-nav-link">
                                    <span></span>
                                    <span>
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/audio.svg"
                                        }
                                        alt=""
                                        className="flex-nav-link-icon"
                                      />
                                      <span className="hide-text">{t('audios')}</span>
                                    </span>
                                  </div>
                                </Nav.Link>
                              </Nav.Item>
                              {userDetails.data.user.is_content_creator == 2 ? (
                                <Nav.Item>
                                  <Nav.Link
                                    eventKey="fifth"
                                    onClick={(event) =>
                                      setActiveSection(event, "store")
                                    }
                                  >
                                    <div className="flex-nav-link">
                                      <span></span>
                                      <span>
                                        <Image
                                          src={
                                            window.location.origin +
                                            "/assets/images/icons/shopping-bag.svg"
                                          }
                                          alt=""
                                          className="flex-nav-link-icon"
                                        />
                                        <span className="hide-text">{t('store')}</span>
                                      </span>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                              ) : null}
                            </Nav>
                          </Col>
                          <Col sm={12}>
                            <Row className="post-sec">
                              <Col md={8}>
                                <Tab.Content>
                                  <Tab.Pane eventKey="first">
                                    <div className="single-profile-body-sec">
                                      <Row>
                                        <Col md={12}>
                                          <ModelProfilePostSec
                                            activeSec={activeSec}
                                            setActiveSec={setActiveSec}
                                            userPosts={props.userPosts}
                                            scrollToTop={scrollToTop}
                                            otherUserUniquId={
                                              props.match.params.username
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="second">
                                    <div className="single-profile-body-sec">
                                      <Row>
                                        <Col md={12}>
                                          <ModelProfilePhotoSec
                                            activeSec={activeSec}
                                            setActiveSec={setActiveSec}
                                            userPosts={props.userPosts}
                                            otherUserUniquId={
                                              props.match.params.username
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="third">
                                    <div className="single-profile-body-sec">
                                      <Row>
                                        <Col md={12}>
                                          <ModelProfileVideoSec
                                            activeSec={activeSec}
                                            setActiveSec={setActiveSec}
                                            userPosts={props.userPosts}
                                            otherUserUniquId={
                                              props.match.params.username
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="fourth">
                                    <div className="single-profile-body-sec">
                                      <Row>
                                        <Col md={12}>
                                          <ModelProfileAudioSec
                                            activeSec={activeSec}
                                            setActiveSec={setActiveSec}
                                            userPosts={props.userPosts}
                                            otherUserUniquId={
                                              props.match.params.username
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </Tab.Pane>
                                  {userDetails.data.user.is_content_creator == 2 ? (
                                    <Tab.Pane eventKey="fifth">
                                      <div className="single-profile-body-sec">
                                        <Row>
                                          <Col md={12}>
                                            <ModelProfileStoreSec
                                              activeSec={activeSec}
                                              setActiveSec={setActiveSec}
                                              products={props.products}
                                              otherUserUniquId={
                                                props.match.params.username
                                              }
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                    </Tab.Pane>
                                  ) : null}
                                </Tab.Content>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>
                  ) : (
                    <></>
                    // <div className="subscription-section">
                    //   <Link
                    //     to=""
                    //     className="btn gradient-btn gradientcolor text-uppercase mt-0 mt-md-3"
                    //     onClick={(event) =>
                    //       handleBlockUser(
                    //         event,
                    //         "unblocked",
                    //         userDetails.data.user.user_id
                    //       )
                    //     }
                    //   >
                    //     {t("unblock_user")}
                    //   </Link>
                    // </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
      {userDetails.loading ? (
        t("loading")
      ) : localStorage.getItem("userId") !== "" &&
        localStorage.getItem("userId") !== null &&
        localStorage.getItem("userId") !== undefined ? (
        <>
          <SendTipModal
            sendTip={sendTip}
            closeSendTipModal={closeSendTipModal}
            username={props.userDetails.data.user.username}
            userPicture={props.userDetails.data.user.picture}
            name={props.userDetails.data.user.name}
            post_id={null}
            user_id={props.userDetails.data.user.user_id}
          />
          <PaymentModal
            subscrptionPayment={subscrptionPayment}
            closePaymentModal={closePaymentModal}
            userPicture={props.userDetails.data.user.picture}
            name={props.userDetails.data.user.name}
            user_unique_id={props.userDetails.data.user.user_unique_id}
            subscriptionData={subscriptionData}
            username={props.userDetails.data.user.username}
          />
        </>
      ) : null}

      {userDetails.loading ? (
        t("loading")
      ) : localStorage.getItem("userId") !== "" &&
        localStorage.getItem("userId") !== null &&
        localStorage.getItem("userId") !== undefined ? (
        <>
          <PrivateCallModal
            requestVideoCall={requestVideoCall}
            closePrivateCallModal={closePrivateCallModal}
            username={props.userDetails.data.user.username}
            userPicture={props.userDetails.data.user.picture}
            videoAmount={
              props.userDetails.data.user.video_call_amount_formatted
            }
            name={props.userDetails.data.user.name}
            post_id={null}
            user_id={props.userDetails.data.user.user_id}
          />
          <PrivateAudioCallModal
            requestAudioCall={requestAudioCall}
            closePrivateCallModal={closePrivateCallModal}
            username={props.userDetails.data.user.username}
            userPicture={props.userDetails.data.user.picture}
            AudioAmount={
              props.userDetails.data.user.audio_call_amount_formatted
            }
            name={props.userDetails.data.user.name}
            post_id={null}
            user_id={props.userDetails.data.user.user_id}
          />
        </>
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  chat: state.chat,
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
)(translate(OldSingleProfile));
