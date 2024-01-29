import React, { Component } from "react";

export default class WebrtcVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    console.log("Props,", this.props);
    console.log("Props,", this.videoRef);
    if (this.props && !!this.videoRef) {
      console.log("componentDidMount");
      this.videoRef.current.srcObject = this.props.streamManager.stream;
      this.videoRef.current.muted = true;
      if (this.props.streamManager.type == "local") {
        this.videoRef.current.volume = 0;
      }
    }
  }

  render() {
    return (
      <video
        autoPlay={true}
        ref={this.videoRef}
        // className="broadcast-video"
        className="video-fluid"
      />
    );
  }
}
