import React, { useState, useRef, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Image, Media, Form } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import SettingsSidebar from "./SettingsSidebar";
import { connect } from "react-redux";
import {
  fetchSesssionManagementStart,
  deleteSingleLoginSessionStart,
  deleteAllLoginSessionStart,
} from "../../../store/actions/SessionManagementAction";
import NoDataFound from "../../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";

const SessionManagement = (props) => {

  const [activeDeletId, setActiveDeletId] = useState(null);

  const [deletedSessions, setDeletedSessions] = useState([]);

  const [deleteAllSessions, setDeleteAllSessions] = useState({
    loading: false,
    status: false,
  });

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [isSameDevice,setIsSameDevice] =useState(false);

  useEffect(() => {
    props.dispatch(fetchSesssionManagementStart({
      skip: skip,
      take: take,
    }));
    setSkip(skip + take);
  }, []);


  const fetchMoreSessions = () => {
    props.dispatch(fetchSesssionManagementStart({
      skip: skip,
      take: take,
      append: true,
    }));
    setSkip(skip + take);
  }

  const handleSingleSessionDelete = (id) => {
    setActiveDeletId(id);
    props.dispatch(
      deleteSingleLoginSessionStart({ user_login_session_id: id })
    );
  };

  useEffect(() => {
    if (Object.keys(props.sessionDelete.data).length > 0) {
      setDeletedSessions([...deletedSessions, activeDeletId]);
      setActiveDeletId(null);
      if (deleteAllSessions.loading) {
        setDeleteAllSessions({
          loading: false,
          status: true,
        });
      }
      setSkip(skip - 1);
    }
  }, [props.sessionDelete.data]);

  const handleSessionDeleteAll = () => {
    setDeleteAllSessions({
      ...deleteAllSessions,
      loading: true,
    });
    props.dispatch(deleteAllLoginSessionStart());

    // setTimeout(() => {
    //   window.location.assign = "/";
    // }, 1000);
  };

  return (
    <>
      <div className="new-settings-sec new-change-password">
        <div className="new-settings-box">
          <SettingsSidebar />
          <div className="new-settings-main-wrapper">
            <div className="new-changes-password-box">
              <div className="settings-personal-info-card">
                <div className="settings-personal-info-header">
                  <h3>{t("session_management")}</h3>
                  <p>{t("session_management_note")}</p>
                </div>
                <div className="edit-profile-form">
                  <Row>
                    <Col sm={12} md={12}>
                      {props.sessionsList.data.session.length > 0 &&
                        !deleteAllSessions.status ? (
                        <>
                          <Row>
                            <Col md={12}>
                              <div className="close-all-session-sec">
                                <button
                                  className="close-all-session-btn"
                                  disabled={deleteAllSessions.loading}
                                  onClick={() => {
                                    if (window.confirm(t('session_delete_confim_message'))) handleSessionDeleteAll()
                                  }}
                                >
                                  {props.sessionDelete.loadingButtonContent !=
                                    null && deleteAllSessions.loading
                                    ? props.sessionDelete.loadingButtonContent
                                    : `${t("close_all_sessions")}`}
                                </button>
                              </div>
                            </Col>
                          </Row>
                          <InfiniteScroll
                            dataLength={props.sessionsList.data.session.length}
                            next={fetchMoreSessions}
                            hasMore={skip < props.sessionsList.data.total}
                            loader={<h4>{t("loading")}</h4>}
                          >
                            {props.sessionsList.data.session
                              .filter(
                                (sessions) =>
                                  !deletedSessions.includes(
                                    sessions.user_login_session_id
                                  )
                              )
                              .map((sessions) => (
                                <>
                                  <div className="session-card">
                                    <div className="session-left-sec">
                                      <h4>
                                        {sessions.device_model},{" "}
                                        {sessions.device_type}
                                        {sessions.browser_type !== "" &&
                                          <span className="small"> ({sessions.browser_type})</span>
                                        }
                                      </h4>
                                      <ul className="session-list-info list-unstyled">
                                        <Media as="li">{sessions.ip_address}</Media>
                                        {/* <Media as="li">India</Media> */}
                                      </ul>
                                      {sessions.is_current_session == 1 ? (
                                        <h6 className="active-session">{t("active")}</h6>
                                      ) : (
                                        <h6 className="active-session bg-danger">{t("inactive")}</h6>
                                      )}
                                    </div>
                                    <div className="session-right-sec">
                                      <p>{sessions.last_session}</p>
                                      {sessions.is_current_session == 1 &&
                                        <button
                                          className="logout-btn"
                                          disabled={
                                            activeDeletId ===
                                            sessions.user_login_session_id
                                          }
                                          onClick={() =>
                                            handleSingleSessionDelete(
                                              sessions.user_login_session_id
                                            )
                                          }
                                        >
                                          {props.sessionDelete.loadingButtonContent !=
                                            null &&
                                            activeDeletId ===
                                            sessions.user_login_session_id
                                            ? props.sessionDelete.loadingButtonContent
                                            : `${t("logout")}`}
                                        </button>
                                      }
                                    </div>
                                  </div>
                                </>
                              ))}
                          </InfiniteScroll>
                        </>
                      ) : (
                        <NoDataFound></NoDataFound>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  sessionsList: state.sessions.sessionList,
  sessionDelete: state.sessions.sessionDelete,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SessionManagement));