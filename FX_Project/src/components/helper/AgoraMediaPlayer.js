import React, { useRef, useEffect } from "react";

const AgoraMediaPlayer = (props) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    if (props.videoTrack) {
      props.videoTrack.play(container.current, {
        mirror: props.mirror ? true : false,
      });
      return () => {
        props.videoTrack.stop();
      };
    }
  }, [container, props.videoTrack]);
  useEffect(() => {
    if (props.audioTrack) {
      props.audioTrack.play();
      return () => {
        props.audioTrack.stop();
      };
    }
  }, [props.audioTrack]);

  return (
    <div
      ref={container}
      className={props.useClassname || ""}
      style={props.videoTrack?._muted ? { width: "0px", height: "0px" } : {}}
      id={props.useId || ""}
    ></div>
  );
};

export default AgoraMediaPlayer;
