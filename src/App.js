import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Base from "./components/Base";
import store from "./store";
import { createBrowserHistory as createHistory } from "history";
import "react-redux-notify/dist/ReactReduxNotify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const history = createHistory();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Base />
        </Router>
      </Provider> 
    );
  }
}

export default App;
