import React, { useEffect, useState } from "react";
import { Row, Col, Image, Container, Media } from "react-bootstrap";
import "./CategoryListing.css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  fetchUserCategoryListStart,
  fetchContentCreatorListStart,
} from "../../store/actions/UserCategoryAction";
import { translate, t } from "react-multi-lang";
import CategoryListingTabLoader from "../Loader/CategoryLstingTabLoader";
import CategoryListingLoader from "../Loader/CategoryListingLoader";

const CategoryListingIndex = (props) => {
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    props.dispatch(fetchUserCategoryListStart());
    props.dispatch(fetchContentCreatorListStart());
  }, []);

  const handleCreatorChange = (id) => {
    setSelectedList(id);
    props.dispatch(fetchContentCreatorListStart({ category_id: id }));
  };

  const handleListClear = () => {
    setSelectedList(null);
    props.dispatch(fetchContentCreatorListStart());
  };

  return (
    <>
      <div className="category-listing-sec new-category-listing-sec">
        {/* <Container> */}
        <Row>
          <Col sm={12} md={12}>
            {props.userCategory.categoryList.loading ? (
              <CategoryListingTabLoader />
            ) : (
              <>
                {props.userCategory.categoryList.data &&
                props.userCategory.categoryList.data.length > 0 ? (
                  <>
                    <ul className="list-unstyled category-list-sec">
                      {props.userCategory.categoryList.data.map(
                        (list, index) => (
                          <>
                            <Media
                              as="li"
                              className={
                                selectedList == list.category_id
                                  ? "active"
                                  : ""
                              }
                              key={list.name}
                              onClick={() =>
                                handleCreatorChange(list.category_id)
                              }
                            >
                              <Link to="#">{list.name}</Link>
                            </Media>
                          </>
                        )
                      )}
                      {selectedList != null && (
                        <Media
                          as="li"
                          className="clear-button"
                          onClick={handleListClear}
                        >
                          <Link to="#">{t("show_all")}</Link>
                        </Media>
                      )}
                    </ul>
                  </>
                ) : (
                  <div>
                    <h4>{t("no_list_found")}</h4>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <h4 className="category-listing-title">
              {t("the_best_creators_of_last_week")}
            </h4>
            {props.userCategory.contentCreatorList.loading ? (
              <CategoryListingLoader />
            ) : (
              <div className="category-listing-box">
                <>
                  {props.userCategory.contentCreatorList.data.content_creators
                    .length > 0 ? (
                    <>
                      <ul className="list-unstyled category-list-sec d-content">
                        {props.userCategory.contentCreatorList.data.content_creators.map(
                          (creator, index) => (
                            <>
                              <div
                                className="category-listing-card"
                                key={index}
                              >
                                <div className="category-listing-img-sec">
                                  <Image
                                    src={creator.cover}
                                    alt=""
                                    className="category-listing-img"
                                  />
                                </div>
                                <div className="category-listing-info">
                                  {/* <Link to={`/${creator.unique_id}`}> */}
                                  <div className="category-listing-user-profile">
                                    <Image
                                      src={creator.picture}
                                      alt=""
                                      className="category-listing-user-img"
                                    />
                                  </div>
                                  {/* </Link> */}
                                  <Link to={`/${creator.unique_id}`}>
                                    <h4>{creator.name}</h4>
                                  </Link>
                                  {creator.categories.length > 0 && (
                                    <div className="category-tag-sec">
                                      <i className="fas fa-tags"></i>
                                      <h6>{creator.categories}</h6>
                                    </div>
                                  )}
                                  <ul className="list-unstyled category-listing-post-count mb-4">
                                    <Media as="li">
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/post.png"
                                        }
                                        alt=""
                                        className="category-listing-post-count-img"
                                      />
                                      <span>{creator.total_posts}</span>
                                    </Media>
                                    <Media as="li">
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/image.png"
                                        }
                                        alt=""
                                        className="category-listing-post-count-img"
                                      />
                                      <span>{creator.image_count}</span>
                                    </Media>
                                    <Media as="li">
                                      <Image
                                        src={
                                          window.location.origin +
                                          "/assets/images/icons/video-camera.png"
                                        }
                                        alt=""
                                        className="category-listing-post-count-img"
                                      />
                                      <span>{creator.video_count}</span>
                                    </Media>
                                  </ul>
                                  {creator.user_files.length > 0 && (
                                    <div className="category-post-card">
                                      {creator.user_files.map((file, index) => (
                                        <>
                                          {file.is_paid_post == 0 ? (
                                            <>
                                              {file.file_type == "image" ? (
                                                <div className="category-post-img-sec">
                                                  <Image
                                                    src={file.post_file}
                                                    alt=""
                                                    className="category-post-img"
                                                  />
                                                </div>
                                              ) : (
                                                <div className="category-post-img-sec">
                                                  <Image
                                                    src={file.preview_file}
                                                    alt=""
                                                    className="category-post-img"
                                                  />
                                                </div>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {file.file_type == "image" ? (
                                                <div className="category-post-img-sec position-relative">
                                                  <Image
                                                    src={file.blur_file}
                                                    alt=""
                                                    className="category-post-img"
                                                  />
                                                  <div className="post-lock-icon">
                                                    <i className="fas fa-lock"></i>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="category-post-img-sec position-relative">
                                                  <Image
                                                    src={file.blur_file}
                                                    alt=""
                                                    className="category-post-img"
                                                  />
                                                  <div className="post-lock-icon">
                                                    <i className="fas fa-lock"></i>
                                                  </div>
                                                </div>
                                              )}
                                            </>
                                          )}
                                        </>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <div>
                      <h4>{t("no_creator_found")}</h4>
                    </div>
                  )}
                </>
              </div>
            )}
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  userCategory: state.userCategory,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(CategoryListingIndex));
