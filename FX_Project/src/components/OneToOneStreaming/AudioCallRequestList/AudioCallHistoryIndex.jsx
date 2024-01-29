import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";
import "../../Wallet/Wallet.css";
import NoDataFound from "../../NoDataFound/NoDataFound";
import BillingAccountLoader from "../../Loader/BillingAccountLoader";
import { translate, t } from "react-multi-lang";
import {
  acceptAudioCallStart,
  audioCallHistoryUserStart,
  rejectAudioCallStart,
  endAudioCallStart,
  startAudioCallRequestStart,
} from "../../../store/actions/PrivateCallAction";
import { Link } from "react-router-dom";
import AudioCallMakePaymentModel from "../../helper/AudioCallMakePaymentModel";
import CallPaymentModal from "../../Model/PaymentModal/CallPaymentModal";

const AudioCallHistoryIndex = (props) => {
  useEffect(() => {
    props.dispatch(audioCallHistoryUserStart());
  }, []);
  const [makePaymentInput, setMakePaymentInput] = useState({
    audio_call_request_id: "",
    model_displayname: "",
    model_picture: "",
    amount: "",
    amount_formatted: "",
    model_unique_id: "",
    modelname: "",
  });

  const [
    selectedCallDetailsToMakePayment,
    setSelectedCallDetailsToMakePayment,
  ] = useState(null);

  const [makePaymentModel, setMakePaymentModel] = useState(false);

  const closePaymentModal = () => {
    setMakePaymentModel(false);
  };

  const makePayment = (event, callDetails) => {
    event.preventDefault();
    setMakePaymentInput({
      audio_call_request_id: callDetails.audio_call_request_id,
      model_displayname: callDetails.model_displayname,
      model_picture: callDetails.model_picture,
      amount: callDetails.amount,
      amount_formatted: callDetails.amount_formatted,
      model_unique_id: callDetails.model_unique_id,
      modelname: callDetails.modelname,
    });
    setSelectedCallDetailsToMakePayment(callDetails);
    setMakePaymentModel(true);
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
                      <h3 className="ml-2 mb-0">{t("audio_call_history")}</h3>
                    </Link>
                    <p className="text-muted f-2">
                      {t("audio_call_history_note")}
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="trans-table-sec">
        <Container>
          {props.callHistoryUser.loading ? (
            <BillingAccountLoader />
          ) : props.callHistoryUser.data.audio_call_requests &&
            props.callHistoryUser.data.audio_call_requests.length > 0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-center text-uppercase">
                        <th>{t("s_no")}</th>
                        <th>{t("model")}</th>
                        <th>{t("user")}</th>
                        <th>{t("amount")}</th>
                        <th>{t("scheduled")}</th>
                        <th>{t("end_time")}</th>
                        <th>{t("status")}</th>
                        <th>{t("action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.callHistoryUser.data.audio_call_requests.map(
                        (audioCall, index) => (
                          <tr
                            key={audioCall.audio_call_request_id}
                            className="text-center"
                          >
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/` + audioCall.model_unique_id}>
                                {audioCall.model_displayname}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/` + audioCall.user_unique_id}>
                                {audioCall.user_displayname}
                              </Link>
                            </td>
                            <td>{audioCall.amount_formatted}</td>
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
                                  className="btn btn-sm btn-success mr-3 col-12 mb-2"
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
                                  className="btn btn-sm btn-danger mr-3 col-12 mb-2"
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
                                  className="btn btn-success mr-3 col-12 mb-2"
                                  onClick={(event) =>
                                    makePayment(event, audioCall)
                                  }
                                >
                                  {t("paynow")}
                                </Button>
                              ) : (
                                ""
                              )}

                              {audioCall.join_btn_status == 1 ? (
                                <Link
                                  className="btn btn-success mr-3 col-12 mb-2"
                                  to={`/audio-call/${audioCall.audio_call_request_unique_id}`}
                                >
                                  {t("join_call")}
                                </Link>
                              ) : (
                                ""
                              )}

                              {audioCall.start_btn_status == 1 ? (
                                <Link
                                  className="btn btn-success mr-3 col-12 mb-2"
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
                                  className="btn btn-danger mr-3 col-12"
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
                </div>
              </Col>
              {/* <AudioCallMakePaymentModel
                audio_call_request_id={makePaymentInput.audio_call_request_id}
                audioCallPayment={makePaymentModel}
                closePaymentModal={closePaymentModal}
                userPicture={makePaymentInput.model_picture}
                name={makePaymentInput.model_displayname}
                user_unique_id={makePaymentInput.model_unique_id}
                callDetails={makePaymentInput}
                username={makePaymentInput.modelname}
              /> */}
              {makePaymentModel ?
                <CallPaymentModal
                  paymentsModal={makePaymentModel}
                  closepaymentsModal={closePaymentModal}
                  callDetails={makePaymentInput}
                />
                : null}
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
  callHistoryUser: state.privateCall.audioCallHistoryUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AudioCallHistoryIndex));
