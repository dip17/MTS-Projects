import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Image } from "react-bootstrap";
import "./Explore.css";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { fetchUserStoriesStart } from "../../../store/actions/StoriesAction";
import StoryCard from "./StoryCard";
import ExploreLoader from "../../Loader/ExploreLoader";
import { connect } from "react-redux";
import useInfiniteScroll from "../../helper/useInfiniteScroll";
import Skeleton from "react-loading-skeleton";

const StoriesIndex = (props) => {

    useEffect(() => {
        props.dispatch(fetchUserStoriesStart());
    }, []);

    const fetchStoriesData = () => {
        setTimeout(() => {
            if (props.userStories.data.stories.length !== 0) {
                props.dispatch(fetchUserStoriesStart());
                setIsFetching(false);
            } else {
                setNoMoreData(true);
            }
        }, 3000);
    };

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchStoriesData);

    const [noMoreData, setNoMoreData] = useState(false);


    return (
        <div className="explore-tab-sec">
            <Container>
                <Row className="no-gutters">
                    <div className="profile-post-area">
                        <div className="bookmarkes-list bookmarks-right-side resp-sapce-center">
                            <div className="pull-left">
                                <Link className="bookmarkes-list notify-title back-button" to={`/home`}>
                                    <Image
                                        src={
                                            window.location.origin + "/assets/images/icons/back.svg"
                                        }
                                        className="svg-clone"
                                    />
                                    {t("stories")}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Col sm="12" md="12">
                        {props.userStories.loading ? (
                            <div className="new-category-list-box">
                                {[...Array(8)].map(() =>
                                    <Skeleton
                                        className="profile-post-card-loader" />
                                )}
                            </div>
                        ) : props.userStories.data.stories &&
                            props.userStories.data.stories.length > 0 ? (
                            <div className="live-streaming-post-box">
                                {props.userStories.data.stories.map((story) =>

                                    <StoryCard story={story} key={story.story_id} />

                                )}
                            </div>
                        ) : (
                            <NoDataFound></NoDataFound>
                        )}
                        {noMoreData !== true ? (
                            <>{isFetching && t("fetching_more_list_items")}</>
                        ) : (
                            <div className="text-center">{t("no_more_data")}</div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const mapStateToPros = (state) => ({
    userStories: state.userStories.userStories,
});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}
export default connect(
    mapStateToPros,
    mapDispatchToProps
)(translate(StoriesIndex));