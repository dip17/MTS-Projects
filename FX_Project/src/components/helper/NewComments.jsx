import React, { useState, useEffect, useRef } from 'react';
import { Picker, EmojiData } from "emoji-mart3";
import "emoji-mart3/css/emoji-mart.css";
import PostEditor from "../Post/postMentions/PostEditor";
import { EditorState, convertToRaw, Modifier } from "draft-js";
import {
  Dropdown,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
  InputGroup,
} from "react-bootstrap";
import { saveCommentStart } from '../../store/actions/CommentsAction';
import { connect } from 'react-redux';
import { translate, t } from "react-multi-lang";

const NewComments = (props) => {
  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");
  const [editorHtmlContent, setEditorHtmlContent] = useState("");
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    props.dispatch(
      saveCommentStart({
        comment: editorHtmlContent,
        post_id: props.post.post_id,
      })
    );
    // setCommentInputData({});
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="new-single-post-comments-input-sec">
      <Form className="new-comments-form" onSubmit={handleCommentSubmit}>
        <InputGroup className="mb-0">
          <InputGroup.Text onClick={triggerPicker}>
            <Image
              className="new-feed-wishlist-icon"
              src={
                window.location.origin + "/assets/images/feed-story/comments-emoji.svg"
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
            {/* <Form onSubmit={handleCommentSubmit}> */}
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
            {/* </Form> */}
          </div>
          {/* <Form.Control aria-label="Amount (to the nearest dollar)" placeholder="Type something" /> */}
          <InputGroup.Text onClick={handleCommentSubmit}>
            <Image
              className="new-feed-wishlist-icon"
              src={
                window.location.origin + "/assets/images/feed-story/comments-send.svg"
              }
            />
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  )

}

const mapStateToPros = (state) => ({

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(NewComments));