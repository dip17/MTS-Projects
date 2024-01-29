import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Image, Modal, Tab, Row, Col, Nav, FormCheck, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { chatAssetFilesUploadStart } from "../../store/actions/ChatAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const NewChatUploadModal = (props) => {
  const initialData = {
    msgAmount: 0,
    fileType: "image",
    accepted: "image/*",
    typeText: "Images",
    chatAssets: []
  };

  const [skipRender, setSkipRender] = useState(true);
  const [triggeredOnce, setTriggeredOnce] = useState(false);
  const [chatMessage, setChatMessage] = useState(initialData);
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPointer, setCursorPointer] = useState(0);

  const messageField = useRef();


  useEffect(() => {
    if (!skipRender) {
      messageField.current.selectionEnd = cursorPointer;
    }
  }, [cursorPointer]);

  useEffect(() => {
    if (!skipRender && triggeredOnce && !props.chatFilesUpload.loading && Object.keys(props.chatFilesUpload.data).length > 0) {
      setChatMessage({
        ...chatMessage,
        chatAssets: [...chatMessage.chatAssets, ...props.chatFilesUpload.data.chat_asset],
      })
    }
    setSkipRender(false);
  }, [props.chatFilesUpload]);

  const handleFileSelect = e => {
    let files = {};
    if (e.target.files.length > 0) {
      [...e.target.files].forEach((file, key) => {
        let name = 'file[' + key + ']';
        files = { ...files, [name]: file }
      });
      setTriggeredOnce(true);
      props.dispatch(chatAssetFilesUploadStart({
        from_user_id: props.profile.data.user_id,
        to_user_id: props.selectedUser.user_id,
        file_type: chatMessage.fileType,
        ...files,
      }));
      e.target.value = null;
    }
  }

  const removeMedia = chatAssetId => {
    setChatMessage({
      ...chatMessage,
      chatAssets: chatMessage.chatAssets.filter(asset => asset.chat_asset_id !== chatAssetId),
    });
  }

  const handleToggleEmojis = () => {
    messageField.current.focus();
    setShowEmojis(!showEmojis);
  }

  const onEmojiPick = (data) => {
    const ref = messageField.current;
    ref.focus();
    const start = props.message.substring(0, ref.selectionStart);
    const end = props.message.substring(ref.selectionStart);
    const text = start + data.native + end;
    props.setMessage(text);
    setCursorPointer(start.length + data.native.length);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!props.chatFilesUpload.buttonDisable) {
      props.handleMessageSubmit({
        ...chatMessage,
        msgAmount: parseInt(chatMessage.msgAmount)
      });
    }
  }

  return (
    <>
      <Modal
        className="modal-dialog-center chat-upload-modal"
        size="md"
        centered
        show={props.newChatUpload}
        onHide={props.closeNewChatUploadModal}
      >
        <Button className="modal-close" onClick={() => props.closeNewChatUploadModal()}>
          <Image
            className="close-icon"
            src={
              window.location.origin + "/assets/images/new-chat/modal-close.svg"
            }
          />
        </Button>
        <Modal.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="images">
            <Row>
              <Col sm={12}>
                <Nav variant="pills">
                  <Nav.Item>
                    <Link
                      to="#"
                      className={`nav-link ${chatMessage.fileType === "image" ? "active" : ""}`}
                      onClick={e => chatMessage.chatAssets.length > 0 ? e.preventDefault()
                        : setChatMessage({
                          ...initialData,
                          fileType: "image",
                          accepted: "image/*",
                          typeText: "Images",
                        })}
                    >{t("images")}</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link
                      to="#"
                      disabled={chatMessage.chatAssets.length > 0}
                      className={`nav-link ${chatMessage.fileType === "video" ? "active" : ""}`}
                      onClick={e => chatMessage.chatAssets.length > 0 ? e.preventDefault()
                        : setChatMessage({
                          ...initialData,
                          fileType: "video",
                          accepted: "video/*",
                          typeText: "Videos",
                        })}
                    >{t("videos")}</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link
                      to="#"
                      disabled={chatMessage.chatAssets.length > 0}
                      className={`nav-link ${chatMessage.fileType === "audio" ? "active" : ""}`}
                      onClick={e => chatMessage.chatAssets.length > 0 ? e.preventDefault()
                        : setChatMessage({
                          ...initialData,
                          fileType: "audio",
                          accepted: "audio/*",
                          typeText: "Audio",
                        })}
                    >{t("audio")}</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link
                      to="#"
                      disabled={chatMessage.chatAssets.length > 0}
                      className={`nav-link ${chatMessage.fileType === "document" ? "active" : ""}`}
                      onClick={e => chatMessage.chatAssets.length > 0 ? e.preventDefault()
                        : setChatMessage({
                          ...initialData,
                          fileType: "document",
                          accepted: `.txt, .csv, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .pdf`,
                          typeText: "Documents",
                        })}
                    >{t("documents")}</Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>

                <div className="upload-multiple-img-preview">
                  <div className="upload-multiple-img-box">
                    {chatMessage.chatAssets.map((asset, i) =>
                      <div className="upload-multiple-img-card">
                        <Image
                          className="image-preview-select-img"
                          src={chatMessage.fileType === "image" ? asset.asset_file : asset.blur_file}
                        />
                        <div className="upload-multiple-img-close">
                          <Button className="icon-close-img" onClick={e => {
                            window.confirm(t("asset_remove_msg"))
                              ? removeMedia(asset.chat_asset_id)
                              : e.preventDefault();
                          }}>
                            <Image
                              className="close-icon"
                              src={
                                window.location.origin + "/assets/images/new-chat/modal-close.svg"
                              }
                            />
                          </Button>
                        </div>
                        {asset.file_type === "document" ?
                          <div className="upload-multiple-file-name">
                            {asset.file_name}
                          </div>
                          : null
                        }
                      </div>
                    )}
                  </div>
                  <div className="upload-add-img-sec">
                    <div className="upload-btn-wrapper">
                      <button
                        className="btn"
                        disabled={props.chatFilesUpload.buttonDisable && triggeredOnce}
                      >
                        <span>
                          <Image
                            className="upload-icon"
                            src={
                              window.location.origin + "/assets/images/new-chat/upload.svg"
                            }
                          />
                        </span>
                        {props.chatFilesUpload.loadingButtonContent && triggeredOnce ?
                          props.chatFilesUpload.loadingButtonContent
                          : `Add ${chatMessage.typeText}`
                        }
                      </button>
                      <input
                        type="file"
                        accept={`${chatMessage.accepted}`}
                        name="myfile"
                        onChange={handleFileSelect}
                        multiple={true}
                      />
                    </div>
                  </div>
                </div>
                {chatMessage.chatAssets.length > 0 ?
                  <Form className="upload-amount-form-sec">
                    <div className="upload-amount-form">
                      <Form.Group controlId="formBasicEmail" className="mb-0">
                        <Form.Label>{t("set_tokens")}</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="0"
                          value={chatMessage.msgAmount}
                          onChange={e => {
                            if ((e.target.value >= 0 || e.target.value == "") &&
                              e.target.value.replace("-", "") == e.target.value) {
                              setChatMessage({
                                ...chatMessage,
                                msgAmount: e.target.value,
                              })
                            } else { e.preventDefault() }
                          }}
                          onKeyPress={e => {
                            if (e.key === "-")
                              e.preventDefault();
                          }}
                        />
                      </Form.Group>
                    </div>
                    <div className="upload-desc-input-sec">
                      <div className="upload-desc-form">
                        <div className={`emoji-container ${showEmojis ? "show" : "hide"}`}>
                          <Picker data={data} onEmojiSelect={onEmojiPick} onClickOutside={() => {
                            console.log("Outside triggered");
                            if (showEmojis)
                              setShowEmojis(false);
                          }} />
                        </div>
                        <InputGroup className="mb-0">
                          <InputGroup.Text onClick={() => handleToggleEmojis()}>
                            <Image
                              className="new-feed-wishlist-icon"
                              src={
                                window.location.origin + "/assets/images/feed-story/comments-emoji.svg"
                              }
                            />
                          </InputGroup.Text>
                          <Form.Control
                            ref={messageField}
                            placeholder={t("type_something")}
                            value={props.message}
                            onChange={e => props.setMessage(e.target.value)}
                            onKeyPress={e => {
                              if (e.key === "Enter")
                                handleSubmit(e);
                            }}
                          />
                          <InputGroup.Text onClick={handleSubmit} >
                            <Image
                              className="new-feed-wishlist-icon"
                              src={
                                window.location.origin + "/assets/images/feed-story/comments-send.svg"
                              }
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                    </div>
                  </Form>
                  : null
                }
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  chatFilesUpload: state.chat.chatFilesUpload,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewChatUploadModal));