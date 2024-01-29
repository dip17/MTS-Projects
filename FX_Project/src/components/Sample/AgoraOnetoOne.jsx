import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Media,
  Image,
} from "react-bootstrap";
import {
  endVideoCallStart,
  fetchSingleVideoCallStart,
  joinVideoCallStart,
} from "../../store/actions/PrivateCallAction";
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
const $ = window.$;
AgoraRTC.setLogLevel(4); // No logs from agroa

const AgoraOnetoOne = (props) => {
  var rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };

  var localTracks = {
    videoTrack: null,
    audioTrack: null,
  };

  var localTrackState = {
    videoTrackEnabled: true,
    audioTrackEnabled: true,
  };

  var options = {
    // Pass your app ID here.
    appId: configuration.get("configData.agora_app_id"),
    // Set the channel name.
    channel: props.videoCallData.virtual_id,
    // Pass a token if your project enables the App Certificate.
    token: props.videoCallData.agora_token,
    uid: 0,
  };

  var remoteUsers = {};

  async function startBasicCall() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    rtc.client.on("user-published", handleUserPublished);
    rtc.client.on("user-unpublished", handleUserUnpublished);

    [options.uid, localTracks.audioTrack, localTracks.videoTrack] =
      await Promise.all([
        // join the channel
        await rtc.client.join(
          options.appId,
          options.channel,
          options.token,
          null
        ),
        // create local tracks, using microphone and camera
        (rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()),
        (rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack()),
      ]);

    localTracks.videoTrack.play("local-player");

    await rtc.client.publish(Object.values(localTracks));

    // Publish the local audio and video tracks to the channel.
    // await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

    console.log("publish success!");

    props.dispatch(
      joinVideoCallStart({
        video_call_request_id: props.videoCallData.video_call_request_id,
      })
    );
  }

  async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack;
      remoteVideoTrack.play("remote-playerlist");
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  }

  function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  }

  function handleUserUnpublished(user) {
    // const id = user.uid;
    // delete remoteUsers[id];
    // $(`#player-wrapper-${id}`).remove();
  }

  startBasicCall();

  async function leaveCall(is_owner) {
    if (is_owner) {
      // Destroy the local audio and video tracks.
      rtc.localAudioTrack.close();
      rtc.localVideoTrack.close();

      // Traverse all remote users.
      rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV container.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
      });
      props.dispatch(
        endVideoCallStart({
          video_call_request_id: props.videoCallData.video_call_request_id,
        })
      );
    } else {
      // Leave the channel.
      await rtc.client.leave();
    }

    window.location.assign("/video-calls-history");
  }

  async function muteAudio() {
    if (!rtc.localAudioTrack) return;
    if (localTrackState.audioTrackEnabled == true) {
      await rtc.localAudioTrack.setEnabled(false);
      localTrackState.audioTrackEnabled = false;
      $("#mute-audio").hide();
      $("#unmute-audio").show();
    } else {
      await rtc.localAudioTrack.setEnabled(true);
      localTrackState.audioTrackEnabled = true;
      $("#mute-audio").show();
      $("#unmute-audio").hide();
    }
  }

  async function muteVideo() {
    if (!rtc.localVideoTrack) return;
    if (localTrackState.videoTrackEnabled == true) {
      await rtc.localVideoTrack.setEnabled(false);
      localTrackState.videoTrackEnabled = false;
      $("#mute-video").hide();
      $("#unmute-video").show();
    } else {
      await rtc.localVideoTrack.setEnabled(true);
      localTrackState.videoTrackEnabled = true;
      $("#mute-video").show();
      $("#unmute-video").hide();
    }
  }
  console.log(props.isOwner);
  return (
    <div className="agora-card">
      <div>
        <Col sm={12} xs={12} md={3}>
          <div id="local-player" style={{ width: "280px", height: "400px" }} />
        </Col>
        <Col sm={12} xs={12} md={9}>
          <div
            id="remote-playerlist"
            style={{ width: "825px", height: "400px" }}
          />
        </Col>
      </div>
      <div className="button-group mt-3 mb-3">
        <Col sm={12} xs={12} md={3}>
          {props.isOwner ? (
            <>
              <div className="live-action-icon-sec">
                <ul className="list-unstyled live-action-flex">
                  <Media as="li">
                    <Link
                      to="#"
                      onClick={() => {
                        if (window.confirm(t("leave_call_confirmation"))) {
                          leaveCall(props.isOwner);
                        }
                      }}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/end-stream.png"
                        }
                        className="action-live-icon"
                      />
                    </Link>
                  </Media>
                  <Media as="li" id="mute-audio">
                    <Link to="#" onClick={() => muteAudio()}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/audio.png"
                        }
                        className="action-live-icon"
                      />
                    </Link>
                  </Media>
                  <Media as="li" id="unmute-audio" style={{ display: "none" }}>
                    <Link to="#" onClick={() => muteAudio()}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/no-audio.png"
                        }
                        className="action-live-icon"
                      />
                    </Link>
                  </Media>
                  <Media as="li" id="mute-video">
                    <Link to="#" onClick={() => muteVideo()}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/video.png"
                        }
                        className="action-live-icon"
                      />
                    </Link>
                  </Media>
                  <Media as="li" id="unmute-video" style={{ display: "none" }}>
                    <Link to="#" onClick={() => muteVideo()}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/mute-video.png"
                        }
                        className="action-live-icon"
                      />
                    </Link>
                  </Media>
                </ul>
              </div>
            </>
          ) : (
            <div className="live-action-icon-sec">
              <ul className="list-unstyled live-action-flex">
                <Media as="li">
                  <Link
                    to="#"
                    onClick={() => {
                      if (window.confirm(t("leave_call_confirmation"))) {
                        leaveCall(props.isOwner);
                      }
                    }}
                  >
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/end-stream.png"
                      }
                      className="action-live-icon"
                    />
                  </Link>
                </Media>
                <Media as="li" id="mute-audio">
                  <Link to="#" onClick={() => muteAudio()}>
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/audio.png"
                      }
                      className="action-live-icon"
                    />
                  </Link>
                </Media>
                <Media as="li" id="unmute-audio" style={{ display: "none" }}>
                  <Link to="#" onClick={() => muteAudio()}>
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/no-audio.png"
                      }
                      className="action-live-icon"
                    />
                  </Link>
                </Media>
                <Media as="li" id="mute-video">
                  <Link to="#" onClick={() => muteVideo()}>
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/video.png"
                      }
                      className="action-live-icon"
                    />
                  </Link>
                </Media>
                <Media as="li" id="unmute-video" style={{ display: "none" }}>
                  <Link to="#" onClick={() => muteVideo()}>
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/mute-video.png"
                      }
                      className="action-live-icon"
                    />
                  </Link>
                </Media>
              </ul>
            </div>
          )}
        </Col>
      </div>

      {/* <div className="button-group">
                
                <Button 
                    id="mute-audio"  
                    type="button" 
                    className="save-btn"
                    onClick={() =>
                        muteAudio()
                    }
                >
                    Mute Audio
                </Button>
                <Button 
                    id="mute-video" 
                    type="button" 
                    onClick={() =>
                        muteVideo()
                    }
                    className="save-btn"
                >
                    Mute Video
                </Button>

                <Button
                    className="save-btn"
                    type="submit"
                    onClick={() =>
                        leaveCall(props.isOwner)
                    }
                >
                    {props.isOwner ? "End Streaming" : "Leave" }
                </Button>
                
                
            </div> */}
    </div>
  );
};

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AgoraOnetoOne));
