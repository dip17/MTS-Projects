import React, { useState, useEffect } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchReportReasonStart,
  saveReportPostStart,
} from "../../store/actions/PostAction";
import { translate, t } from "react-multi-lang";

const ReportModeModal = (props) => {

  const [reportReason, setReportReason] = useState('');

  useEffect(() => {
    if (props.reportMode === true) {
      props.dispatch(fetchReportReasonStart());
    }

  }, [props.reportMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(saveReportPostStart({ post_id: props.post.post_id, report_reason_id: reportReason, }));
    props.closeReportModeModal();
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <Modal
        className={`modal-dialog-center report-modal 
          ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.reportMode}
        onHide={props.closeReportModeModal}
      >
        {props.reportMode === true ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t("report_post")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="report-form">
                <Form>
                  {props.reportReason.loading ? t("loading") :
                    props.reportReason.data.report_reason.length > 0 ?
                      props.reportReason.data.report_reason.map((report_content) => (
                        <Form.Group>
                          <Form.Check
                            type="radio"
                            id={report_content.report_reason_id}
                            value={report_content.report_reason_id}
                            label={report_content.title}
                            name="report_content"
                            custom
                            onClick={() => setReportReason(report_content.report_reason_id)}
                          />
                        </Form.Group>
                      )) : null}
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-normal"
                onClick={props.closeReportModeModal}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="btn btn-theme"
                onClick={handleSubmit}
                disabled={props.reportReason.buttonDisable}
              >
                {props.saveReportPost.loadingButtonContent !== null
                  ? props.saveReportPost.loadingButtonContent
                  : t("report")}
              </Button>
            </Modal.Footer>
          </>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  reportReason: state.post.reportReason,
  saveReportPost: state.post.saveReportPost,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(ReportModeModal));
