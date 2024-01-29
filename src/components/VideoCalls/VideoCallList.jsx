import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Row,
  Col,
  Table,
  Image,
  Badge,
} from "react-bootstrap";
// import WithdrawModal from "../helper/WithdrawModal";
import NoDataFound from "../NoDataFound/NoDataFound";
// import WalletLoader from "../Loader/WalletLoader";
import { t } from "react-multi-lang";
import { fetchVideoCallRequestsStart } from "../../store/actions/VideoCallAction";
import "./VideoCall.css";
import { Link } from "react-router-dom";
import VideoCallPaymentModal from "../helper/VideoCallPaymentModal";
import CommonCenterLoader from "../Loader/CommonCenterLoader";

const VideoCallList = (props) => {
  useEffect(() => {
    props.dispatch(fetchVideoCallRequestsStart());
  }, []);

  const [VideoCallPayment, setVideoCallPayment] = useState(false);

  const closeVideoCallPaymentModal = () => {
    setVideoCallPayment(false);
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
                    <h3>{t("video_calls")}</h3>
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
          {props.videocalls.loading ? (
            // t("loading")
            <CommonCenterLoader />
          ) : props.videocalls.data.video_call_requests &&
            props.videocalls.data.video_call_requests.length > 0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-uppercase">
                        <th>{t("s_no")}</th>
                        <th>{t("model")}</th>
                        <th>{t("user")}</th>
                        <th>{t("start_time")}</th>
                        <th>{t("end_time")}</th>
                        <th>{t("status")}</th>
                        <th>{t("action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.videocalls.data.video_call_requests.map(
                        (videoCall, index) => (
                          <tr key={videoCall.video_call_request_id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link to={`/` + videoCall.model.user_unique_id}>
                                {videoCall.model.name}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/` + videoCall.user.user_unique_id}>
                                {videoCall.user.name}
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
                                <Button className="btn btn-sm btn-success mr-3">
                                  {t("accept")}
                                </Button>
                              ) : (
                                ""
                              )}
                              {videoCall.reject_btn_status == 1 ? (
                                <Button className="btn btn-sm btn-danger  mr-3">
                                  {t("reject")}
                                </Button>
                              ) : (
                                ""
                              )}
                              {videoCall.payment_btn_status == 1 ? (
                                <Button className="btn btn-success mr-3">
                                  {t("paynow")}
                                </Button>
                              ) : (
                                ""
                              )}

                              {videoCall.start_btn_status == 1 ? (
                                <Button className="btn btn-success mr-3">
                                  {t("start_call")}
                                </Button>
                              ) : (
                                ""
                              )}

                              {videoCall.end_btn_status == 1 ? (
                                <Button className="btn btn-danger mr-3">
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
            <NoDataFound></NoDataFound>
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  videocalls: state.videocall.videoCallRequests,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(VideoCallList);
