import React, { useState, useEffect } from "react";
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
import "./NewHome.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { fetchStoriesStart } from "../../store/actions/StoriesAction";
import StorySliderLoader from "../Loader/StorySliderLoader";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import StoryUploadModal from "../Home/StoryUploadModal";

const gallery_options = {
  slug: "gallery",
  startIndex: 0,
};

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const NewFeatureStoryIndex = (props) => {

  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    props.dispatch(fetchStoriesStart());
  }, []);

  const SliderModalToggle = (status, index, story) => {
  
    const dataArray = [];
    story.storyFiles.map((data) => {
      dataArray.push({
        src: data.file,
        type: data.file_type,
        thumb: data.file,
        caption: story.name + " " + data.updated,
      });
    });
    setSliderData(dataArray);
    Fancybox.show(dataArray, gallery_options);
  };

  return (
    <>
      <div className="new-feature-story-sec">
        <div className="new-feature-story-card">
          {props.userStories.loading ? (
            <StorySliderLoader />
          ) : (
            <Slider {...settings}>
              <div>
                
                  <div className="new-feature-story-item" id="add-story-gap">
                    <div
                      className="new-feature-story-img-sec"
                      data-toggle="modal"
                      data-target="#addStoryModal"
                    >
                      
                      <Image
                        className="new-feature-story-img"
                        id="add-story-img"
                        src={localStorage.getItem("user_picture")}
                      />
                      <div className="new-feature-story-add-img-sec">
                        <Image
                          className="new-feature-story-add-img"
                          src={
                            window.location.origin +
                            "/assets/images/feature-story/plus-circle.svg"
                          }
                        />
                      </div>
                    </div>
                
                    <h4 className="new-feature-story-add-title">{t("add_story")}</h4>
                
                  </div>
                  </div>

              {props.userStories.data.stories &&
                props.userStories.data.stories.length > 0 &&
                props.userStories.data.stories.map((story, index) => (
                  <div key={index}>
                    <Media
                      as="a"
                      onClick={() => SliderModalToggle(true, index, story)}
                    >
                      <div className="new-feature-story-item">
                        <div className="new-feature-story-img-sec">
                          <Image
                            className="new-feature-story-img"
                            src={story.picture}
                          />
                        </div>
                        <h4>{story.name}</h4>
                      </div>
                    </Media>
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
      <StoryUploadModal />
    </>
  );
};

const mapStateToPros = (state) => ({
  userStories: state.userStories.stories,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewFeatureStoryIndex));
