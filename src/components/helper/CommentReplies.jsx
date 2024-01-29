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

const CommentReplies = (props) => {
  const { commentReplies, comment, commentActiveIndex } = props;

  const [commentReplyInputData, setCommentReplyInputData] = useState({});

  const mentionsRef = useRef();

  const [editorContentState, setEditorContentstate] = useState("");

  const [editorHtmlContent, setEditorHtmlContent] = useState("");

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleCommentReplySubmit = (event, comment) => {
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
    setEditorState(insertCharacter(emoji.native, editorState))
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
      {commentActiveIndex == props.currentIndex &&
        (commentReplies.loading ? (
        t("loading")
        ) : commentReplies.data.post_comment_replies.length > 0 ? (
          <>
            {commentReplies.data.post_comment_replies.map(
              (comment_reply, index) => (
                <>
                  <div className="reply-box" key={index}>
                    <div className="reply-user-img-sec">
                      <Image
                        src={window.location.origin + "/assets/images/user.png"}
                        alt=""
                        className="reply-user-img"
                      />
                    </div>
                    <div className="reply-user-info">
                      <Link to="#">
                        <h4 className="reply-user-name">
                          {comment_reply.user_displayname}
                        </h4>
                      </Link>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            comment_reply.reply != undefined
                              ? comment_reply.reply
                              : "",
                        }}
                        className="reply-message"
                      ></p>
                      <div className="reply-info-sec">
                        <ul className="list-unstyled reply-info-link">
                          <Media as="li">
                            <p>{comment_reply.created}</p>
                          </Media>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}{" "}
            <div className="reply-text-field">
              <div className="reply-user-img-sec">
                <Image
                  src={window.location.origin + "/assets/images/user.png"}
                  alt=""
                  className="reply-user-img"
                />
              </div>

              <Form
                className="form-inline"
                action=""
                onSubmit={handleCommentReplySubmit}
              >
                <div className="form-reply">
                  {/* <Form.Control
							type="text"
							placeholder="Write a reply"
							id="reply"
							name="reply"
							value={commentReplyInputData.reply}
							onChange={(event) =>
								setCommentReplyInputData({
									...commentReplyInputData,
									reply: event.currentTarget.value,
									post_id: comment.post_id,
									post_comment_id: comment.post_comment_id,
								})
							}
						/> */}
                  <PostEditor
                    className="PostEditor__input"
                    placeholder={t("write_a_reply")}
                    ref={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent={setEditorHtmlContent}
                    dispatch={props.dispatch}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>
              </Form>
              <div className="form-reply-right-icons">
                <ul className="list-unstyled reply-action-icons">
                  <Media as="li">
                    <Link
                      to="#"
                      onClick={(event) =>
                        handleCommentReplySubmit(event, comment)
                      }
                    >
                      {/* <i className="fas fa-paper-plane"></i> */}
                      <Image
                        className="comment-send-icon"
                        src={
                          window.location.origin + "/assets/images/icons/comment-send-icon.png"}
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
                  {/* <Media as="li">
										<Link to="#">
											<i className="far fa-smile"></i>
										</Link>
									</Media> */}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="reply-text-field">
              <div className="reply-user-img-sec">
                <Image
                  src={window.location.origin + "/assets/images/user.png"}
                  alt=""
                  className="reply-user-img"
                />
              </div>
              <Form
                className="form-inline"
                action=""
                onSubmit={handleCommentReplySubmit}
              >
                <div className="form-reply">
                  <PostEditor
                    className="PostEditor__input"
                    placeholder={t("write_a_reply")}
                    ref={mentionsRef}
                    getEditorRawContent={setEditorContentstate}
                    getEditorHtmlContent={setEditorHtmlContent}
                    dispatch={props.dispatch}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </div>
              </Form>
              <div className="form-reply-right-icons d-flex align-items-center">
                <ul className="list-unstyled reply-action-icons">
                  <Media as="li">
                    <Link
                      to="#"
                      onClick={(event) =>
                        handleCommentReplySubmit(event, comment)
                      }
                    >
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
                  {/* <Media as="li">
													<Link to="#">
														<i className="far fa-smile"></i>
													</Link>
												</Media> */}
                </ul>
              </div>
            </div>
          </>
        ))}
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
)(translate(CommentReplies));
