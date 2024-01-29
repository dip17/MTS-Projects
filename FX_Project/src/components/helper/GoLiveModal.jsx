import React, { useState } from "react";
import { Form, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import { videoCallBroadcastStart } from "../../store/actions/LiveVideoAction";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ToolTip from "./ToolTip";

const GoLiveModal = (props) => {
  const [inputData, setInputData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(0);

  const [image, setImage] = useState(false);

  const paymentStatusOnchange = (event) => {
    setInputData({
      ...inputData,
      payment_status: event,
    });
    setPaymentStatus(event);
  };

  const handleUploadImage = (values) => {
    if (values.currentTarget.type === "file") {
      setInputData({
        ...inputData,
        [values.currentTarget.name]: values.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = values.currentTarget.files[0];

      if (values.currentTarget.name === "snapshot") {
        reader.onloadend = () => {
          setImage(reader.result);
        };
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (values) => {
    props.dispatch(
      videoCallBroadcastStart({
        ...values,
        snapshot: inputData.snapshot,
      })
    );
    props.closeGoLiveModal();
  };

  const nullData = ["", null, undefined, "light"];

  const goLiveSchema = Yup.object().shape({
    title: Yup.string().required(t("title_is_required")),
    payment_status: Yup.string(),
    type: Yup.string(),
    picture: Yup.string(),
    description: Yup.string(),
    amount: Yup.number(t("invalid_format")).when("payment_status", {
      is: "1",
      then: Yup.number().required(t("enter_amount")),
      otherwise: Yup.number(),
    }),
  });

  return (
    <>
      <Modal
        className={`modal-dialog-center sent-tip-modal go-live-modal 
          ${nullData.includes(localStorage.getItem("theme"))
            ? ""
            : "dark-theme-modal"
          }`}
        size="lg"
        centered
        show={props.goLive}
        onHide={props.closeGoLiveModal}
      >
        {props.goLive === true ? (
          <Formik
            initialValues={{
              title: "",
              payment_status: "0",
              type: "public",
              description: "",
              amount: "",
              snapshot: "",
            }}
            validationSchema={goLiveSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched, setFieldValue, resetForm, values }) => (
              <FORM>
                <ToolTip title={"close"} placement="right">
                  <Modal.Header closeButton>
                    <Modal.Title>{t("go_live")}</Modal.Title>
                  </Modal.Header>
                </ToolTip>
                <Modal.Body>
                  <Row>
                    <Col md={6}>
                      <div className="go-live-img-sec">
                        <Image
                          className="go-live-img"
                          src={
                            window.location.origin +
                            "/assets/images/go-live-img.svg"
                          }
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="header-userinfo">
                        <div className="g-avatar online_status_class">
                          <Image
                            src={props.userPicture}
                            alt={props.name}
                            className="tips__user__img"
                          />
                        </div>
                        <div className="body-userinfo">
                          <div className="popup-username-row">
                            <div className="pop-username">
                              <div className="">
                                {props.name}{" "}
                                {props.is_verified_badge == 1 ? (
                                  <img
                                    className="verified-badge"
                                    alt="verified-badge"
                                    src={
                                      configuration.get(
                                        "configData.verified_badge_file"
                                      )
                                        ? configuration.get(
                                          "configData.verified_badge_file"
                                        )
                                        : ""
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="popup-username-row">
                            <span className="pop-username popuser-realname">
                              <div className="pop-user-username">
                                @{props.username}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="floating-form go-live-form">
                        {/* <div className="floating-label mb-4">
            <input
              className="floating-input"
              type="text"
              placeholder={t("title")}
              value={inputData.title ? inputData.title : null}
              onChange={(event) =>
                setInputData({
                  ...inputData,
                  title: event.currentTarget.value,
                })
              }
            />
            <span className="highlight"></span>
            <label className="default-label">{t("title")}</label>
          </div> */}
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="choose-payment-label">
                            {t("title")}
                          </Form.Label>
                          <Field
                            type="text"
                            placeholder={t("title")}
                            name="title"
                            // value={inputData.title ? inputData.title : null}
                            // onChange={(event) =>
                            //   setInputData({
                            //     ...inputData,
                            //     title: event.currentTarget.value,
                            //   })
                            // }
                            className={`no-padding form-control ${touched.title && errors.title ? t("is_invalid") : ""
                              }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="title"
                            className="invalid-feedback mt-3"
                          />
                        </Form.Group>
                        {/* <Form>
                          <label className="choose-payment-label">
                            {t("choose_streaming_mode")}
                          </label>
                          {["radio"].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                              <Form.Check
                                custom
                                inline
                                label="Public"
                                type={type}
                                id="public"
                                value="public"
                                name="type"
                                defaultChecked={true}
                                // onChange={(event) =>
                                //   setInputData({
                                //     ...inputData,
                                //     type: "public",
                                //   })
                                // }
                              />
                              <Form.Check
                                custom
                                inline
                                label="Private"
                                type={type}
                                // id={`custom-inline-${type}-2`}
                                id="private"
                                value="private"
                                name="type"
                                onChange={(event) =>
                                  setInputData({
                                    ...inputData,
                                    type: "private",
                                  })
                                }
                              />
                            </div>
                          ))}
                        </Form> */}
                        {/* <Form>
                          <label className="choose-payment-label">
                            {t("payment_status")}
                          </label>
                          {["radio"].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                              <Form.Check
                                custom
                                inline
                                label="Free"
                                type={type}
                                id="free"
                                value="0"
                                name="payment_status"
                                defaultChecked={true}
                                onChange={(event) => {
                                  paymentStatusOnchange(
                                    event.currentTarget.value
                                  );
                                }}
                              />
                              <Form.Check
                                custom
                                inline
                                label="Paid"
                                type={type}
                                // id={`custom-inline-${type}-2`}
                                id="paid"
                                value="1"
                                name="payment_status"
                                onChange={(event) => {
                                  paymentStatusOnchange(
                                    event.currentTarget.value
                                  );
                                }}
                              />
                            </div>
                          ))}
                        </Form> */}
                        <div role="group" aria-labelledby="my-radio-group">
                          <div className="custom-control custom-radio custom-control-inline">
                            <Field
                              type="radio"
                              name="type"
                              value="public"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              onClick={(event) => {
                                setFieldValue("type", "public");
                              }}
                            >
                              {t("public")}
                            </label>
                          </div>

                          <div className="custom-control custom-radio custom-control-inline">
                            <Field
                              type="radio"
                              name="type"
                              value="private"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              onClick={(event) => {
                                setFieldValue("type", "private");
                              }}
                            >
                              {t("private")}
                            </label>
                          </div>
                        </div>
                        <div role="group" aria-labelledby="my-radio-group">
                          <div className="custom-control custom-radio custom-control-inline">
                            <Field
                              type="radio"
                              name="payment_status"
                              value="0"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              onClick={(event) => {
                                paymentStatusOnchange("0");
                                setFieldValue("payment_status", "0");
                              }}
                            >
                              {t("free")}
                            </label>
                          </div>

                          <div className="custom-control custom-radio custom-control-inline">
                            <Field
                              type="radio"
                              name="payment_status"
                              value="1"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              onClick={(event) => {
                                paymentStatusOnchange("1");
                                setFieldValue("payment_status", "1");
                              }}
                            >
                              {t("paid")}
                            </label>
                          </div>
                        </div>

                        {/* <div className="livestream-thumbnail-btn">
                          <input
                            type="file"
                            name="snapshot"
                            accept="image/*"
                            id="livestream-thumbnail"
                            onChange={handleUploadImage}
                          />
                          <label for="livestream-thumbnail">
                            {t("upload_thumnail")}
                          </label>
                        </div> */}

                        {image ? (
                          <Row>
                            <Col sm={12} md={6}>
                              <div className="post-img-preview-sec">
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setImage(null);
                                    setInputData({
                                      ...inputData,
                                      snapshot: "",
                                    });
                                  }}
                                >
                                  <i className="far fa-times-circle"></i>
                                </Link>

                                <Image
                                  alt="#"
                                  src={image}
                                  className="post-video-preview"
                                />
                              </div>
                            </Col>
                          </Row>
                        ) : null}

                        {paymentStatus == 1 ? (
                          // <div className="floating-label mb-4">
                          //   <input
                          //     className="floating-input"
                          //     type="number"
                          //     min="0"
                          //     step="any"
                          //     value={inputData.amount ? inputData.amount : null}
                          //     onChange={(event) =>
                          //       setInputData({
                          //         ...inputData,
                          //         amount: event.currentTarget.value,
                          //       })
                          //     }
                          //   />
                          //   <span className="highlight"></span>
                          //   <label className="default-label">{t("amount")}</label>
                          // </div>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label className="choose-payment-label">
                              {configuration.get(
                                "configData.is_only_wallet_payment"
                              ) == 1
                                ? t("token")
                                : t("amount")}
                            </Form.Label>
                            <Field
                              type="number"
                              min="0"
                              step="any"
                              className={`no-padding form-control ${touched.amount && errors.amount
                                  ? "is-invalid"
                                  : ""
                                }`}
                              // value={inputData.amount ? inputData.amount : null}
                              // onChange={(event) =>
                              //   setInputData({
                              //     ...inputData,
                              //     amount: event.currentTarget.value,
                              //   })
                              // }
                              name="amount"
                            />
                            <ErrorMessage
                              component="div"
                              name="amount"
                              className="invalid-feedback mt-3"
                            />
                          </Form.Group>
                        ) : (
                          ""
                        )}
                        {/* <div className="floating-label">
            <input
              className="floating-input"
              type="text"
              value={inputData.description ? inputData.description : null}
              placeholder={t("go_live_description_placeholder")}
              onChange={(event) =>
                setInputData({
                  ...inputData,
                  description: event.currentTarget.value,
                })
              }
            />
            <span className="highlight"></span>
            <label className="default-label">
              {t("description")} ({t("optional")})
            </label>
          </div> */}
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="choose-payment-label">
                            {t("description")} ({t("optional")})
                          </Form.Label>
                          <Field
                            as="textarea"
                            rows={2}
                            // value={
                            //   inputData.description
                            //     ? inputData.description
                            //     : null
                            // }
                            name="description"
                            placeholder={t("go_live_description_placeholder")}
                            className={`no-padding form-control height-auto ${touched.description && errors.description
                                ? "is-invalid"
                                : ""
                              }`}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={props.closeGoLiveModal}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="btn btn-success"
                    // data-dismiss="modal"
                    disabled={props.videocall.buttonDisable}
                  >
                    {props.videocall.loadingButtonContent !== null
                      ? props.videocall.loadingButtonContent
                      : t("go_live")}
                  </Button>
                </Modal.Footer>
              </FORM>
            )}
          </Formik>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  videocall: state.videocall.saveVideoCallRequest,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(GoLiveModal));
