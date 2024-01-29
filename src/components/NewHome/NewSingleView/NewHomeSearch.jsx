import React, { useState } from "react";
import { connect } from "react-redux";
import CommonCenterLoader from "../../Loader/CommonCenterLoader";
import { Image, InputGroup, FormControl, Media } from "react-bootstrap";
import { searchUserStart } from "../../../store/actions/HomeAction";
import { Link } from "react-router-dom";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
import { translate, t } from "react-multi-lang";
import { useEffect } from "react";

const NewHomeSearch = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  const [show, toggleShow] = useState(false);

  const handleSearch = (event) => {
    if (event.currentTarget.value === "") {
      toggleShow(false);
    } else {
      toggleShow(true);
      props.dispatch(searchUserStart({ key: event.currentTarget.value }));
    }
  };

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const renderSearch = () => {
    return (
      <div className="new-feed-search-sec">
        <InputGroup className="mb-0">
          <FormControl
            placeholder={t("search")}
            aria-describedby="basic-addon2"
            onChange={handleSearch}
          />
          <InputGroup.Text id="basic-addon2">
            <Image
              className="new-feeds-search-icon"
              src={
                window.location.origin +
                "/assets/images/feed-story/search-icon.svg"
              }
            />
          </InputGroup.Text>
        </InputGroup>
        {show && (
          <div className="search-dropdown-sec">
            <ul className="list-unstyled search-dropdown-list-sec">
              {props.searchUser.loading ? (
                <CommonCenterLoader />
              ) : props.searchUser.data.users.length > 0 ? (
                props.searchUser.data.users.map((user) => (
                  <Media as="li" key={user.user_unique_id}>
                    <Link to={`/${user.user_unique_id}`}>
                      <div className="search-body">
                        <div className="user-img-sec">
                          <Image
                            alt="#"
                            src={user.picture}
                            className="user-img"
                          />
                        </div>
                        <div className="search-content">
                          <h5>
                            {user.name}{" "}
                            {user.is_verified_badge == 1 ? (
                              <div className="pl-2">
                                <VerifiedBadgeNoShadow />
                              </div>
                            ) : null}
                          </h5>
                          <p className="text-muted f-12">@{user.username}</p>
                        </div>
                      </div>
                    </Link>
                  </Media>
                ))
              ) : (
                t("no_user_found")
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (width < 768) {
    return <div className="mobile-visible">{renderSearch()}</div>;
  }

  if (width > 768 && props.desktop) {
    return <>{renderSearch()}</>;
  }

  return null

};

const mapStateToPros = (state) => ({
  searchUser: state.home.searchUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewHomeSearch));
