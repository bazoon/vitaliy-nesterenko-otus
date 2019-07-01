import React, { Component } from "react";
import Container from "./Container.jsx";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="wrap">
          <Container />
        </div>
      </div>
    );
  }
}

export default App;
