import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const NotificationTabSec = (props) => {
  return (
    <div className="tabbable-line notify-sec">
      <ul className="nav nav-tabs" role="tablist">
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "notify-all" ? "active" : ""}
        >
          <Link
            to="#Section1"
            aria-controls="home"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "notify-all")}
          >
            <span>
              <Image src="assets/images/icons/all.svg" className="svg-clone" />
            </span>
            {t("all")}
          </Link>
        </Media>
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "comment" ? "active" : ""}
        >
          <Link
            to="#Section2"
            aria-controls="profile"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "comment")}
          >
            <span>
              <Image
                src="assets/images/icons/comment.svg"
                className="svg-clone"
              />
            </span>
            {t("comments")}
          </Link>
        </Media>
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "liked-sec" ? "active" : ""}
        >
          <Link
            to="#Section3"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "like")}
          >
            <span>
              <Image
                src="assets/images/icons/heart.svg"
                className="svg-clone"
              />
            </span>
            {t("liked")}
          </Link>
        </Media>
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "subscribed-sec" ? "active" : ""}
        >
          <Link
            to="#Section4"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "follow")}
          >
            <span>
              <Image
                src="assets/images/icons/unlock.svg"
                className="svg-clone"
              />
            </span>
            {t("subscribed")}
          </Link>
        </Media>
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "tips" ? "active" : ""}
        >
          <Link
            to="#Section5"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "tips")}
          >
            <span>
              <Image src="assets/images/icons/tips-theme.svg" className="svg-clone" />
            </span>
            {t("tipped")}
          </Link>
        </Media>
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "video-call" ? "active" : ""}
        >
          <Link
            to="#Section6"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "video-call")}
          >
            <span>
              <Image
                src={window.location.origin + "/assets/images/icons/video.svg"}
                className="svg-clone"
              />
            </span>
            {t("video_calls")}
          </Link>
        </Media>
        <Media
          as="li"
          role="presentation"
          className={props.activeSec === "audio-call" ? "active" : ""}
        >
          <Link
            to="#Section7"
            aria-controls="messages"
            role="tab"
            data-toggle="tab"
            onClick={(event) => props.changeSection(event, "audio-call")}
          >
            <span>
              <Image
                src={window.location.origin + "/assets/images/icons/audio.svg"}
                className="svg-clone"
              />
            </span>
            {t("audio_calls")}
          </Link>
        </Media>
      </ul>
    </div>
  );
};

export default translate(NotificationTabSec);
