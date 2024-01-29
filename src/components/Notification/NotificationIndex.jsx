import React, { useState, useEffect } from "react";
import NotificationAllSec from "./NotificationAllSec";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { fetchNotificationsStart , fetchMoreNotificationsStart} from "../../store/actions/NotificationAction";
import { connect } from "react-redux";
import NotificationLoader from "../Loader/NotificationLoader";
import NotificationTabSec from "./NotificationTabSec";
import NotificationCommentsSec from "./NotificationCommentsSec";
import NotificationLikedSec from "./NotificationLikedSec";
import NotificationSubscribedSec from "./NotificationSubscribedSec";
import NotificationTippedSec from "./NotificationTippedSec";
import NotificationVideoCallSec from "./NotificationVideoCallSec";
import NotificationAudioCallSec from "./NotificationAudioCallSec";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const NotificationIndex = (props) => {
  const [activeSec, setActiveSec] = useState("notify-all");

  useEffect(() => {
    props.dispatch(
      fetchNotificationsStart({
        skip: 0,
        take: 12,
      })
    );
  }, []);

  const fetchMoreData = () => {
    props.dispatch(
      fetchMoreNotificationsStart({
        skip: props.notification.data.notifications.length,
        take: 12,
      })
    );
  };



  const changeSection = (event, type) => {
    setActiveSec(type);
    if (type == "notify-all") {
      props.dispatch(fetchNotificationsStart());
    } else {
      props.dispatch(fetchNotificationsStart({ notification_type: type }));
    }
  };

  return (
    <>
      <div className="notification-page">
        <Container>
          <Row>
            <Col sm={12} md={12} xs={12}>
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side resp-sapce-center">
                  <div className="pull-left">
                    <Link className="bookmarkes-list notify-title" to={`/home`}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                      />
                      {t("notifications")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tabbable-panel">
                <div className="tab" role="tabpanel">
                  <NotificationTabSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    changeSection={changeSection}
                  />
                  <div className="tab-content tabs padding-top-md">
                    {props.notification.loading ? (
                      // <NotificationLoader></NotificationLoader>
                      <div className="notification-list">
                        {
                          [...Array(4)].map(() =>
                            <div className="notification-sec-loader mb-5" key={2}>
                              <Skeleton
                                className="notification-sec-image-loader" />
                              <div className="user-name">
                                <Skeleton className="mb-2" height={20} width={200} />
                                <Skeleton className="mb-2" height={20} />
                                <Skeleton className="mb-2" height={15} width={100} />
                              </div>
                            </div>)
                        }
                      </div>
                    ) : (
                      <>
                        <NotificationAllSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />

                        <NotificationCommentsSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />

                        <NotificationLikedSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />

                        <NotificationSubscribedSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />

                        <NotificationTippedSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />

                        <NotificationVideoCallSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />

                        <NotificationAudioCallSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                          fetchMoreData={fetchMoreData}
                          notificatoin={props.notification}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  notification: state.notification.notification,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NotificationIndex));
