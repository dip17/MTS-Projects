import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import api from "../../Environment";
import { connect } from "react-redux";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../helper/NotificationMessage";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { translate, t } from "react-multi-lang";

class AddCardSec extends Component {
  state = {
    addCardLoadingContent: null,
    addCardButtonDisable: false,
  };

  addCard = (ev) => {
    ev.preventDefault();
    this.setState({
      addCardLoadingContent: "Please wait... Request processing...",
      addCardButtonDisable: true,
    });
    if (this.props.stripe) {
      this.props.stripe
        .createToken({ type: "card", name: localStorage.getItem("username") })
        .then((payload) => {
          const inputData = {
            card_token: payload.token.id,
          };
          api
            .postMethod("cards_add", inputData)
            .then((response) => {
              if (response.data.success) {
                const notificationMessage = getSuccessNotificationMessage(
                  response.data.message
                );
                this.props.dispatch(createNotification(notificationMessage));
                this.props.dispatch(fetchCardDetailsStart());
                this.setState({
                  addCardLoadingContent: null,
                  addCardButtonDisable: false,
                });
                this.props.cardAddedStatusChange();
              } else {
                const notificationMessage = getErrorNotificationMessage(
                  response.data.error
                );
                this.props.dispatch(createNotification(notificationMessage));
              }
            })
            .catch((error) => {
              this.setState({
                addCardLoadingContent: null,
                addCardButtonDisable: false,
              });
              const notificationMessage = getErrorNotificationMessage(
               t("error_please_try_again")
              );
              this.props.dispatch(createNotification(notificationMessage));
            });
        })
        .catch((error) => {
          this.setState({
            addCardLoadingContent: null,
            addCardButtonDisable: false,
          });

          const notificationMessage = getErrorNotificationMessage(
           t("please_check_your_card_details_and_try_again")
          );
          this.props.dispatch(createNotification(notificationMessage));
        });
    } else {
      this.setState({
        addCardLoadingContent: null,
        addCardButtonDisable: false,
      });
      const notificationMessage = getErrorNotificationMessage(
       t("stripe_is_not_configured")
      );
      this.props.dispatch(createNotification(notificationMessage));
    }
  };
  render() {
    const { addCardLoadingContent, addCardButtonDisable } = this.state;
    return (
      <div className="modal-body sm-padding">
        <h4 className="title">{t("add_card")}</h4>

        <div className="form-group">
          <CardElement />
        </div>

        <div className="form-group">
          <button
            className="btn btn-group"
            type="submit"
            onClick={this.addCard}
            disabled={addCardButtonDisable}
          >
            {addCardLoadingContent != null ? addCardLoadingContent : t("submit")}
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(injectStripe(translate(AddCardSec)));
