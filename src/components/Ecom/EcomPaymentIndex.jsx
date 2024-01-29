import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";
import {
  fetchCartListStart,
  removeCartDetailsStart,
  fetchDeliveryAddressStart,
  ordersPaymentByWalletStart,
  ordersPaymentByCardStart,
  ordersPaymentByPaypalStart,
} from "../../store/actions/ProductsAction";
import { connect } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import AddWalletAmountModal from "../helper/AddWalletAmountModal";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

const EcomPaymentIndex = (props) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState("card");

  const [selectedCard, setSelectedCard] = useState(null);

  const [newAddressInputData, setNewAddressInputData] = useState({
    name: "",
    contact_number: "",
    address: "",
    landmark: "",
    pincode: "",
    state: ""
  });

  const [isOnlyWalletPayment, setIsOnlyWalletPayment] = useState(
    configuration.get("configData.is_only_wallet_payment")
  );

  const [addWalletAmountModal, setAddWalletAmountModal] = useState(false);

  const closeAddWalletAmountModal = () => {
    setAddWalletAmountModal(false);
  };

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  useEffect(() => {
    props.dispatch(fetchCartListStart());
    props.dispatch(fetchDeliveryAddressStart());
  }, []);

  const handleDeliveryAddressSelect = (address) => {
    setSelectedAddress(address);
    setNewAddressInputData({
      name: "",
      contact_number: "",
      address: "",
      landmark: "",
      pincode: "",
      state: ""
    })
  };

  //enable it for default address select

  // useEffect(() => {
  //   if (!props.deliveryAddress.loading) {
  //     setSelectedAddress(
  //       props.deliveryAddress.data.delivery_addresses.find(
  //         (data) => data.is_default == 1
  //       )
  //     );
  //   }
  // }, [props.deliveryAddress.data]);

  const handlePaymentChange = (payment) => {
    setSelectedPayment(payment);
  };

  useEffect(() => {
    switch (selectedPayment) {
      case "card": {
        props.dispatch(fetchCardDetailsStart());
        break;
      }
      case "paypal": {
        break;
      }
      case "wallet": {
        props.dispatch(fetchWalletDetailsStart());
        break;
      }
      default:
        return console.log("select payment");
    }
  }, [selectedPayment]);

  useEffect(() => {
    if (!props.cards.loading) {
      setSelectedCard(
        props.cards.data.cards.find((data) => data.is_default == 1)
      );
    }
  }, [props.cards.data]);

  const handleCardsChange = (card) => {
    setSelectedCard(card);
  };

  const handleAddressInputChange = (event) => {
    setNewAddressInputData({
      ...newAddressInputData,
      [event.target.name]: event.target.value,
    });

    if (event.target.value.length > 0) {
      setSelectedAddress(null)
    }
  };

  const handleAddressCheckboxChange = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };

  useEffect(() => {
    setNewAddressInputData({
      ...newAddressInputData,
      is_default: isDefaultAddress ? 1 : 0,
    });
  }, [isDefaultAddress]);

  const getFormData = () => {
    let formdata = {
      cart_ids:
        !props.cartList.loading &&
        props.cartList.data.carts.map((cart) => cart.cart_id).toString(),
    };

    if (selectedAddress != null) {
      formdata = {
        ...formdata,
        delivery_address_id: selectedAddress.delivery_address_id,
      };
    } else {
      formdata = {
        ...formdata,
        ...newAddressInputData,
      };
    }

    return formdata;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formdata = getFormData();

    switch (selectedPayment) {
      case "card": {
        props.dispatch(ordersPaymentByCardStart({ ...formdata }));
        break;
      }
      case "paypal": {
        break;
      }
      case "wallet": {
        props.dispatch(ordersPaymentByWalletStart({ ...formdata }));
        break;
      }
      default:
        return null;
    }
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      "Payment cancelled please try again.."
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      const formdata = getFormData();

      props.dispatch(
        ordersPaymentByPaypalStart({
          payment_id: payment.paymentID,
          ...formdata,
        })
      );
    }, 1000);
  };

  return (
    <>
      <div className="ecom-payment-sec">
        <Container>
          <h2>{t("ecom_payment")}</h2>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Row>
              <Col md={7} className="resp-mrg-btn-xs">
                <div className="border-right-divider">
                  {props.deliveryAddress.loading ? (
                    t("loading")
                  ) : (
                    <>
                      {props.deliveryAddress.data.total > 0 && (
                        <>
                          <Row className="payment-method">
                            {props.deliveryAddress.data.delivery_addresses.map(
                              (address, index) => (
                                <>
                                  <Col
                                    lg={6}
                                    className="resp-mrg-btn-xs mb-3"
                                    key={index}
                                  >
                                    <div className="radiobtn payment-method-card-1">
                                      <input
                                        type="radio"
                                        // id="inline-radio-1"
                                        id={`inline-radio-${index + 1}`}
                                        className="form-check-input"
                                        checked={
                                          selectedAddress != null &&
                                            selectedAddress.delivery_address_id ==
                                            address.delivery_address_id
                                            ? true
                                            : false
                                        }
                                        name="delivery_address"
                                      />
                                      <label
                                        type="radio"
                                        for="inline-radio-1"
                                        className="form-check-label card-label"
                                        onClick={() =>
                                          handleDeliveryAddressSelect(address)
                                        }
                                      >
                                        <p className="no-margin mb-3">
                                          <span className="card-option">
                                            {address.contact_number}
                                          </span>
                                        </p>
                                        <p className="no-margin mb-3">
                                          <span className="card-option">
                                            {address.landmark}
                                          </span>
                                        </p>

                                        <p className="no-margin mb-3">
                                          <span className="card-option">
                                            {address.address}
                                          </span>
                                        </p>
                                        <p className="no-margin mb-3">
                                          <span className="card-option">
                                            {address.country}
                                          </span>
                                        </p>
                                      </label>
                                    </div>
                                  </Col>
                                </>
                              )
                            )}
                          </Row>
                        </>
                      )}
                    </>
                  )}
                  {/* <div className="ecom-payment-header">
                      <h4>Contact Infromation</h4>
                      <p>Already have an account? <Link to="/">Login</Link></p>
                  </div>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Check
                      type="checkbox"
                      id="customControlAutosizing"
                      label="Keep me up to date on news and offers"
                      custom
                  /> */}
                  <div className="shipping-address-sec">
                    <h4>{t("shipping_address")}</h4>
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Control
                            placeholder={t("name")}
                            name="name"
                            value={newAddressInputData.name}
                            onChange={(event) =>
                              handleAddressInputChange(event)
                            }
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder={t("contact_number")}
                        name="contact_number"
                        type="number"
                        value={newAddressInputData.contact_number}
                        onChange={(event) => handleAddressInputChange(event)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder={t("address")}
                        name="address"
                        value={newAddressInputData.address}
                        onChange={(event) => handleAddressInputChange(event)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder={t("country")}
                        name="country"
                        value={newAddressInputData.country}
                        onChange={(event) => handleAddressInputChange(event)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder={t("landmark")}
                        name="landmark"
                        value={newAddressInputData.landmark}
                        onChange={(event) => handleAddressInputChange(event)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder={t("zipcode")}
                        name="pincode"
                        type="text"
                        value={newAddressInputData.pincode}
                        onChange={(event) => handleAddressInputChange(event)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder={t("state")}
                        name="state"
                        value={newAddressInputData.state}
                        onChange={(event) => handleAddressInputChange(event)}
                      />
                    </Form.Group>
                    {/* <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                          >
                            <option value="0">India</option>
                            <option value="1">USA</option>
                            <option value="2">UAE</option>
                            <option value="3">Spin</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                          >
                            <option value="0">Tamil Nadu</option>
                            <option value="1">Kerala</option>
                            <option value="2">Andhra</option>
                            <option value="3">Telegana</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Control placeholder="PIN code" />
                      </Col>
                    </Row> */}
                    <div className="padding-small mb-3">
                      <Form.Check
                        type="checkbox"
                        id="customControlAutosizing-1"
                        label="Save this information for next time"
                        custom
                        name="is_default"
                        defaultChecked={isDefaultAddress}
                        onChange={(event) => handleAddressCheckboxChange(event)}
                      />
                    </div>
                    <Row className="payment-method mb-3 ">
                      {isOnlyWalletPayment == 0 ? (
                        <>
                          <Col md={6} className="resp-mrg-btn-xs">
                            <div className="radiobtn payment-method-card-1">
                              <Form.Control
                                type="radio"
                                id="inline-radio-1"
                                className="form-check-input"
                                checked={selectedPayment == "card" ? true : false}
                              />
                              <label
                                type="radio"
                                for="inline-radio-1"
                                className="form-check-label card-label"
                                onClick={() => handlePaymentChange("card")}
                              >
                                <p className="no-margin">
                                  <span className="card-option">Card</span>
                                </p>
                              </label>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="radiobtn payment-method-card-1">
                              <Form.Control
                                type="radio"
                                id="inline-radio-2"
                                className="form-check-input"
                                checked={selectedPayment == "paypal" ? true : false}
                              />
                              <label
                                type="radio"
                                for="inline-radio-2"
                                className="form-check-label"
                                onClick={() => handlePaymentChange("paypal")}
                              >
                                Paypal
                              </label>
                            </div>
                          </Col>
                        </>
                      ) : null}
                      <Col md={6} className="mt-4">
                        <div className="radiobtn payment-method-card-1">
                          <Form.Control
                            type="radio"
                            id="inline-radio-3"
                            className="form-check-input"
                            checked={selectedPayment == "wallet" ? true : false}
                          />
                          <label
                            type="radio"
                            for="inline-radio-3"
                            className="form-check-label"
                            onClick={() => handlePaymentChange("wallet")}
                          >
                            Wallet
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {selectedPayment == "card" ? (
                      props.cards.loading ? (
                        t("loading")
                      ) : (
                        <>
                          {props.cards.data.cards.length > 0 ? (
                            <>
                              <Row className="payment-method gap-3">
                                {props.cards.data.cards.map((card, index) => (
                                  <>
                                    <Col
                                      md={12}
                                      className="resp-mrg-btn-xs"
                                      key={index}
                                    >
                                      <div className="radiobtn payment-method-card-1">
                                        <input
                                          type="radio"
                                          // id="inline-radio-1"
                                          id={`inline-radio-${index + 1}`}
                                          className="form-check-input"
                                          name="cards"
                                          checked={
                                            selectedCard != null &&
                                              selectedCard.unique_id ==
                                              card.unique_id
                                              ? true
                                              : false
                                          }
                                        />
                                        <label
                                          type="radio"
                                          for="inline-radio-1"
                                          className="form-check-label card-label"
                                          onClick={() =>
                                            handleCardsChange(card)
                                          }
                                        >
                                          <p className="no-margin mb-3">
                                            <span className="card-option">
                                              {card.card_holder_name}
                                            </span>
                                          </p>

                                          <p className="desc">
                                            XXXX XXXX XXXX {card.last_four}
                                          </p>
                                        </label>
                                      </div>
                                    </Col>
                                  </>
                                ))}
                              </Row>
                            </>
                          ) : (
                            <div className="card-stripe-item">
                              <Link to="cards">
                                <div className="add-account-item">
                                  <Image
                                    className="add-account-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/icons/new/add-card.svg"
                                    }
                                  />
                                  <h5 className="text-muted">Add Card</h5>
                                </div>
                              </Link>
                            </div>
                          )}
                        </>
                      )
                    ) : null}
                    {selectedPayment == "wallet" ? (
                      props.wallet.loading ? (
                        t("loading")
                      ) : (
                        <>
                          {props.wallet.data.user_wallet && (
                            <>
                              <Row className="payment-method">
                                <Col md={12}>
                                  <div className="radiobtn mb-4 payment-method-card">
                                    <div>
                                      <h3 className="payment-head-tit">
                                        Wallet Balance :{" "}
                                        {
                                          props.wallet.data.user_wallet
                                            .remaining_formatted
                                        }&nbsp;
                                        <Button onClick={() => setAddWalletAmountModal(true)} className="continue-shipping-btn ml-4">
                                          {t("add_wallet_amount")}
                                        </Button>
                                      </h3>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </>
                          )}
                        </>
                      )
                    ) : null}
                    <div className="ecom-payment-btn-sec mt-4">
                      {selectedPayment === "paypal" ? (
                        <>
                          {selectedAddress != null ||
                            Object.values(newAddressInputData).filter((data) => {
                              if (data) {
                                return data;
                              }
                            }).length >= 6 ? (
                            <>
                              <PaypalExpressBtn
                                env={env}
                                client={client}
                                currency={currency}
                                total={
                                  !props.cartList.loading &&
                                  props.cartList.data.total_amount
                                }
                                onError={paypalOnError}
                                onSuccess={paypalOnSuccess}
                                onCancel={paypalOnCancel}
                                shipping={2}
                              />
                            </>
                          ) : (
                            <p className="text-danger text-bold return-to-cart-link mb-0">
                              Shipping address missing
                            </p>
                          )}
                        </>
                      ) : (
                        <Button type="submit" className="continue-shipping-btn">
                          {t("pay_now")}
                        </Button>
                      )}

                      <Link to={`/ecom-cart`} className="return-to-cart-link">
                        {t("return_to_cart")}
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                {props.cartList.loading ? (
                  t("loading")
                ) : props.cartList.data.carts.length > 0 ? (
                  <div className="ecom-payment-product-details-sec">
                    {props.cartList.data.carts.map((cart) => (
                      <div className="product-details-header-sec">
                        <div className="product-details-header-card">
                          <div className="product-details-info">
                            <Image
                              className="product-thumbnail-img"
                              src={cart.user_product.picture}
                            />
                            <h6>{cart.user_product.name}</h6>
                          </div>
                          <div className="ecom-payment-product-amount">
                            <p>{cart.sub_total_formatted}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="product-details-body-sec">
                      <div className="product-details-card">
                        <h5>{t("subtotal")}</h5>
                        <p className="product-amount">
                          {props.cartList.data.sub_total_formatted}
                        </p>
                      </div>
                      <div className="product-details-card">
                        <h5>{t("shipping")}</h5>
                        <p>{t("calculated_at_next_step")}</p>
                      </div>
                    </div>
                    <div className="product-details-footer-sec">
                      <h5>{t("total")}</h5>
                      <div className="product-details-final-amount">
                        <span>
                          {configuration.get("configData.currency_code")}
                        </span>
                        <p>{props.cartList.data.total_formatted}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NoDataFound></NoDataFound>
                )}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <AddWalletAmountModal
        addWalletAmountModal={addWalletAmountModal}
        closeAddWalletAmountModal={closeAddWalletAmountModal}
        payments={props.wallet}
      />
    </>
  );
};

const mapStateToPros = (state) => ({
  cartList: state.userProducts.cartList,
  deliveryAddress: state.userProducts.deliveryAddress,
  wallet: state.wallet.walletData,
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(EcomPaymentIndex));
