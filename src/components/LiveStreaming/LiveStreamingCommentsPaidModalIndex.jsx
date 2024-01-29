import React, { useState } from "react";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import LiveStreamingCommentsPaidModalList from "./LiveStreamingCommentsPaidModalList";
import LiveStreamingComments from "./LiveStreamingComments";

const LiveStreamingCommentsPaidModalIndex = (props) => {

    return (
        <>
            <div className="live-streaming-user-card-right">
                <LiveStreamingCommentsPaidModalList/>
                <LiveStreamingComments/>
            </div>
        </>
    );
};

export default LiveStreamingCommentsPaidModalIndex;
