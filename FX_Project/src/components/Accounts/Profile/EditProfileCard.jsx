import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Image, Input } from "react-bootstrap";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";

import {
  editUserDetails,
  fetchUserDetailsStart,
  updateUserDetailsStart,
  usernameValidationStart,
  deleteFeatureStoryStart,
} from "../../../store/actions/UserAction";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { apiConstants } from "../../Constant/constants";
import CropImageModal from "./CropImageModal";
import imageCompression from 'browser-image-compression';
import FeatureStoryModal from "./FeatureStoryModal";

const EditProfileCard = (props) => {
  const [profileInputData, setProfileInputData] = useState({});

  const [image, setImage] = useState({
    picture: "",
    cover: "",
  });

  const [fileData, setFileData] = useState({
    previewVideo: "",
    file: "",
    file_type: "",
  });

  const [featureStory, setFeatureStory] = useState(false);

  const [cropModalFlag , setCropModalFlag] = useState({
    flag : false,
    image : '',
    width : '',
    height: '',
    shape : '',
    type : '',
    fileType : '',
    fileName : ''
  })

  useEffect(() => {
    if (props.profile.loading) props.dispatch(fetchUserDetailsStart());
  }, []);

  const handleUsernameValidation = (event, username, value) => {
    props.dispatch(editUserDetails(username, value));
    props.dispatch(usernameValidationStart({ username: value }));
  };

  const handleCoverChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      const currentfileType = event.currentTarget.files[0].type
      const currentfileName = event.currentTarget.files[0].name
      let coverReader = new FileReader();
      let coverFile = event.currentTarget.files[0];
      let imageFile = event.currentTarget.files[0];
      let currentInputName = event.currentTarget.name;
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }

      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          var covercroppedReader = new FileReader();
          covercroppedReader.readAsDataURL(compressedFile);
          covercroppedReader.onloadend = function() {
            var coverbase64 = covercroppedReader.result;

            setCropModalFlag({...cropModalFlag , image : coverbase64 ,  width : 95 , height : 25  ,shape : "rect" , flag : true , type: "cover",fileType : currentfileType , fileName : currentfileName })
          }

        })
        .catch(function (error) {
          console.log(error.message);
        });

      if (coverFile) {
        coverReader.readAsDataURL(coverFile);
      }
    }
  };

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      const currentfileType = event.currentTarget.files[0].type
      const currentfileName = event.currentTarget.files[0].name
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      let imageFile = event.currentTarget.files[0];
      let currentInputName = event.currentTarget.name;

      console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }

      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          console.log("compressedFile"+compressedFile);

          var croppedReader = new FileReader();
          croppedReader.readAsDataURL(compressedFile);
          croppedReader.onloadend = function() {
            var base64data = croppedReader.result;
            // console.log(base64data);
            
            if (currentInputName === "picture") {

              setCropModalFlag({...cropModalFlag , image : base64data ,  width : 1 , height : 1  ,shape : "round" , flag : true , type : "picture" , fileType : currentfileType , fileName : currentfileName })
            }

            // if (currentInputName === "cover") {

            //   setCropModalFlag({...cropModalFlag , image : reader.result ,  width : 95 , height : 25  ,shape : "rect" , flag : true , type: "cover",fileType : currentfileType , fileName : currentfileName })
            // }
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });

      // if (event.currentTarget.name === "cover") {
      //   reader.onloadend = () => {

      //     // do not change width and height its in aspect ratio 1920 * 500 , provice aspect ratio for different size
      //     setCropModalFlag({...cropModalFlag , image : reader.result ,  width : 95 , height : 25  ,shape : "rect" , flag : true , type: "cover",fileType : currentfileType , fileName : currentfileName })
      //   };
      // }

      // if (event.currentTarget.name === "picture") {
      //   reader.onloadend = () => {
      //     // do not change width and height its in aspect ratio 300 * 300 , provice aspect ratio for different size

      //     console.log("HELLO"+JSON.stringify(reader.result));

      //     setCropModalFlag({...cropModalFlag , image : reader.result ,  width : 1 , height : 1  ,shape : "round" , flag : true , type : "picture" , fileType : currentfileType , fileName : currentfileName })
      //   };
      // }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(profileInputData).length > 0)
      props.dispatch(updateUserDetailsStart(profileInputData));
    else props.dispatch(updateUserDetailsStart());
  };

  let autocomplete;

  const renderAutoComplete = () => {
      
    const { google } = props;
    if (!google) {
      console.log("asdfsadfasdfno");
      return;
    }

    autocomplete = new google.maps.places.Autocomplete(autocomplete, {
      types: ["geocode"]
    });

    autocomplete.setFields(["address_component", "geometry", "name"]);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Place", place);
      if (!place.geometry) return;
      let full_address = "";
      place.address_components.map(
        (address) =>
          (full_address =
            full_address == ""
              ? address.long_name
              : full_address + "," + address.long_name)
      );

      props.dispatch(editUserDetails("address", full_address));
      props.dispatch(editUserDetails("latitude", place.geometry.location.lat()));
      props.dispatch(editUserDetails("longitude", place.geometry.location.lng()));
    });

  };
  
  const closeCropModal = () => {
    setCropModalFlag({
      flag : false,
      image : '',
      width : '',
      height: '',
      shape : '',
      cropedProfileImage : '',
      cropedCoverImage : '',
      type : '',
      fileType : '',
      fileName : ''
    })
  }

  const handleChangeVideo = (event) => {
    event.preventDefault();
    if (event.currentTarget.type === "file") {
      let readerVideo = new FileReader();
      let file = event.currentTarget.files[0];
      readerVideo.onloadend = () => {
        setFileData({
          ...fileData,
          previewVideo: readerVideo.result,
          file: file,
          file_type: file.type.match("image") ? "image" : "video",
        });
      };
      setFeatureStory(true)
      if (file) {
        readerVideo.readAsDataURL(file);
      }
    }
  };

  const handleRemoveVideo = (event) => {
    event.preventDefault();
    props.dispatch(
      deleteFeatureStoryStart()
    );
  };

  const closeFeatureStoryModal = () => {
    setFileData({
      previewVideo: "",
      file: "",
      file_type: "",
    });
    setFeatureStory(false);
  };


  return (
    <>
      {props.profile.loading ? (
        t("loading")
      ) : (
        <div
          role="tabpanel"
          className={
            props.activeSec === "profile-card"
              ? "tab-pane fade in active"
              : "tab-pane fade"
          }
          id="Section2"
        >
          <div className="profile-post-area">
            <div className="bookmarkes-list bookmarks-right-side border-btm-none">
              <div className="pull-left">
                <h3>{t("edit_profile")}</h3>
                {/* <p className="small-text">{t("change_photo")}</p> */}
              </div>
              <div className="pull-right"></div>
            </div>
          </div>
          <div className="edit-profile-photo">
            <div className="profile large">
              <div className="cover">
                <Image
                  src={
                    image.cover === "" ? props.profile.data.cover : image.cover
                  }
                />

                <div className="layer">
                  <div className="loader"></div>
                </div>
                <a className="image-wrapper" href="#">
                  <Form id="coverForm" action="#">
                    <Form.Control
                      className="hidden-input"
                      id="changeCover"
                      type="file"
                      name="cover"
                      accept="image/*"
                      onChange={handleCoverChangeImage}
                    />
                    <Form.Label
                      className="btn gradient-btn editProfile gradientcolor uploadCover mb-0"
                      for="changeCover"
                      title="Change cover"
                    >
                      {t("upload_cover_image")}
                    </Form.Label>
                  </Form>
                </a>
              </div>
              <div className="user-info">
                <div className="profile-pic">
                  <Image
                    src={
                      image.picture === ""
                        ? props.profile.data.picture
                        : image.picture
                    }
                  />
                  <div className="layer">
                    <div className="loader"></div>
                  </div>
                  <a className="image-wrapper" href="#">
                    <Form id="profile-img" action="#">
                      <Form.Control
                        className="hidden-input"
                        id="changePicture"
                        type="file"
                        accept="image/*"
                        name="picture"
                        onChange={handleChangeImage}
                      />
                      <Form.Label
                        className="edit"
                        for="changePicture"
                        type="file"
                        title="Change picture"
                      ></Form.Label>
                    </Form>
                  </a>
                </div>
                <a className="btn graditentBorderBtn editProfile">
                  <Form id="profilePictureForm" action="#">
                    <Form.Control
                      className="hidden-input"
                      id="changePicture"
                      type="file"
                      name="picture"
                      onChange={handleChangeImage}
                    />
                    <Form.Label
                      className="gradientBorderColor mb-0"
                      for="changePicture"
                      type="file"
                      title="Change picture"
                    >
                      {t("upload_profile_photo")}
                    </Form.Label>
                  </Form>
                </a>
                {props.profile.data.featured_story ? 
                  <a className="btn graditentBorderBtn editProfile mr-1">
                    <Form.Group
                      className="mb-0"
                      controlId="formFileDisabled"
                    >
                      <Form.Control
                        className="hidden-input"
                        id="fileupload_video"
                        type="file"
                        multiple="multiple"
                        accept="video/mp4,video/x-m4v,video/*"
                        onClick={(event) =>
                          handleRemoveVideo(event)
                        }
                        name="featured_post"
                      />
                      <Form.Label
                        id="attach_file_video"
                        for="fileupload_video"
                        className="gradientBorderColor mb-0"
                        data-original-title="null"
                      >
                        {t("remove_featured_story")}
                      </Form.Label>
                    </Form.Group>
                  </a>
                : 
                <a className="btn graditentBorderBtn editProfile mr-1">
                  <Form.Group
                    className="mb-0"
                    controlId="formFileDisabled"
                  >
                    <Form.Control
                      className="hidden-input"
                      id="fileupload_video"
                      type="file"
                      multiple="multiple"
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={(event) =>
                        handleChangeVideo(event)
                      }
                      name="featured_post"
                    />
                    <Form.Label
                      id="attach_file_video"
                      for="fileupload_video"
                      className="gradientBorderColor mb-0"
                      data-original-title="null"
                    >
                      {t("upload_featured_story")}
                    </Form.Label>
                  </Form.Group>
                </a>
                }
              </div>
            </div>
            <p className="inuput-help">{t("upload_profile_photo_para")}</p>
          </div>
          <div
            className="edit-input-wrapper"
            data-vv-delay="1000"
            data-vv-as="username"
          >
            <Form.Label className="edit-input-label">
              {t("username")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="username"
                type="text"
                placeholder=""
                name="username"
                value={props.profile.data.username}
                className="form-control edit-reset"
                onChange={(event) =>
                  handleUsernameValidation(
                    event,
                    event.currentTarget.name,
                    event.currentTarget.value
                  )
                }
                isValid={props.validation.isValid}
                isInvalid={props.validation.isInValid}
              />
              {props.validation.isInValid ? (
                <Form.Control.Feedback type="invalid">
                  {t("username_error")}
                </Form.Control.Feedback>
              ) : (
                ""
              )}
              {props.validation.isValid ? (
                <Form.Control.Feedback>{t("looks_good")}</Form.Control.Feedback>
              ) : (
                ""
              )}
            </div>
            <p className="input-help">
              {window.location.origin + "/" + props.profile.data.username}
            </p>
          </div>
          <div
            className="edit-input-wrapper"
            data-vv-delay="1000"
            data-vv-as="Display Name"
          >
            <Form.Label className="edit-input-label">
              {t("display_name")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="name"
                type="text"
                placeholder=""
                defaultValue={props.profile.data.name}
                name="name"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          {props.profile &&
          props.profile.data.categories &&
          props.profile.data.categories.length > 0 ? (
            <div
              className="edit-input-wrapper"
              data-vv-delay="1000"
              data-vv-as="Choose Category"
            >
              <Form.Label className="edit-input-label">
               {t("choose_category")}
                <span className="edit-input-optional">(optional)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="category_id"
                
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              >
                <option value="">{t('choose_your_category')}</option>
                {props.profile.data.categories.map((category, index) => {
                  return [
                    <option
                    key={"category_id-"+category.category_id}
                      value={category.category_id}
                      selected={category.is_selected == 1 ? true : false}
                    >
                      {category.name}
                    </option>,
                  ];
                })}
              </Form.Control>
            </div>
          ) : null}
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="monthly_amount"
          > 
            {configuration.get("configData.is_only_wallet_payment") == 1 ?
              <Form.Label className="edit-input-label">
                {t("subscription_token")} ({t("per_month")}{" "})
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            : 
              <Form.Label className="edit-input-label">
                {t("subscription_price")} ({t("per_month")}{" "}
                {configuration.get("configData.currency_code")})
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            }
            <div className="">
              <Form.Control
                id="monthly_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="monthly_amount"
                className="form-control edit-reset"
                disabled={
                  localStorage.getItem("is_subscription_enabled") == 1
                    ? false
                    : true
                }
                defaultValue={props.profile.data.monthly_amount}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>

          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="yearly_amount"
          >
            {configuration.get("configData.is_only_wallet_payment") == 1 ?
              <Form.Label className="edit-input-label">
                {t("subscription_token")} ({t("per_year")}{" "})
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            : 
              <Form.Label className="edit-input-label">
                {t("subscription_price")} ({t("subscription_price_per_annum")}{" "}
                {configuration.get("configData.currency_code")})
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            }
            <div className="">
              <Form.Control
                id="yearly_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="yearly_amount"
                className="form-control edit-reset"
                disabled={
                  localStorage.getItem("is_subscription_enabled") == 1
                    ? false
                    : true
                }
                defaultValue={props.profile.data.yearly_amount}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
            {localStorage.getItem("is_subscription_enabled") == 1 ? (
              <p className="inuput-help">
                {t("you_can_change_the")}
                <Link to={`/add-bank`}>
                  {t("you_can_change_the_para1")}
                </Link>{" "}
                {t("you_can_change_the_para2")}.
              </p>
            ) : (
              <p className="inuput-help">
                {t("you_can_change_the_para3")}
                <Link to={`/add-bank`}>
                  {t("you_can_change_the_para4")}
                </Link>{" "}
                {t("you_can_change_the_para5")}.
              </p>
            )}
          </div>

          {configuration.get("configData.is_one_to_one_call_enabled") == 1? 
          <>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="video_call_amount"
          >
            {configuration.get("configData.is_only_wallet_payment") == 1 ?
              <Form.Label className="edit-input-label">
                {t("video_call_token")}(
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            : 
              <Form.Label className="edit-input-label">
                {t("video_call_amount")}(
                {configuration.get("configData.currency_code")})
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            }
            <div className="">
              <Form.Control
                id="video_call_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="video_call_amount"
                className="form-control edit-reset"
                disabled={
                  localStorage.getItem("is_subscription_enabled") == 1
                    ? false
                    : true
                }
                defaultValue={props.profile.data.video_call_amount}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
               <p className="inuput-help"> <b>{t("note")} :</b> {t("video_call_amount_note")}</p>
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="audio_call_amount"
          >
            {configuration.get("configData.is_only_wallet_payment") == 1 ?
              <Form.Label className="edit-input-label">
                {t("audio_call_token")}(
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            : 
              <Form.Label className="edit-input-label">
                {t("audio_call_amount")}(
                {configuration.get("configData.currency_code")})
                <span className="edit-input-optional">({t("optional")})</span>
              </Form.Label>
            }
            <div className="">
              <Form.Control
                id="audio_call_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="audio_call_amount"
                className="form-control edit-reset"
                disabled={
                  localStorage.getItem("is_subscription_enabled") == 1
                    ? false
                    : true
                }
                defaultValue={props.profile.data.audio_call_amount}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
                <p className="inuput-help"> <b>{t("note")} :</b> {t("audio_call_amount_note")}</p>
            </div>
          </div>
          </>
          : "" }
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="default_payment_method"
          >
            <Form.Label className="edit-input-label">
              {t("default_payment_method")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <select
                className="form-control mw-200 mb-3"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
                name="default_payment_method"
                defaultValue={props.profile.data.default_payment_method}
            >
                  <option
                  value="WALLET"
                  selected={
                    props.profile.data.default_payment_method == "WALLET" ? true : false
                  }
                  >
                    {t("wallet")}
                  </option>
                  <option
                  value="CARD"
                  selected={
                      props.profile.data.default_payment_method == "CARD" ? true : false
                  }
                  >
                    {t("card")}
                  </option>
                  <option
                  value="PAYPAL"
                  selected={
                      props.profile.data.default_payment_method == "PAYPAL" ? true : false
                  }
                  >
                    {t("paypal")}
                  </option>
                  {/* <option
                  value="CCBILL"
                  selected={
                      props.profile.data.default_payment_method == "CCBILL" ? true : false
                  }
                  >
                    {t("ccbill")}
                  </option> */}
              </select>
            </div>
          </div>
          {/* <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="online_status"
          >
            <Form.Label className="edit-input-label">
              {t("online_status")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <select
                className="form-control mw-200 mb-3"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
                name="is_online_status"
                defaultValue={props.profile.data.is_online_status}
            >
                  <option
                  value="1"
                  selected={
                    props.profile.data.is_online_status == 1 ? true : false
                  }
                  >
                    {t("show")}
                  </option>
                  <option
                  value="0"
                  selected={
                      props.profile.data.is_online_status == 0 ? true : false
                  }
                  >
                    {t("hide")}
                  </option>
              </select>
            </div>
          </div> */}
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="gender"
          >
            <Form.Label className="edit-input-label">
              {t("gender")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
              <div className="">
                <select
                  className="form-control mw-200 mb-3"
                  onChange={(event) => {
                    props.dispatch(
                      editUserDetails(
                        event.currentTarget.name,
                        event.currentTarget.value
                      )
                    );
                  }}
                  name="gender"
                  defaultValue={props.profile.data.gender}
              >
                <option
                  value="rather-not-select"
                  selected={
                    props.profile.data.gender == "rather-not-select" ? true : false
                  }
                  >
                  {t("rather_not_select")}
                </option>
                <option
                value="male"
                selected={
                  props.profile.data.gender == "male" ? true : false
                }
                >
                  {t("male")}
                </option>
                <option
                value="female"
                selected={
                    props.profile.data.gender == "female" ? true : false
                }
                >
                  {t("female")}
                </option>
                <option
                value="others"
                selected={
                    props.profile.data.gender == "others" ? true : false
                }
                >
                  {t("others")}
                </option>
              </select>
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="eyes_color"
          >
            <Form.Label className="edit-input-label">
              {t("eyes_color")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="eyes_color"
                type="text"
                autoComplete="off"
                placeholder=""
                value={props.profile.data.eyes_color}
                name="eyes_color"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
              <p className="inuput-help"> <b>{t("note")} :</b> {t("eye_colors")}</p>
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="height"
          >
            <Form.Label className="edit-input-label">
              {t("height")}{" "}
              <span className="edit-input-optional">({t("in_cm")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                  id="height"
                  type="number"
                  step="any"
                  min="0"
                  placeholder=""
                  name="height"
                  className="form-control edit-reset"
                  defaultValue={props.profile.data.height}
                  onChange={(event) => {
                    props.dispatch(
                      editUserDetails(
                        event.currentTarget.name,
                        event.currentTarget.value
                      )
                    );
                  }}
                />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="weight"
          >
            <Form.Label className="edit-input-label">
              {t("weight")}{" "}
              <span className="edit-input-optional">({t("in_pounds")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="weight"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="weight"
                className="form-control edit-reset"
                defaultValue={props.profile.data.weight}
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="description"
          >
            <Form.Label className="edit-input-label">
              {t("about")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-description"
                as="textarea" rows={5}
                autoComplete="off"
                placeholder=""
                value={props.profile.data.about}
                name="about"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Address"
          >
            <Form.Label className="edit-input-label">
              {t("location")}{" "}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-address"
                type="text"
                defaultValue={props.profile.data.address}
                placeholder={t("location")}
                onFocus={renderAutoComplete}
                ref={ref => (autocomplete = ref)}
                name="address"
                className="form-control edit-reset"
                // onChange={(event) => {
                //   props.dispatch(
                //     editUserDetails(
                //       event.currentTarget.name,
                //       event.currentTarget.value
                //     )
                //   );
                // }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Website"
          >
            <Form.Label className="edit-input-label">
              {t("website_url")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-website"
                type="text"
                autoComplete="off"
                value={props.profile.data.website}
                placeholder={t("website_url")}
                name="website"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Amazon Wishlist"
          >
            <Form.Label className="edit-input-label">
              {t("amazon_wishlist")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-amazon-wishlist"
                type="text"
                autoComplete="off"
                value={props.profile.data.amazon_wishlist}
                placeholder={t("amazon_wishlist")}
                name="amazon_wishlist"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Instagram Link"
          >
            <Form.Label className="edit-input-label" for="edit_instagram_link">
              {t("instagaram_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_instagram_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.instagram_link}
                placeholder={t("instagaram_link")}
                name="instagram_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Facebook Link"
          >
            <Form.Label className="edit-input-label" for="edit_facebook_link">
              {t("facebook_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_facebook_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.facebook_link}
                placeholder={t("facebook_link")}
                name="facebook_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>

          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Twitter Link"
          >
            <Form.Label className="edit-input-label" for="edit_twitter_link">
              {t("twitter_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_twitter_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.twitter_link}
                placeholder={t("twitter_link")}
                name="twitter_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Snapchat Link"
          >
            <Form.Label className="edit-input-label" for="edit_snapchat_link">
              {t("snapchat_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_snapchat_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.snapchat_link}
                placeholder={t("snapchat_link")}
                name="snapchat_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Linkedin Link"
          >
            <Form.Label className="edit-input-label" for="edit_linkedin_link">
              {t("linkedin_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_linkedin_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.linkedin_link}
                placeholder={t("linkedin_link")}
                name="linkedin_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="PINTEREST Link"
          >
            <Form.Label className="edit-input-label" for="edit_pinterest_link">
              {t("pinterest_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_pinterest_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.pinterest_link}
                placeholder={t("pinterest_link")}
                name="pinterest_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="YOUTUBE Link"
          >
            <Form.Label className="edit-input-label" for="edit_youtube_link">
              {t("youtube_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_youtube_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.youtube_link}
                placeholder={t("youtube_link")}
                name="youtube_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="TWITCH Link"
          >
            <Form.Label className="edit-input-label" for="edit_twitch_link">
              {t("twitch_link")}
              <span className="edit-input-optional">({t("optional")})</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit_twitch_link"
                type="text"
                autoComplete="off"
                value={props.profile.data.twitch_link}
                placeholder={t("twitch_link")}
                name="twitch_link"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>

          <div className="edit-save">
            <Button
              className="save-btn"
              onClick={handleSubmit}
              disabled={props.profileInputData.buttonDisable}
            >
              {props.profileInputData.loadingButtonContent !== null
                ? props.profileInputData.loadingButtonContent
                : t("submit")}
            </Button>
          </div>
        </div>
      )}
      <CropImageModal image={cropModalFlag.image} modalFlag={cropModalFlag.flag} cropModalFlag={cropModalFlag} closeModal={closeCropModal} setImage={setImage} imageState={image} setProfileInputData={setProfileInputData} profileInputData={profileInputData}/>
      <FeatureStoryModal 
        fileData={fileData}
        featureStory={featureStory}
        closeModal={closeFeatureStoryModal}
      />
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  profileInputData: state.users.profileInputData,
  validation: state.users.validationInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const connector = connect(mapStateToPros, mapDispatchToProps)(translate(EditProfileCard));

export default GoogleApiWrapper({
  apiKey: apiConstants.google_api_key
})(connector);
