import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Tab, Nav, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NewProfile.css";
import { fetchPostsStart } from "../../../store/actions/PostAction";
import {
    fetchUserDetailsStart,
    updateVerifyBadgeStatusStart,
} from "../../../store/actions/UserAction";
import { connect } from 'react-redux';
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
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
import InfiniteScroll from "react-infinite-scroll-component";
import NoDataFound from "../../NoDataFound/NoDataFound";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProfileLoader from "../../Loader/ProfileLoader";

const ProfileIndex = (props) => {

    const [badgeStatus, setBadgeStatus] = useState(0);

    const [activeSec, setActiveSec] = useState("all");

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(12);

    useEffect(() => {
        props.dispatch(fetchPostsStart({ type: "all", skip: 0, take: take }));
        setSkip(take);
        if (props.profile.loading) {
            props.dispatch(fetchUserDetailsStart());
            setBadgeStatus(localStorage.getItem("is_verified_badge"));
        }
    }, []);

    const setActiveSection = (event, key) => {
        setActiveSec(key);
        props.dispatch(
            fetchPostsStart({
                type: key,
                skip: 0,
                take: take,
            })
        );
        setSkip(take);
    };

    const fetchMorePost = () => {
        props.dispatch(
            fetchPostsStart({
                type: activeSec,
                append: true,
                skip: skip,
                take: take,
            })
        );
        setSkip(skip + take);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleShareClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onCopy = (event) => {
        const notificationMessage = getSuccessNotificationMessage(
            t('profile_link_copied')
        );
        props.dispatch(createNotification(notificationMessage));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? "simple-popover" : undefined;

    return (
        <>
            <div className="new-home-sec">
                {props.profile.loading ? (
                    <ProfileLoader />
                )
                    : <div className="new-home-box">
                        <div className="new-home-sidebar">
                            <div className="profile-logo-sec">
                                <Image
                                    className="profile-logo-img"
                                    src={configuration.get("configData.site_logo")}
                                    width="136" height="28"
                                />
                            </div>
                            <div className="sibebar-header-sec">
                                {props.profile.data.featured_story ?
                                    <div className="sidebar-user-img-sec">
                                        <div data-fancybox="gallery" href={props.profile.data.featured_story}>
                                            <Image
                                                className="sidebar-user-img profile-image"
                                                src={props.profile.data.picture}
                                                alt={props.profile.data.name}
                                            />
                                        </div>
                                        {props.profile.data.is_user_live === 1 &&
                                            <Link
                                                to={`/join/${props.profile.data.ongoing_live_video.live_video_unique_id}`}
                                                className="sidebar-live-btn">
                                               {t("live")}
                                            </Link>
                                        }
                                        {props.profile.data.is_online_status === 1 && props.profile.data.is_user_online === 1 &&
                                            <div className="dot-circle">
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div className="sidebar-user-no-fea-img-sec">
                                        <Image
                                            className="sidebar-user-img profile-image"
                                            src={props.profile.data.picture}
                                            alt={props.profile.data.name}
                                        />
                                        {props.profile.data.is_user_live === 1 &&
                                            <Link
                                                to={`/join/${props.profile.data.ongoing_live_video.live_video_unique_id}`}
                                                className="sidebar-live-btn">
                                              {t("live")}
                                            </Link>
                                        }
                                        {props.profile.data.is_online_status === 1 && props.profile.data.is_user_online === 1 &&
                                            <div className="dot-circle">
                                            </div>
                                        }
                                    </div>
                                }
                                <h4>{props.profile.data.name}
                                    <span>
                                        {props.profile.data.is_verified_badge == 1 &&
                                            <Image
                                                className="sidebar-verified-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                                }
                                            />
                                        }
                                    </span>
                                </h4>
                                {/* <Link to="#" className="sidebar-user-name">
                                    {props.profile.data.email}
                                </Link> */}
                                <div className="sidebar-total-count-info-box">
                                    <div className="sidebar-total-count-card">
                                        <h5>{props.profile.data.total_posts}</h5>
                                        <p>{t("posts")}</p>
                                    </div>
                                    <div className="sidebar-total-count-card">
                                        <h5>{localStorage.getItem("total_followers")
                                            ? localStorage.getItem("total_followers")
                                            : 0}</h5>
                                        <p>{t("fans")}</p>
                                    </div>
                                    <div className="sidebar-total-count-card">
                                        <h5>{localStorage.getItem("total_followings")
                                            ? localStorage.getItem("total_followings")
                                            : 0}</h5>
                                        <p>{t("following")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-links">
                                <ul className="list-unstyled">
                                    <Media as="li">
                                        <Link to={"/edit-profile"}>
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/icon/edit-profile-theme-1.svg"
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
                                                        window.location.origin + "/assets/images/new-home/icon/share-theme-1.svg"
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
                                    {props.profile.data.is_content_creator == 2 ? (
                                        <Media as="li">
                                            <Link to={"/dashboard"}>
                                                <span>
                                                    <Image
                                                        className="sidebar-links-icon"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/icon/dashboard-theme-1.svg"
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
                                                                window.location.origin + "/assets/images/new-home/icon/become-content-creator.svg"
                                                            }
                                                        />
                                                    </span>
                                                    {t("become_a_content_creator")}
                                                </Link>
                                            </Media>
                                        )
                                    }
                                </ul>
                            </div>
                            {/* <div className="sidebar-links">
                                <ul className="list-unstyled">
                                    <Media as="li">
                                        <Link to="#">
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/video-call-1.svg"
                                                    }
                                                />
                                            </span>
                                            Video Call
                                        </Link>
                                    </Media>
                                    <Media as="li">
                                        <Link to="#">
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/audio-call-1.svg"
                                                    }
                                                />
                                            </span>
                                            Voice Call
                                        </Link>
                                    </Media>
                                    <Media as="li">
                                        <Link to="#">
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/sent-tip-1.svg"
                                                    }
                                                />
                                            </span>
                                            Tip Me
                                        </Link>
                                    </Media>
                                    <Media as="li">
                                        <Link to="#">
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/message-1.svg"
                                                    }
                                                />
                                            </span>
                                            Message
                                        </Link>
                                    </Media>
                                    <Media as="li">
                                        <Link to="#">
                                            <span>
                                                <Image
                                                    className="sidebar-links-icon"
                                                    src={
                                                        window.location.origin + "/assets/images/new-home/share-theme-1.svg"
                                                    }
                                                />
                                            </span>
                                            Share
                                        </Link>
                                    </Media>
                                </ul>
                            </div> */}
                            {
                                props.profile.data.youtube_link ||
                                    props.profile.data.pinterest_link ||
                                    props.profile.data.linkedin_link ||
                                    props.profile.data.snapchat_link ||
                                    props.profile.data.twitter_link ||
                                    props.profile.data.instagram_link ||
                                    props.profile.data.amazon_wishlist ||
                                    props.profile.data.facebook_link ||
                                    props.profile.data.twitch_link ||
                                    props.profile.data.website ?
                                    <div className="sidebar-social-links">
                                        <ul className="list-unstyled">
                                            {props.profile.data.youtube_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.youtube_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/you-tube.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.pinterest_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.pinterest_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/pintrest.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.linkedin_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.linkedin_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/linked-in.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.snapchat_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.snapchat_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/snap-chat.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.twitter_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.twitter_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/twitter.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.instagram_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.instagram_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/instagram.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.amazon_wishlist && (
                                                <Media as="li">
                                                    <a href={props.profile.data.amazon_wishlist} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/amazon.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.facebook_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.facebook_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/facebook.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.twitch_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.twitch_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/twitch.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.website && (
                                                <Media as="li">
                                                    <a href={props.profile.data.website} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/website.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                        </ul>
                                    </div> : null
                            }
                        </div>
                        <div className="new-home-main-wrapper">
                            <div className="user-cover-img-sec">
                                <Image
                                    className="user-cover-img"
                                    src={props.profile.data.cover}
                                    alt={props.profile.data.name}
                                />
                                <div className="website-hide-sec">
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
                            </div>
                            <div className="user-right-content-sec">
                                <div className="user-right-info">
                                    <div className="user-info-desc">
                                        <p>
                                            {props.profile.data.about_formatted}
                                            {/* <a href="#">Read More</a> */}
                                        </p>
                                    </div>
                                    <div className="user-info-list">
                                        <ul className="list-unstyled">
                                            {props.profile.data.selected_category && props.profile.data.selected_category.name &&
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={window.location.origin + "/assets/images/new-home/icon/fashion.svg"}
                                                        />
                                                        <span>{props.profile.data.selected_category.name}</span>
                                                    </Link>
                                                </Media>
                                            }
                                            {props.profile.data.date_of_birth &&
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/date-icon.svg"
                                                            }
                                                        />
                                                        <span>{props.profile.data.date_of_birth}</span>
                                                    </Link>
                                                </Media>
                                            }
                                            {props.profile.data.gender && props.profile.data.gender != "rather-not-select" &&
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/gender.svg"
                                                            }
                                                        />
                                                        <span>{props.profile.data.gender}</span>
                                                    </Link>
                                                </Media>
                                            }
                                            {props.profile.data.eyes_color_formatted &&
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/eye.svg"
                                                            }
                                                        />
                                                        <span>{props.profile.data.eyes_color_formatted}</span>
                                                    </Link>
                                                </Media>
                                            }
                                            {props.profile.data.height ?
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/scale.svg"
                                                            }
                                                        />
                                                        <span>{props.profile.data.height_formatted}</span>
                                                    </Link>
                                                </Media> : null
                                            }
                                            {props.profile.data.weight ?
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/weight.svg"
                                                            }
                                                        />
                                                        <span>{props.profile.data.weight_formatted}</span>
                                                    </Link>
                                                </Media> : null
                                            }
                                            {props.profile.data.address ?
                                                <Media as="li">
                                                    <Link to="#">
                                                        <Image
                                                            className="user-info-icon"
                                                            src={
                                                                window.location.origin +
                                                                "/assets/images/new-settings/map-marker-icon.svg"
                                                            }
                                                        />
                                                        <span>
                                                            {props.profile.data.address}
                                                        </span>
                                                    </Link>
                                                </Media> : null
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="user-subscription-plans-details">
                                    <h3>{t('my_plans')}</h3>
                                    {props.profile.data.payment_info?.is_free_account == "0" ?
                                        <div className="user-subscription-btn-sec">
                                            <div className="profile-subscription-btn">
                                                {props.profile.data.payment_info.subscription_info.monthly_amount_formatted} /Month
                                            </div>
                                            <div className="profile-subscription-btn">
                                                {props.profile.data.payment_info.subscription_info.yearly_amount_formatted} /Year
                                            </div>
                                        </div>
                                        : <div className="user-subscription-btn-sec">
                                            <div className="profile-subscription-btn">
                                                {t("free_subscription")}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="mobile-display">
                                <div className="sidebar-links">
                                    <ul className="list-unstyled">
                                        <Media as="li">
                                            <Link to={"/edit-profile"}>
                                                <span>
                                                    <Image
                                                        className="sidebar-links-icon"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/icon/edit-profile-theme.svg"
                                                        }
                                                    />
                                                </span>
                                                {t("edit_profile")}
                                            </Link>
                                        </Media>
                                        <Media as="li">
                                            <Link to={"/live-videos"}>
                                                <span>
                                                    <Image
                                                        className="sidebar-links-icon"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/icon/live-video-theme.svg"
                                                        }
                                                    />
                                                </span>
                                                {t("live_video")}
                                            </Link>
                                        </Media>
                                        <Media as="li">
                                            <Link to="#" onClick={handleShareClick}>
                                                <span>
                                                    <Image
                                                        className="sidebar-links-icon"
                                                        src={
                                                            window.location.origin + "/assets/images/new-home/icon/share-theme.svg"
                                                        }
                                                    />
                                                </span>
                                                {t("share")}
                                            </Link>
                                        </Media>
                                        {props.profile.data.is_content_creator == 2 ? (
                                            <Media as="li">
                                                <Link to="/dashboard">
                                                    <span>
                                                        <Image
                                                            className="sidebar-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/dashboard-theme.svg"
                                                            }
                                                        />
                                                    </span>
                                                    {t("dashboard")}
                                                </Link>
                                            </Media>
                                        ) : (
                                            <Media as="li">
                                                <Link to="/become-a-content-creator">
                                                    <span>
                                                        <Image
                                                            className="sidebar-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/become-content-creator.svg"
                                                            }
                                                        />
                                                    </span>
                                                    {t("become-a-content-creator")}
                                                </Link>
                                            </Media>
                                        )}
                                    </ul>
                                </div>
                                {props.profile.data.youtube_link ||
                                    props.profile.data.pinterest_link ||
                                    props.profile.data.linkedin_link ||
                                    props.profile.data.snapchat_link ||
                                    props.profile.data.twitter_link ||
                                    props.profile.data.instagram_link ||
                                    props.profile.data.amazon_wishlist ||
                                    props.profile.data.facebook_link ||
                                    props.profile.data.twitch_link ||
                                    props.profile.data.website ?
                                    <div className="sidebar-social-links">
                                        <ul className="list-unstyled">
                                            {props.profile.data.youtube_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.youtube_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/you-tube.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.pinterest_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.pinterest_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/pintrest.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.linkedin_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.linkedin_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/linked-in.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.snapchat_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.snapchat_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/snap-chat.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.twitter_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.twitter_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/twitter.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.instagram_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.instagram_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/instagram.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.amazon_wishlist && (
                                                <Media as="li">
                                                    <a href={props.profile.data.amazon_wishlist} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/amazon.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.facebook_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.facebook_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/facebook.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.twitch_link && (
                                                <Media as="li">
                                                    <a href={props.profile.data.twitch_link} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/twitch.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                            {props.profile.data.website && (
                                                <Media as="li">
                                                    <a href={props.profile.data.website} target="_blank">
                                                        <Image
                                                            className="sidebar-social-links-icon"
                                                            src={
                                                                window.location.origin + "/assets/images/new-home/icon/website.png"
                                                            }
                                                        />
                                                    </a>
                                                </Media>
                                            )}
                                        </ul>
                                    </div> : null
                                }
                            </div>
                            <div className="profile-tab-sec">
                                <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                                    <Row>
                                        <Col sm={12}>
                                            <Nav variant="pills" className="grid-four-col">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="all"
                                                        onClick={(event) =>
                                                            setActiveSection(event, "all")
                                                        }>
                                                        <span>
                                                            <Image
                                                                className="profile-post-tab-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/new-home/icon/all-post-1.svg"
                                                                }
                                                            />
                                                        </span>
                                                        <span className="resp-display-none">{t("all")}</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="image"
                                                        onClick={(event) =>
                                                            setActiveSection(event, "image")
                                                        }>
                                                        <span>
                                                            <Image
                                                                className="profile-post-tab-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/new-home/icon/image-post-1.svg"
                                                                }
                                                            />
                                                        </span>
                                                        <span className="resp-display-none">{t("images")}</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="video"
                                                        onClick={(event) =>
                                                            setActiveSection(event, "video")
                                                        }>
                                                        <span>
                                                            <Image
                                                                className="profile-post-tab-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/new-home/icon/video-post-1.svg"
                                                                }
                                                            />
                                                        </span>
                                                        <span className="resp-display-none">{t("videos")}</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="audio"
                                                        onClick={(event) =>
                                                            setActiveSection(event, "audio")
                                                        }>
                                                        <span>
                                                            <Image
                                                                className="profile-post-tab-icon"
                                                                src={
                                                                    window.location.origin + "/assets/images/new-home/icon/audio-post-1.svg"
                                                                }
                                                            />
                                                        </span>
                                                        <span className="resp-display-none">{t("musics")}</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={12}>
                                            {props.posts.loading ?
                                                <div className="profile-all-post-box">
                                                    {
                                                        [...Array(8)].map(() =>
                                                            <Skeleton
                                                                className="profile-post-card-loader" />
                                                        )
                                                    }
                                                </div>
                                                : <>
                                                    {props.posts.data.posts.length > 0 ?
                                                        <InfiniteScroll
                                                            dataLength={props.posts.data.posts.length}
                                                            next={fetchMorePost}
                                                            hasMore={props.posts.data.posts.length < props.posts.data.total}
                                                            loader={
                                                                <div className="profile-all-post-box">
                                                                    {[...Array(4)].map(() =>
                                                                        <Skeleton
                                                                            className="profile-post-card-loader" />
                                                                    )}
                                                                </div>
                                                            }
                                                            style={{ height: 'auto', overflow: 'hidden' }}
                                                        >
                                                            <div className="profile-all-post-box">
                                                                {props.posts.data.posts.map((post) => <>

                                                                    {post.postFiles &&
                                                                        post.postFiles.length > 0 &&
                                                                        // post.postFiles.map((postFile, index) =>
                                                                        <ProfileSinglePost post={post} />
                                                                    }
                                                                </>)
                                                                }
                                                            </div>
                                                        </InfiniteScroll>
                                                        : (<NoDataFound />)
                                                    }
                                                </>
                                            }
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                }
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
)(translate(ProfileIndex));
