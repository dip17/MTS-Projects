import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Nav, Tab, InputGroup, FormControl } from "react-bootstrap";
import "./NewExplore.css";
import { Link } from "react-router-dom";
import NewExploreCard from "./NewExploreCard";
import NewCategoryCard from "./NewCategoryCard";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { apiConstants } from "../../Constant/constants";

const NewExploreIndex = (props) => {
  const [location, setLocation] = useState({});

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
      setLocation({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    });
  };

  const clearSearch = () => {
    setLocation({});
    autocomplete.value = "";
  }

  return (
    <>
      <div className="new-explore-sec">
        <Container>
          <Row>
            <Col md={12}>
              <div className="new-explore-tab-sec">
                <Tab.Container id="left-tabs-example" defaultActiveKey="explore">
                  <Row>
                    <Col sm={12}>
                      <div className="new-explore-tab-header-sec">
                        <Nav variant="pills">
                          <Nav.Item>
                            <Link
                              className="nav-link active"
                              eventKey="explore"
                              // onClick={() => setActiveTab("explore")}
                              to="/explore"
                            >{t("explore")}</Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Link
                              className="nav-link"
                              eventKey="category"
                              // onClick={() => setActiveTab("category")}
                              to="/explore-categories"
                            >{t("category")}</Link>
                          </Nav.Item>
                        </Nav>
                    
                        <div className="new-explore-search-sec">
                          <div className="new-explore-search-card">
                            <InputGroup className="mb-0">
                              <InputGroup.Text>
                                <Image
                                  className="new-explore-search-icon"
                                  src={
                                    window.location.origin + "/assets/images/new-settings/map-marker-icon.svg"
                                  }
                                />
                              </InputGroup.Text>
                              <FormControl placeholder={t("search_by_location")}
                                onFocus={renderAutoComplete}
                                ref={(ref) => (autocomplete = ref)} />
                              {location.latitude &&
                                <InputGroup.Text className="padding-zero">
                                  <Button className="search-go-btn" onClick={() => clearSearch()}>
                                    <i className="fa fa-times align-self-center"></i>
                                  </Button>
                                </InputGroup.Text>
                              }
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <NewExploreCard location={location} />
                    </Col>
                    {/* <Col sm={12}>
                      <Tab.Content>
                        <Tab.Pane eventKey="explore">
                          <NewExploreCard location={location} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="category">
                          <NewCategoryCard />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col> */}
                  </Row>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};


function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const connector = connect(
  null,
  mapDispatchToProps
)(translate(NewExploreIndex));

export default GoogleApiWrapper({
  apiKey: apiConstants.google_api_key,
})(connector);
