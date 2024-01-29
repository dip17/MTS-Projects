import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Row, Col, Media } from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import {
  fetchSesssionManagementStart,
  deleteSingleLoginSessionStart,
  deleteAllLoginSessionStart,
} from "../../../store/actions/SessionManagementAction";
import NoDataFound from "../../NoDataFound/NoDataFound";

const OldSessionManagement = (props) => {
  const [activeDeletId, setActiveDeletId] = useState(null);

  const [deletedSessions, setDeletedSessions] = useState([]);

  const [deleteAllSessions, setDeleteAllSessions] = useState({
    loading: false,
    status: false,
  });

  useEffect(() => {
    props.dispatch(fetchSesssionManagementStart());
  }, []);

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
      {props.sessionsList.loading ? null : (
        <>
          <div
            role="session-management"
            className={
              props.activeSec === "session-management"
                ? "tab-pane fade in active"
                : "tab-pane fade"
            }
            id="session-management"
          >
            <div className="change-password-sec">
              <div className="card-header bg-transparent">
                <h4>{t("session_management")}</h4>
              </div>
              <div className="card-body">
                <Row>
                  <Col sm={12} md={12}>
                    {props.sessionsList.data.total > 0 &&
                    !deleteAllSessions.status ? (
                      <>
                        <Row>
                          <Col md={12}>
                            <div className="close-all-session-sec">
                              <button
                                className="close-all-session-btn"
                                disabled={deleteAllSessions.loading}
                                onClick={() => handleSessionDeleteAll()}
                              >
                                {props.sessionDelete.loadingButtonContent !=
                                  null && deleteAllSessions.loading
                                  ? props.sessionDelete.loadingButtonContent
                                  : `${t("close_all_sessions")}`}
                              </button>
                            </div>
                          </Col>
                        </Row>
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
                                  </h4>
                                  <ul className="session-list-info list-unstyled">
                                    <Media as="li">{sessions.ip_address}</Media>
                                    {/* <Media as="li">India</Media> */}
                                  </ul>
                                  {sessions.is_current_session == 1 && (
                                    <h6 className="active-session">Active</h6>
                                  )}
                                </div>
                                <div className="session-right-sec">
                                  <p>{sessions.last_session}</p>
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
                                </div>
                              </div>
                            </>
                          ))}
                      </>
                    ) : (
                      <NoDataFound></NoDataFound>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      )}
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
)(translate(OldSessionManagement));
