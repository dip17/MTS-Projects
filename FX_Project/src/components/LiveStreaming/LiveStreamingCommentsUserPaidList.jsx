import React, { useState, useEffect } from "react";
import { Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import { fetchLiveAudienceListStart } from "../../store/actions/LiveVideoAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";
import LivestreamAudianceLoader from "../Loader/LivestreamAudianceLoader";

const LiveStreamingCommentsUserPaidList = (props) => {
  useEffect(() => {
    props.dispatch(
      fetchLiveAudienceListStart({
        live_video_unique_id: props.liveVideoUniqueId,
      })
    );
  }, []);

  return (
    <>
      {props.liveAudienceList.loading ? (
        <LivestreamAudianceLoader count={4} />
      ) : (
        <div className="live-streaming-user-list-sec">
          <div className="live-streaming-user-list-header-sec">
            <h4>
              {t("audience")}{" "}
              <span>
                {/* {props.liveAudienceList.viewer_count
                  ? props.liveAudienceList.viewer_count
                  : props.liveAudienceList.data.total_viewers} */}
                  {props.liveAudienceList.viewers.length}
              </span>
            </h4>
            {props.isOwner ? (
              props.liveAudienceList.data.is_paid_post === 1 ? (
                <h4>
                 {t("earnings")} -{" "}
                  <span className="text-primary">
                    {props.liveAudienceList.total_earnings_formatted}
                  </span>
                </h4>
              ) : (
                ""
              )
            ) : props.liveAudienceList.data.is_paid_post === 1 ? (
              <h4>
                {t("you_paid")} -{" "}
                <span className="text-primary">
                  {props.liveAudienceList.data.live_video_amount}
                </span>
              </h4>
            ) : (
              <h4>
                <span className="text-primary">{t("free_live")}</span>
              </h4>
            )}
          </div>
          <div
            className="live-streaming-user-list-box"
            style={{
              maxHeight: "calc(100vh - 345px)",
              overflowY: "auto",
              paddingRight: "1em",
              //   marginTop: '1em'
              //display: "none",
            }}
          >
            <ul
              className="live-streaming-user-list-card list-unstyled"
              id="livestream-viewers-ul"
            >
              {props.liveAudienceList.viewers.length > 0 ?
               (
                props.liveAudienceList.viewers.map((viewer, i) => (
                  <Media as="li" id={`livestream-viewer-` + viewer.username}>
                    <Link
                      to={`/${
                        viewer.user_unique_id ===
                        localStorage.getItem("user_unique_id")
                          ? "profile"
                          : viewer.user_unique_id
                      }`}
                    >
                      <Image
                        className="live-streaming-user-list-img"
                        src={
                          viewer.picture
                            ? viewer.picture
                            : viewer.sender_picture
                        }
                      />
                      <p>{viewer.name ? viewer.name : viewer.sender_name}</p>
                    </Link>
                  </Media>
                ))
              ) : (
                <NoDataFound />
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  liveAudienceList: state.liveVideo.liveAudienceList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingCommentsUserPaidList));
