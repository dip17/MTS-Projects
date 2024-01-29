import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Media, Form, InputGroup, FormControl } from "react-bootstrap";
import "./BecomeAContentCreator.css";
import { createNotification } from "react-redux-notify";
import {
  getErrorNotificationMessage,
} from "../helper/NotificationMessage";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const Step3 = (props) => {

	useEffect(() => {
		if (props.user.data.content_creator_step === 0) {
			const notificationMessage = getErrorNotificationMessage(t('upload_doc_message'));
			props.dispatch(createNotification(notificationMessage));
			props.jumpToStep(0);
		}
  }, []);

	return (
		<>
			<div className="pending-validation-sec">
				<Row>
						<Col md={4}>
								<Image
										className="pending-validation-img"
										src={
												window.location.origin + "/assets/images/pending-approval.svg"
										}
								/>
						</Col>
						<Col md={8}>
								<div className="pending-validation-info">
										<h5>{t('your_request_is_pending_validation')}</h5>
										<p>{t('you_will_be_notified_when_it_is_processed')}</p>
								</div>
						</Col>
				</Row>
			</div>
		</>
	);
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(Step3));
