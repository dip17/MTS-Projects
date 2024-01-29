import React, { useEffect, useState } from "react";
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
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import configuration from "react-global-configuration";
import { connect } from "react-redux";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { addCardStart, fetchCardDetailsStart } from "../../../store/actions/CardsAction";
import { translate, t } from "react-multi-lang";
import { createNotification } from "react-redux-notify";

const CardSection = (props) => {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [skipRender, setSkipRender] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const submitCard = async () => {
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });


    if (payload.error) {
      props.dispatch(createNotification(getErrorNotificationMessage(payload.error)))
    } else {
      console.log(payload);
      props.dispatch(addCardStart({
        card_token: payload.paymentMethod.id,
        card_holder_name: cardHolderName,
      }));
    }
  }

  useEffect(() => {
    if (!skipRender && !props.addCard.loading && Object.keys(props.addCard.data).length > 0) {
      if (props.setShowAddCard) {
        props.dispatch(fetchCardDetailsStart());
        props.setShowAddCard(false);
      }
    }
    setSkipRender(false);
  }, [props.addCard]);

  return <Form>
    <Form.Label>{t("card_number")}</Form.Label>
    <InputGroup className="mb-4">
      {/* <Form.Control
        placeholder="xxxx-xxxx-xxxx-xx25"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      /> */}
      <CardNumberElement
        options={{ showIcon: true }}
        className="form-control"
        onChange={e => {
          // setError(e.error);
          setCardComplete(e.complete);
        }} />
      <InputGroup.Text id="basic-addon2">
        <img src="assets/images/card.png" alt="" />
      </InputGroup.Text>
    </InputGroup>
    <Row>
      <Col md={6}>
        <Form.Label>{t("expiry_date")}</Form.Label>
        <InputGroup className="mb-4">
          {/* <Form.Control
            placeholder="MM/YY"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          /> */}
          <CardExpiryElement
            className="form-control"
            onChange={e => {
              setCardComplete(e.complete);
            }} />
          <InputGroup.Text id="basic-addon2">
            <img src="assets/images/month-year.png" alt="" />
          </InputGroup.Text>
        </InputGroup>
      </Col>
      <Col md={6}>
        <Form.Label>{t("cvc")}/ {t("cvv")}</Form.Label>
        <InputGroup className="mb-4">
          {/* <Form.Control
            placeholder="..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          /> */}
          <CardCvcElement
            className="form-control"
            onChange={e => {
              setCardComplete(e.complete);
            }} />
          <InputGroup.Text id="basic-addon2">
            <img src="assets/images/cvv.png" alt="" />
          </InputGroup.Text>
        </InputGroup>
      </Col>
    </Row>
    <Form.Group className="mb-4" controlId="formBasicEmail">
      <Form.Label>{t("card_holders_name")}</Form.Label>
      <Form.Control
        type="text"
        placeholder={t("enter_card_holders_full_name")}
        className="card-name-text"
        value={cardHolderName}
        onChange={e => setCardHolderName(e.target.value)}
      />
    </Form.Group>
    <div className="add-card-btn">
      <Button
        disabled={props.addCard.buttonDisable || !cardComplete}
        onClick={() => submitCard()}>
        {props.addCard.loadingButtonContent ?
          props.addCard.loadingButtonContent
          : t("add_card")
        }
      </Button>
    </div>
  </Form>
}

const AddCardModalSec = (props) => {

  const stripePromise = loadStripe(
    configuration.get("configData.stripe_publishable_key")
  );

  return (
    <>
      <div className="add-new-card-sec mt-5">
        {props.setShowAddCard ?
          <div className="mb-5 back" onClick={() => props.setShowAddCard(false)}>
            <i className="fas fa-arrow-left mr-2"></i> {t("back")}
          </div> : null
        }
        <h4 className="payment-modal-title">{t("add_new_card")}</h4>
        <Elements stripe={stripePromise}>
          <CardSection
            dispatch={props.dispatch}
            addCard={props.addCard}
            setShowAddCard={props.setShowAddCard} />
        </Elements>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  addCard: state.cards.addCard,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AddCardModalSec));
