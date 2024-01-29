import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchPostSuggesstionStart } from "../../store/actions/HomeAction";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import VerifiedBadge from "../Handlers/VerifiedBadge";
import { translate, t } from "react-multi-lang";
import CommonCenterLoader from "../Loader/CommonCenterLoader";

const HomePageSuggesstion = (props) => {
  useEffect(() => {
    props.dispatch(fetchPostSuggesstionStart());
  }, []);
  const setting = {
    dots: false,
    infinite: false,
    speed: 500,
    vertical: true,
    arrow: true,
    verticalSwiping: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1195,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
      <Row>
        <Col sm={12} xl={5} xs={12} md={6} className="mrg-btm-xs">
          <h4 className="suggestions text-dark">{t("suggestions")}</h4>
        </Col>
        <Col sm={12} xl={7} xs={12} md={6} className="mrg-btm-xs">
          <div className="controls pull-right ">

          </div>
        </Col>
        <Col sm={12} xl={12} xs={12} md={12}>
          {props.postSug.loading ? (
            <div className="">
            {/* <CommonCenterLoader /> */} {t('loading')}
            </div>
          ) : props.postSug.data.users.length > 0 ? (
            <Slider {...setting}>
              {props.postSug.data.users.map((user) => (
                <div className="col-item" key={user.user_id}>
                  <div className="photo">
                    <div className="swiper-slide">
                      <div className="b-friend">
                        <a href={`/${user.user_unique_id}`}
                          className="link-user-profile"
                        >
                          <div className="b-friend__cover-wrapper">
                            <Image
                              src={user.cover}
                              alt={user.username}
                              className="b-friend__cover"
                            />
                          </div>
                          <div className="b-free-label">
                            {user.user_account_type_formatted}
                          </div>
                          <div className="b-friend__content">
                            <div className="b-friend__avatar">
                              {/* <span className="g-avatar online_status_class m-w150 m-border-line">
                                <Image
                                  src={user.picture}
                                  alt={user.username}
                                  className="suggest-img"
                                />
                              </span> */}
                              <div className="profile-pic">
                                <Image
                                  src={user.picture}
                                  alt={user.username}
                                  className="suggest-img"
                                />
                              </div>
                            </div>
                            <div className="b-username-row">
                              <div className="b-username m-like-link">
                                <div className="g-user-name m-lg-size m-verified">
                                  {user.name}{" "}
                                  {user.is_verified_badge == 1 ? (
                                    <VerifiedBadge />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="b-username-row">
                              <div className="b-username">
                                <div className="g-user-username">
                                  @{user.username}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            t("no_suggestions")
          )}    
        </Col>
      </Row>
  );
};

const mapStateToPros = (state) => ({
  postSug: state.home.postSug,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(HomePageSuggesstion));
