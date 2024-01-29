import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Image, Media, Button, Badge } from "react-bootstrap";
import configuration from "react-global-configuration";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
// import SideBarIndex from "../SideBar/SideBarIndex";
import io from "socket.io-client";
import { updateNotificationCount } from "../../../store/actions/NotificationAction";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import CreateContentCreatorModal from "../../helper/CreateContentCreatorModal";
import LoginModal from "../../Model/LoginModal";
import SignupModal from "../../Model/SignupModal";

let chatSocket;

const HeaderIndex = (props) => {
  const [chatCount, setChatCount] = useState(0);
  const [bellCount, setBellCount] = useState(0);

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  useEffect(() => {
    console.log("Inside");
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl === "") {
      console.log("no keys configured");
    }
    if (configuration.get("configData.is_notification_count_enabled") == 1) {
      chatSocketConnect();
    }
    if (configuration.get("configData.is_web_notification_enabled")) {
      navigator.serviceWorker.addEventListener("message", (message) => {
        showNotification(message.data.notification);
      });
    }
  }, []);

  const showNotification = (message) => {
    var options = {
      body: message.body,
      icon: configuration.get("configData.site_icon"),
      dir: "ltr",
    };
    var notification = new Notification(message.title, options);
    notification.onclick = function (event) {
      event.preventDefault();
      window.location.replace(
        configuration.get("configData.frontend_url") + message.click_action
      );
    };
    setTimeout(notification.close.bind(notification), 5000);
  };
  const chatSocketConnect = () => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          localStorage.getItem("userId") +
          `',myid:` +
          localStorage.getItem("userId"),
      });
      chatSocket.emit("notification update", {
        commonid: "user_id_" + localStorage.getItem("userId"),
        myid: localStorage.getItem("userId"),
      });
      if (localStorage.getItem("socket") == "true") {
        chatSocket.on("notification", (newData) => {
          console.log(newData);
          setChatCount(newData.chat_notification);
          setBellCount(newData.bell_notification);
        });
      } else {
        console.log(false);
        chatSocket.disconnect();
      }
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const [createContentCreatorModal, setCreateContentCreatorModal] =
    useState(false);

  const closeCreateContentCreatorModal = () => {
    setCreateContentCreatorModal(false);
  };

  const closeLoginModal = () => {
    setLoginModal(false);
  };
  const closeSignupModal = () => {
    setSignupModal(false);
  };

  const openSignupModal = () => {
    setLoginModal(false);
    setSignupModal(true);
  };
  return (
    <>
      {localStorage.getItem("userId") ? (
        <header className="main-header">
          <Container>
            <nav className="main-header-menu">
              <Link
                to={"/home"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                {/* <Image
                  src={window.location.origin + "/assets/images/icons/home.svg"}
                /> */}
                {/* <i className='bx bx-home bx-lg'></i> */}
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/new/home-new-1.svg"
                  }
                />
              </Link>
              <Link
                to={"/explore"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                {/* <Image
                  src={
                    window.location.origin + "/assets/images/icons/explore.png"
                  }
                /> */}
                {/* <i className='bx bx-compass bx-lg'></i> */}
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/new/compass-new-1.svg"
                  }
                />
              </Link>

              {configuration.get("configData.is_one_to_many_call_enabled") ==
              1 ? (
                <Link
                  to={"/live-videos"}
                  className="main-header-menu icon-with-round-hover"
                  onClick={() => setIsVisible(false)}
                >
                  {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/live-streaming.png"
                    }
                  /> */}
                  {/* <i className="bx bx-tv bx-lg"></i> */}
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/tv-new-1.svg"
                    }
                  />
                </Link>
              ) : (
                ""
              )}

              {localStorage.getItem("is_content_creator") == 2 ? (
                <Link
                  to={"/add-post"}
                  className="main-header-menu icon-with-round-hover"
                  onClick={() => setIsVisible(false)}
                >
                  {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/create-post.svg"
                    }
                  /> */}
                  {/* <i className='bx bx-plus-circle bx-lg'></i> */}
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/plus-square-new-1.svg"
                    }
                  />
                </Link>
              ) : (
                <Link
                  to="#"
                  className="main-header-menu icon-with-round-hover"
                  onClick={() => setCreateContentCreatorModal(true)}
                >
                  {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/create-post.svg"
                    }
                  /> */}
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/plus-square-new-1.svg"
                    }
                  />
                </Link>
              )}

              <Link
                to={"/inbox"}
                className="main-header-menu icon-with-round-hover"
                onClick={() => setIsVisible(false)}
              >
                {/* <Image
                  src={window.location.origin + "/assets/images/icons/chat.svg"}
                /> */}
                {/* <i className='bx bx-chat bx-lg'></i> */}
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/new/mail-new-1.svg"
                  }
                />
                {/* <span className="main-header-menu__count"> 5 </span>  */}
                {chatCount > 0 ? (
                  <Badge variant="light" className="badge-notify">
                    {chatCount}
                  </Badge>
                ) : (
                  ""
                )}
              </Link>

              <Link
                to={"/notification"}
                className="main-header-menu icon-with-round-hover"
                active-classname="m-current"
                exact-active-classname=""
                onClick={() => setIsVisible(false)}
              >
                {/* <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/notification.svg"
                  }
                /> */}
                {/* <i className='bx bx-bell bx-lg'></i> */}
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/new/bell-new-1.svg"
                  }
                />
                {bellCount > 0 ? (
                  <Badge variant="light" className="badge-notify">
                    {bellCount}
                  </Badge>
                ) : (
                  ""
                )}
              </Link>

              <Button
                type="button"
                className="main-header-menu icon-with-round-hover"
                to="#"
                data-drawer-trigger
                aria-controls="drawer-name"
                aria-expanded="false"
                onClick={() => setIsVisible(!isVisible)}
              >
                {/* <Image
                  src={window.location.origin + "/assets/images/icons/user.svg"}
                /> */}
                {/* <i className='bx bx-user-circle bx-lg'></i> */}
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/icons/new/user-new-1.svg"
                  }
                />
              </Button>
           
            </nav>

            {/* {localStorage.getItem("is_document_verified") == 3 ? (
                  <div className="pl-2">
                    <Alert key={1} variant='danger'>
                      The user updated documents decined by Admin.
                    </Alert>
                  </div>
                ) : null} */}
          </Container>
        </header>
      ) : (
        <header className="main-header">
          <Container>
            <nav className="main-header-menu">
              <Link
                to={"/"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/home.svg"}
                />
              </Link>
              <ul className="list-unstyled single-profile-menu">
                <Media as="li">
                  <Link
                    to="#"
                    className="nav-link"
                    onClick={() => {
                      setSignupModal(false);
                      setLoginModal(true);
                    }}
                  >
                    Login
                  </Link>
                </Media>
                <Media as="li">
                  <Link
                    to="#"
                    className="nav-link"
                    onClick={() => {
                      setSignupModal(true);
                      setLoginModal(false);
                    }}
                  >
                    Signup
                  </Link>
                </Media>
              </ul>
            </nav>
          </Container>
        </header>
      )}
      {isVisible && localStorage.getItem("userId") ? (
        <div className="drawer" id="drawer-name" data-drawer-target>
          <div
            className="drawer__overlay"
            data-drawer-close
            tabIndex="-1"
            onClick={() => setIsVisible(!isVisible)}
          ></div>
          <div className="drawer__wrapper">
            <div className="drawer__header">
              <div className="drawer__title">
                <Link to="#" className="l-sidebar__avatar" data-name="Profile">
                  <span className="sidebar-hamburger-user-profile">
                    <Image
                      src={localStorage.getItem("user_picture")}
                      alt={configuration.get("configData.site_name")}
                    />
                  </span>
                  <span onClick={() => setIsVisible(!isVisible)}>
                    {" "}
                    {/* <i className="material-icons add-icon">{t("clear")}</i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="#8a96a3"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.707 8.707L13.414 12l3.293 3.293-1.414 1.414L12 13.414l-3.293 3.293-1.414-1.414L10.586 12 7.293 8.707l1.414-1.414L12 10.586l3.293-3.293 1.414 1.414zM24 12c0 6.617-5.383 12-12 12S0 18.617 0 12 5.383 0 12 0s12 5.383 12 12zm-2 0c0-5.514-4.486-10-10-10S2 6.486 2 12s4.486 10 10 10 10-4.486 10-10z"></path>
                    </svg>
                  </span>
                </Link>
                <div className="pull-left side-user-head">
                  <Link
                    to={"/profile"}
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <h3 className="g-user-name">
                      {localStorage.getItem("name")} {"  "}
                      {localStorage.getItem("is_verified_badge") == 1 ? (
                        <div className="pl-2">
                          <VerifiedBadgeNoShadow />
                        </div>
                      ) : null}
                    </h3>
                    <span className="user-id">
                      @{localStorage.getItem("username")}
                    </span>
                  </Link>

                  <ul className="list-inline">
                    <Media as="li">
                      <Link to={"/fans"} onClick={() => setIsVisible(false)}>
                        <span className="fans-follow">
                          {localStorage.getItem("total_followers")
                            ? localStorage.getItem("total_followers")
                            : 0}
                        </span>{" "}
                        {t("fans")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to={"/following"}
                        onClick={() => setIsVisible(false)}
                      >
                        <span className="fans-follow">
                          {localStorage.getItem("total_followings")
                            ? localStorage.getItem("total_followings")
                            : 0}
                        </span>{" "}
                        {t("following")}
                      </Link>
                    </Media>
                  </ul>
                </div>

                {/* <div className="pull-right">
                  <span className="m-arrow">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/arrow-down.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />
                  </span>
                </div> */}
              </div>
              {/* <Button
              className="drawer__close"
              data-drawer-close
              aria-label="Close Drawer"
            ></Button> */}
            </div>
            <div className="drawer__content">
              <div className="right-sidebar-menu-item">
                <Link
                  to={"/profile"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/my-profile-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("my_profile")}
                </Link>

                {localStorage.getItem("is_content_creator") != 2 ? (
                  <Link
                    to={"/become-a-content-creator"}
                    className="sidebar-menus-item"
                    data-name="Profile"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/new/content-creator-icon.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />{" "}
                    {t("become_a_content_creator")}
                  </Link>
                ) : (
                  <Link
                    to={"/dashboard"}
                    className="sidebar-menus-item"
                    data-name="Profile"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/new/dashborad-icon.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />{" "}
                    {t("dashboard")}
                  </Link>
                )}

                <Link
                  to={"/ecom"}
                  className="sidebar-menus-item"
                  data-name="ecommerce"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {/* <i className="fas fa-shopping-bag"></i> */}
                  <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/new/ecom-icon.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />
                  {t("ecommerce")}
                </Link>

                <Link
                  to={"/stories"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {/* <i class="fas fa-history"></i> */}
                  <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/new/stories-icon.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />
                  {t("stories")}
                </Link>

                <Link
                  to={"/bookmarks"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/bookmarks-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("bookmarks")}
                </Link>
                <Link
                  to={"/list"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/list-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("lists")}
                </Link>
                <hr className="sidebar-menu-divider" />

                <Link
                  to={"/edit-profile"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/settings-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("settings")}
                </Link>

                <Link
                  to={"/live-videos"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/live-videos-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("live_videos")}
                </Link>
                {configuration.get("configData.is_one_to_one_call_enabled") ==
                1 ? (
                  <>
                    <Link
                      to={"/video-calls-history"}
                      className="sidebar-menus-item"
                      data-name="Profile"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/new/video-call-icon.svg"
                        }
                        alt={configuration.get("configData.site_name")}
                      />{" "}
                      {t("video_calls")}
                    </Link>
                    <Link
                      to={"/audio-calls-history"}
                      className="sidebar-menus-item"
                      data-name="Profile"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/new/audio-call-icon.svg"
                        }
                        alt={configuration.get("configData.site_name")}
                      />{" "}
                      {t("audio_calls")}
                    </Link>
                  </>
                ) : (
                  ""
                )}

                {configuration.get("configData.is_referral_enabled") == 1 ? (
                  <Link
                    to={"/referrals"}
                    className="sidebar-menus-item"
                    data-name="Profile"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {/* <i className="fas fa-gift"></i>  */}
                    <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/new/referrals-icon.svg"
                        }
                        alt={configuration.get("configData.site_name")}
                      />
                    {t("referrals")}
                  </Link>
                ) : (
                  ""
                )}

                <div to="#" className="sidebar-menus-dark">
                  <div className="toggle-mode">
                    <div className="toggle-switch">
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="switch-style"
                          onChange={props.toggleTheme}
                          checked={props.darkTheme}
                        />
                        <div className="slider round" id="switch-style"></div>
                      </label>
                      <div className="toggle-label">
                        <p>{t("dark_mode")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="sidebar-menu-divider" />

                {/* <Link
                  to={"/cards"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/card-icon.svg"
                    }
                    alt="Your Cards"
                  />{" "}
                  {t("your_cards")}{" "}
                  <span className="desc">({t("to_subscribe")})</span>
                </Link> */}

                <Link
                  to={"/add-bank"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/add-bank-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("add_bank")} <span className="desc">({t("to_earn")})</span>
                </Link>
                <Link
                  to={"/wallet"}
                  className="sidebar-menus-item"
                  data-name="Wallet"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/wallet-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("wallet")}{" "}
                  <span className="desc">({t("your_earnings")})</span>
                </Link>

                <hr className="sidebar-menu-divider" />

                <Link
                  to={`/page/help`}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/help-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("help_and_support")}
                </Link>

                <Link
                  to=""
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                  style={{ display: "none" }}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/dark.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("dark_mode")}
                </Link>
                <hr className="sidebar-menu-divider" />
                <Link
                  to={"/logout"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/new/logout-icon.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("logout")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <CreateContentCreatorModal
        createContentCreatorModal={createContentCreatorModal}
        closeCreateContentCreatorModal={closeCreateContentCreatorModal}
      />
      <LoginModal
        loginModal={loginModal}
        closeLoginModal={closeLoginModal}
        openSignupModal={openSignupModal}
      />
      <SignupModal
        signupModal={signupModal}
        closeSignupModal={closeSignupModal}
      />
    </>
  );
};

const mapStateToPros = (state) => ({
  notifications: state.notification.notifications,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(HeaderIndex));
