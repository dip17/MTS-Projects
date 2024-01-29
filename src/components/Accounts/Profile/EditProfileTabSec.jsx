import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import ScrollToTop from "../../helper/ScrollToTop";

const EditProfileTabSec = (props) => {

  
  return (
    <ul className="nav nav-tabs edit-profile-tabs" role="tablist">
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "settings-card" ? "active" : ""}
        
      >
        <Link
          to={"/edit-profile"}
          className="bookmarkes-list text-transform-none"
          // aria-controls="profile"
          // role="tab"
          // data-toggle="tab"
          // onClick={() => props.setActiveSec("settings-card")}
        >
          <Image
            src={window.location.origin + "/assets/images/icons/back.svg"}
            className="svg-clone"
          />
          {t("settings")}
        </Link>
      </Media>

      {/* Account Management Start  */}
      <div className="tab-sec-head bt-style">{t("account_management")}</div>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "profile-card" ? "active" : ""}
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to="#Section2"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list text-transform-none"
          data-toggle="tab"
          onClick={() => props.setActiveSec("profile-card")}
        >
          <Image src="assets/images/icons/profile.svg" className="svg-clone" />
          {t("edit_profile")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "change-password-card" ? "active" : ""}
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to="#Section3"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list text-transform-none"
          data-toggle="tab"
          onClick={() => props.setActiveSec("change-password-card") }
        >
          <Image src="assets/images/icons/change-1.svg" className="svg-clone"  />
          {t("change_password")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "delete-account-card" ? "active" : ""}
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to="#Section4"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list text-transform-none"
          data-toggle="tab"
          onClick={() => props.setActiveSec("delete-account-card")}
        >
          <Image src="assets/images/icons/delete.png" className="svg-clone" />
          {t("delete_account")}
        </Link>
      </Media>
      {/* Account Management End */}

      {/* General Start */}
      <div className="tab-sec-head bb-style">{t("general")}</div>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "stories" ? "active" : ""}
      >
        <Link
          to={{
            pathname: "/stories",
            state: {
              prevPath: props.location.pathname,
            },
          }}
          className="bookmarkes-list text-transform-none"
        >
          <i className="fas fa-history svg-clone icon"></i>

          {t("stories")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "stories" ? "active" : ""}
      >
        <Link
          to={{
            pathname: "/bookmarks",
            state: {
              prevPath: props.location.pathname,
            },
          }}
          className="bookmarkes-list text-transform-none"
        >
          <Image
            src={window.location.origin + "/assets/images/icons/bookmarks.svg"}
            className="svg-clone"
            alt={configuration.get("configData.site_name")}
          />
          {t("bookmarks")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "stories" ? "active" : ""}
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to={{
            pathname: "/list",
            state: {
              prevPath: props.location.pathname,
            },
          }}
          className="bookmarkes-list text-transform-none"
        >
          <Image
            src={window.location.origin + "/assets/images/icons/lists.svg"}
            className="svg-clone"
            alt={configuration.get("configData.site_name")}
          />
          {t("lists")}
        </Link>
      </Media>

      {/* General End */}

      <div className="tab-sec-head bb-style">{t("security")}</div>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "security-card" ? "active" : ""}
      >
        <Link
          to={`/document-upload`}
          className="bookmarkes-list text-transform-none"
        >
          <Image
            src="assets/images/icons/documents.png"
            className="svg-clone"
          />
          {t("documents")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "two_factor" ? "active" : ""}
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to="#two_factor"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list text-transform-none"
          data-toggle="tab"
          onClick={() => props.setActiveSec("two_factor")}
        >
          <i className="fas fa-lock svg-clone icon"></i>
          {t("two_step_authentication")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={
          props.activeSec === "session-management-card" ? "active" : ""
        }
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to="#session-management"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list d-flex"
          data-toggle="tab"
          onClick={() => props.setActiveSec("session-management-card")}
        >
          <Image
            src="assets/images/icons/session.png"
            className="svg-clone-1"
          />
          {t("session_management")}
        </Link>
      </Media>
      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "availability_status" ? "active" : ""}
         onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <Link
          to="#availabitiy"
          aria-controls="profile"
          role="tab"
          className="bookmarkes-list text-transform-none"
          data-toggle="tab"
          onClick={() => props.setActiveSec("availability_status")}
        >
          <Image src="assets/images/icons/settings.svg" className="svg-clone" />
          {t("availability_status")}
        </Link>
      </Media>
      {configuration.get("configData.is_one_to_one_call_enabled") == 1 ? (
        <>
          <div className="tab-sec-head bb-style">{t("live_and_calls")}</div>

          <Media
            as="li"
            role="presentation"
            className={
              props.activeSec === "video-call-history-card" ? "active" : ""
            }
          >
            <Link
              to={"/video-calls-history"}
              className="bookmarkes-list text-transform-none"
              onClick={() => props.setActiveSec("video-call-history-card")}
            >
              <Image
                src={window.location.origin + "/assets/images/icons/video.svg"}
                className="svg-clone"
              />
              {t("video_call_history")}
            </Link>
          </Media>

          <Media
            as="li"
            role="presentation"
            className={
              props.activeSec === "audio-call-history-card" ? "active" : ""
            }
          >
            <Link
              to={"/audio-calls-history"}
              className="bookmarkes-list text-transform-none"
              onClick={() => props.setActiveSec("audio-call-history-card")}
            >
              <Image
                src={window.location.origin + "/assets/images/icons/audio.svg"}
                className="svg-clone"
              />
              {t("audio_call_history")}
            </Link>
          </Media>

          {configuration.get("configData.is_one_to_many_call_enabled") == 1 ? (
            <Media
              as="li"
              role="presentation"
              className={props.activeSec === "live-videos" ? "active" : ""}
            >
              <Link
                to={"/live-videos"}
                className="bookmarkes-list text-transform-none"
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/live.svg"}
                  className="svg-clone"
                />
                {t("my_live_videos")}
              </Link>
            </Media>
          ) : (
            ""
          )}

          <Media
            as="li"
            role="presentation"
            className={props.activeSec === "video-calls-card" ? "active" : ""}
          >
            <Link
              to={"/video-calls-sent"}
              className="bookmarkes-list text-transform-none"
              onClick={() => props.setActiveSec("video-calls-card")}
            >
              <Image
                src={
                  window.location.origin + "/assets/images/icons/video-r.png"
                }
                className="svg-clone"
              />
              {t("video_call_request_sent")}
            </Link>
          </Media>

          <Media
            as="li"
            role="presentation"
            className={
              props.activeSec === "video-calls-received-card" ? "active" : ""
            }
          >
            <Link
              to={"/video-calls-received"}
              className="bookmarkes-list text-transform-none"
              onClick={() => props.setActiveSec("video-calls-received-card")}
            >
              <Image
                src={
                  window.location.origin +
                  "/assets/images/icons/video-camera.png"
                }
                className="svg-clone"
              />
              {t("video_call_request_received")}
            </Link>
          </Media>
        </>
      ) : (
        ""
      )}

      <div className="tab-sec-head bb-style">{t("payments")}</div>

      {/* <Media
        as="li"
        role="presentation"
        className={props.activeSec === "your-cards" ? "active" : ""}
      >
        <Link
          to={{
            pathname: "/cards",
            state: {
              prevPath: props.location.pathname,
            },
          }}
          className="bookmarkes-list text-transform-none"
        >
          <Image src="assets/images/icons/card.svg" className="svg-clone" />
          {t("your_cards")}
        </Link>
      </Media> */}

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "account-card" ? "active" : ""}
      >
        <Link
          to={{
            pathname: "/add-bank",
            state: {
              prevPath: props.location.pathname,
            },
          }}
          className="bookmarkes-list text-transform-none"
        >
          <Image src="assets/images/icons/account.svg" className="svg-clone" />
          {t("add_bank")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "notifications-card" ? "active" : ""}
      >
        <Link to={"/payments"} className="bookmarkes-list text-transform-none">
          <Image
            src="assets/images/icons/paper-money.png"
            className="svg-clone"
          />
          {t("payments")}
        </Link>
      </Media>

      <Media
        as="li"
        role="presentation"
        className={props.activeSec === "bank-accounts" ? "active" : ""}
      >
        <Link
          to={`/billing-accounts`}
          className="bookmarkes-list text-transform-none"
        >
          <Image
            src="assets/images/icons/merchant-account.png"
            className="svg-clone"
          />
          {t("bank_accounts")}
        </Link>
      </Media>
    </ul>
  );
};

export default translate(EditProfileTabSec);
