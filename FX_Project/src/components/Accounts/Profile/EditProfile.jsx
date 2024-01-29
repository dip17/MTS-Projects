import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import EditProfileIndex from "./EditProfileIndex";

const EditProfile = (props) => {

    return (
        <>
            <div className="new-settings-sec">
                <div className="new-settings-box">
                    <SettingsSidebar/>
                    <div className="new-settings-main-wrapper">
                        <EditProfileIndex/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
