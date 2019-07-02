export const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export function getIconLink(icon) {
  return `https://openweathermap.org/img/w/${icon}.png`;
}

export function hpaToMmhg(hpa) {
  return hpa && hpa * 0.750062;
}
