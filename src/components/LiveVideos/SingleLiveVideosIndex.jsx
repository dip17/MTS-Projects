import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { fetchSingleLiveVideoStart } from "../../store/actions/LiveVideoAction";
import PaymentModal from "./PaymentModal";
import "./LiveIndex.css";

const SingleLiveVideosIndex = (props) => {
  const [username, setUsername] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      setUsername(localStorage.getItem("username"));
    }
    props.dispatch(
      fetchSingleLiveVideoStart({
        live_video_unique_id: props.match.params.live_video_unique_id,
      })
    );
  }, []);

  const openPaymentModal = (event) => {
    event.preventDefault();
    setPaymentModal(true);
  };

  console.log(props.liveVideo);

  return (
    <div className="card-list-sec">
      <Container>
        <h4 className="head-title">{t("live_video_info")}</h4>

        <Row>
          <Col sm={12} md={6}>
            {props.liveVideo.loading ? (
              t("loading")
            ) : props.liveVideo.data ? (
              <div className="single-live-video-sec">
                <div className="single-live-video-card">
                  <img
                    className="d-block w-100 rounded"
                    src={props.liveVideo.data.user_picture}
                    alt={props.liveVideo.data.title}
                  />
                  <div className="single-live-video-info">
                    <h5 className="title">{props.liveVideo.data.title}</h5>
                    <p className="date">{props.liveVideo.data.start_date}</p>
                    <p className="view-count">
                      {props.liveVideo.data.viewer_cnt} {t("views")}
                    </p>
                  </div>
                  {props.liveVideo.data.is_user_needs_to_pay == 1 ? (
                    <>
                      <hr></hr>
                      <Button
                        className="live-btn-blue"
                        type="submit"
                        disabled={props.liveVideo.buttonDisable}
                        onClick={(event) => openPaymentModal(event)}
                      >
                        {props.liveVideo.loadingButtonContent !== null
                          ? props.liveVideo.loadingButtonContent
                          : t("pay_and_join")}
                      </Button>
                    </>
                  ) : (
                    ""
                  )}

                  {props.liveVideo.data.is_user_needs_to_pay == 0 ? (
                    <>
                      <hr></hr>
                      <Link
                        to={`/join-live/${props.liveVideo.data.live_video_unique_id}`}
                        target="_blank"
                        className="live-btn-blue"
                        type="button"
                      >
                        {" "}
                        {t("join_now")}
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </Col>

          <Col sm={12} md={6}>
            {props.liveVideo.loading ? (
              t("loading")
            ) : props.liveVideo.data ? (
              <div className="single-live-video-table">
                <Table borderedless responsive className="event-table">
                  <tbody>
                    <tr>
                      <td>
                        <h5 className="text-muted">{t("live_video_id")}</h5>
                      </td>

                      <td className="text-right">
                        <h5>{props.liveVideo.data.live_video_unique_id}</h5>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h5 className="text-muted">{t("amount")}</h5>
                      </td>

                      <td className="text-right">
                        <h5>{props.liveVideo.data.amount_formatted}</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="text-muted">{t("start_date")}</h5>
                      </td>

                      <td className="text-right">
                        <h5>{props.liveVideo.data.start_date}</h5>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h5 className="text-muted">{t("payment_status")}</h5>
                      </td>

                      <td className="text-right">
                        <h5>{props.liveVideo.data.payment_type_text}</h5>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h5 className="text-muted">{t("status")}</h5>
                      </td>

                      <td className="text-right">
                        <h5 className="highlight-text">
                          {props.liveVideo.data.status_formatted}
                        </h5>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h5 className="text-muted">{t("description")}</h5>
                      </td>

                      <td className="text-right">
                        <h5>
                          {props.liveVideo.data.description
                            ? props.liveVideo.data.description
                            : t("n_a")}
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
        {props.liveVideo.loading ? (
          t("loading")
        ) : props.liveVideo.data ? (
          <PaymentModal
            paymentModal={paymentModal}
            closePaymentModal={closePaymentModal}
            liveVideo={props.liveVideo.data}
          />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  liveVideo: state.liveVideo.singleLiveVideo,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SingleLiveVideosIndex));
