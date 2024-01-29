import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import imageCompression from 'browser-image-compression';
import CropImageModal from "../Profile/CropImageModal";
import FeatureStoryModal from "../Profile/FeatureStoryModal";
import {
    updateUserDetailsStart,
    deleteFeatureStoryStart
} from '../../../store/actions/UserAction';
import Skeleton from "react-loading-skeleton";

const SettingsSidebar = (props) => {

    const [skipRender, setSkipRender] = useState(true);
    const [skipCoverRender, setSkipCoverRender] = useState(true);

    const [profileInputData, setProfileInputData] = useState({
        picture: "",
        cover: "",
    })

    const [image, setImage] = useState({
        picture: "",
        cover: "",
    });

    const [fileData, setFileData] = useState({
        previewVideo: "",
        file: "",
        file_type: "",
    });


    const [cropModalFlag, setCropModalFlag] = useState({
        flag: false,
        image: '',
        width: '',
        height: '',
        shape: '',
        type: '',
        fileType: '',
        fileName: ''
    });

    const [featureStory, setFeatureStory] = useState(false);

    const closeCropModal = () => {
        setCropModalFlag({
            flag: false,
            image: '',
            width: '',
            height: '',
            shape: '',
            cropedProfileImage: '',
            cropedCoverImage: '',
            type: '',
            fileType: '',
            fileName: ''
        })
    }

    const closeFeatureStoryModal = () => {
        setFileData({
            previewVideo: "",
            file: "",
            file_type: "",
        });
        setFeatureStory(false);
    };

    const { profile } = props;

    const handleChangeImage = (event) => {
        console.log("Enter function")
        if (event.currentTarget.type === "file") {
            console.log("Enter Condition File");
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
                    console.log("compressedFile" + compressedFile);

                    var croppedReader = new FileReader();
                    croppedReader.readAsDataURL(compressedFile);
                    croppedReader.onloadend = function () {
                        var base64data = croppedReader.result;

                        if (currentInputName === "picture") {

                            setCropModalFlag({ ...cropModalFlag, image: base64data, width: 1, height: 1, shape: "round", flag: true, type: "picture", fileType: currentfileType, fileName: currentfileName })
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

            if (file) {
                reader.readAsDataURL(file);
            }
        }
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
                    covercroppedReader.onloadend = function () {
                        var coverbase64 = covercroppedReader.result;

                        setCropModalFlag({ ...cropModalFlag, image: coverbase64, width: 95, height: 25, shape: "rect", flag: true, type: "cover", fileType: currentfileType, fileName: currentfileName })
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

    useEffect(() => {
        if (!skipRender) {
            props.dispatch(updateUserDetailsStart({
                picture: profileInputData.picture,
            }));
        }
        setSkipRender(false);
    }, [profileInputData.picture]);

    useEffect(() => {
        if (!skipCoverRender) {
            props.dispatch(updateUserDetailsStart({
                cover: profileInputData.cover,
            }));
        }
        setSkipCoverRender(false);
    }, [profileInputData.cover]);

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

    return (
        <>

            <div className="new-settings-sidebar">
                {!profile.loading ?
                    <div className="new-settigs-sidebar-header-card">
                        <div className="new-settings-sidebar-cover-bg-sec">
                            <div className="image-upload">
                                <label for="changeCover">
                                    <Image
                                        className="new-settings-sidebar-cover-bg"
                                        src={image.cover === "" ? props.profile.data.cover : image.cover}
                                    />
                                    <div className="upload-cover-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                                        </svg>
                                    </div>
                                </label>
                                <input id="changeCover" type="file"
                                    accept="image/*"
                                    name="cover"
                                    onChange={handleCoverChangeImage} />
                            </div>
                        </div>
                        <div className="new-settings-user-info">
                            <div className="new-settings-user-img-sec">
                                <div className="image-upload">
                                    <label for="changePicture">
                                        <Image
                                            className="new-settings-user-img profile-image"
                                            src={image.picture === ""
                                                ? props.profile.data.picture
                                                : image.picture}
                                        />
                                        <div className="upload-cover-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                                            </svg>
                                        </div>
                                    </label>
                                    <input
                                        accept="image/*"
                                        id="changePicture"
                                        type="file"
                                        name="picture"
                                        onChange={handleChangeImage} />
                                </div>
                            </div>
                            <h4>{profile.data.name}
                                <span>
                                    {props.profile.data.is_verified_badge == 1 &&
                                        <Image
                                            className="sidebar-verified-icon"
                                            src={
                                                window.location.origin + "/assets/images/new-home/verified-icon.svg"
                                            }
                                        />
                                    }
                                </span>
                            </h4>
                            <Link to="#" className="new-settings-user-name">
                                {profile.data.email}
                            </Link>
                            <div className="new-setting-features-story-sec">
                                {props.profile.data.featured_story ? <>
                                    <Button className="remove-featured-story-btn"
                                        onClick={e => handleRemoveVideo(e)}>
                                        {t("remove_featured_story")}
                                    </Button>
                                    <Button className="view-featured-story-btn" data-fancybox="gallery" href={props.profile.data.featured_story}>
                                        <Image
                                            className="new-settings-verified-icon"
                                            src={
                                                window.location.origin + "/assets/images/new-settings/view-featured-icon.png"
                                            }
                                        />
                                    </Button>
                                </> :
                                    <>
                                        <label className="remove-featured-story-btn" for="fileupload_video">
                                            {t("upload_featured_story")}
                                        </label>
                                        <input
                                            type="file"
                                            id="fileupload_video"
                                            multiple="multiple"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            onChange={(event) =>
                                                handleChangeVideo(event)
                                            }
                                            name="featured_post"
                                            className="hide" />
                                    </>
                                }
                            </div>
                        </div>
                    </div> :
                    <div className="new-settigs-sidebar-header-card">
                        <div className="new-settings-sidebar-cover-bg-sec">
                            <Skeleton className="new-settings-sidebar-cover-bg" />
                        </div>
                        <div className="new-settings-user-info">
                            <div className="new-settings-user-img-sec">
                                <Skeleton className="new-settings-user-img profile-image" />
                            </div>
                            <Skeleton count="2" height={20} containerClassName="w-75" />

                            <Skeleton count="1" height={40} containerClassName="w-90 mt-2" />
                        </div>
                    </div>
                }
                <div className="new-settings-sidebar-body">
                    <div className="new-settings-sidebar-link-sec">
                        <h4>{t("account_management")}</h4>
                        <ul className="list-unstyled new-settings-sidebar-link-list">
                            <div className="mobile-display" as="li">
                                <Media as="li">
                                    <Link to="/mobile-edit-profile">
                                        <Image
                                            className="new-setting-list-icon"
                                            src={
                                                window.location.origin + "/assets/images/new-settings/edit-profile.svg"
                                            }
                                        />
                                        {t("edit_profile")}
                                    </Link>
                                </Media>
                            </div>
                            <div className="desktop-display">
                                <Media as="li">
                                    <Link to="/edit-profile">
                                        <Image
                                            className="new-setting-list-icon"
                                            src={
                                                window.location.origin + "/assets/images/new-settings/edit-profile.svg"
                                            }
                                        />
                                        {t("edit_profile")}
                                    </Link>
                                </Media>
                            </div>
                            <Media as="li">
                                <Link to="/change-password">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/change-password.svg"
                                        }
                                    />
                                    {t("change_password")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/delete-account">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/delete-account.svg"
                                        }
                                    />
                                   {t("delete_account")}
                                </Link>
                            </Media>
                        </ul>
                    </div>
                    <div className="new-settings-sidebar-link-sec">
                        <h4>{t("general")}</h4>
                        <ul className="list-unstyled new-settings-sidebar-link-list">
                            <Media as="li">
                                <Link to="/stories">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/stories.svg"
                                        }
                                    />
                                    {t("stories")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/bookmarks">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/bookmarks.svg"
                                        }
                                    />
                                    {t("bookmarks")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/list">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/lists.svg"
                                        }
                                    />
                                    {t("lists")}
                                </Link>
                            </Media>
                        </ul>
                    </div>
                    <div className="new-settings-sidebar-link-sec">
                        <h4>{t("security")}</h4>
                        <ul className="list-unstyled new-settings-sidebar-link-list">
                            <Media as="li">
                                <Link to="/document-upload">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/documents.svg"
                                        }
                                    />
                                    {t("documents")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/two-step-auth">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/two-factor-auth.svg"
                                        }
                                    />
                                   {t("two_step_authentication")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/session-management">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/session-management.svg"
                                        }
                                    />
                                    {t("session_management")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/availability-status">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/availablity-status.svg"
                                        }
                                    />
                                    {t("availability_status")}
                                </Link>
                            </Media>
                        </ul>
                    </div>
                    <div className="new-settings-sidebar-link-sec">
                        <h4>{t("communications")}</h4>
                        <ul className="list-unstyled new-settings-sidebar-link-list">
                            <Media as="li">
                                <Link to="/video-calls-history">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/video-call-history.svg"
                                        }
                                    />
                                    {t("video_call_history")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/audio-calls-history">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/audio-call-history.svg"
                                        }
                                    />
                                    {t("audio_call_history")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/live-videos">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/past-live-video.svg"
                                        }
                                    />
                                    {t("my_live_videos")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/video-calls-sent">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/outgoing-video-call.svg"
                                        }
                                    />
                                    {t("video_call_request_sent")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/video-calls-received">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/incoming-video-call.svg"
                                        }
                                    />
                                    {t("video_call_request_received")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/audio-calls-sent">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/outgoing-audio-call.svg"
                                        }
                                    />
                                    {t("audio_call_request_sent")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/audio-calls-received">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/incoming-audio-call.svg"
                                        }
                                    />
                                    {t("audio_call_request_received")}
                                </Link>
                            </Media>
                        </ul>
                    </div>
                    <div className="new-settings-sidebar-link-sec">
                        <h4>{t("payments")}</h4>
                        <ul className="list-unstyled new-settings-sidebar-link-list">
                            {/* <Media as="li">
                                <Link to="/cards">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/your-cards.svg"
                                        }
                                    />
                                    {t("your_cards")}
                                </Link>
                            </Media> */}
                            <Media as="li">
                                <Link to="/add-bank">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/add-bank.svg"
                                        }
                                    />
                                    {t("add_bank")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/payments">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/payments.svg"
                                        }
                                    />
                                    {t("payments")}
                                </Link>
                            </Media>
                            <Media as="li">
                                <Link to="/billing-accounts">
                                    <Image
                                        className="new-setting-list-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-settings/bank-account.svg"
                                        }
                                    />
                                   {t("bank_accounts")}
                                </Link>
                            </Media>
                        </ul>
                    </div>
                </div>
            </div>
            <CropImageModal
                image={cropModalFlag.image}
                modalFlag={cropModalFlag.flag}
                cropModalFlag={cropModalFlag}
                closeModal={closeCropModal}
                setImage={setImage}
                imageState={image}
                setProfileInputData={setProfileInputData}
                profileInputData={profileInputData} />
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
});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(SettingsSidebar));


