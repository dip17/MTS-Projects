import React, { useRef, useState } from "react";
import {
  Dropdown,
  Image,
  Media,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import {
  fetchCommentRepliesStart,
  saveCommentReplyStart,
} from "../../store/actions/CommentsAction";
import "react-image-lightbox/style.css";
import { translate, t } from "react-multi-lang";
import PostEditor from "../Post/postMentions/PostEditor";
import { Picker, EmojiData } from "emoji-mart3";
import "emoji-mart3/css/emoji-mart.css";
import { EditorState, convertToRaw, Modifier } from "draft-js";

const NewCommentReplies = (props) => {
  const { commentReplies, comment, commentActiveIndex } = props;

  const [commentReplyInputData, setCommentReplyInputData] = useState({});

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleCommentReplySubmit = (event) => {
    console.log(editorHtmlContent);
    event.preventDefault();
    props.dispatch(
      saveCommentReplyStart({
        reply: editorHtmlContent,
        post_id: comment.post_id,
        post_comment_id: comment.post_comment_id,
      })
    );
    setCommentReplyInputData({});
    props.dispatch(
      fetchCommentRepliesStart({
        post_id: comment.post_id,
        post_comment_id: comment.post_comment_id,
      })
    );
    setEditorState(EditorState.createEmpty());
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  // const handleEmojiSelect = (emoji) => {
  //   setEditorHtmlContent(editorHtmlContent + emoji.native);
  //   setEditorContentstate(editorContentState + emoji.native);
  //   SetEmojiPicker(false);
  // };

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    setEditorState(insertCharacter(emoji.native, editorState));
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

  return (
    <>
      <div className="reply-text-field new-input-comment-sec">
        {/* <div className="reply-user-img-sec">
          <Image
            src={window.location.origin + "/assets/images/user.png"}
            alt=""
            className="reply-user-img"
          />
        </div> */}
        {/* <Form
          className="form-inline"
          action=""
          onSubmit={handleCommentReplySubmit}
        >
          <div className="form-reply">
            <PostEditor
              className="PostEditor__input"
              placeholder="Write a reply"
              ref={mentionsRef}
              getEditorRawContent={setEditorContentstate}
              getEditorHtmlContent={setEditorHtmlContent}
              dispatch={props.dispatch}
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </div>
        </Form> */}
        <Form action="" onSubmit={handleCommentReplySubmit}>
          <InputGroup className="new-input-group-imges">
            <InputGroup.Text id="basic-addon1" onClick={triggerPicker}>
              <Image
                className="new-feed-wishlist-icon"
                src={
                  window.location.origin +
                  "/assets/images/feed-story/comments-emoji.svg"
                }
              />
            </InputGroup.Text>
            {emojiPickerState && (
            <div className="emojiWrapper">
              <Picker
                title=""
                emoji="point_up"
                onSelect={(emoji) => handleEmojiSelect(emoji)}
              />
            </div>
          )}
           <div className="text-box">
            <PostEditor
              className="form-control"
              placeholder={t("type_something")}
              ref={mentionsRef}
              getEditorRawContent={setEditorContentstate}
              getEditorHtmlContent={setEditorHtmlContent}
              dispatch={props.dispatch}
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </div>
            {/* <Form.Control
              placeholder="Type Something"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="comment" onChange={(event) => setEditorHtmlContent(event.currentTarget.value)}
            /> */}
            <InputGroup.Text id="basic-addon1">
              <Link to="" onClick={handleCommentReplySubmit}>
                <Image
                  className="new-feed-wishlist-icon"
                  src={
                    window.location.origin +
                    "/assets/images/feed-story/comments-send.svg"
                  }
                />
              </Link>
            </InputGroup.Text>
          </InputGroup>
        </Form>
        {/* <div className="form-reply-right-icons d-flex align-items-center">
          <ul className="list-unstyled reply-action-icons">
            <Media as="li">
              <Link to="#" onClick={handleCommentReplySubmit}>
                <Image
                  className="comment-send-icon"
                  src={
                    window.location.origin +
                    "/assets/images/icons/comment-send-icon.png"
                  }
                />
              </Link>
            </Media>
            <Media as="li">
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
        </div> */}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  commentReplies: state.comment.commentReplies,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewCommentReplies));
