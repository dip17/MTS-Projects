import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import LiveStreamingProductCard from "./LiveStreamingProductCard";
import { translate, t } from "react-multi-lang";

const LiveStreamingStore = (props) => {
  return (
    <>
      {props.products.length > 0 ? (
        <div className="live-streaming-store-product-card">
          <div className="live-streaming-store-product-header">
            <h4 className="text-uppercase">{props.displayName}’S {t("store")}</h4>
            <Link to={`/${props.userUniqueId}`}>{("view_all")}</Link>
          </div>
          <div className="live-streaming-store-product-box">
            {props.products.map((product, i) => (
              <>
                <LiveStreamingProductCard
                  product={product}
                  key={i}
                />
              </>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default (translate(LiveStreamingStore));

