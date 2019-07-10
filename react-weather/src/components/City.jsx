import React, { Component } from "react";
import api from "../api/api";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";

export class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      forecase: []
    };
  }

  componentDidMount() {
    const { city } = this.props.match.params;

    api.getForecast(city).then(data => {
      this.setState({
        name: data.name,
        forecast: data.forecast
      });
    });
  }

  render() {
    const { name, forecast = [] } = this.state;

    return (
      <>
        <div className="distinct-city">
          <Link to="/" style={{}}>
            🏠
          </Link>
          <h1>{name}</h1>
          <Sparklines
            data={forecast.map(d => d.temp)}
            width={50}
            height={20}
            margin={5}
          >
            <SparklinesLine color="#F27171" style={{ fill: "none" }} />
          </Sparklines>
        </div>

        <table className="city-forecast">
          <tbody>
            <tr>
              <td>
                <div>Температура,&nbsp;C</div>
                <div> Влажность </div>
                <div>Давление</div>
              </td>

              {forecast.map((day, i) => {
                return (
                  <td key={i}>
                    <div>{day.temp}</div>
                    <div> {day.humidity} </div>
                    <div>{day.pressure}</div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default City;
