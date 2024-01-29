import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./LiveStreaming.css";
import { Link } from "react-router-dom";
import Background from '../LiveStreaming/live-streaming-bg.png';
import LiveStreamingLoader from "../Loader/LiveStreamingLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import LiveStreamingDataCard from "./LiveStreamingDataCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";

const LiveStreamingList = (props) => {

  return (
    <>
      {props.liveVideos.length > 0 ?
        <div className="most-popular-live-streaming">
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="most-popular-header-sec">
                  <h4 className="text-capitalize">{props.title}</h4>
                  {props.link ?
                    <Link to={props.link}>
                     {t("see_all")}
                    </Link>
                    : null
                  }
                </div>
                <InfiniteScroll
                  dataLength={props.liveVideos.length}
                  next={props.fetchMorePost}
                  hasMore={props.liveVideos.length < props.total &&
                    props.loadMore &&
                    props.errorCount < 2}
                  loader={<LiveStreamingLoader />}
                  style={{ height: 'auto', overflow: 'hidden' }}
                >
                  <div className="most-popular-live-box">
                    {props.liveVideos.map((live, i) =>
                      <LiveStreamingDataCard live={live} key={i} />
                    )}
                  </div>
                </InfiniteScroll>
              </Col>
            </Row>
          </Container>
        </div>
        : props.showNoData === true ? <NoDataFound /> : null
      }
    </>
  );
};

export default (translate(LiveStreamingList));
