import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";
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
  liveViewerUpdateStart,
  liveVideoEndStart,
} from "../../store/actions/LiveVideoAction";
import configuration from "react-global-configuration";
const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
const $ = window.$;
AgoraRTC.setLogLevel(4); // No logs from agroa

const AgoraLive = (props) => {
  var rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };

  const localTrackState = {
    videoTrackEnabled: true,
    audioTrackEnabled: true,
  };

  var options = {
    // Pass your app ID here.
    appId: configuration.get("configData.agora_app_id"),
    // set UID
    uid: props.isOwner ? 1 : 0,
    // Set the channel name.
    channel: props.liveVideo.data.virtual_id,
    // Pass a token if your project enables the App Certificate.
    token: props.liveVideo.data.agora_token
      ? props.liveVideo.data.agora_token
      : null,
    // Set the user role in the channel. // "audience"
    role: props.isOwner ? "host" : "audience",
  };

  var remoteUsers = {};

  async function startBasicCall() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    client.setClientRole(options.role);

    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");

      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;

        remoteVideoTrack.play("agora_local");
        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }

      props.dispatch(
        liveViewerUpdateStart({
          live_video_id: props.liveVideo.data.live_video_id,
        })
      );

      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });

    const uid = await rtc.client.join(
      options.appId,
      options.channel,
      options.token || null,
      options.uid || null
    );

    if (options.role === "host") {
      // Create an audio track from the audio sampled by a microphone.
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Create a video track from the video captured by a camera.
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      // Publish the local audio and video tracks to the channel.
      rtc.localVideoTrack.play("agora_local");

      await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    }
  }

  async function leaveCall() {
    if (options.role === "host") {
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
        liveVideoEndStart({
          live_video_id: props.liveVideo.data.live_video_id,
        })
      );
    } else {
      // Leave the channel.
      await rtc.client.leave();
      window.location.assign("/live-videos");
    }
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

  startBasicCall();

  return (
    <div className="agora-card">
      <div id="agora_local" style={{ width: "100%", height: "500px" }} />
      <div className="button-group mt-3 mb-3">
        {props.isOwner ? (
          <>
            <div className="live-action-icon-sec">
              <ul className="list-unstyled live-action-flex">
                <Media as="li">
                  <Link to="#" onClick={() => leaveCall()}>
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
                <Link to="#" onClick={() => leaveCall()}>
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/end-stream.png"
                    }
                    className="action-live-icon"
                  />
                </Link>
              </Media>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToPros = (state) => ({
  liveVideo: state.liveVideo.singleLiveVideo,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AgoraLive));
