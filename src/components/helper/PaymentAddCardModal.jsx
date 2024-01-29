import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Modal,
  InputGroup,
  FormControl,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../Environment";
import { connect } from "react-redux";
import { createNotification } from "react-redux-notify";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "./NotificationMessage";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { translate, t } from "react-multi-lang";

const PaymentAddCardModal = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [addCardButtonDisable, setAddCardButtonDisable] = useState(false);
  const [addCardLoadingContent, setAddCardLoadingContent] = useState(null);

  const addCard = async (ev) => {
    ev.preventDefault();
    setAddCardButtonDisable(true);
    setAddCardLoadingContent(t("loading_please_wait"));
    if (stripe) {
      await stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        })
        .then((payload) => {
          // console.log("Payload", payload);
          const inputData = {
            card_token: payload.paymentMethod.id,
          };
          api
            .postMethod("cards_add", inputData)
            .then((response) => {
              if (response.data.success) {
                const notificationMessage = getSuccessNotificationMessage(
                  response.data.message
                );
                props.dispatch(createNotification(notificationMessage));
                props.dispatch(fetchCardDetailsStart());

                setAddCardButtonDisable(false);
                setAddCardLoadingContent(null);
              } else {
                const notificationMessage = getErrorNotificationMessage(
                  response.data.error
                );
                props.dispatch(createNotification(notificationMessage));
              }
              props.closePaymentAddCardModal();
            })
            .catch((error) => {
              console.log("Error", error);
              setAddCardButtonDisable(false);
              setAddCardLoadingContent(null);
              const notificationMessage = getErrorNotificationMessage(
                t("error_please_try_again")
              );
              props.dispatch(createNotification(notificationMessage));
            });
        })
        .catch((error) => {
          console.log("Eroor", error);
          setAddCardButtonDisable(false);
          setAddCardLoadingContent(null);
          const notificationMessage = getErrorNotificationMessage(
            t("please_check_your_card_details_and_try_again")
          );
          props.dispatch(createNotification(notificationMessage));
        });
    } else {
      setAddCardButtonDisable(false);
      setAddCardLoadingContent(null);
      const notificationMessage = getErrorNotificationMessage(
   t("stripe_is_not_configured")
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <Modal
        className={`modal-dialog-center payment-add-card-modal 
                ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.paymentAddCard}
        onHide={props.closePaymentAddCardModal}
      >
        {props.paymentAddCard === true ?
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>{t("add_card")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12} md={7}>
                  <CardElement />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-danger width-btn"
                data-dismiss="modal"
                onClick={props.closePaymentAddCardModal}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                className="btn btn-success width-btn"
                data-dismiss="modal"
                onClick={addCard}
                disabled={addCardButtonDisable}
              >
                {addCardLoadingContent != null ? addCardLoadingContent : t("add")}
              </Button>
            </Modal.Footer>
          </Form>
          : null}
      </Modal>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(PaymentAddCardModal));
