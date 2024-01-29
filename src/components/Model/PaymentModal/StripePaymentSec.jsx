import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addMoneyViaCardStart } from '../../../store/actions/WalletAction';
import { translate, t } from 'react-multi-lang';

const StripePaymentSec = (props) => {

  const stripe = useStripe();
  const elements = useElements();

  // const [email, setEmail] = useState('');
  const [skipRender, setSkipRender] = useState(true);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = props.clientSecret;

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(t("payment_succeeded"));
          break;
        case "processing":
          setMessage(t("payment_processing"));
          break;
        case "requires_payment_method":
          setMessage(t("payment_failed"));
          break;
        default:
          setMessage("");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, ...response } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "http://localhost:3000",
      },
    });
    if (!error) {
      props.dispatch(addMoneyViaCardStart({
        amount: response.paymentIntent.amount,
        payment_id: response.paymentIntent.id,
      }));
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error)
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    setSkipRender(false);
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }


  return (
    <>
      <div className="mb-5 back" onClick={() => props.back()}>
        <i className="fas fa-arrow-left mr-2"></i> Back
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <div className="add-card-btn mt-5">
          <Button
            disabled={isLoading || !stripe || !elements || props.addAmount.buttonDisable}
            id="submit"
            type="submit"
          >
            <span id="button-text">
              {isLoading || props.addAmount.buttonDisable ? "Processing" : "Pay now"}
            </span>
          </Button>
        </div>
        {/* Show any error or success messages */}
        {message && !skipRender ? <div id="payment-message" className="text-danger">{message}</div> : null}
      </form>
    </>
  );

}


const mapStateToPros = (state) => ({
  addAmount: state.wallet.addMoneyInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(StripePaymentSec));