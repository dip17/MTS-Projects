import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image, Media, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategoryUsersStart } from "../../store/actions/CategoryAction";
import NoDataFound from "../NoDataFound/NoDataFound";
import { t } from "react-multi-lang";

const CategoryUsers = (props) => {
  useEffect(() => {
    props.dispatch(
      fetchCategoryUsersStart({
        category_unique_id: props.match.params.category_unique_id,
      })
    );
  }, []);

  return (
    <>
      {props.categoryUsers.loading ? null : (
        <div className="category-content-list">
          <Container>
            <div className="category-content-list-sec">
              <h4 className="title">
                {props.categoryUsers.data.category.name}
              </h4>
            </div>
            <Row>
              <Col md={12}>
                {props.categoryUsers.data.users.length > 0 ? (
                  <ul className="list-unstyled category-content-info">
                    {props.categoryUsers.data.users.map(
                      (categoryUser, index) => {
                        return [
                          <Media as="li">
                            <Link to={`/` + categoryUser.user.user_unique_id}>
                              <div className="category-list-info">
                                <div className="flex-content">
                                  <div className="category-content-img-sec">
                                    <Image
                                      src={categoryUser.user.picture}
                                      className="category-content-img"
                                    />
                                  </div>
                                  <div className="category-info-details">
                                    <h5>{categoryUser.user.name}</h5>
                                    <p className="text-muted f-14">
                                      {t('followers')}:{" "}
                                      <strong>
                                        {categoryUser.user.total_followers}
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Button className="follow-btn">
                                    <i className="fas fa-user mr-2"></i> {t("view")}
                                  </Button>
                                </div>
                              </div>
                            </Link>
                          </Media>,
                        ];
                      }
                    )}
                  </ul>
                ) : (
                  <NoDataFound />
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  categoryUsers: state.category.categoryUsers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(CategoryUsers);
