import React from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";

import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import { getSuccessNotificationMessage,getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { connect } from "react-redux";

const ModelProfilePhotoSec = (props) => {
  return (
    <div
      role="tabpanel"
      className={
        props.activeSec === "photo"
          ? "tab-pane fade in active"
          : "tab-pane fade"
      }
      id="Section2"
    >
      <ul className="box-container three-cols model-prof-photo-sec">
        {props.userPosts.loading ? (
       t("loading")
        ) : props.userPosts.data.posts.length > 0 ? (
          props.userPosts.data.posts.map((post) =>
            post.postFiles.length > 0
              ? post.postFiles.map((p_file) => (
                  <Media as="li" className="box">
                    <div className="inner">
                      <Link 
                        to={localStorage.getItem("userId") ? "/post/" + post.post_unique_id : '#'}
                        onClick= {() =>
                          {
                            if(!localStorage.getItem("userId")) {
                              
                              const notificationMessage = getErrorNotificationMessage(
                                t('login_to_continue')
                              );
                              props.dispatch(createNotification(notificationMessage));
                            }
                          }
                        }
                        className="glightbox">
                        <Image src={p_file.post_file} />
                      </Link>
                    </div>
                  </Media>
                ))
              : ""
          )
        ) : (
          <NoDataFound></NoDataFound>
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

const mapStateToPros = (state) => ({
 
});


function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ModelProfilePhotoSec));
