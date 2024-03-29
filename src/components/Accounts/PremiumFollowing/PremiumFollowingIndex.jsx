import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import UserCard from "../FansFollowing/UserCard";
import { connect } from "react-redux";
import { fetchFavStart } from "../../../store/actions/FavAction";
import NoDataFound from "../../NoDataFound/NoDataFound";
import useInfiniteScroll from "../../helper/useInfiniteScroll";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import FollowingLoader from "../../Loader/FollowingLoader";

function PremiumFollowingIndex(props) {

  useEffect(() => {
    props.dispatch(
      fetchFavStart({
        skip: props.fav.skip,
      })
    );
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchFavUsersData);
  const [noMoreData, setNoMoreData] = useState(false);

  function fetchFavUsersData() {
    setTimeout(() => {
      if (props.fav.length !== 0) {
        props.dispatch(
          fetchFavStart({
            skip: props.fav.skip,
          })
        );
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  }

  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  return (
    <>
      <div className="lists">
        <Container>
          <Row>
            <Col sm={12} md={12} xs={12}>
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side">
                  <div className="pull-left">
                    <h3>
                      <Link
                        className="bookmarkes-list"
                        to={"/list"}>
                        <Image
                          src={
                            window.location.origin +
                            "/assets/images/icons/back.svg"
                          }
                          className="svg-clone"
                          width=""
                        />
                        {t("premium-user-follow")}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              {props.fav.loading ? (
                <FollowingLoader />
              ) : props.fav.data.favs.length > 0 ? (
                props.fav.data.favs.map((fav_user) =>
                  fav_user.fav_user ? (
                    <UserCard user={fav_user.fav_user} key={fav_user.user_id} />
                  ) : (
                    ""  
                  )
                )
              ) : (
                <NoDataFound></NoDataFound>
              )}
            </Col>
          </Row>
          {noMoreData !== true ? (
            <>{isFetching && "Fetching more list items..."}</>
          ) : (
            t("no_more_data")
          )}
        </Container>
      </div>
    </>
  )
}

const mapStateToPros = (state) => ({
  fav: state.fav.fav,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PremiumFollowingIndex));


