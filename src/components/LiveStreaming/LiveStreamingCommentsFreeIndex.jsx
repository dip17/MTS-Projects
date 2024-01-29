import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import LiveStreamingCommentsUserFreeList from "./LiveStreamingCommentsUserFreeList";
import LiveStreamingComments from "./LiveStreamingComments";

const LiveStreamingCommentsFreeIndex = (props) => {

    return (
        <>
            <div className="live-streaming-user-card-right">
                <LiveStreamingCommentsUserFreeList/>
                <LiveStreamingComments/>
            </div>
        </>
    );
};

export default LiveStreamingCommentsFreeIndex;
