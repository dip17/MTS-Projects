import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./NewChat.css";
import { Link } from "react-router-dom";
import NewChatUserDetails from "./NewChatUserDetails";
import NewChatUserMedia from "./NewChatUserMedia";

const NewChatUserInfo = (props) => {

    return (
        <>
            <NewChatUserDetails selectedUser={props.selectedUser} />
            <NewChatUserMedia selectedUser={props.selectedUser} />
        </>
    );
};

export default NewChatUserInfo;
