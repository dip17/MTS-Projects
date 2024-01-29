import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Media, Form, InputGroup, FormControl } from "react-bootstrap";
import "./BecomeAContentCreator.css";
import { createNotification } from "react-redux-notify";
import {
  getErrorNotificationMessage,
} from "../helper/NotificationMessage";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const Step2 = (props) => {

	useEffect(() => {
		if (props.user.data.content_creator_step === 0) {
			const notificationMessage = getErrorNotificationMessage(t('upload_doc_message'));
			props.dispatch(createNotification(notificationMessage));
			props.jumpToStep(0);
		}
  }, []);

	return (
		<>
			<div className="step-2-content-sec">
					<div className="step-2-info">
							<h4>{t('conditions')}</h4>
							<p>{t('here_are_some_important_points_about_your_account')}</p>
					</div>
					<div className="step-2-footer-sec">
							<p>{t('if_you_are_reading_this_page')}</p>
					</div>
			</div>
		</>
	);
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(Step2));
