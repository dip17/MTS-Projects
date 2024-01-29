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
  endAudioCallStart,
  joinAudioCallStart,
} from "../../store/actions/PrivateCallAction";
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
const $ = window.$;
AgoraRTC.setLogLevel(4); // No logs from agroa

const AgoraOnetoOneAudioCall = (props) => {
  var rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    // localVideoTrack: null,
  };

  var localTracks = {
    audioTrack: null,
  };

  var localTrackState = {
    audioTrackEnabled: true,
  };

  var options = {
    // Pass your app ID here.
    appId: configuration.get("configData.agora_app_id"),
    // Set the channel name.
    channel: props.audioCallData.virtual_id,
    // Pass a token if your project enables the App Certificate.
    token: props.audioCallData.agora_token,
    uid: 0,
  };

  var remoteUsers = {};

  async function startBasicCall() {
    // Create an AgoraRTCClient object.
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    rtc.client.on("user-published", handleUserPublished);
    rtc.client.on("user-unpublished", handleUserUnpublished);

    [options.uid, localTracks.audioTrack] = await Promise.all([
      // join the channel
      await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        null
      ),
      // create local tracks, using microphone and camera
      (rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()),
    ]);

    await rtc.client.publish([rtc.localAudioTrack]);

    console.log("publish success!");

    props.dispatch(
      joinAudioCallStart({
        audio_call_request_id: props.audioCallData.audio_call_request_id,
      })
    );
  }

  async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");
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
      // Destroy the local audio track.
      rtc.localAudioTrack.close();

      // Leave the channel.
      await rtc.client.leave();
      props.dispatch(
        endAudioCallStart({
          audio_call_request_id: props.audioCallData.audio_call_request_id,
        })
      );
    } else {
      // Leave the channel.
      await rtc.client.leave();
    }

    window.location.assign("/audio-calls-history");
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

  console.log(props.isOwner);
  return (
    <div className="agora-card">
      <div>
        <Col sm={12} xs={12} md={4}>
          <div id="local-player" style={{ width: "280px", height: "400px" }}>
            <img
              style={{ width: "280px", height: "400px" }}
              src={props.audioCallData.model_picture}
            />
          </div>
        </Col>
        <Col sm={12} xs={12} md={8}>
          <div
            id="remote-playerlist"
            style={{ width: "825px", height: "400px" }}
          >
            <img
              style={{ width: "825px", height: "400px", objectFit: "contain" }}
              src={props.audioCallData.user_picture}
            />
          </div>
        </Col>
      </div>
      <div className="button-group mt-3 mb-3">
        <Col sm={12} xs={12} md={3}>
          {props.isOwner ? (
            <>
              <div className="live-action-icon-sec">
                <ul className="list-unstyled live-action-flex">
                  <Media as="li">
                    <Link to="#" onClick={() => leaveCall(props.isOwner)}>
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
                </ul>
              </div>
            </>
          ) : (
            <div className="live-action-icon-sec">
              <ul className="list-unstyled live-action-flex">
                <Media as="li">
                  <Link to="#" onClick={() => leaveCall(props.isOwner)}>
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
        </Col>
      </div>
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
)(translate(AgoraOnetoOneAudioCall));
