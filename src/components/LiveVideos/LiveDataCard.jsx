import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { Dropdown, Image, Media, Form, Button } from "react-bootstrap";
import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import {
  fetchCommentsStart,
  saveCommentStart,
} from "../../store/actions/CommentsAction";
import PaymentModal from "./PaymentModal";

const ListDataCard = (props) => {
  const { video } = props;
  const [paymentModal, setPaymentModal] = useState(false);
  const openPaymentModal = (event) => {
    event.preventDefault();
    setPaymentModal(true);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  return (
    <>
      <div className="video-list-card">
        <Link
          to={`/live-video/${video.live_video_unique_id}`}
          className="btn"
          style={{ marginBottom: "1rem" }}
        >
          <div className="video-list-img-sec">
            <Image
              // src={configuration.get("configData.live_streaming_placeholder_img")}
              src={video.user_picture}
              className="video-list-img"
            />
            <div className="video-top-header-sec">
              <h3>{t("live")}</h3>
            </div>
            <div className="video-bottom-sec">
              <h3>
                {video.viewer_cnt} {t("views")}
              </h3>
            </div>
            {video.amount > 0 ? (
              <div className="video-bottom-right-sec">
                <h3>{video.amount_formatted}</h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <div className="video-list-user-details">
          <div className="user-img-sec">
            <Image src={video.user_picture} className="user-img" />
          </div>
          <div className="video-list-user-info">
            <div className="video-list-user-card">
              <div className="video-list-data-type">
                <h4 className="title">{video.title}</h4>
                <h4 className="username">@{video.user_displayname}</h4>
                <h4 className="description">{video.description}</h4>
                <h4 className="date">{video.created_at_formatted}</h4>
              </div>
              <div className="resp-align-right">
                {video.is_user_needs_to_pay == 1 ? (
                  <Button
                    className="live-btn-blue"
                    type="submit"
                    disabled={video.buttonDisable}
                    onClick={(event) => openPaymentModal(event)}
                  >
                    {t("pay_and_join")}
                  </Button>
                ) : (
                  ""
                )}

                {video.is_user_needs_to_pay == 0 ? (
                  <Link
                    to={`/join/${video.live_video_unique_id}`}
                    target="_blank"
                    className="live-btn-blue"
                    type="button"
                  >
                    {" "}
                    {t("join_now")}
                  </Link>
                ) : (
                  ""
                )}

                <PaymentModal
                  paymentModal={paymentModal}
                  closePaymentModal={closePaymentModal}
                  liveVideo={video}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ListDataCard));
