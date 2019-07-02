const APPKEY = "e8df37246f2c5e3e0e05eccdbc629d27";
const G_APPKEY = "TA7srAtj6qSW1ZcEfc2s";

export default {
  get: function(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPKEY}&units=metric`;
    return fetch(url, { mode: "cors" }).then(r => r.json());
  },
  getForecast: function(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${APPKEY}&units=metric&cnt=7`;
    return fetch(url, { mode: "cors" })
      .then(r => r.json())
      .then(({ city, list }) => {
        return {
          name: city.name,
          forecast: list.map(item => {
            return {
              humidity: item.humidity,
              pressure: item.pressure,
              temp: item.temp.day
            };
          })
        };
      });
  },
  getCity: function(city) {
    const url = `https://geocoder.tilehosting.com/q/[${city}].js?key=${G_APPKEY}`;
    return fetch(url, { mode: "cors" })
      .then(r => r.json())
      .then(({ results }) => {
        return results.map(r => ({ name: r.name, id: r.lat + r.lon }));
      });
  }
};
