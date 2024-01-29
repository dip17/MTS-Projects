import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    Dropdown,Image,Media,Form,Button,
} from "react-bootstrap";
import { EditorState, convertToRaw, Modifier } from "draft-js";
import {
    saveCommentStart,
} from "../../store/actions/CommentsAction";
import { translate, t } from "react-multi-lang";
import { Picker, EmojiData } from "emoji-mart3";
import "emoji-mart3/css/emoji-mart.css";
import PostEditor from "../Post/postMentions/PostEditor";
import { getSuccessNotificationMessage,getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";

const Comments = (props) => {

    const mentionsRef = useRef();

    const [editorContentState, setEditorContentstate] = useState("");

    const [editorHtmlContent, setEditorHtmlContent] = useState("");

    const [emojiPickerState, SetEmojiPicker] = useState(false);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [commentActiveIndex, setCommentActiveIndex] = useState(null);

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        if(!localStorage.getItem("userId")) {
            const notificationMessage = getErrorNotificationMessage(
                t('login_to_continue')
            );
            props.dispatch(createNotification(notificationMessage));
        } else {

            props.dispatch(
            saveCommentStart({
                comment: editorHtmlContent,
                post_id: props.post.post_id,
            })
            );
            // setCommentInputData({});
            setEditorState(EditorState.createEmpty());
        }
    };

      
    function triggerPicker(event) {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }
    
    const handleEmojiSelect = (emoji) => {
        SetEmojiPicker(false);
        setEditorState(insertCharacter(emoji.native, editorState));
    };
    
    const handleCommentActiveIndex = (index) => {
        setCommentActiveIndex(index);
    };

    const insertCharacter = (emoji, editorState) => {

        const currentContent = editorState.getCurrentContent();
        const currentSelection = editorState.getSelection();
    
        const newContent = Modifier.insertText(
            currentContent,
            currentSelection,
            emoji
        );
    
        const newEditorState = EditorState.push(
            editorState,
            newContent,
            "insert-characters"
        );
    
        return EditorState.forceSelection(
            newEditorState,
            newContent.getSelectionAfter()
        );
    };

    const focusEditor = () => {
        console.log('one');
        setCommentActiveIndex(props.currentIndex);
    };

    return (
        <div className="comment-box" onFocus={() => focusEditor()}>
            <div className="comment-box-form">
                <Form
                    className="form-inline"
                    action=""
                    onSubmit={handleCommentSubmit}
                >
                    <div className="user-picture">
                        <Link className="title-container-1" to="#">
                            <Image
                            src={localStorage.getItem("user_picture") ? localStorage.getItem("user_picture") : window.location.origin + "/assets/images/user.png"}
                            className="user-image img-responsive"
                            />
                        </Link>
                    </div>
                    {commentActiveIndex == props.currentIndex ? 
                    <div className="text-box">
                        <PostEditor
                            className="PostEditor__input"
                            placeholder={t("new_comment_placeholder")}
                            ref={mentionsRef}
                            getEditorRawContent={setEditorContentstate}
                            getEditorHtmlContent={setEditorHtmlContent}
                            dispatch={props.dispatch}
                            editorState={editorState}
                            setEditorState={setEditorState}
                        />
                    </div>
                    : 
                        <div className="empty-comment">
                            <input type='text' placeholder={t("add_comments_here")} />
                        </div>
                    }
                    <ul className="list-unstyled reply-action-icons position-relative">
                        <Media as="li">
                            <Link to="#" onClick={handleCommentSubmit}>
                                {/* <i className="fas fa-paper-plane"></i> */}
                                <Image
                                    className="comment-send-icon"
                                    src={
                                    window.location.origin +
                                    "/assets/images/icons/comment-send-icon.png"
                                    }
                                />
                            </Link>
                        </Media>
                        <Media as="li" className="m-0">
                            <button
                            type="button"
                            className="g-btn m-rounded emojiButtoon p-0 pr-2"
                            onClick={triggerPicker}
                            >
                                <i className="far fa-smile"></i>
                            </button>
                        </Media>
                        {emojiPickerState && (
                            <div className="emojiWrapper">
                                <Picker
                                    title=""
                                    emoji="point_up"
                                    onSelect={(emoji) => handleEmojiSelect(emoji)}
                                />
                            </div>
                        )}
                    </ul>
                </Form>
            </div>
        </div>
    );
};

const mapStateToPros = (state) => ({
  
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(Comments));
