import React, { useState } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { useEffect } from "react";
import {
    Button,
    Modal,
} from "react-bootstrap";
import {
    saveFeatureStoryStart,
} from "../../../store/actions/UserAction";
const $ = window.$;

const FeatureStoryModal = (props) => {

    const [skip, setSkip] = useState(true);
    const handleFileUpload = (event) => {
        event.preventDefault();
        props.dispatch(
            saveFeatureStoryStart({
                file: props.fileData.file,
            })
        );
        //props.closeModal();
    }

    useEffect(() => {
        if (!skip && !props.saveFeatureStory.loading) {
            setSkip(true);
            props.closeModal();
        } else {
            setSkip(false);
        }
    }, [props.saveFeatureStory]);

    return (
        <>
            <Modal
                centered
                size="lg"
                className="modal-dialog-center sent-tip-modal"
                show={props.featureStory}
                onHide={props.closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("upload_featured_story")}</Modal.Title>
                </Modal.Header>
                {props.featureStory === true ?
                    <Modal.Body className="subscription-tip-ppv-tab">

                        <div className="story-upload-file">
                            {props.fileData.previewVideo != "" ? props.fileData.file_type == "image" ? (
                                <img src={props.fileData.previewVideo} alt="" />
                            ) : (
                                <video
                                    autoplay
                                    controls
                                    id="myVideo"
                                    className="user-profile1 w-100"
                                >
                                    <source src={props.fileData.previewVideo} type="video/mp4" />
                                </video>
                            ) : null}
                        </div>
                    </Modal.Body>
                    : ""}
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        disabled={props.saveFeatureStory.buttonDisable}
                        onClick={props.closeModal}
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        type="button"
                        className="btn btn-success"
                        data-dismiss="modal"
                        onClick={handleFileUpload}
                        disabled={props.saveFeatureStory.buttonDisable}
                    >
                        {props.saveFeatureStory.loadingButtonContent ?
                            props.saveFeatureStory.loadingButtonContent :
                            t("save")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const mapStateToPros = (state) => ({
    // storyUpload: state.userStories.storyUpload,
    saveFeatureStory: state.users.saveFeatureStory,
});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(FeatureStoryModal));
