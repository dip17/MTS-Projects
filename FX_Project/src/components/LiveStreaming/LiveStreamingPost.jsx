import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const LiveStreamingPost = (props) => {

  return (
    <>
      {props.posts.length > 0 ?
        <div className="live-streaming-post-sec">
          <div className="live-streaming-post-header">
            <h4 className="text-uppercase">{props.displayName}’S POST</h4>
            <Link to={`/${props.userUniqueId}`}>
           {t("view_all")}
            </Link>
          </div>
          <div className="live-streaming-post-box">
            {props.posts.map((post, i) =>
              post.post_file ?
                <div className="live-streaming-post-item">
                  <Link className="live-streaming-post-img-sec" to={`/post/${post.post_unique_id}`}>
                    <Image
                      className="live-streaming-post-img"
                      src={post.post_file.file_type === "image" ?
                        post.post_file.post_file
                        : post.post_file.preview_file
                      }
                    />
                  </Link>
                </div>
                : null
            )}
          </div>
        </div>
        : null
      }
    </>
  );
};

export default (translate(LiveStreamingPost));
