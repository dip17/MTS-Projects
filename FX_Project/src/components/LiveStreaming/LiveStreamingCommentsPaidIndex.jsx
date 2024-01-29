import React, { useState } from "react";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import LiveStreamingCommentsUserPaidList from "./LiveStreamingCommentsUserPaidList";
import LiveStreamingComments from "./LiveStreamingComments";

const LiveStreamingCommentsPaidIndex = (props) => {

    return (
        <>
            <div className="live-streaming-user-card-right">
                <LiveStreamingCommentsUserPaidList />
                <LiveStreamingComments />
            </div>
        </>
    );
};

export default LiveStreamingCommentsPaidIndex;
