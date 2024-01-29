import React, { useState, useEffect } from "react";
import { Row, Col, Image, Container, Media } from "react-bootstrap";
import "./Explore.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { fetchExploreStart } from "../../../store/actions/PostAction";
import ExplorePostCard from "./ExplorePostCard";
import { translate, t } from "react-multi-lang";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { apiConstants } from "../../Constant/constants";
import ExploreLoader from "../../Loader/ExploreLoader";

const Explore = (props) => {
  useEffect(() => {
    props.dispatch(fetchExploreStart());
  }, []);

  let autocomplete;

  const renderAutoComplete = () => {
    const { google } = props;
    if (!google) {
      console.log("asdfsadfasdfno");
      return;
    }

    autocomplete = new google.maps.places.Autocomplete(autocomplete, {
      types: ["geocode"],
    });

    autocomplete.setFields(["address_component", "geometry", "name"]);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Place", place);
      if (!place.geometry) return;
      let full_address = "";
      place.address_components.map(
        (address) =>
          (full_address =
            full_address == ""
              ? address.long_name
              : full_address + "," + address.long_name)
      );

      props.dispatch(
        fetchExploreStart({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        })
      );
    });
  };

  return (
    <>
      <div className="live-streaming-post-sec">
        {/* <Container> */}
        <Row className="no-gutters">
          <div className="profile-post-area">
            <div className="bookmarkes-list bookmarks-right-side resp-sapce-center">
              <div className="pull-left">
                <Link className="bookmarkes-list notify-title" to={`/home`}>
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/back.svg"
                    }
                    className="svg-clone"
                  />
                  {t("explore")}
                </Link>
              </div>
            </div>
          </div>
          <Row className="width-full">
            <Col md={9}></Col>
            <Col md={3}>
              <div className="form-group explore-location-dropdown">
                <input
                  id="edit-address"
                  type="text"
                  placeholder={t("location")}
                  onFocus={renderAutoComplete}
                  ref={(ref) => (autocomplete = ref)}
                  name="address"
                  className="form-control edit-reset"
                ></input>
              </div>
            </Col>
          </Row>
          <Col sm="12" md="12">
            {props.explorePosts.loading ? (
              <ExploreLoader />
            ) : props.explorePosts.data.posts &&
              props.explorePosts.data.posts.length > 0 ? (
              <div className="live-streaming-post-box explore-box">
                {props.explorePosts.data.posts.map((post) =>
                  post.postFiles.file_type == "image" ? (
                    <ExplorePostCard post={post} key={post.post_id} />
                  ) : null
                )}
              </div>
            ) : (
              <NoDataFound></NoDataFound>
            )}
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  explorePosts: state.post.explorePosts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const connector = connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(Explore));

export default GoogleApiWrapper({
  apiKey: apiConstants.google_api_key,
})(connector);
