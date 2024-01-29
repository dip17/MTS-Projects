import React, { useState } from "react";
import AuthHeader from "./Header/AuthHeader";
import { Notify } from "react-redux-notify";
import LandingFooter from "./Footer/LandingFooter";

const AuthLayout = (props) => {
  const [themeState, setThemeState] = useState(
    localStorage.getItem("theme") !== "" &&
      localStorage.getItem("theme") !== null &&
      localStorage.getItem("theme") !== undefined &&
      localStorage.getItem("theme") === "dark" ?
      true
      : false
  );
  return (
    <body className={`${themeState ? "dark-mode" : ""}`}>
      <Notify position="TopRight" />
      <AuthHeader />
      <div className="landing-main-wrapper">
        {React.cloneElement(props.children)}
      </div>
      <LandingFooter />
    </body>
  )
}

export default AuthLayout;
