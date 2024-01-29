import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";

import NoDataFound from "../NoDataFound/NoDataFound";
import PostDisplayCard from "../helper/PostDisplayCard";
import ReactPlayer from "react-player/lazy";
import { translate, t } from "react-multi-lang";

const ModelProfileVideoSec = (props) => {
  return (
    <div
      role="tabpanel"
      className={
        props.activeSec === "video"
          ? "tab-pane fade in active"
          : "tab-pane fade"
      }
      id="Section3"
    >
      <ul className="box-container three-cols model-prof-photo-sec model-prof-video-sec">
      {props.userPosts.loading ? (
       t("loading")
      ) : props.userPosts.data.posts.length > 0 ? (
        props.userPosts.data.posts.map((post) =>
          post.postFiles.length > 0
            ? post.postFiles.map((p_file) => (
                <Media as="li" className="box">
                  <div className="inner">
                    <ReactPlayer
                      light={p_file.preview_file}
                      url={p_file.post_file}
                      controls={true}
                      width="100%"
                      height="100%"
                      className="post-video-size"
                    />
                  </div>
                </Media>
              ))
            : ""
        )
      ) : (
        <NoDataFound />
      )}
      {props.noMoreData !== true ? (
        <>{props.isFetching && "Fetching more list items..."}</>
      ) : (
        t("no_more_data")
      )}
      </ul>
    </div>
  );
};

export default translate(ModelProfileVideoSec);
