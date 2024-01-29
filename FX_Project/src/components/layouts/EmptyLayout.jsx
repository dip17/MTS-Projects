import React, { Component } from "react";
import { Notify } from "react-redux-notify";
import EmptyHeader from "./Header/EmptyHeader";

class EmptyLayout extends Component {
  state = {};
  render() {
    return (
      <body>
        <Notify position="TopRight" />
        <EmptyHeader />
        <div className="main-wrap-sec">
          {React.cloneElement(this.props.children)}
        </div>
        <br />
      </body>
    );
  }
}

export default EmptyLayout;
