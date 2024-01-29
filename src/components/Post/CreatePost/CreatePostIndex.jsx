import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Form,
  Media,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  postFileUploadStart,
  savePostStart,
  postFileRemoveStart,
  fetchPostCategoriesStart,
} from "../../../store/actions/PostAction";

import { searchUserStart } from "../../../store/actions/HomeAction";

import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { translate, t } from "react-multi-lang";
// import ContentEditable from 'react-contenteditable'
// import { set } from "date-fns/esm";
import PostEditor from "../postMentions/PostEditor";
import { stateToHTML } from "draft-js-export-html";
import { Multiselect } from "multiselect-react-dropdown";
import ContentCreatorSteps from "./ContentCreatorSteps";
import axios from "axios";

const CreatePostIndex = (props) => {
  const [inputData, setInputData] = useState({});
  const [postFileData, setPostFileData] = useState([]);
  const [previewImage, setPreviewImage] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(false);

  const [paidPost, setPaidPost] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");

  const [fileUploadStatus, setFileUploadStatus] = useState(false);

  const [videoThumbnailStatus, setVideoThumbnailStatus] = useState(false);

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [disableImage, setDisableImage] = useState(false);

  const [disableVideo, setDisableVideo] = useState(false);

  const [videoThumbnail, setVideoThumbnail] = useState({
    videoPreviewImage: "",
  });

  const [audioTitle, setAudioTitle] = useState("");

  const [audioThumbnail, setAudioThumbnail] = useState(false);

  const [disableAudio, setDisableAudio] = useState(false);

  const [videoPreview, setVideoPreview] = useState({ previewVideo: "" });

  useEffect(() => {
    props.dispatch(fetchPostCategoriesStart());
  }, []);

  useEffect(() => {
    if (
      props.fileUpload.loading === false &&
      props.fileUpload.data.post_file.length > 0
    ) {
      let files = [];
      props.fileUpload.data.post_file.map((value, i) => {
        files.push(value.post_file);
      });
      setPostFileData(files);
      setInputData({
        ...inputData,
        post_file_id: props.fileUpload.data.post_file_id,
      });
    }
  }, [!props.fileUpload.loading]);

  useEffect(() => {
    if (props.fileRemove.loading === false) {
      let files = [];
      if (props.fileRemove.data.post_file.length > 0) {
        props.fileRemove.data.post_file.map((value, i) => {
          files.push(value);
        });
      } else {
        setFileUploadStatus(false);
        setDisableVideo(false);
        setDisableAudio(false);
        setPaidPost(false);
        setDisableImage(false);
        setPreviewImage(false);
        setVideoPreviewUrl(false);
        setVideoThumbnailStatus(false);
        setAudioThumbnail(false);
      }
      setInputData({
        ...inputData,
        post_file_id: props.fileRemove.data.post_file_id,
      });
      setPostFileData(files);
    }
  }, [!props.fileRemove.loading]);

  const handleChangeImage = (event, fileType) => {
    let data_array = [];

    [...event.target.files].forEach((file, key) => {
      let name = "file[" + key + "]";

      data_array[name] = file;
    });
    data_array["file_type"] = fileType;

    setPreviewImage(true);
    setFileUploadStatus(true);
    setPaidPost(true);
    setDisableVideo(true);
    setDisableAudio(true);
    props.dispatch(postFileUploadStart(data_array));
  };

  const handleChangeVideo = (event, fileType) => {
    let data_array = [];

    [...event.target.files].forEach((file, key) => {
      let name = "file[" + key + "]";

      data_array[name] = file;
    });

    data_array["file_type"] = fileType;

    setPaidPost(true);
    setFileUploadStatus(true);
    setVideoThumbnailStatus(true);
    setDisableImage(true);
    setDisableAudio(true);
    setVideoPreviewUrl(true);
    props.dispatch(postFileUploadStart(data_array));
  };

  const handleChangeAudio = (event, fileType) => {
    let data_array = [];

    [...event.target.files].forEach((file, key) => {
      let name = "file[" + key + "]";

      data_array[name] = file;
    });

    data_array["file_type"] = fileType;
    setFileUploadStatus(true);
    setPaidPost(true);
    setAudioThumbnail(true);
    setDisableImage(true);
    setDisableVideo(true);
    props.dispatch(postFileUploadStart(data_array));
  };

  const handleClose = (event, post_file) => {
    event.preventDefault();
    if (props.fileUpload.loadingButtonContent !== null) {
      const notificationMessage = getErrorNotificationMessage(
        t("file_being_uploaded")
      );
      props.dispatch(createNotification(notificationMessage));
    } else {
      setPostFileData([]);
      props.dispatch(
        postFileRemoveStart({
          file: post_file,
          // file_type: props.fileUpload.data.post_file.file_type,
          // blur_file: props.fileUpload.data.post_file.blur_file,
          post_file_id: inputData.post_file_id,
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileUploadStatus) {
      props.dispatch(
        savePostStart({
          content: editorHtmlContent,
          amount: inputData.amount ? inputData.amount : "",
          post_file_id: inputData.post_file_id ? inputData.post_file_id : "",
          preview_file: inputData.preview_file ? inputData.preview_file : "",
          category_ids: inputData.category_ids ? inputData.category_ids : [],
          video_preview_file: inputData.video_preview_file
            ? inputData.video_preview_file
            : "",
        })
      );
    } else {
      // props.dispatch(
      //   savePostStart({
      //     content: editorHtmlContent,
      //     amount: inputData.amount ? inputData.amount : "",
      //     category_ids: inputData.category_ids
      //       ? inputData.category_ids
      //       : [],
      //   })
      // );
      const notificationMessage = getErrorNotificationMessage(
        t("please_upload_media_files")
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };

  const setValues = (inputValue) => {
    let user_id_arr = [];
    inputValue.map((value, i) => {
      user_id_arr.push(value.category_id);
    });
    setInputData({
      ...inputData,
      category_ids: user_id_arr,
    });
  };

  const handleVideopreviewImage = (event) => {
    if (event.currentTarget.type === "file") {
      setFileUploadStatus(true);
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setVideoThumbnail({
          ...videoThumbnail,
          videoPreviewImage: reader.result,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setInputData({
        ...inputData,
        preview_file: file,
      });
    }
  };

  const handleVideoPreview = (event) => {
    if (event.currentTarget.type === "file") {
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setVideoPreview({ ...videoPreview, previewVideo: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setInputData({
        ...inputData,
        video_preview_file: file,
      });
    }
  };

  return (
    <div className="notification-page create-post" id="tabs">
      <Container>
        {localStorage.getItem("is_content_creator") == 2 ? (
          <div className="create-post-box">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={12} md={12}>
                  <div className="post-create-header">
                    <div className="pull-left">
                      <Link
                        className="bookmarkes-list notify-title"
                        to={"/home"}
                      >
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/back.svg"
                          }
                          className="svg-clone"
                        />
                        {t("new_post")}
                      </Link>
                    </div>
                    <div className="pull-right">
                      {localStorage.getItem("is_content_creator") == 2 ? (
                        <Button
                          type="submit"
                          className="btn gradient-btn postBtn gradientcolor text-uppercase mt-0 mt-md-3"
                          onClick={handleSubmit}
                          disabled={
                            props.fileUpload.buttonDisable ||
                            props.savePost.buttonDisable
                          }
                        >
                          {props.fileUpload.loadingButtonContent !== null
                            ? props.fileUpload.loadingButtonContent
                            : props.savePost.loadingButtonContent !== null
                            ? props.savePost.loadingButtonContent
                            : t("post")}
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="btn gradient-btn postBtn gradientcolor text-uppercase mt-0 mt-md-3"
                          disabled="true"
                        >
                          {t("post")}
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={12}>
                  {/* <div className="create-post-textarea">
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={t("new_post_placeholder")}
                    name="content"
                    style={{ width: "100%", maxWidth: "100%" }}
                    value={inputData.content ? inputData.content : null}
                    onChange={(event) =>
                      setInputData({
                        ...inputData,
                        content: event.currentTarget.value,
                      })
                    }
                  />
                </Form.Group>
              </div> */}
                  <div className="searchMentions">
                    <div className="PostEditor">
                      <PostEditor
                        className="PostEditor__input"
                        placeholder={t("new_post_placeholder")}
                        ref={mentionsRef}
                        getEditorRawContent={setEditorContentstate}
                        getEditorHtmlContent={setEditorHtmlContent}
                        dispatch={props.dispatch}
                        // searchUser={props.searchUser}
                      />
                    </div>
                  </div>
                </Col>

                <Col sm={12} md={6} className="mt-3 mt-lg-4">
                  {props.postCategories.data.post_categories &&
                  props.postCategories.data.post_categories.length > 0 ? (
                    <>
                      <Form.Group className="mb-0">
                        <Form.Label className="edit-input-label mb-3 mb-lg-3">
                          {t("category")} ({t("optional")})
                        </Form.Label>
                        {props.postCategories.data.post_categories ? (
                          <Multiselect
                            name="category_ids"
                            options={props.postCategories.data.post_categories}
                            displayValue="name"
                            avoidHighlightFirstOption="true"
                            placeholder={t("choose_category")}
                            onSelect={(values) => setValues(values)}
                          />
                        ) : null}
                      </Form.Group>
                    </>
                  ) : (
                    ""
                  )}

                  {paidPost == true ? (
                    <Form.Group className="md-mrg-btm mt-3 mt-lg-4">
                      <label className="text-muted m-1 mb-3 mb-lg-3">
                        {t("price")} ({t("optional")})
                      </label>
                      <Form.Control
                        type="number"
                        placeholder={t("price_placeholder")}
                        name="amount"
                        pattern="[0-9]*"
                        min="1"
                        inputmode="numeric"
                        value={inputData.amount}
                        width="50%"
                        onChange={(event) =>
                          setInputData({
                            ...inputData,
                            amount: event.currentTarget.value,
                          })
                        }
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}
                  {videoThumbnailStatus === true ? (
                    <>
                      <Form.Group className="md-mrg-btm mb-3 mb-lg-3">
                        <label className="text-muted m-1 mt-3 f-12 text-uppercase mb-3 mb-lg-3">
                          {t("upload_video_thumbnail")}:({t("optional")})
                        </label>
                        <Form.Control
                          style={{ display: "block" }}
                          type="file"
                          placeholder={t("upload_video_thumbnail_placeholder")}
                          name="preview_file"
                          width="50%"
                          className="form-control"
                          accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
                          onChange={(event) => handleVideopreviewImage(event)}
                        />
                      </Form.Group>
                      {videoThumbnail.videoPreviewImage !== "" ? (
                        <Row>
                          <Col sm={12} md={6} className="mb-3 mb-lg-4">
                            <div className="post-img-preview-sec m-0">
                              <Image
                                alt="#"
                                src={videoThumbnail.videoPreviewImage}
                                className="post-video-preview"
                              />
                            </div>
                          </Col>
                        </Row>
                      ) : null}
                    </>
                  ) : (
                    ""
                  )}
                  {videoThumbnailStatus === true && inputData.amount > 0 ? (
                    <>
                      <Form.Group className="md-mrg-btm mb-3 mb-lg-3">
                        <label className="text-muted m-1 mt-3 f-12 text-uppercase mb-3 mb-lg-3">
                          {t("upload_post_preview")}
                        </label>
                        <Form.Control
                          style={{ display: "block" }}
                          type="file"
                          placeholder={t("upload_post_preview_placeholder")}
                          name="preview_file"
                          width="50%"
                          className="form-control"
                          accept="video/mp4,video/x-m4v,video/*"
                          onChange={(event) => handleVideoPreview(event)}
                        />
                      </Form.Group>
                      {videoPreview.previewVideo !== "" ? (
                        <Row>
                          <Col sm={12} md={6} className="mb-3 mb-lg-4">
                            <div className="post-img-preview-sec m-0">
                              <div className="post-img-preview-sec my-3 my-lg-4">
                                <video
                                  autoplay
                                  controls
                                  id="myVideo"
                                  className="user-profile1 w-100"
                                >
                                  <source
                                    src={videoPreview.previewVideo}
                                    type="video/mp4"
                                  />
                                </video>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : null}
                    </>
                  ) : (
                    ""
                  )}
                </Col>

                <Col sm={12} md={6} className="mt-3 mt-lg-4">
                  {localStorage.getItem("is_content_creator") == 2 ? (
                    <div className="left-half post-write">
                      <Button>
                        <Form.Group className="mb-0">
                          <Form.Control
                            id="fileupload_photo"
                            type="file"
                            multiple="multiple"
                            disabled={disableImage ? true : false}
                            accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
                            onChange={(event) =>
                              handleChangeImage(event, "image")
                            }
                            name="post_files"
                          />
                          <Form.Label
                            id="attach_file_photo"
                            for="fileupload_photo"
                            className="chat-attach_file"
                            data-original-title="null"
                          >
                            {/* <Image
                          src="assets/images/icons/gallery.svg"
                          className="svg-clone"
                        /> */}
                            <Image
                              src="assets/images/post/post-image-upload.svg"
                              className="svg-clone"
                            />
                          </Form.Label>
                        </Form.Group>
                      </Button>
                      <Button>
                        <Form.Group
                          className="mb-0"
                          controlId="formFileDisabled"
                        >
                          <Form.Control
                            id="fileupload_video"
                            type="file"
                            multiple="multiple"
                            disabled={disableVideo ? true : false}
                            accept="video/mp4,video/x-m4v,video/*"
                            onChange={(event) =>
                              handleChangeVideo(event, "video")
                            }
                            name="post_files"
                          />
                          <Form.Label
                            id="attach_file_video"
                            for="fileupload_video"
                            className="chat-attach_file"
                            data-original-title="null"
                          >
                            {/* <Image
                          src="assets/images/icons/video.svg"
                          className="svg-clone"
                        /> */}
                            <Image
                              src="assets/images/post/post-video-upload.svg"
                              className="svg-clone video-add-icon"
                            />
                          </Form.Label>
                        </Form.Group>
                      </Button>
                      {videoTitle !== "" ? (
                        <div className="post-title-content create-post-video-title">
                          <h4>{videoTitle}</h4>
                        </div>
                      ) : null}
                      <Button>
                        <Form.Group
                          className="mb-0"
                          controlId="formFileDisabled"
                        >
                          <Form.Control
                            id="fileupload_audio"
                            type="file"
                            multiple="multiple"
                            disabled={disableAudio ? true : false}
                            accept="audio/mp3,audio/*"
                            onChange={(event) =>
                              handleChangeAudio(event, "audio")
                            }
                            name="post_files"
                          />
                          <Form.Label
                            id="attach_file_audio"
                            for="fileupload_audio"
                            className="chat-attach_file"
                            data-original-title="null"
                          >
                            {/* <Image
                          src="assets/images/icons/audio.svg"
                          className="svg-clone"
                        /> */}
                            <Image
                              src="assets/images/post/post-audio-upload.svg"
                              className="svg-clone"
                            />
                          </Form.Label>
                        </Form.Group>
                      </Button>
                      {audioTitle !== "" ? (
                        <div className="post-title-content create-post-video-title">
                          <h4>{audioTitle}</h4>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    ""
                  )}
                  {previewImage && postFileData ? (
                    <Row>
                      {postFileData.map((image, index) => (
                        <Col sm={12} md={6}>
                          <div className="post-img-preview-sec">
                            <Link
                              to="#"
                              onClick={(event) => handleClose(event, image)}
                            >
                              <i className="far fa-times-circle"></i>
                            </Link>
                            <Image
                              alt="#"
                              src={image}
                              className="post-video-preview"
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ) : null}
                  {videoPreviewUrl && postFileData ? (
                    <Row>
                      {postFileData.map((video, index) => (
                        <Col sm={12} md={12}>
                          <div
                            key={index}
                            className="post-img-preview-sec my-3 my-lg-4"
                          >
                            <video
                              autoplay
                              controls
                              id="myVideo"
                              className="user-profile1 create-post-video"
                            >
                              <source src={video} type="video/mp4" />
                            </video>
                            <Link
                              to="#"
                              onClick={(event) => handleClose(event, video)}
                              className="close-video"
                            >
                              <i className="far fa-window-close"></i>
                            </Link>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ) : null}
                  {audioThumbnail && postFileData ? (
                    <Row>
                      {postFileData.map((audio, index) => (
                        <Col sm={12} md={12}>
                          <div className="post-img-preview-sec">
                            <audio
                              controls
                              id="myVideo"
                              className="user-profile1"
                            >
                              <source src={audio} type="audio/mp3" />
                            </audio>
                            <Link
                              to="#"
                              onClick={(event) => handleClose(event, audio)}
                              className="close-audio"
                            >
                              <i className="far fa-window-close"></i>
                            </Link>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ) : null}
                </Col>
              </Row>
            </Form>
          </div>
        ) : (
          ""
        )}{" "}
      </Container>
      {localStorage.getItem("is_content_creator") != 2 && (
        <ContentCreatorSteps />
      )}
    </div>
  );
};

const mapStateToPros = (state) => ({
  savePost: state.post.savePost,
  fileUpload: state.post.fileUpload,
  fileRemove: state.post.fileRemove,
  searchUser: state.home.searchUser,
  postCategories: state.post.postCategories,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(CreatePostIndex));
