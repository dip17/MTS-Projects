import React, { useEffect, useState } from "react";
import HeaderIndex from "./Header/HeaderIndex";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { useHistory } from 'react-router-dom';

const MainLayout = (props) => {
  let history = useHistory();

  const [themeState, setThemeState] = useState(
    localStorage.getItem("theme") !== "" &&
      localStorage.getItem("theme") !== null &&
      localStorage.getItem("theme") !== undefined &&
      localStorage.getItem("theme") === "dark" ?
      true
      : false
  );

  const toggleClass = () => {
    localStorage.setItem("theme", themeState ? "light" : "dark");
    setThemeState(!themeState);
  };

  useEffect(() => {
    if(localStorage.getItem("userLoginStatus")) {
      props.dispatch(fetchUserDetailsStart());
    }
  }, []);

  useEffect(() => {
    if (!props.profile.loading && props.profile.data.is_email_verified === 0) {
      history.push('/register/verify');
    }
  }, [props.profile]);

  return (
    <div className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        <HeaderIndex toggleTheme={toggleClass} darkTheme={themeState} />
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(props.children)}
          </div>
          {props.showFooter ?
            <LatestFooter />
            : null
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros, mapDispatchToProps
)(MainLayout);
