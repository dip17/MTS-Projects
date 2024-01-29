import React, { Component } from "react";
import WebrtcVideoPlayer from "./WebrtcVideoPlayer";

export default class VideoConnecting extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    console.log("Video connecting called");
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div>
            <div className="col-md-6 eachvideo">
              <div className="embed-responsive embed-responsive-16by9">
                <WebrtcVideoPlayer
                  streamManager={this.props.streamManager}
                  key={this.props.streamManager.stream.id}
                  // takePhoto={this.props.takePhoto}
                />
              </div>

              <div className="Spacer-10"></div>

              <div className="row broadcast-video">
                <div className="col-md-6">
                  {this.props.streamManager.type == "local" ? (
                    <>
                      {this.props.customizeData.videoMute ? (
                        <button
                          className="btn bn-actions"
                          onClick={this.props.muteVideo}
                        >
                          <i className="fas fa-video icon"></i>
                          {/* Mute Video */}
                        </button>
                      ) : null}
                      {this.props.customizeData.videoUnmute ? (
                        <button
                          className="btn bn-actions"
                          onClick={this.props.unmuteVideo}
                        >
                          <i className="fas fa-video-slash icon"></i>

                          {/* unMute Video */}
                        </button>
                      ) : null}
                      {this.props.customizeData.audioMute ? (
                        <button
                          type="submit"
                          className="btn bn-actions"
                          onClick={this.props.muteAudio}
                        >
                          <i className="fas fa-microphone icon"></i>
                          {/* Mute Audio */}
                        </button>
                      ) : null}

                      {this.props.customizeData.audioUnmute ? (
                        <button
                          className="btn bn-actions"
                          type="submit"
                          onClick={this.props.unmuteAudio}
                        >
                          <i className="fas fa-microphone-slash icon"></i>

                          {/* Un Mute Audio */}
                        </button>
                      ) : null}

                      <button
                        type="submit"
                        className="btn bn-actions"
                        onClick={() =>
                          this.props.stopStreaming(this.props.streamManager)
                        }
                      >
                        <i className="fas fa-stop-circle icon"></i>
                        {/* Stop streaming */}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
