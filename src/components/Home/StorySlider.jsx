import React, { useState } from "react";
import { useEffect } from "react";
import { Media, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import StoriesSliderModal from "./StoriesSliderModal";
import { fetchStoriesStart } from "../../store/actions/StoriesAction";
import { connect } from "react-redux";
import StoryUploadModal from "./StoryUploadModal";
import StorySliderLoader from "../Loader/StorySliderLoader";
import { translate, t } from "react-multi-lang";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

const $ = window.$;

const StorySlider = (props) => {
  const [renderSliderModal, setRenderSliderModal] = useState(false);

  const [selectedSliderIndex, setSelectedSliderIndex] = useState(0);

  const [sliderData, setSliderData] = useState([]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 9.5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 9.5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const gallery_options = {
    slug: "gallery",
    startIndex: 0,
  };

  const SliderModalToggle = (status, index, story) => {
    // setRenderSliderModal(status);
    // setSelectedSliderIndex(index);

    const dataArray = [];
    story.storyFiles.map((data) => {
      dataArray.push({
        src: data.file,
        type: data.file_type,
        thumb: data.file,
        caption: story.name + " " + data.updated,
        // header: {
        //   heading: story.name,
        //   subheading: data.updated,
        //   profileImage: story.picture
        // }
      });
    });
    setSliderData(dataArray);
    Fancybox.show(dataArray, gallery_options);
  };

  useEffect(() => {
    props.dispatch(fetchStoriesStart());
  }, []);

  useEffect(() => {
    if (SliderModalToggle) {
      // $("#storiesSliderModal").modal("show");
    } else {
      // $("#storiesSliderModal").modal("hide");
    }
  }, [renderSliderModal]);

  return (
    <>
      <div className="story-slider-sec">
        <div className="">
          {props.userStories.loading ? (
            <StorySliderLoader />
          ) : (
            <>
              <Slider {...settings}>
                <Media as="li">
                  <div className="story-card-wrapper">
                    <div
                      className="story-slider-card "
                      data-toggle="modal"
                      data-target="#addStoryModal"
                    >
                      <div className="story-slider-img-sec">
                        <Image
                          src={localStorage.getItem("user_picture")}
                          alt=""
                          className="story-slider-img"
                        />
                        <i className="fas fa-plus"></i>
                      </div>
                      <div className="story-text">
                        <h4>{t("add_story")}</h4>
                      </div>
                    </div>
                  </div>
                </Media>
                {props.userStories.data.stories &&
                  props.userStories.data.stories.length > 0 &&
                  props.userStories.data.stories.map((story, index) => (
                    <>
                      <Media
                        as="li"
                        onClick={() => SliderModalToggle(true, index, story)}
                        key={index}
                      >
                        <div className="story-card-wrapper">
                          <div
                            className="story-slider-card"
                            data-toggle="modal"
                            data-target="#storiesSliderModal"
                          >
                            <div className="story-slider-img-sec" key={index}>
                              <Image
                                src={story.picture}
                                alt=""
                                className="story-slider-img"
                              />
                            </div>

                            <div className="story-text">
                              <h4>{story.name}</h4>
                            </div>
                          </div>
                        </div>
                      </Media>
                    </>
                  ))}
              </Slider>
            </>
          )}
        </div>
        {/* {renderSliderModal && !props.userStories.loading && (
          <StoriesSliderModal
            SliderModalToggle={SliderModalToggle}
            selectedSliderIndex={selectedSliderIndex}
            sliderData={sliderData}
            data={props.userStories.data.stories.filter(
              (files) => files.storyFiles.length > 0
            )}
            renderSliderModal={renderSliderModal}
          />
        )} */}
        <StoryUploadModal />
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  userStories: state.userStories.stories,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(StorySlider);
