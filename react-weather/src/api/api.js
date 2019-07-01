const APPKEY = "e8df37246f2c5e3e0e05eccdbc629d27";

export default {
  get: function(town) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${APPKEY}&units=metric`;
    return fetch(url, { mode: "cors" }).then(r => r.json());
  }
};
