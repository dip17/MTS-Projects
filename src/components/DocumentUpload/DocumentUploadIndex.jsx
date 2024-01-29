import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  FormGroup,
} from "react-bootstrap";
import "./DocumentUploadIndex.css";
import { connect } from "react-redux";
import {
  addKycDocumentStart,
  getKycDocumentStart,
} from "../../store/actions/KycDocumentAction";

import NoDataFound from "../NoDataFound/NoDataFound";
import DocumentUploadLoader from "../Loader/DocumentUploadLoader";
import { translate, t } from "react-multi-lang";

const DocumentUploadIndex = (props) => {
  useEffect(() => {
    props.dispatch(getKycDocumentStart());
  }, []);

  const [inputData, setInputData] = useState({});

  const [image, setImage] = useState({});

  const [uploadDocumentID, setUploadDocumentID] = useState(null);

  

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
      <div className="document-upload-sec">
        <Container>
          <Row>
            <Col sm={12} md={12} xl={8}>
              <Link
                className="bookmarkes-list notify-title back-button head-title"
                onClick={() => props.history.goBack()}
              >
                <img
                  src={window.location.origin + "/assets/images/icons/back.svg"}
                  className="svg-clone"
                />
                <h3 className="ml-2 mb-0">{t("upload_your_documents")}</h3>
              </Link>
            </Col>
          </Row>
          {props.kycDocDetails.loading ? (
            ""
          ) : (
            <>
              <h3 className="mb-10 text-info">
                {props.kycDocDetails.data.document_status_text_formatted}
              </h3>
            </>
          )}

          {props.kycDocDetails.loading ? (
            <DocumentUploadLoader></DocumentUploadLoader>
          ) : props.kycDocDetails.data.documents.length > 0 ? (
            props.kycDocDetails.data.documents.map((doc) => (
              <>
                <div className="document-card">
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="sub-heading">
                        <h4>{doc.name}</h4>
                        <p>{doc.description}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {doc.is_delete_edit_option ? (
                      <Col sm={12} md={6} xl={6} className="resp-mrg-btn-xs">
                        <div className="document-upload-box">
                          <Image src={doc.picture} className="doc-upload-img" />
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                    <Col sm={12} md={6} xl={6}>
                      <FormGroup>
                        {doc.is_delete_edit_option ? (
                          <Form.File
                            type="file"
                            id={doc.document_id}
                            name={doc.document_id}
                            onChange={(event) => handleChangeImage(event, doc)}
                            accept="image/*"
                          />
                        ) : null}
                        <Form.Label
                          htmlFor={doc.document_id}
                          className="document-upload-box-1"
                        >
                          
                            <Image
                      className="doc-upload-img-1"
                      src={
                        image[doc.document_id] !== undefined
                          ? image[doc.document_id]
                          : doc.user_document.document_file !== undefined
                          ? doc.user_document.document_file
                          : doc.picture
                      }
                    />

                           
                          <br></br>
                          <p className="document-desc">
                            {doc.is_delete_edit_option
                              ? t("click_here_to_upload")
                              : null}
                          </p>
                        </Form.Label>
                      </FormGroup>
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
                  ) : (
                    ""
                  )}
                </div>
                <div className="space-mg"></div>
              </>
            ))
          ) : (
            <NoDataFound></NoDataFound>
          )}
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

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(DocumentUploadIndex));
