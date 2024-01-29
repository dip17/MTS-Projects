import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "../NewHome.css";
import "./NewSingleComment.css";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import ReactPlayer from "react-player";
import FancyBox from "../NewSingleView/FancyBox";
import { useHistory } from "react-router";
import PPVPaymentModal from "../../Model/PaymentModal/PPVPaymentModal";
import ReactAudioPlayer from "react-audio-player";

const NewSinglePostSlider = (props) => {
  const history = useHistory();
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const { post } = props;

  const [paymentModal, setPaymentModal] = useState(false);

  const closePaymentModal = () => {
    setPaymentModal(false);
  }

  const redirectToProfile = () => {
    history.push(`/${post.user.unique_id}`);
  }


  return (
    <>
      <div className="new-feed-body-sec">
        <FancyBox>
          <AutoplaySlider
            organicArrows={false}
            bullets={true}
            play={false}
            cancelOnInteraction={false}
            interval={6000}
            mobileTouch={true}
          >
            {post.postFiles && post.postFiles.length > 0 ?
              post.postFiles.map((postFile, index) =>
                postFile.file_type === "image" ?
                  <div>
                    {post.payment_info.is_user_needs_pay == 1 ?
                      <div
                        onClick={e =>
                          post.payment_info.post_payment_type === "ppv" ?
                            setPaymentModal(true)
                            : post.payment_info.post_payment_type === "subscription" ?
                              redirectToProfile()
                              : e.preventDefault()
                        }
                      >
                        <Image
                          className="single-post-img"
                          src={postFile.post_file}
                        // style={{ filter: "blur(20px)" }}
                        />
                        <div className="post-lock-icon-sec">
                          <Image
                            className="profile-lock-icon"
                            src={
                              window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                            }
                          />
                        </div>
                      </div>
                      : <Image
                        className="single-post-img"
                        src={postFile.post_file}
                        data-fancybox
                      />
                    }
                  </div>
                  : postFile.file_type === "video" ?
                    <div>
                      {post.payment_info.is_user_needs_pay == 1 ?
                        <div
                          onClick={e =>
                            post.payment_info.post_payment_type === "ppv" ?
                              setPaymentModal(true)
                              : post.payment_info.post_payment_type === "subscription" ?
                                redirectToProfile()
                                : e.preventDefault()
                          }
                        >
                          {postFile.video_preview_file ?
                            <ReactPlayer
                              url={postFile.video_preview_file}
                              controls={false}
                              width="100%"
                              height="100%"
                              playing={true}
                              loop={true}
                              muted={true}
                              autoplay={true}
                              controlsList={"nodownload"}
                              className="post-video-size video-bg-black"
                            />
                            :
                            <Image className="single-post-img"
                              src={
                                postFile.preview_file
                                  ? postFile.preview_file
                                  : postFile.post_file
                              }
                              data-fancybox />
                          }
                          <div className="post-lock-icon-sec">
                            <Image
                              className="profile-lock-icon"
                              src={
                                window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                              }
                            />
                          </div>
                        </div>
                        : <ReactPlayer
                          // light={postFile.preview_file}
                          url={postFile.post_file}
                          controls={true}
                          width="100%"
                          height="100%"
                          playing={true}
                          muted={true}
                          autoplay={true}
                          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                          className="post-video-size video-bg-black"
                        />
                      }
                    </div>
                    : postFile.file_type === "audio" ?
                      <div>
                        {post.payment_info.is_user_needs_pay == 1 ?
                          <div
                            onClick={e =>
                              post.payment_info.post_payment_type === "ppv" ?
                                setPaymentModal(true)
                                : post.payment_info.post_payment_type === "subscription" ?
                                  redirectToProfile()
                                  : e.preventDefault()
                            }
                          >
                            <Image className="single-post-img"
                              src={postFile.preview_file
                                ? postFile.preview_file
                                : postFile.post_file}
                              data-fancybox />
                            <div className="post-lock-icon-sec">
                              <Image
                                className="profile-lock-icon"
                                src={
                                  window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                }
                              />
                            </div>
                          </div>
                          :
                          <div className="single-post-audio-sec">
                            <Image className="single-post-img"
                              src={postFile.preview_file ? postFile.preview_file : window.location.origin + "/assets/images/new-home/icon/audio-icon.png"}
                            />
                            <ReactAudioPlayer
                              // light={postFile.preview_file}
                              src={postFile.post_file}
                              // file="forceAudio"
                              controls={true}
                              width="100%"
                              height="100%"
                              autoPlay={false}
                              className="single-post-audio"
                              controlsList={"nodownload"}
                            />
                          </div>
                        }
                      </div>
                      : null
              )
              : null
            }
          </AutoplaySlider>
        </FancyBox>
      </div>
      {paymentModal ?
        <PPVPaymentModal
          PPVPayment={paymentModal}
          closePPVPaymentModal={closePaymentModal}
          post={post}
          username={post.username}
          userPicture={post.user_picture}
          name={post.user_displayname}
          post_id={post.post_id}
          user_id={post.user_id}
          amount={post.amount}
          amount_formatted={post.amount_formatted}
        />
        : null
      }
    </>
  );
};

function areEqual(prevProps, nextProps) {
  return prevProps.postId === nextProps.postId
}

export default React.memo(NewSinglePostSlider, areEqual);
