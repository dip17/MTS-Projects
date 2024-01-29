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
import { Link } from "react-router-dom";
import "./BecomeAContentCreator.css";
import { createNotification } from "react-redux-notify";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const Step6 = (props) => {
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
    } else if (props.user.data.content_creator_step === 3) {
      const notificationMessage = getErrorNotificationMessage(
        t("update_subscription_message")
      );
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(4);
    } else if (props.user.data.is_content_creator != 2) {
      const notificationMessage = getErrorNotificationMessage(
        t("content_creator_by_admin")
      );
      props.dispatch(createNotification(notificationMessage));
      props.jumpToStep(4);
    }
  }, []);

  return (
    <>
      <div className="payout-competed">
        <Row className="justify-content-md-center">
          <Col md={4}>
            <h4>Congratulations</h4>
            <div className="payout-competed-img-sec">
              <Image
                className="payout-competed-img"
                src={
                  window.location.origin + "/assets/images/congratulation.svg"
                }
              />
            </div>
            <p>
              {t('congratulations_you_are_now_a_creator')}{" "}
              <Link to="/dashboard">{t('dashboard')}</Link> {t('page_to_edit_your_settings')}.
            </p>
          </Col>
        </Row>
      </div>
      <Button className="finish-button">{t('finish')}</Button>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(Step6));
