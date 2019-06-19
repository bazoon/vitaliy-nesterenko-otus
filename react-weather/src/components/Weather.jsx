import React, { Component } from "react";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }

  handleChangeCity = e => {
    this.currentCity = e.target.value;
  };

  componentDidMount() {
    this.setState({
      cities: JSON.parse(localStorage.getItem("favorites")) || []
    });
  }

  handleAddCity = e => {
    this.setState(
      {
        cities: this.state.cities.concat(this.currentCity)
      },
      () => {
        localStorage.setItem("favorites", JSON.stringify(this.state.cities));
      }
    );
  };

  render() {
    const { humidity, pressure, temp, wind = {} } = this.props;
    const { speed } = wind;
    const { lat = 0, lon = 0 } = this.props.coord;
    const { icon, name, hasError, isLoading } = this.props;
    console.log(isLoading);
    return (
      <div className="weather-wrap">
        {isLoading}
        <div className="city-box">
          <input
            onChange={this.handleChangeCity}
            onKeyPress={e => e.charCode === 13 && this.handleAddCity()}
            className="city-box__search"
            type="text"
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
              <li onClick={() => this.props.onSelectCity(city)} key={city}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Weather;
