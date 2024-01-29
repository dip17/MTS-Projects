import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import LiveStreamingPaymentModal from '../Model/PaymentModal/LiveStreamingPaymentModal';
import { translate, t } from "react-multi-lang";


const LiveStreamingDataCard = (props) => {
  const { live } = props;

  const [liveStreamingPaymentModal, setLiveStreamingPaymentModal] = useState(false);

  const closeLiveStreamingPayment = () => {
    setLiveStreamingPaymentModal(false);
  }

  return (
    <>
      <div className="most-popular-live-card">
        <div className="most-popular-thumbnail-img-sec">
          <Image
            className="most-popular-thumbnail-img"
            src={live.snapshot}
          />
        </div>
        <div className="most-popular-list-sec">
          <ul className="list-unstyled">
            {live.recent_viewers.length === 3 ?
              <Media as="li" className="total-count">
                <div className="live-list-count">
                  <span>{live.viewer_cnt_formatted}</span>
                </div>
              </Media> : null
            }
            {live.recent_viewers.map((viewer, i) =>
              <Media as="li" className={`user-${3 - i}`}>
                <Image
                  className="live-list-img"
                  src={viewer.picture}
                />
              </Media>
            )}
          </ul>
        </div>
        <div className="most-popular-user-info-card">
          <div className="most-popular-user-info">
            <Image
              className="most-popular-user-img"
              src={live.user_picture}
            />
            <div className="most-popular-user-details">
              <h4>{live.user_displayname}
                <span>
                  <Image
                    className="sidebar-verified-icon"
                    src={
                      window.location.origin + "/assets/images/new-home/verified-icon.svg"
                    }
                  />
                </span>
              </h4>
              <Link to={`/${live.username}`} className="most-popular-user-name">
                @{live.username}
              </Link>
            </div>
          </div>
          <div className="most-popular-user-btn-sec">
            {live.is_user_needs_to_pay === 1 ?
              <Button className="join-now-btn hoverColor">
               {t("join_now")}
              </Button>
              : <Link className="join-now-btn hoverColor" to={`/join-live/${live.live_video_unique_id}`}>
                {t("join_now")}
              </Link>
            }
          </div>
        </div>
        <div className="most-popular-product-info">
          <h3>
            {live.title}
          </h3>
        </div>
        {live.is_user_needs_to_pay === 1 ?
          <div className="most-popular-lock-sec" onClick={() => setLiveStreamingPaymentModal(true)}>
            <Image
              className="most-popular-lock-icon"
              src={
                window.location.origin + "/assets/images/live-streaming/lock-icon.png"
              }
            />
            <h2>{live.amount_formatted}</h2>
          </div>
          : null
        }
      </div>
      {live.is_user_needs_to_pay === 1 && liveStreamingPaymentModal ?
        <LiveStreamingPaymentModal
          paymentsModal={liveStreamingPaymentModal}
          live={live}
          closepaymentsModal={closeLiveStreamingPayment}
        />
        : null}
    </>
  )
}

export default (translate(LiveStreamingDataCard));