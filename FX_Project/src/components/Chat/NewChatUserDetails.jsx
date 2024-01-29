import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./NewChat.css";
import { Link } from "react-router-dom";
import CustomLazyLoad from "../helper/CustomLazyLoad";

const NewChatUserDetails = (props) => {

  return (
    <>
      <div className="new-chat-user-info-card">
        <div className="new-chat-user-info-cover-img-sec">
          <CustomLazyLoad
            src={props.selectedUser.cover}
            className={"new-chat-user-info-cover-img-sec"}
          />
        </div>
        <div className="new-chat-user-info-img-sec">
          <CustomLazyLoad
            src={props.selectedUser.picture}
            className={"new-chat-user-info-img"}
          />
        </div>
        <div className="new-chat-user-info-item">
          <div>
            <h4>{props.selectedUser.name}
              {props.selectedUser.is_verified_badge == 1 ? <span>
                <Image
                  className="sidebar-verified-icon"
                  src={
                    window.location.origin + "/assets/images/new-home/verified-icon.svg"
                  }
                />
              </span>
                : null
              }
            </h4>
            <Link to={`/${props.selectedUser.username}`}>
              @{props.selectedUser.username}
            </Link>
          </div>
          {/* <div className="audio-total-count-info-box">
            <div className="audio-total-count-card">
              <h5>
                {props.selectedUser.total_posts}
              </h5>
              <p>POST</p>
            </div>
            <div className="audio-total-count-card">
              <h5>
                {props.selectedUser.total_followers}
              </h5>
              <p>FANS</p>
            </div>
            <div className="audio-total-count-card">
              <h5>
                {props.selectedUser.total_followings}
              </h5>
              <p>FOLLOWING</p>
            </div>
          </div> */}
          {/* <div className="view-details-btn-sec">
            <Link to="#" className="view-details-btn">
              View Details
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default NewChatUserDetails;
