import React, { Component } from "react";
import Container from "./Container.jsx";
import "./index.css";
import { Route, HashRouter } from "react-router-dom";
import City from "./City.jsx";

const App = () => {
  return (
    <div className="main">
      <div className="wrap">
        <HashRouter>
          <Route path="/city/:city" component={City} />
          <Route path="/" exact component={Container} />
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
