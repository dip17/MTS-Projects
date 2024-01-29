import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { t } from "react-multi-lang";
import getCroppedImg from "./CropImageHelper";

const CropImageModal = (props) => {

  // useEffect(() => {
  //   alert(props.cropModalFlag.type);
  // }, []);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    

    return new File([u8arr], filename, { type: mime });
  };

  const getCroppedImage = useCallback(async () => {
    const croppedImage = await getCroppedImg(
      props.image,
      croppedAreaPixels,
      0,
      props.cropModalFlag.fileType
    );

    var myFile = dataURLtoFile(croppedImage, props.cropModalFlag.fileName);

    if (props.cropModalFlag.type == "picture") {
      props.setImage({ ...props.imageState, picture: croppedImage });
      props.setProfileInputData({
        ...props.profileInputData,
        picture: myFile,
      });
    } else {
      props.setImage({ ...props.imageState, cover: croppedImage });
      props.setProfileInputData({
        ...props.profileInputData,
        cover: myFile,
      });
    }
    props.closeModal();
  }, [croppedAreaPixels]);

  return (
    <>
    {props.cropModalFlag.type == "picture" ? 
      <Modal
        className="modal-dialog-center sent-tip-modal"
        size={props.cropModalFlag.type == "picture" ? "md" : "lg"}
        centered
        show={props.cropModalFlag.type == "picture" || props.cropModalFlag.type == "cover" ? props.modalFlag : false}
        onHide={props.cropModalFlag.type == "picture" || props.cropModalFlag.type == "cover" ? props.closeModal : false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("crop_image")} </Modal.Title>
        </Modal.Header>
         {/* {props.modalFlag == true ? "Yes" : "NO"} {props.cropModalFlag.type} */}
        <Modal.Body className="cropmodal">
          {props.cropModalFlag.type == "picture" ? (
            <>
              <div className="mb-3">
                <h4 className="text-muted">
                  <span className="text-danger">{t("note")} : </span>{t("image_size_of_300_300_is_recommended")}{" "}
                </h4>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <h4 className="text-muted">
                  <span  className="text-danger">{t("note")} : </span>{t("image_size_of_1920_500_is_recommended")}{" "}
                </h4>
              </div>
            </>
          )}
          <div
            className={`${
              props.cropModalFlag.type == "picture"
                ? "image-profile-cropper"
                : "image-cover-cropper"
            }`}
          >
            <Cropper
              image={props.image}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape={props.cropModalFlag.shape}
              aspect={props.cropModalFlag.width / props.cropModalFlag.height}
              // cropSize={{ width: props.width, height: props.height }}
              objectFit="contain"
            />
            <div className="crop-info-text">
              <p>
                <i className="fas fa-arrows-alt mr-2"></i>{t("drag_to_reposition")}
              </p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button
              className="save-btn btn btn-primary"
              onClick={() => getCroppedImage()}
            >
             {t("crop")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      : "" }

{props.cropModalFlag.type == "cover" ? 
      <Modal
        className="modal-dialog-center sent-tip-modal"
        size={props.cropModalFlag.type == "picture" ? "md" : "lg"}
        centered
        show={props.cropModalFlag.type == "picture" || props.cropModalFlag.type == "cover" ? props.modalFlag : false}
        onHide={props.cropModalFlag.type == "picture" || props.cropModalFlag.type == "cover" ? props.closeModal : false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("crop_image")} {props.modalFlag == true ? "Yes" : "NO"} {props.cropModalFlag.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cropmodal">
          {props.cropModalFlag.type == "picture" ? (
            <>
              <div className="mb-3">
                <h4 className="text-muted">
                  <span className="text-danger">{t("note")} : </span>{t("image_size_of_300_300_is_recommended")}{" "}
                </h4>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <h4 className="text-muted">
                  <span  className="text-danger">{t("note")} : </span>{t("image_size_of_1920_500_is_recommended")}{" "}
                </h4>
              </div>
            </>
          )}
          <div
            className={`${
              props.cropModalFlag.type == "picture"
                ? "image-profile-cropper"
                : "image-cover-cropper"
            }`}
          >
            <Cropper
              image={props.image}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape={props.cropModalFlag.shape}
              aspect={props.cropModalFlag.width / props.cropModalFlag.height}
              // cropSize={{ width: props.width, height: props.height }}
              objectFit="contain"
            />
            <div className="crop-info-text">
              <p>
                <i className="fas fa-arrows-alt mr-2"></i>{t("drag_to_reposition")}
              </p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button
              className="save-btn btn btn-primary"
              onClick={() => getCroppedImage()}
            >
             {t("crop")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      : "" }
    </>
  );
};

export default CropImageModal;
