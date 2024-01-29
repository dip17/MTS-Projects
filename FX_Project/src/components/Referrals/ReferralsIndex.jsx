import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getReferralStart } from "../../store/actions/ReferralAction";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
} from "react-share";
import "./Referrals.css";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getSuccessNotificationMessage } from "../helper/NotificationMessage";
import ReferralsLoader from "../Loader/ReferralsLoader";

const $ = window.$;

const ReferralsIndex = (props) => {
  useEffect(() => {
    props.dispatch(getReferralStart());
  }, []);

  const onCopy = () => {
    const notificationMessage = getSuccessNotificationMessage(t("link_copied"));
    props.dispatch(createNotification(notificationMessage));
  };

  return (
    <>
      <div className="referrals-sec">
        {props.referrals.loading ? (
          <ReferralsLoader />
        ) : (
          <Container>
            <h4 className="head-title">
              <Image
                src={
                  window.location.origin +
                  "/assets/images/icons/referral-friend.svg"
                }
                className="referrals-header-icons"
              />{" "}
              {t("tell_friends_about")}{" "}
              {configuration.get("configData.site_name")}
            </h4>
            <Row>
              <Col md={12}>
                <div className="referrals-box">
                  <h3>{t("referral_code_note")}</h3>
                  <div className="referrals-sub-sec">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <div className="referrals-email">
                          <InputGroup className="">
                            <FormControl
                              disabled
                              placeholder={
                                props.referrals.data.referrals_signup_url
                              }
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <CopyToClipboard
                              onCopy={onCopy}
                              text={props.referrals.data.referrals_signup_url}
                            >
                              <InputGroup.Text id="basic-addon2">
                                <button className="btn btn-referal">
                                  {t("copy_link")}
                                </button>
                              </InputGroup.Text>
                            </CopyToClipboard>
                          </InputGroup>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="referrals-social-link-sec">
                          <div className="referrals-social-link-card">
                            <div className="email-bg">
                              <EmailShareButton
                                subject={configuration.get(
                                  "configData.site_name"
                                )}
                                body={props.referrals.data.share_message}
                                className="Demo__some-network__share-button"
                                url=""
                              >
                                <EmailIcon size={32} round />
                              </EmailShareButton>
                            </div>
                            <p>{t("email")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="whatsapp-bg">
                              <WhatsappShareButton
                                url={props.referrals.data.share_message}
                                // title={props.referrals.data.share_message}
                                // separator=":: "
                                className="Demo__some-network__share-button"
                              >
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                            </div>
                            <p>{t("whatsapp")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="facebook-bg">
                              <FacebookShareButton
                                url={props.referrals.data.referrals_signup_url}
                                quote={props.referrals.data.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                            </div>
                            <p>{t("facebook")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="twitter-bg">
                              <TwitterShareButton
                                url={props.referrals.data.share_message}
                                // title={props.referrals.data.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                            </div>
                            <p>{t("twitter")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="reddit-bg">
                              <RedditShareButton
                                url={props.referrals.data.share_message}
                                // title={props.referrals.data.share_message}
                                windowWidth={660}
                                windowHeight={460}
                                className="Demo__some-network__share-button"
                              >
                                <RedditIcon size={32} round />
                              </RedditShareButton>
                            </div>
                            <p>{t("reddit")}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="referrals-count-sec">
                          <div className="referrals-card">
                            <div className="referrals-left">
                              <p>{t("total_referrals")}</p>
                            </div>
                            <div className="referrals-right">
                              <p>{props.referrals.data.total_referrals}</p>
                            </div>
                          </div>
                          <div className="referrals-card">
                            <div className="referrals-left">
                              <p>{t("referral_earnings")}</p>
                            </div>
                            <div className="referrals-right">
                              <p>
                                {
                                  props.referrals.data
                                    .referral_earnings_formatted
                                }
                              </p>
                            </div>
                          </div>
                          <div className="referrals-card">
                            <div className="referrals-left">
                              <p>{t("referee_earnings")}</p>
                            </div>
                            <div className="referrals-right">
                              <p>
                                {
                                  props.referrals.data
                                    .referee_earnings_formatted
                                }
                              </p>
                            </div>
                          </div>
                          <div className="referrals-card">
                            <div className="referrals-left">
                              <p>{t("total_credits")}</p>
                            </div>
                            <div className="referrals-right">
                              <p>{props.referrals.data.total_formatted}</p>
                            </div>
                          </div>
                          <div className="referrals-card">
                            <div className="referrals-left">
                              <p>{t("used_credits")}</p>
                            </div>
                            <div className="referrals-right">
                              <p>{props.referrals.data.used_formatted}</p>
                            </div>
                          </div>
                          <div className="referrals-card">
                            <div className="referrals-left">
                              <p>{t("remaining_credits")}</p>
                            </div>
                            <div className="referrals-right">
                              <p>{props.referrals.data.remaining_formatted}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4>{t("how_it_works_referral")}</h4>
                <div className="how-its-work-sec">
                  <div className="how-its-work-card">
                    <div classname="how-its-work-icon-sec">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/share-referal.svg"
                        }
                        className="how-its-work-icons"
                      />
                    </div>
                    <div className="how-its-work-info">
                      <h5>{t("referral_step1")}</h5>
                      <p>{t("referral_step1_content")}</p>
                    </div>
                  </div>
                  <div className="how-its-work-card">
                    <div classname="how-its-work-icon-sec">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/referral-friend.svg"
                        }
                        className="how-its-work-icons"
                      />
                    </div>
                    <div className="how-its-work-info">
                      <h5>{t("referral_step2")}</h5>
                      <p>{t("referral_step2_content")}</p>
                    </div>
                  </div>
                  <div className="how-its-work-card">
                    <div classname="how-its-work-icon-sec">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/message-1.svg"
                        }
                        className="how-its-work-icons"
                      />
                    </div>
                    <div className="how-its-work-info">
                      <h5>{t("referral_step3")}</h5>
                      <p>{t("referral_step3_content")}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  referrals: state.referral.referralDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ReferralsIndex));
