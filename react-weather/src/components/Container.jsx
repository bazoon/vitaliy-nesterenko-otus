import React, { Component } from "react";
import api from "../api/api";
import { getIconLink } from "../utils/utils";
import Weather from "./Weather.jsx";
import { hpaToMmhg } from "../utils/utils";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      hasError: false,
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: true
      },
      () => {
        api.get("Tyumen").then(data => {
          this.setState({
            weatherData: data,
            isLoading: false
          });
        });
      }
    );
  }

  handleSelectCity = city => {
    this.setState({
      isLoading: true
    });

    api.get(city).then(data => {
      const { cod } = data;
      if (cod === 200) {
        this.setState({
          weatherData: data,
          hasError: false,
          isLoading: false
        });
      } else {
        this.setState({
          hasError: true,
          isLoading: false
        });
      }
    });
  };

  render() {
    const {
      coord = {},
      main = {},
      weather = {},
      wind = {},
      name
    } = this.state.weatherData;
    const { hasError, isLoading } = this.state;
    const { humidity, pressure, temp } = main;
    const pressureMm = hpaToMmhg(pressure);
    const clouds = weather && weather[0];
    const icon = clouds && getIconLink(clouds.icon);

    return (
      <div>
        <Weather
          isLoading={isLoading}
          hasError={hasError}
          name={name}
          onSelectCity={this.handleSelectCity}
          coord={coord}
          pressure={pressureMm}
          humidity={humidity}
          wind={wind}
          temp={temp}
          icon={icon}
        />
      </div>
    );
  }
}

export default Container;
