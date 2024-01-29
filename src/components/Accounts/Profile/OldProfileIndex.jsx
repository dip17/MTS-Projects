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
import PostDisplayCard from "../../helper/PostDisplayCard";
import ModelProfilePostSec from "../../Model/ModelProfilePostSec";
import ModelProfileTabSec from "../../Model/ModelProfileTabSec";
import ModelProfilePhotoSec from "../../Model/ModelProfilePhotoSec";
import ModelProfileVideoSec from "../../Model/ModelProfileVideoSec";
import { fetchPostsStart } from "../../../store/actions/PostAction";
import {
  fetchUserDetailsStart,
  updateVerifyBadgeStatusStart,
} from "../../../store/actions/UserAction";
import { fetchSingleUserPostsStart } from "../../../store/actions/OtherUserAction";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import ProfileLoader from "../../Loader/ProfileLoader";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import configuration from "react-global-configuration";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
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
import { setLanguage } from "react-multi-lang";
import { translate, t } from "react-multi-lang";
import ModelProfileAudioSec from "../../Model/ModelProfileAudioSec";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

const OldProfileIndex = (props) => {
  const [badgeStatus, setBadgeStatus] = useState(0);

  const [activeSec, setActiveSec] = useState("post");

  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (props.posts.loading) props.dispatch(fetchPostsStart({ type: "all" }));
    if (props.profile.loading) {
      props.dispatch(fetchUserDetailsStart());
      setBadgeStatus(localStorage.getItem("is_verified_badge"));
    }
  }, []);

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t('profile_link_copied')
    );
    props.dispatch(createNotification(notificationMessage));
  };
  const onVerificationBadgeChange = (event) => {
    props.dispatch(updateVerifyBadgeStatusStart());
    setTimeout(() => {
      setBadgeStatus(localStorage.getItem("is_verified_badge"));
    }, 1000);
  };

  const setActiveSection = (event, key) => {
    setActiveSec(key);
    if (key === "post")
      props.dispatch(
        fetchPostsStart({
          type: "all",
        })
      );
    else if (key === "photo")
      props.dispatch(
        fetchPostsStart({
          type: "image",
        })
      );
    else if (key === "video")
      props.dispatch(
        fetchPostsStart({
          type: "video",
        })
      );
    else if (key === "audio")
      props.dispatch(
        fetchPostsStart({
          type: "audio",
        })
      );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const handleChangeLang = ({ currentTarget: input }) => {
    console.log(input.value);
    setLanguage(input.value);
    localStorage.setItem("lang", input.value);
    // window.location.reload();
  };

  return (
    <>
      <div className="single-profile-sec">
        {props.profile.loading ? (
          <ProfileLoader></ProfileLoader>
        ) : (
          <div className="single-profile-banner-img-sec">
            <Image
              src={props.profile.data.cover}
              alt={props.profile.data.name}
              className="single-profile-banner-img"
            />
            <Container>
              <Row>
                <Col sm={12} md={12}>
                  <div className="single-profile-info">
                    <div className="single-profile-user-img-sec">
                      {props.profile.data.featured_story ?
                        <a data-fancybox="gallery" href={props.profile.data.featured_story}>
                          <Image
                            src={props.profile.data.picture}
                            alt={props.profile.data.name}
                            className="single-profile-user-img border-red"
                          />
                        </a>
                        :
                        <Image
                          src={props.profile.data.picture}
                          alt={props.profile.data.name}
                          className="single-profile-user-img"
                        />
                      }
                    </div>
                    <h4 className="mb-3">
                      {props.profile.data.name}
                      <small>
                        {props.profile.data.is_verified_badge == 1 ? (
                          <VerifiedBadgeNoShadow />
                        ) : null}
                      </small>
                    </h4>
                    <Row className="about-me-sec">
                      <Col md={8}>
                        <div className="single-profile-card">
                          <h4 className="text-center">About me</h4>
                          <Row className="justify-content-md-center">
                            <Col md={4}>
                              <p>
                                <Link to="/fans">
                                  <span>
                                    <i className="fas fa-user-friends"></i>
                                    {localStorage.getItem("total_followers")
                                      ? localStorage.getItem("total_followers")
                                      : 0}{" "}
                                    {t("fans")}
                                  </span>
                                </Link>
                              </p>
                              <p>
                                <span>
                                  <i className="far fa-eye"></i>
                                  {props.profile.data.eyes_color
                                    ? props.profile.data.eyes_color
                                    : t("n_a")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fas fa-tag"></i>
                                  {props.profile.data.categories.name
                                    ? props.profile.data.categories.name
                                    : t("n_a")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fas fa-map-marker"></i>
                                  {props.profile.data.address
                                    ? props.profile.data.address
                                    : t("n_a")}
                                </span>
                              </p>
                            </Col>
                            <Col md={4}>
                              <p>
                                <Link to="/following">
                                  <span>
                                    <i className="fas fa-user-friends"></i>
                                    {localStorage.getItem("total_followings")
                                      ? localStorage.getItem("total_followings")
                                      : 0}{" "}
                                    {t("following")}
                                  </span>
                                </Link>
                              </p>
                              <p>
                                <span>
                                  <i className="fa fa-male"></i>
                                  {props.profile.data.height_formatted}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="far fa-user-circle"></i>Member
                                  since {props.profile.data.created_formatted}
                                </span>
                              </p>
                            </Col>
                            <Col md={4}>
                              <p>
                                <span>
                                  <i className="fa fa-genderless"></i>
                                  {props.profile.data.gender
                                    ? props.profile.data.gender
                                    : t("n_a")}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fa fa-weight"></i>
                                  {props.profile.data.weight_formatted}
                                </span>
                              </p>
                              <p>
                                <span>
                                  <i className="fa fa-certificate"></i>
                                  {t("online")}
                                </span>
                              </p>
                            </Col>
                            <Col md={12}>
                              <p>
                                <span>
                                  <i className="fa fa-info-circle"></i>
                                  {props.profile.data.about_formatted
                                    ? props.profile.data.about_formatted
                                    : t("n_a")}
                                </span>
                              </p>
                            </Col>
                            <Col md={8} className="social-sec">
                              {/* {props.profile.data.website ? (
																						<a href={props.profile.data.website} target="_blank">
																							<Image
																								className="social-icon"
																								src={
																									window.location.origin + "/assets/social/web-url.png"
																								}
																							/>
																						</a>
																					) : null } */}
                              {props.profile.data.amazon_wishlist ? (
                                <a
                                  href={props.profile.data.amazon_wishlist}
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
                              {props.profile.data.instagram_link ? (
                                <a
                                  href={props.profile.data.instagram_link}
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
                              {props.profile.data.facebook_link ? (
                                <a
                                  href={props.profile.data.facebook_link}
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
                              {props.profile.data.twitter_link ? (
                                <a
                                  href={props.profile.data.twitter_link}
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
                              {props.profile.data.snapchat_link ? (
                                <a
                                  href={props.profile.data.snapchat_link}
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
                              {props.profile.data.linkedin_link ? (
                                <a
                                  href={props.profile.data.linkedin_link}
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
                              {props.profile.data.pinterest_link ? (
                                <a
                                  href={props.profile.data.pinterest_link}
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
                              {props.profile.data.youtube_link ? (
                                <a
                                  href={props.profile.data.youtube_link}
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
                              {props.profile.data.twitch_link ? (
                                <a
                                  href={props.profile.data.twitch_link}
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
                    <ul className="list-unstyled single-pro-action-sec">
                      <Media as="li">
                        <Link to={"/edit-profile"}>
                          <span>
                            <Image
                              className="btn-icon"
                              src={
                                window.location.origin +
                                "/assets/images/icons/edit-profile.png"
                              }
                            />
                          </span>
                          {t("edit_profile")}
                        </Link>
                      </Media>
                      <Media as="li" className="display-mobile">
                        <Link to={"/live-videos"}>
                          <span>
                            <i className="fas fa-video"></i>
                          </span>
                          Live Video
                        </Link>
                      </Media>
                      <Media as="li">
                        {/* <CopyToClipboard
																			text={props.profile.data.share_link}
																			onCopy={onCopy}
																		> */}
                        <Link to="#" onClick={handleShareClick}>
                          <span>
                            <i className="far fa-share-square"></i>
                          </span>
                      {t("share")}
                        </Link>
                        {/* </CopyToClipboard> */}
                      </Media>
                      {props.profile.data.is_content_creator == 2 ? (
                        <Media as="li">
                          <Link to={"/dashboard"}>
                            <span>
                              <Image
                                className="btn-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/icons/analytics.svg"
                                }
                              />
                            </span>
                            {t("dashboard")}
                          </Link>
                        </Media>
                      ) : (
                        <Media as="li">
                          <Link to={"/become-a-content-creator"}>
                            <span>
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                            {t("become_a_content_creator")}
                          </Link>
                        </Media>
                      )}
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
                                  url={props.profile.data.share_link}
                                  subject={configuration.get(
                                    "configData.site_name"
                                  )}
                                  body={props.profile.data.share_message}
                                  className="Demo__some-network__share-button"
                                >
                                  <EmailIcon size={32} round />
                                </EmailShareButton>
                              </div>
                              {/* <h6 className="social-desc">{t("email")}</h6> */}
                            </div>
                            <div className="text-center social-link">
                              <WhatsappShareButton
                                url={props.profile.data.share_link}
                                title={props.profile.data.share_message}
                                separator=":: "
                                className="Demo__some-network__share-button"
                              >
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                              {/* <h6 className="social-desc">{t("whatsapp")}</h6> */}
                            </div>
                            <div className="text-center social-link">
                              <FacebookShareButton
                                url={props.profile.data.share_link}
                                quote={props.profile.data.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                              {/* <h6 className="social-desc">{t("facebook")}</h6> */}
                            </div>
                            <div className="text-center social-link">
                              <TwitterShareButton
                                url={props.profile.data.share_link}
                                title={props.profile.data.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                              {/* <h6 className="social-desc">{t("twitter")}</h6> */}
                            </div>
                            <div className="text-center social-link">
                              <RedditShareButton
                                url={props.profile.data.share_link}
                                title={props.profile.data.share_message}
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
                                url={props.profile.data.share_link}
                                title={props.profile.data.share_message}
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
                                text={props.profile.data.share_link}
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
                      <div className="select-lang-drop-down">
                        <select
                          className="form-control mw-200 mb-3"
                          onChange={handleChangeLang}
                          name="lang"
                          defaultValue={localStorage.getItem("lang")}
                        >
                          <option
                            value="en"
                            selected={
                              localStorage.getItem("lang") == "en"
                                ? true
                                : false
                            }
                          >
                            {t("english")}
                          </option>
                          <option
                            value="es"
                            selected={
                              localStorage.getItem("lang") == "es"
                                ? true
                                : false
                            }
                          >
                            {t("spanish")}
                          </option>
                        </select>
                      </div>
                    </ul>
                  </div>
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
                                    <span className="hide-text">{t("posts")}</span>
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
                                    <span className="hide-text">{t("videos")}</span>
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
                                    <span className="hide-text">{t("audios")}</span>
                                  </span>
                                </div>
                              </Nav.Link>
                            </Nav.Item>
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
                                          userPosts={props.posts}
                                          scrollToTop={scrollToTop}
                                          otherUserUniquId={
                                            props.profile.data.username
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
                                          userPosts={props.posts}
                                          otherUserUniquId={
                                            props.profile.data.username
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
                                          userPosts={props.posts}
                                          otherUserUniquId={
                                            props.profile.data.username
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
                                          userPosts={props.posts}
                                          otherUserUniquId={
                                            props.profile.data.username
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  posts: state.post.posts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(OldProfileIndex));
