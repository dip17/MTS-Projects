import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";
import "../../Wallet/Wallet.css";
import NoDataFound from "../../NoDataFound/NoDataFound";
import BillingAccountLoader from "../../Loader/BillingAccountLoader";
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  acceptAudioCallStart,
  callAudioRequestReceivedModelStart,
  callMoreAudioRequestReceivedModelStart,
  rejectAudioCallStart,
  endAudioCallStart,
  startAudioCallRequestStart,
} from "../../../store/actions/PrivateCallAction";

const AudioCallRequestReceivedIndex = (props) => {
  

  useEffect(() => {
    props.dispatch(
      callAudioRequestReceivedModelStart({
        skip: 0,
        take: 12,
      })
    );
  }, []);

  const fetchMoreData = () => {
    props.dispatch(
      callMoreAudioRequestReceivedModelStart({
        skip: props.audiocallRequestReceivedModel.data.audio_call_requests.length,
        take: 12,
      })
    );
  };



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
                      {t("audio_call_request_received")}
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
          {props.audiocallRequestReceivedModel.loading ? (
            <BillingAccountLoader />
          ) : props.audiocallRequestReceivedModel.data.audio_call_requests &&
            props.audiocallRequestReceivedModel.data.audio_call_requests.length >
              0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                <InfiniteScroll
                  dataLength={props.audiocallRequestReceivedModel.data.audio_call_requests.length}
                  next={fetchMoreData}
                  hasMore={
                    props.audiocallRequestReceivedModel.data.audio_call_requests.length <
                      props.audiocallRequestReceivedModel.data.total &&
                    props.audiocallRequestReceivedModel.errorCount < 2
                  }
                  loader={<h4>{t("loading")}</h4>}
                >
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
                      {props.audiocallRequestReceivedModel.data.audio_call_requests.map(
                        (audioCall, index) => (
                          <tr
                            key={audioCall.audio_call_request_id}
                            className="text-center"
                          >
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/` + audioCall.modelname}>
                                {audioCall.model_displayname}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/` + audioCall.username}>
                                {audioCall.user_displayname}
                              </Link>
                            </td>
                            <td>
                              {audioCall.start_time
                                ? audioCall.start_time
                                : "-"}
                            </td>
                            <td>
                              {audioCall.end_time ? audioCall.end_time : "-"}
                            </td>
                            <td>{audioCall.call_status_formatted}</td>
                            <td>
                              {audioCall.accept_btn_status == 1 ? (
                                <Button
                                  className="btn btn-sm btn-success mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      acceptAudioCallStart({
                                        audio_call_request_id:
                                        audioCall.audio_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("accept")}
                                </Button>
                              ) : (
                                ""
                              )}
                              {audioCall.reject_btn_status == 1 ? (
                                <Button
                                  className="btn btn-sm btn-danger  mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      rejectAudioCallStart({
                                        audio_call_request_id:
                                        audioCall.audio_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("reject")}
                                </Button>
                              ) : (
                                ""
                              )}
                              {audioCall.payment_btn_status == 1 ? (
                                <Button
                                  className="btn btn-success mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      rejectAudioCallStart({
                                        audio_call_request_id:
                                        audioCall.audio_call_request_id,
                                      })
                                    )
                                  }
                                >
                                  {t("paynow")}
                                </Button>
                              ) : (
                                ""
                              )}

                              {audioCall.join_btn_status == 1 ? (
                                <Link
                                  className="btn btn-success mr-3"
                                  to={`/audio-call/${audioCall.audio_call_request_unique_id}`}
                                >
                                  {t("join_call")}
                                </Link>
                              ) : (
                                ""
                              )}

                              {audioCall.start_btn_status == 1 ? (
                                <Link
                                  className="btn btn-success mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      startAudioCallRequestStart({
                                        audio_call_request_unique_id:
                                        audioCall.audio_call_request_unique_id,
                                      })
                                    )
                                  }
                                  // to={`/audio-call/${audioCall.audio_call_request_unique_id}`}
                                >
                                  {t("start_call")}
                                </Link>
                              ) : (
                                ""
                              )}

                              {audioCall.end_btn_status == 1 ? (
                                <Button
                                  className="btn btn-danger mr-3"
                                  onClick={() =>
                                    props.dispatch(
                                      endAudioCallStart({
                                        audio_call_request_id:
                                        audioCall.audio_call_request_id,
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
                  </InfiniteScroll>
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
  audiocallRequestReceivedModel: state.privateCall.audiocallRequestReceivedModel,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AudioCallRequestReceivedIndex));
