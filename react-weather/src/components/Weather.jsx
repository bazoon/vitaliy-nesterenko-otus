import React, { Component } from "react";
import api from "../api/api";
import Autocomplete from "react-autocomplete";
import { debounce } from "../utils/utils";
import { Link } from "react-router-dom";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: JSON.parse(localStorage.getItem("favorites")) || [],
      city: "",
      items: []
    };
    this.onChangeCity = debounce(this.onChangeCity, 500);
  }

  onChangeCity = value => {
    api.getCity(value).then(data => {
      this.setState({
        items: data
      });
    });
  };

  handleChangeCity = ({ target: { value } }) => {
    this.setState({
      value
    });
    this.onChangeCity(value);
  };

  handleAddCity = () => {
    const { value } = this.state;
    this.setState(
      {
        cities: this.state.cities.concat(value)
      },
      () => {
        localStorage.setItem("favorites", JSON.stringify(this.state.cities));
      }
    );
  };

  handleSelectCity = city => {
    this.setState({
      value: city
    });
  };

  render() {
    const {
      humidity,
      pressure,
      temp,
      wind: { speed }
    } = this.props;

    const { lat = 0, lon = 0 } = this.props.coord;
    const { icon, name, hasError, isLoading } = this.props;
    const { value, items } = this.state;

    return (
      <div className="weather-wrap">
        {isLoading}
        <div className="city-box">
          <Autocomplete
            getItemValue={item => item.name}
            items={items}
            placeholder="Найти город"
            renderItem={({ id, name }, isHighlighted) => (
              <div
                key={id}
                style={{
                  background: isHighlighted ? "lightgray" : "white"
                }}
              >
                <div>{name}</div>
              </div>
            )}
            value={value}
            onChange={this.handleChangeCity}
            onSelect={this.handleSelectCity}
          />
          <button onClick={this.handleAddCity} className="city-box__button">
            Добавить город
          </button>
          {hasError && <div className="error">Произошла ошибка</div>}
        </div>
        <div className="city-info">
          <div className="city-header">
            {isLoading ? "Загружаем...." : name}

            <img src={icon} />
          </div>

          <table className="city-table">
            <tbody>
              <tr>
                <td>Влажность</td>
                <td>{humidity}</td>
              </tr>
              <tr>
                <td>Давление</td>
                <td>{pressure && pressure.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Температура</td>
                <td>{temp} C</td>
              </tr>
              <tr>
                <td>Скорость ветра</td>
                <td>{speed}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="favorites">
          <div className="favorites-header">Избранные города</div>
          <ul>
            {this.state.cities.map(city => (
              <li key={city}>
                <div onClick={() => this.props.onSelectCity(city)}>{city}</div>
                <Link to={`/city/${city}`}>Прогноз</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Weather;
