import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import ImageLoader from "../../helper/ImageLoader";
import {
  fetchSingleAudioCallStart,
} from "../../../store/actions/PrivateCallAction";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AgoraOnetoOneAudioCall from "../../Sample/AgoraOnetoOneAudioCall";
import "../VideoCall.css";

const AudioCallIndex = (props) => {

  useEffect(() => {
    props.dispatch(
      fetchSingleAudioCallStart({
        audio_call_request_unique_id:props.match.params.audio_call_request_unique_id,
      })
    );
  }, []);

  return (
    <div className="vc-single-sec">
        
          <Container>
            <Row>
              <Col sm={12} xs={12} md={12}>
                {props.singleAudioCall.loading ? (
                t("loading")
                ) : props.singleAudioCall.data.audio_call_request ? (
                
                  <div className="post-list">
                    <div className="post-header">
                      <div className="alignleft">
                        <Link
                          className="title-container"
                          to={`/${props.singleAudioCall.data.audio_call_request.modelname}`}
                        >
                          <ImageLoader
                            image={
                              props.singleAudioCall.data.audio_call_request
                                .model_picture
                            }
                            className="user-image img-responsive"
                          />

                          <div className="user-name">
                            <span className="post-user-name">
                              <span className="user-name-post">
                                {
                                  props.singleAudioCall.data.audio_call_request
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
                                props.singleAudioCall.data.audio_call_request
                                  .modelname
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
                                props.singleAudioCall.data.audio_call_request
                                  .call_status_formatted
                              }
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="post-content"></div>
                  </div>
                ) : (
                  ""
                )}

                
              </Col>
              {props.singleAudioCall.loading ? (
                t("loading")
                ) : props.singleAudioCall.data.audio_call_request ? (
                <AgoraOnetoOneAudioCall 
                    audioCallData={props.singleAudioCall.data.audio_call_request}
                    isOwner={props.singleAudioCall.data.audio_call_request.is_owner}
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
  singleAudioCall: state.privateCall.singleAudioCall,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}
  
export default connect(mapStateToPros, mapDispatchToProps)(translate(AudioCallIndex));
