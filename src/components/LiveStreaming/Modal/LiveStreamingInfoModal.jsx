import React from "react";
import {
  InputGroup,
  FormControl,
  Image,
  Modal,
  Media,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const LiveStreamingInfoModal = (props) => {
  const { liveVideoDetails } = props;

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <div className="payment-modal-sec">
        <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${
            nullData.includes(localStorage.getItem("theme"))
              ? ""
              : "dark-theme-modal"
          }`}
          size="xl"
          centered
          show={props.infoModal}
          onHide={props.closeInfoModal}
        >
          {/* <Modal.Header closeButton>
            {/* <Modal.Title>User List</Modal.Title> *
          </Modal.Header> */}
          <Modal.Body className="wallet-card-body">
            <Button
              className="modal-close"
              onClick={() => props.closeInfoModal()}
            >
              <i className="fa fa-times" />
            </Button>
            <div className="payment-modal-body">
              <Row className="justify-content-between">
                <Col md={6}>
                  <div className="wallet-modal-details mt-5">
                    <h4 className="payment-modal-title">
                      {props.liveVideoDetails.user_displayname}
                    </h4>
                    <p>@{props.liveVideoDetails.username}</p>
                    <Image
                      style={{ width: "100%", aspectRatio: "1/1" }}
                      src={props.liveVideoDetails.user_picture}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="wallet-modal-details mt-5">
                    <h4 className="payment-modal-title">
                      {props.liveVideoDetails.title}
                    </h4>
                    <p>{props.liveVideoDetails.description}</p>
                    <div class="table-responsive">
                      <table class="event-table table">
                        <tbody>
                          <tr>
                            <td>
                              <h5 class="text-muted">{t("live_video_id")}</h5>
                            </td>
                            <td class="text-right">
                              <h5>
                                {props.liveVideoDetails.live_video_unique_id}
                              </h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h5 class="text-muted">{t("payment_status")}</h5>
                            </td>
                            <td class="text-right">
                              <h5>
                                {props.liveVideoDetails.amount === 0
                                  ?t("free_video")
                                  : t("paid_video")}
                              </h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h5 class="text-muted">{t("stream_type")}</h5>
                            </td>
                            <td class="text-right">
                              <h5 className="text-capitalize">
                                {props.liveVideoDetails.type}
                              </h5>
                            </td>
                          </tr>
                          {props.liveVideoDetails.amount !== 0 && (
                            <tr>
                              <td>
                                <h5 class="text-muted">{t("amount")}</h5>
                              </td>
                              <td class="text-right">
                                <h5>
                                  {props.liveVideoDetails.amount_formatted}
                                </h5>
                              </td>
                            </tr>
                          )}

                          <tr>
                            <td>
                              <h5 class="text-muted">{t("start_date")}</h5>
                            </td>
                            <td class="text-right">
                              <h5>
                                {props.liveVideoDetails.created_at_formatted}
                              </h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h5 class="text-muted">{t("status")}</h5>
                            </td>
                            <td class="text-right">
                              <h5 class="">
                                {props.liveVideoDetails.is_streaming === 1
                                  ? t("streaming_live")
                                  : t("offline")}
                              </h5>
                            </td>
                          </tr>
                          {props.liveVideoDetails.description !== "" && (
                            <tr>
                              <td>
                                <h5 class="text-muted">{t("description")}</h5>
                              </td>
                              <td class="text-right">
                                <h5 class="">
                                  {props.liveVideoDetails.description}
                                </h5>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default (translate(LiveStreamingInfoModal));
