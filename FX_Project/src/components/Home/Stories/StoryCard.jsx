import React, { useState } from "react";
import { Dropdown, Image, Media, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { storyFileDeleteStart } from "../../../store/actions/StoriesAction";
import Lightbox from "react-image-lightbox";
import ReactPlayer from "react-player/lazy";

const StoryCard = (props) => {

	const [modalStatus, setModalStatus] = useState(0);

	const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 375,
        settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			initialSlide: 3,
        },
      },
    ],
	};

	const handleImagePreview = (event, status) => {
    event.preventDefault();
    setModalStatus(status);
	};
	
  return (
    <>
      <div className="live-streaming-post-card">
				<div className="live-streaming-post-img-sec">
					{props.story.story_files
						? props.story.story_files.length > 0
							? props.story.story_files.map((story_file, index) =>
								story_file.file_type === "image" ? (
										<Link
											to="#"
											key={index}
										>
											<div className="gallery js-gallery">
											<Image
												src={story_file.file}
												className="live-streaming-post-img"
												onClick={(event) =>
													handleImagePreview(event, 1)
												}
											/>
											</div>
													
											{modalStatus ? (
												<Lightbox
													mainSrc={story_file.file}
													onCloseRequest={() => setModalStatus(0)}
												/>
											) : (
												""
											)}
										</Link>
									) : story_file.file_type === "video" ? (
										<div className="post-image post-video" key={index}>
											<div className="stories">
												
													<ReactPlayer
														light={story_file.preview_file}
														url={story_file.file}
														controls={true}
														width="100%"
														height="100%"
														playing
														className="post-video-size"
													/>
												
											</div>
										</div>
									) : (
										""
									)
								)
							: null
						: null}
				</div>
				<div className="live-streaming-post-info">
						<div className="live-streaming-post-user-info">
								<div className="live-streaming-post-user-img-sec">
										<Image
												src={
													props.story.user.picture
												}
												alt=""
												className="live-streaming-post-user-img"
										/>
								</div>
								<div className="live-streaming-post-user-details">
										<Link to={`/${props.story.user.user_unique_id}`}><h4>{props.story.user.name}</h4></Link>
										<p>{props.story.updated}</p>
										<p className={props.story.status?"text-success":"text-danger"}>{props.story.status_formatted}</p>
								</div>
						</div>
						<div className="live-streaming-post-action-sec">
								<ul className="list-unstyled live-streaming-post-action-icons">
									<Media
										as="li"
										role="presentation"
										className="profile-card active"
									>
										<Link
											className="bookmarkes-list"
											onClick={() => {
												if (window.confirm(t("delete_story_confirmation"))) {
													props.dispatch(storyFileDeleteStart({ story_id: props.story.story_id }));
												}
											}}
										>
											<Image src="assets/images/icons/delete.png" className="svg-clone" />
										</Link>
									</Media>
								</ul>
						</div>
				</div>
			</div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapDispatchToProps)(translate(StoryCard));
