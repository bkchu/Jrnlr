import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";

import "./styles/normalize.css";
import "./styles/index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById("root")
);
registerServiceWorker();
