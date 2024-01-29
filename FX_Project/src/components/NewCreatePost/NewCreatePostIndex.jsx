import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import "./NewCreatePost.css";
import { Link } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

const NewCreatePostIndex = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <div className="new-create-post-sec">
        <Container>
          <Form>
            <div className="new-create-box">
              <Row>
                <Col md={12} xl={7}>
                  <div className="new-post">
                    <div className="new-post-title">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/create-post.svg"
                        }
                      />
                      <span>CREATE POST</span>
                    </div>
                    <div className="select-post-format">
                      <Button className="post-active-btn">Images</Button>
                      <Button>Videos</Button>
                      <Button>Music</Button>
                    </div>
                    <div className="add-post-img file-input">
                      <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        class="file-input__input"
                      />
                      <label class="file-input__label" for="file-input">
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/upload-image.svg"
                          }
                        />
                        <span>Upload Image</span>
                      </label>
                      <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        class="file-input__input"
                      />
                      <label class="file-input__label" for="file-input">
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/add-img.svg"
                          }
                        />
                        <span>Add Thumbnail</span>
                      </label>
                    </div>
                    <div className="add-post-text">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Looking Beatiful In the Picture and all the best!!!..In publishing and graphic design, Lorem ipsum is a placeholder text com!!!"
                          rows={3}
                        />
                      </Form.Group>
                    </div>
                    <div className="new-add-category">
                      <h4>Add Category</h4>
                      <div className="new-post-category">
                        <div className="new-category-card">Celebrity</div>
                        <div className="new-category-card">Cooking</div>
                        <div className="new-category-card">Talent</div>
                        <div className="new-category-card">Cooking</div>
                        <div className="new-category-card">Celebrity</div>
                        <div className="new-category-card">Cooking</div>
                        <div className="new-category-card">Talent</div>
                        <div className="new-category-card">Cooking</div>
                        <div className="new-category-card">Cooking</div>
                        <div className="new-category-card">Talent</div>
                        <div className="new-category-card">Cooking</div>
                      </div>
                    </div>
                    <div className="add-post-subscribe">
                      <h4>
                        <span>Subscription</span> / Month
                      </h4>
                      <div className="post-sub-amount">12,890 $</div>
                    </div>
                    <div className="add-post-date-picker">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Schedule Your Post"
                        />
                      </Form.Group>
                      <div className="add-post-date-time">
                        <DateTimePicker onChange={onChange} value={value} />
                        <div className="add-post-time-select"></div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={12} xl={5}>
                  <div className="add-post-right-sec">
                    <div className="new-post-title">
                      <Image
                        src={
                          window.location.origin + "/assets/images/preview.svg"
                        }
                      />
                      <span>PREVIEW</span>
                    </div>

                    <div className="new-feed-display-card">
                      <div className="new-feed-header-sec">
                        <div className="new-feed-user-info">
                          <div className="live-streaming-user-img-sec">
                            <Image
                              className="new-feed-user-img"
                              src={
                                window.location.origin +
                                "/assets/images/feed-story/user-img.png"
                              }
                            />
                          </div>
                          <div className="new-feed-user-details">
                            <h4>
                              Isabella Olivia
                              <span>
                                <Image
                                  className="sidebar-verified-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/verified-icon.png"
                                  }
                                />
                              </span>
                            </h4>
                            <Link>isabella@olivia.com</Link>
                          </div>
                        </div>
                        <div className="new-feed-user-btn-sec">
                          <Button className="sent-tip-btn">
                            <Image
                              className="sent-tip-icon"
                              src={
                                window.location.origin +
                                "/assets/images/feed-story/sent-tip.svg"
                              }
                            />
                            <span>Tips</span>
                          </Button>
                          <Dropdown className="feed-post-dropdown">
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                              className="feed-post-dropdown-btn"
                            >
                              <Image
                                className="three-dots-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/feed-story/3-vertical-dots.svg"
                                }
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                Something else
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="new-feed-body-sec">
                        <div>
                          <Image
                            className="new-feed-post-img w-100 new-post-img"
                            src={
                              window.location.origin +
                              "/assets/images/feed-story/feed-img.png"
                            }
                          />
                        </div>
                      </div>
                      <div className="new-feed-footer-sec">
                        <div className="new-feed-footer-action-btn-sec">
                          <div className="new-feed-footer-action-left-sec">
                            <Button className="new-feed-wishlist-btn">
                              <Image
                                className="new-feed-wishlist-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/feed-story/heart.svg"
                                }
                              />
                              <span>103</span>
                            </Button>
                            <Button className="new-feed-wishlist-btn">
                              <Image
                                className="new-feed-wishlist-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/feed-story/comments.svg"
                                }
                              />
                              <span>52</span>
                            </Button>
                          </div>
                          <div className="new-feed-footer-action-right-sec">
                            <Button className="new-feed-bookmark-btn">
                              <Image
                                className="new-feed-bookmark-icon "
                                src={
                                  window.location.origin +
                                  "/assets/images/feed-story/bookmark-outline.svg"
                                }
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="new-feeds-liked-by-users">
                          <h5>
                            Liked by <span>Elvin</span> and{" "}
                            <span>102 others</span>
                          </h5>
                          <div className="new-feeds-liked-users-img-sec">
                            <Image
                              className="new-feeds-liked-users-img"
                              src={
                                window.location.origin +
                                "/assets/images/feed-story/liked-user-1.png"
                              }
                            />
                            <Image
                              className="new-feeds-liked-users-img"
                              src={
                                window.location.origin +
                                "/assets/images/feed-story/liked-user-2.png"
                              }
                            />
                            <Image
                              className="new-feeds-liked-users-img"
                              src={
                                window.location.origin +
                                "/assets/images/feed-story/liked-user-3.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="new-feed-post-description-sec">
                          <p>
                            Looking Beatiful In the Picture and all the
                            best!!!..In publishing and graphic design, Lorem
                            ipsum is a placeholder text com!!!
                          </p>
                        </div>
                        <div className="new-feed-view-link-sec">
                          <Link to="#">
                            View All <span>52</span> Comments
                          </Link>
                        </div>
                        <div className="new-feed-post-time-sec">
                          <p>5 min ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="add-post-btn">
              <Button>Post</Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default NewCreatePostIndex;
