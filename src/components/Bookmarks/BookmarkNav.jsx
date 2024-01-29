import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchBookmarksStart } from "../../store/actions/BookmarkAction";
import { translate, t } from "react-multi-lang";

const BookmarkNav = (props) => {
  return (
    <Col xs={12} sm={12} md={4}>
      <div className="vertical-menu">
        <div
          // activeClassName="active"
          className="bookmarkes-list back-button"
          // to={"/bookmarks"}
        >
          <Link to={"/list"}>
            <Image
              src={window.location.origin + "/assets/images/icons/back.svg"}
              className="svg-clone"
            />
          </Link>
         <span> {t("bookmarks")}</span>
        </div>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks"}
        >
          <Image
            src="assets/images/icons/bookmark.svg"
            className="svg-clone my-p-icons"
          />
          <span>{t("all_bookmarks")}</span>
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmark-photo"}
        >
          <Image
            src="assets/images/icons/gallery.svg"
            className="svg-clone my-p-icons"
          />
          <span>{t("photos")}</span>
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmark-video"}
        >
          <Image
            src="assets/images/icons/video.svg"
            className="svg-clone my-p-icons"
          />
          <span>{t("videos")}</span>
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmark-audio"}
        >
          <Image
            src="assets/images/icons/audio.svg"
            className="svg-clone my-p-icons"
          />
         <span>{t('audios')}</span>
        </NavLink>

        {/*<NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks"}
        >
          <Image
            src="assets/images/icons/other.svg"
            className="svg-clone my-p-icons"
          />
          Other
        </NavLink>

        <NavLink
          activeClassName="active"
          className="bookmarkes-list"
          to={"/bookmarks"}
        >
          <Image
            src="assets/images/icons/lock.svg"
            className="svg-clone my-p-icons"
          />
          Locked
        </NavLink> */}
      </div>
    </Col>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(BookmarkNav));
