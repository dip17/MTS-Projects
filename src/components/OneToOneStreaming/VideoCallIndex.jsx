import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import ImageLoader from "../helper/ImageLoader";
import {
  endVideoCallStart,
  fetchSingleVideoCallStart,
  joinVideoCallStart,
} from "../../store/actions/PrivateCallAction";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AgoraOnetoOne from "../Sample/AgoraOnetoOne";
import "./VideoCall.css";

const VideoCallIndex = (props) => {

  useEffect(() => {
    props.dispatch(
      fetchSingleVideoCallStart({
        video_call_request_unique_id:props.match.params.video_call_request_unique_id,
      })
    );
  }, []);

  return (
    <div className="vc-single-sec">
        
          <Container>
            <Row>
                {props.singleVideoCall.loading ? (
                t("loading")
                ) : props.singleVideoCall.data.video_call_request ? (
                  <>
                    <Col sm={12} xs={12} md={3}>
                      <div className="post-list">
                      <div className="post-header d-block">
                        <div className="alignleft">
                          <Link
                            className="title-container"
                            to={`/${props.singleVideoCall.data.video_call_request.modelname}`}
                          >
                            <ImageLoader
                              image={
                                props.singleVideoCall.data.video_call_request
                                  .model_picture
                              }
                              className="user-image img-responsive"
                            />

                            <div className="user-name">
                              <span className="post-user-name">
                                <span className="user-name-post">
                                  {
                                    props.singleVideoCall.data.video_call_request
                                      .model_displayname
                                  }
                                </span>
                                {"  "}
                                {/* {post.is_verified_badge == 1 ? (
                              <VerifiedBadgeNoShadow />
                            ) : null} */}
                              </span>
                              <span className="post-user-">
                                @
                                {
                                  props.singleVideoCall.data.video_call_request
                                    .modelname
                                }
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="post-content"></div>
                    </div>
                    </Col>
                    <Col sm={12} xs={12} md={9}>
                    <div className="post-list">
                    <div className="post-header d-block">
                      <div className="alignleft">
                        <Link
                          className="title-container"
                          to={`/${props.singleVideoCall.data.video_call_request.username}`}
                        >
                          <ImageLoader
                            image={
                              props.singleVideoCall.data.video_call_request
                                .user_picture
                            }
                            className="user-image img-responsive"
                          />

                          <div className="user-name">
                            <span className="post-user-name">
                              <span className="user-name-post">
                                {
                                  props.singleVideoCall.data.video_call_request
                                    .user_displayname
                                }
                              </span>
                              {"  "}
                              {/* {post.is_verified_badge == 1 ? (
                            <VerifiedBadgeNoShadow />
                          ) : null} */}
                            </span>
                            <span className="post-user-">
                              @
                              {
                                props.singleVideoCall.data.video_call_request
                                  .username
                              }
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="alignright">
                        <div className="post-header-right-side">
                          <span className="post-time flex-content">
                            <span className="post-time">
                              {
                                props.singleVideoCall.data.video_call_request
                                  .call_status_formatted
                              }
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="post-content"></div>
                  </div>
                  </Col>
                </>
                ) : (
                  ""
                )}

              {props.singleVideoCall.loading ? (
                t("loading")
                ) : props.singleVideoCall.data.video_call_request ? (
                <AgoraOnetoOne 
                    videoCallData={props.singleVideoCall.data.video_call_request}
                    isOwner={props.singleVideoCall.data.video_call_request.is_owner}
                />
              ) : (
                ""
              )}
            </Row>
          </Container>

      </div>
    
  );
};

const mapStateToPros = (state) => ({
  singleVideoCall: state.privateCall.singleVideoCall,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}
  
export default connect(mapStateToPros, mapDispatchToProps)(translate(VideoCallIndex));
