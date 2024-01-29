import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Media,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./BecomeAContentCreator.css";
import {
  editUserDetails,
  updateUserSubscriptionStart,
} from "../../store/actions/UserAction";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { createNotification } from "react-redux-notify";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { translate, t } from "react-multi-lang";

const Step5 = (props) => {
  const [profileInputData, setProfileInputData] = useState({});

  useEffect(() => {
    if (props.user.data.content_creator_step === 0) {
      const notificationMessage = getErrorNotificationMessage(
        t("upload_doc_message")
      );
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(0);
    } else if (props.user.data.content_creator_step === 1) {
      const notificationMessage = getErrorNotificationMessage(
        t("doc_verification_pending_message")
      );
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(2);
    } else if (props.user.data.content_creator_step === 2) {
      const notificationMessage = getErrorNotificationMessage(
        t("update_billing_details_message")
      );
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(3);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(profileInputData).length > 0)
      props.dispatch(updateUserSubscriptionStart(profileInputData));
    else props.dispatch(updateUserSubscriptionStart());
  };

  return (
    <>
      <div className="step-4-content-sec">
        <div className="step-4-info">
          <h4>{t("setup_subscribers_fee")}</h4>
          <p>
            {t("set_fee_for_people_who_want_to_subscribe")}{" "}
            <span>{t("two_different_ways")} </span>
          </p>
          <p>{t("these_charges_will_not_be_renewed")}</p>
          <ul className="step-4-list list-unstyled">
            <Media as="li">
              <i className="fas fa-angle-double-right mr-2"></i>{" "}
              {t("if_you_block_your_subscribers_text")}
            </Media>
            <Media as="li">
              <i className="fas fa-angle-double-right mr-2"></i>{" "}
              {t("you_can_activate_or_deactivate_your_subscription_pricing")}
            </Media>
            <Media as="li">
              <i className="fas fa-angle-double-right mr-2"></i>{" "}
              {t(
                "changing_the_fee_will_not_change_the_price_of_previous_subscribers"
              )}
            </Media>
          </ul>
        </div>
        <div className="step-4-subscription-fee-sec">
          <div className="step-4-subscription-flex-data">
            <div className="step-4-subscription-content-sec">
              <h5>{t("monthly_subscription_fee")}</h5>
              <p>{t("payments_are_made_monthly_by_the_subscriber")}</p>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    {configuration.get("configData.is_only_wallet_payment") == 1
                      ? configuration.get("configData.token_symbol")
                      : configuration.get("configData.currency")}
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  aria-label="Amount (to the nearest dollar)"
                  id="monthly_amount"
                  type="number"
                  step="any"
                  min="1"
                  placeholder=""
                  name="monthly_amount"
                  className="form-control edit-reset"
                  disabled={
                    localStorage.getItem("is_subscription_enabled") == 1
                      ? false
                      : true
                  }
                  defaultValue={
                    props.user.data.monthly_amount
                      ? props.user.data.monthly_amount
                      : 1
                  }
                  onChange={(event) => {
                    props.dispatch(
                      editUserDetails(
                        event.currentTarget.name,
                        event.currentTarget.value
                      )
                    );
                  }}
                />

                <InputGroup.Append>
                  <InputGroup.Text>Monthly</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </div>
          <div className="step-4-subscription-flex-data">
            <div className="step-4-subscription-content-sec">
              <h5>{t("yearly_subscription_fee")}</h5>
              <p>{t("payments_are_made_yearly_by_the_subscriber")}</p>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    {configuration.get("configData.is_only_wallet_payment") == 1
                      ? configuration.get("configData.token_symbol")
                      : configuration.get("configData.currency")}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Amount (to the nearest dollar)"
                  id="yearly_amount"
                  type="number"
                  step="any"
                  min="1"
                  placeholder=""
                  name="yearly_amount"
                  className="form-control edit-reset"
                  disabled={
                    localStorage.getItem("is_subscription_enabled") == 1
                      ? false
                      : true
                  }
                  defaultValue={
                    props.user.data.yearly_amount
                      ? props.user.data.yearly_amount
                      : 1
                  }
                  onChange={(event) => {
                    props.dispatch(
                      editUserDetails(
                        event.currentTarget.name,
                        event.currentTarget.value
                      )
                    );
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text>Yearly</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </div>
          <div className="edit-save">
            <Button
              className="save-btn"
              onClick={handleSubmit}
              disabled={props.profileInputData.buttonDisable}
            >
              {props.profileInputData.loadingButtonContent !== null
                ? props.profileInputData.loadingButtonContent
                : t("submit")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  profileInputData: state.users.profileInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(Step5));
