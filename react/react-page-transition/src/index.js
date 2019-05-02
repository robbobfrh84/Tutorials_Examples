import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./global-styles";

import Header from "./components/Header";
import Container from "./components/Container";

const App = () => (
  <Router>
    <div>
      <Header />
      <Container />
    </div>
  </Router>
);

render(<App />, document.getElementById("root"));
