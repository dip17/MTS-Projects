import React, { useState } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { storyFileUploadStart } from "../../store/actions/StoriesAction";
import { useEffect } from "react";

const $ = window.$;

const StoryUploadModal = (props) => {
  const [fileData, setFileData] = useState({
    previewImage: "",
    file: "",
    file_type: "",
  });

  useEffect(() => {
    if (!props.storyUpload.loading) {
      $("#addStoryModal").modal("hide");
      setFileData({
        previewImage: "",
        file: "",
        file_type: "",
      });
    }
  }, [props.storyUpload.data]);

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      reader.onloadend = () => {
        setFileData({
          ...fileData,
          previewImage: reader.result,
          file: file,
          file_type: file.type.match("image") ? "image" : "video",
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileUpload = () => {
    props.dispatch(
      storyFileUploadStart({
        file: fileData.file,
        file_type: fileData.file_type,
      })
    );
  };

  return (
    <>
      <div
        className={`modal custom-modal fade`}
        id="addStoryModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addStoryModal"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h3 className="modal-title">{t("add_story")}</h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <b>{t("note")}</b>
                {t("story_file_format_note")}
              </p>
              <div className="story-upload-file">
                {fileData.previewImage != "" ? (
                  fileData.file_type == "image" ? (
                    <img src={fileData.previewImage} alt="" />
                  ) : (
                    <video
                      autoplay
                      controls
                      id="myVideo"
                      className="user-profile1 w-100"
                    >
                      <source src={fileData.previewImage} type="video/mp4" />
                    </video>
                  )
                ) : null}
              </div>
              {fileData.previewImage != "" ? (
                <div className="upload-button-wrapper">
                  <button
                    className="btn gradient-btn gradientcolor addBank btn btn-primary story-upload file-upload-button"
                    disabled={
                      !props.storyUpload.loading &&
                      props.storyUpload.buttonDisable
                    }
                  >
                    <input
                      type="file"
                      accept="image/*,video/mp4,video/mkv"
                      onChange={(event) => handleChangeImage(event)}
                    />
                    {t("select_image_video")}
                  </button>
                  <button
                    className="btn gradient-btn gradientcolor addBank btn btn-primary file-upload-button"
                    disabled={props.storyUpload.buttonDisable}
                    onClick={handleFileUpload}
                  >
                    {props.storyUpload.loadingButtonContent != ""
                      ? props.storyUpload.loadingButtonContent
                      : `${t("upload_image_video")}`}
                  </button>
                </div>
              ) : (
                <button className="btn gradient-btn gradientcolor addBank btn btn-primary story-upload file-upload-button">
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/mkv"
                    onChange={(event) => handleChangeImage(event)}
                  />
                  {t("select_image_video")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  storyUpload: state.userStories.storyUpload,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(StoryUploadModal));
