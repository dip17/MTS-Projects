import React, { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  chatAssetFileUploadStart,
  uploadAssetDetails,
} from "../../store/actions/ChatAssetAction";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";

const ChatAssetModal = (props) => {
  const [chatAssetInputData, setChatAssetInputData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(chatAssetInputData).length > 0 && chatAssetInputData.file) {
      props.dispatch(
        chatAssetFileUploadStart({
          from_user_id: localStorage.getItem("userId"),
          to_user_id: props.toUserId,
          file_type: props.fileType,
          message: chatAssetInputData.message ? chatAssetInputData.message : "",
          amount: chatAssetInputData.amount ? chatAssetInputData.amount : "",
          file: chatAssetInputData.file ? chatAssetInputData.file : "",
        })
      );
    } else {
      alert(t("please_upload_image_and_try_again"));
    }
    setChatAssetInputData({
      ...chatAssetInputData,
      file: '',
      message: '',
      amount: '',
    });
    setImage({ ...image, title: '', picture: '' });
    props.closeChatAssetUploadModal();
  };

  const [image, setImage] = useState({
    picture: "",
  });

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      setChatAssetInputData({
        ...chatAssetInputData,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      setImage({ ...image, title: event.currentTarget.files[0].name });
      reader.onloadend = () => {
        if (props.fileType == 'image') {
          setImage({ ...image, picture: reader.result });
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      <Modal
        className={`modal-dialog-center sent-tip-modal 
                ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
          }`}
        size="md"
        centered
        show={props.chatAssetUpload}
        onHide={props.closeChatAssetUploadModal}
      >
        {props.chatAssetUpload === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Upload {props.fileType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="floating-form">
                <div className="floating-label mb-5 chat-upload-sec">
                  <Button className="upload-chat-btn">
                    <Form.Group className="mb-0">
                      <Form.Control
                        id="fileupload_photo"
                        type="file"
                        accept={
                          props.fileType == "image" ? "image/*" : props.fileType == "video" ? "video/*" : "audio/*"
                        }
                        onChange={(event) => handleChangeImage(event)}
                        name="file"
                      />
                      <Form.Label
                        id="attach_file_photo"
                        for="fileupload_photo"
                        className="chat-attach_file"
                        data-original-title="null"
                      >
                        {t("upload")} {props.fileType}
                      </Form.Label>
                    </Form.Group>
                  </Button>
                  {image.picture !== "" ? <Image src={image.picture} /> : null}
                  <div><h4>{image.title}</h4></div>

                </div>
                <div className="floating-label mb-5">
                  <input
                    className="floating-input"
                    type="text"
                    name="message"
                    placeholder={t("message_optional")}
                    value={
                      chatAssetInputData.message
                        ? chatAssetInputData.message
                        : null
                    }
                    onChange={(event) =>
                      setChatAssetInputData({
                        ...chatAssetInputData,
                        message: event.currentTarget.value,
                      })
                    }
                  />
                  <span className="highlight"></span>
                  <label className="default-label">{t("message")} ({t("optional")})</label>
                </div>
                <div className="floating-label mb-5">
                  <input
                    className="floating-input"
                    type="number"
                    min="1"
                    step="any"
                    name="amount"
                    value={
                      chatAssetInputData.amount
                        ? chatAssetInputData.amount
                        : null
                    }
                    onChange={(event) =>
                      setChatAssetInputData({
                        ...chatAssetInputData,
                        amount: event.currentTarget.value,
                      })
                    }
                  />
                  <span className="highlight"></span>
                  <label className="default-label">{configuration.get("configData.is_only_wallet_payment") == 1 ? t('ppv_token') : t('ppv_amount')}</label>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closeChatAssetUploadModal}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                {t("send")}
              </Button>
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  chatAssetInputData: state.chatAsset.chatAssetInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ChatAssetModal));