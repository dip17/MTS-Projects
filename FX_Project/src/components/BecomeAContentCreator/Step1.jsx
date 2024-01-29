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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addKycDocumentStart,
  getKycDocumentStart,
} from "../../store/actions/KycDocumentAction";
import NoDataFound from "../NoDataFound/NoDataFound";
import DocumentUploadLoader from "../Loader/DocumentUploadLoader";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";

const Step1 = (props) => {
  const [image, setImage] = useState({});

  const [inputData, setInputData] = useState({});

  const [uploadDocumentID, setUploadDocumentID] = useState(null);

  useEffect(() => {
    props.dispatch(getKycDocumentStart());
  }, []);

  const handleChangeImage = (event, doc) => {
    if (event.currentTarget.type === "file") {
      setInputData({
        ...inputData,
        document_file: event.currentTarget.files[0],
        document_id: doc.document_id,
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      reader.onloadend = () => {
        setImage({ ...image, [doc.document_id]: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event, doc) => {
    event.preventDefault();
    setUploadDocumentID(doc.document_id);
    props.dispatch(addKycDocumentStart(inputData));
  };

  return (
    <>
      <div className="become-content-creator-sec">
				<Container>
					<div className="become-content-creator-box">

      <div className="step-1-content-sec">
        <div className="step-1-head">
          <h4>{t("account_certification")}</h4>
          <p>{t("to_verify_your_identity")}</p>
        </div>
        <div className="step-1-note-sec">
          <Row>
            <Col md={4}>
              <div className="step-1-note-img-sec">
                <Image
                  className="step-1-note-img"
                  src={
                    window.location.origin + "/assets/images/content-upload.svg"
                  }
                />
              </div>
            </Col>
            <Col md={8}>
              <div className="step-1-note-info">
                <p>
                  <i className="fas fa-angle-double-right mr-2"></i>
                  {t("a_photo_of_your_id_card")}
                </p>
                <p>
                  <i className="fas fa-angle-double-right mr-2"></i>
                  {t("a_photo_of_you_holdingthe_id_card")}
                </p>
                <p>
                  <i className="fas fa-angle-double-left"></i>
                  <span>
                    {" "}
                    {configuration.get("configData.site_name")}{" "}
                    <i className="fas fa-angle-double-right"></i>
                    {t("your_username_and_the_date_of_the_day")}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
        {props.kycDocDetails.loading ? (
          <DocumentUploadLoader></DocumentUploadLoader>
        ) : props?.kycDocDetails?.data?.documents?.length > 0 ? (
          props?.kycDocDetails?.data.documents?.map((doc) => (
            <div className="step-1-upload-id-sec">
              <div className="step-1-flex-data">
                <div className="upload-btn-wrapper">
                  {doc.is_delete_edit_option ? (
                    <Button className="btn outline-custom">
                      <i className="fas fa-upload mr-3"></i>
                      {t("choose_document", { docName: doc.name })}
                    </Button>
                  ) : null}
                  <input
                    type="file"
                    name={doc.document_id}
                    accept="image/*"
                    onChange={(event) => handleChangeImage(event, doc)}
                  />
                </div>
                <p>
                  {t("a_scan_or_photo_of_your_document", { docName: doc.name })}
                </p>
              </div>
              <p className="note-desc">{t("max_upload_size")}</p>

              <Row>
                <Col md={3}>
                  <div className="step-1-upload-preview-img-sec">
                    <Image
                      className="step-1-upload-preview-img"
                      src={
                        image[doc.document_id] !== undefined
                          ? image[doc.document_id]
                          : doc.user_document.document_file !== undefined
                          ? doc.user_document.document_file
                          : doc.picture
                      }
                    />
                  </div>
                </Col>
              </Row>
              {doc.is_delete_edit_option ? (
                <Row>
                  <Col sm={12} md={12}>
                    <Button
                      className="receive-btn-blue"
                      onClick={(event) => handleSubmit(event, doc)}
                      disabled={doc.is_delete_edit_option ? false : true}
                    >
                      {uploadDocumentID === doc.document_id
                        ? props.addKycDocInput.loadingButtonContent
                        : t("send_for_approval")}
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </div>
          ))
        ) : (
          <NoDataFound></NoDataFound>
        )}
        <div className="step-1-footer-sec">
          <p>
            {t("by_clicking_the_next_button_you_accept_the")}{" "}
            <Link to="/page/terms" target="_blank">
              {" "}
              {t("general_terms_and_conditions_of_use")}{" "}
            </Link>{" "}
            {t("of_the")} {configuration.get("configData.site_name")}.
          </p>
        </div>
      </div>
      </div>
				</Container>
			</div>
    </>
  );
};

const mapStateToPros = (state) => ({
  kycDocDetails: state.kycDocument.kycDocDetails,
  addKycDocInput: state.kycDocument.addKycDocInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(Step1));
