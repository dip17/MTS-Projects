import React, { useEffect, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "./LiveStreaming.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import AgoraRTC from "agora-rtc-sdk-ng";
import { liveVideoEndStart } from "../../store/actions/LiveVideoAction";
import configuration from "react-global-configuration";
import useAgoraRTC from "../../hooks/useAgoraRTC";
import AgoraMediaPlayer from "../helper/AgoraMediaPlayer";

const rtcclient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const LiveStreamingCard = (props) => {
  const {
    localAudioTrack,
    localVideoTrack,
    leaveRtcChannel,
    join,
    joinState,
    remoteUsers,
    isStreamEnded,
    muteAudio,
    muteVideo,
    mediaStatus,
    toggleFullScreen,
  } = useAgoraRTC(rtcclient);

  // async function startBasicCall() {
  //   try {
  //     rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  //     client.setClientRole(options.role);

  //     rtc.client.on("user-unpublished", async (user, mediaType) => {
  //       if (mediaType === "video") {
  //         $("#agora_local").hide();
  //         $("#agora_profile_placeholder").show();
  //       }
  //     });

  //     rtc.client.on("user-published", async (user, mediaType) => {
  //       // Subscribe to a remote user.
  //       await rtc.client.subscribe(user, mediaType);
  //       console.log("subscribe success");

  //       // If the subscribed track is video.
  //       if (mediaType === "video") {
  //         $("#agora_local").show();
  //         $("#agora_profile_placeholder").hide();
  //         // Get `RemoteVideoTrack` in the `user` object.
  //         const remoteVideoTrack = user.videoTrack;

  //         remoteVideoTrack.play("agora_local", { fit: "cover", mirror: true });
  //         // Or just pass the ID of the DIV container.
  //         // remoteVideoTrack.play(playerContainer.id);
  //       }

  //       props.dispatch(
  //         liveViewerUpdateStart({
  //           live_video_id: props.liveVideoDetails.live_video_id,
  //         })
  //       );

  //       // If the subscribed track is audio.
  //       if (mediaType === "audio") {
  //         // Get `RemoteAudioTrack` in the `user` object.
  //         const remoteAudioTrack = user.audioTrack;
  //         // Play the audio track. No need to pass any DOM element.
  //         remoteAudioTrack.play();
  //       }
  //     });

  //     const uid = await rtc.client.join(options.appId, options.channel, options.token || null, options.uid || null);

  //     if (options.role === "host") {

  //       // Create an audio track from the audio sampled by a microphone.
  //       rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  //       // Create a video track from the video captured by a camera.
  //       rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  //       // Publish the local audio and video tracks to the channel.
  //       rtc.localVideoTrack.play("agora_local", { fit: "cover", mirror: true });

  //       await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  //     }
  //   }
  //   catch (exception) {
  //     console.log(exception);
  //   }

  // }

  // async function leaveCall() {

  //   if (options.role === "host") {
  //     // Destroy the local audio and video tracks.
  //     rtc.localAudioTrack.close();
  //     rtc.localVideoTrack.close();

  //     // Traverse all remote users.
  //     rtc.client.remoteUsers.forEach(user => {
  //       // Destroy the dynamically created DIV container.
  //       const playerContainer = document.getElementById(user.uid);
  //       playerContainer && playerContainer.remove();
  //     });

  //     props.dispatch(
  //       liveVideoEndStart({
  //         live_video_id: props.liveVideoDetails.live_video_id,
  //         // s3_file: s3_file,
  //       })
  //     );
  //   } else {
  //     // Leave the channel.
  //     await rtc.client.leave();
  //     window.location.assign("/live-videos");
  //   }
  // }

  // async function muteAudio() {
  //   if (!rtc.localAudioTrack) return;
  //   if (localTrackState.audioTrackEnabled == true) {
  //     await rtc.localAudioTrack.setEnabled(false);
  //     localTrackState.audioTrackEnabled = false;
  //     $("#mute-audio").hide();
  //     $("#unmute-audio").show();
  //   } else {
  //     await rtc.localAudioTrack.setEnabled(true);
  //     localTrackState.audioTrackEnabled = true;
  //     $("#mute-audio").show();
  //     $("#unmute-audio").hide();
  //   }
  // }

  // async function muteVideo() {
  //   if (!rtc.localVideoTrack) return;
  //   if (localTrackState.videoTrackEnabled == true) {
  //     await rtc.localVideoTrack.setEnabled(false);
  //     localTrackState.videoTrackEnabled = false;
  //     $("#mute-video").hide();
  //     $("#unmute-video").show();
  //     $("#agora_local").hide();
  //     $("#agora_profile_placeholder").show();
  //   } else {
  //     await rtc.localVideoTrack.setEnabled(true);
  //     localTrackState.videoTrackEnabled = true;
  //     $("#mute-video").show();
  //     $("#unmute-video").hide();
  //     $("#agora_local").show();
  //     $("#agora_profile_placeholder").hide();
  //   }
  // }

  // async function fullScreen() {
  //   if (localTrackState.fullScreenEnabled == true) {
  //     //localTrackState.fullScreenEnabled = false;
  //     $("#video-container").addClass("live-streaming-card");
  //     $("#video-container").removeClass("full-streaming-card");
  //     $("#agora_local").toggleClass("agora-container-full");
  //     $("#agora_profile_placeholder").toggleClass("live-streaming-full-bg-img-sec");
  //     document.body.style.overflow = "auto";
  //   } else {
  //    // localTrackState.fullScreenEnabled = true;
  //     $("#video-container").addClass("full-streaming-card");
  //     $("#video-container").removeClass("live-streaming-card");
  //     $("#agora_local").toggleClass("agora-container-full");
  //     $("#agora_profile_placeholder").toggleClass("live-streaming-full-bg-img-sec");
  //     document.body.style.overflow = "hidden";
  //   }
  // }

  const handleJoin = () => {
    let joinResponse = join(
      configuration.get("configData.agora_app_id"),
      props.liveVideoDetails.virtual_id,
      props.liveVideoDetails.agora_token
        ? props.liveVideoDetails.agora_token
        : null,
      props.isOwner === true ? "host" : "audience",
      "live"
    );
  };

  const history = useHistory();

  useEffect(() => {
    handleJoin();

    return () => {
      if (window.confirm("Are you sure? want to leave the stream?")) {
        console.log(history.location);
        window.location.assign(history.location.pathname);
      }
    };
  }, []);

  useEffect(() => {
    if (isStreamEnded) {
      props.dispatch(
        liveVideoEndStart({
          live_video_id: props.liveVideoDetails.live_video_id,
          isOwner: props.isOwner,
        })
      );
    }
  }, [isStreamEnded]);

  const leaveCall = async () => {
    await leaveRtcChannel(props.isOwner);
  };

  return (
    <>
      <div
        className={
          mediaStatus.video.fullScreen
            ? "full-streaming-card"
            : "live-streaming-card"
        }
        id="video-container"
        style={{ backgroundImage: `url(${props.liveVideoDetails.snapshot})` }}
      >
        {/* <div id="agora_local" className="agora-container" /> */}
        {props.isOwner && joinState && (
          <AgoraMediaPlayer
            videoTrack={localVideoTrack}
            useClassname={
              mediaStatus.video.fullScreen
                ? "agora-container-full"
                : "agora-container"
            }
            useId="agora_local"
            mirror={true}
          ></AgoraMediaPlayer>
        )}

        {remoteUsers.length > 0 &&
          remoteUsers.map((user) => (
            <AgoraMediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
              useClassname={
                mediaStatus.video.fullScreen
                  ? "agora-container-full"
                  : "agora-container"
              }
              useId="agora_local"
              mirror={true}
            ></AgoraMediaPlayer>
          ))}

        <div
          className="live-streaming-bg-img-sec"
          id="agora_profile_placeholder"
          style={{ display: "none" }}
        >
          <Image
            className="live-streaming-bg-img"
            src={props.liveVideoDetails.snapshot}
          />
        </div>

        {props.isOwner ? (
          joinState && (
            <>
              <div className="live-streaming-close-btn-sec">
                <Button className="close-btn" onClick={() => leaveCall()}>
                  <Image
                    className="close-btn-icon"
                    src={
                      window.location.origin +
                      "/assets/images/live-streaming/close.svg"
                    }
                  />
                  <span>{t("close")}</span>
                </Button>
              </div>
              <div className="live-streaming-modal-action-btn-sec">
                <ul className="list-unstyled">
                  <Media as="li">
                    <Button
                      className="modal-action-btn"
                      onClick={() => muteAudio()}
                    >
                      {mediaStatus.audio.muted ? (
                        <Image
                          className="modal-action-btn-icon"
                          src={
                            window.location.origin +
                            "/assets/images/live-streaming/audio-mute.svg"
                          }
                          //  id="mute-audio"
                        />
                      ) : (
                        <Image
                          className="modal-action-btn-icon"
                          src={
                            window.location.origin +
                            "/assets/images/live-streaming/audio-icon.svg"
                          }
                          // id="unmute-audio"
                          //  style={{ display: "none" }}
                        />
                      )}
                    </Button>
                  </Media>
                  <Media as="li">
                    <Button
                      className="modal-action-btn"
                      onClick={() => muteVideo()}
                    >
                      {mediaStatus.video.muted ? (
                        <Image
                          className="modal-action-btn-icon"
                          src={
                            window.location.origin +
                            "/assets/images/live-streaming/video-hide.svg"
                          }
                          //id="mute-video"
                        />
                      ) : (
                        <Image
                          className="modal-action-btn-icon"
                          src={
                            window.location.origin +
                            "/assets/images/live-streaming/video.svg"
                          }
                          // style={{ display: "none" }}
                          // id="unmute-video"
                        />
                      )}
                    </Button>
                  </Media>
                  {/* <Media as="li">
                <Button className="modal-action-btn">
                  <Image
                    className="modal-action-btn-icon"
                    src={
                      window.location.origin + "/assets/images/live-streaming/refresh-icon.svg"
                    }
                  />
                </Button>
              </Media> */}
                </ul>
              </div>
            </>
          )
        ) : (
          <div
            className="live-streaming-send-tip-sec"
            onClick={() => props.setTipModal(true)}
          >
            <Image
              className="live-streaming-send-tip-icon"
              src={
                window.location.origin +
                "/assets/images/live-streaming/send-tip.svg"
              }
            />
            <Button className="send-tip-btn hoverColor">{t("send_tips")}</Button>
          </div>
        )}
        <div className="live-streaming-full-screen-sec">
          <Button className="close-btn" onClick={() => toggleFullScreen()}>
            <Image
              className="live-streaming-full-screen-icon"
              src={
                window.location.origin +
                "/assets/images/live-streaming/full-screen.svg"
              }
            />
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  // liveVideo: state.liveVideo.singleLiveVideo,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingCard));
