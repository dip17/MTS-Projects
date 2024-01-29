import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";
import "../../Wallet/Wallet.css";
import NoDataFound from "../../NoDataFound/NoDataFound";
import BillingAccountLoader from "../../Loader/BillingAccountLoader";
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";

import {
  acceptCallStart,
  callRequestReceivedModelStart,
  rejectCallStart,
  endVideoCallStart,
  startVideoCallRequestStart,
} from "../../../store/actions/PrivateCallAction";

const VideoCallRequestReceivedIndex = (props) => {
  useEffect(() => {
    props.dispatch(callRequestReceivedModelStart());
  }, []);
  return (
    <>
      <div className="wallet-sec">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="wallet-header-sec">
                <Row>
                  <Col sm={12} md={12} xl={9}>
                    <Link
                      className="bookmarkes-list notify-title back-button"
                      onClick={() => props.history.goBack()}
                    >
                      <img
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                      />
                      {t("video_call_request_received")}
                    </Link>
                    <p className="text-muted f-2">{t("video_calls_note")}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="trans-table-sec">
        <Container>
          {props.callRequestReceivedModel.loading ? (
            <BillingAccountLoader />
          ) : props.callRequestReceivedModel.data.video_call_requests &&
            props.callRequestReceivedModel.data.video_call_requests.length >
              0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-center text-uppercase">
                        <th>{t("s_no")}</th>
                        <th>{t("model")}</th>
                        <th>{t("user")}</th>
                        <th>{t("scheduled")}</th>
                        <th>{t("end_time")}</th>
                        <th>{t("status")}</th>
                        <th>{t("action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.callRequestReceivedModel.data.video_call_requests.map(
                        (videoCall, index) => (
                          <tr
                            key={videoCall.video_call_request_id}
                            className="text-center"
                          >
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/` + videoCall.modelname}>
                                {videoCall.model_displayname}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/` + videoCall.username}>
                                {videoCall.user_displayname}
                              </Link>
                            </td>
                            <td>
                              {videoCall.start_time
                                ? videoCall.start_time
                                : "-"}
                            </td>
                            <td>
                              {videoCall.end_time ? videoCall.end_time : "-"}
                            </td>
                            <td>{videoCall.call_status_formatted}</td>
                            <td>
                              {videoCall.accept_btn_status == 1 ? (
                                <Button
                                  className="btn btn-sm btn-success mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      acceptCallStart({
                                        video_call_request_id:
                                          videoCall.video_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("accept")}
                                </Button>
                              ) : (
                                ""
                              )}
                              {videoCall.reject_btn_status == 1 ? (
                                <Button
                                  className="btn btn-sm btn-danger  mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      rejectCallStart({
                                        video_call_request_id:
                                          videoCall.video_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("reject")}
                                </Button>
                              ) : (
                                ""
                              )}
                              {videoCall.payment_btn_status == 1 ? (
                                <Button
                                  className="btn btn-success mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      rejectCallStart({
                                        video_call_request_id:
                                          videoCall.video_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("paynow")}
                                </Button>
                              ) : (
                                ""
                              )}

                              {videoCall.join_btn_status == 1 ? (
                                <Link
                                  className="btn btn-success mr-3"
                                  to={`/video-call/${videoCall.video_call_request_unique_id}`}
                                >
                                  {t("join_call")}
                                </Link>
                              ) : (
                                ""
                              )}

                              {videoCall.start_btn_status == 1 ? (
                                <Link
                                  className="btn btn-success mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      startVideoCallRequestStart({
                                        video_call_request_unique_id:
                                        videoCall.video_call_request_unique_id,
                                      })
                                    )
                                  }
                                  // to={`/video-call/${videoCall.video_call_request_unique_id}`}
                                >
                                  {t("start_call")}
                                </Link>
                              ) : (
                                ""
                              )}

                              {videoCall.end_btn_status == 1 ? (
                                <Button
                                  className="btn btn-danger mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      endVideoCallStart({
                                        video_call_request_id:
                                          videoCall.video_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("end_call")}
                                </Button>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          ) : (
            <NoDataFound />
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  callRequestReceivedModel: state.privateCall.callRequestReceivedModel,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(VideoCallRequestReceivedIndex));
