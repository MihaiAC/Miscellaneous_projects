function convertToCelsius(fahrenheit_temp) {
  let celsius_temp = (fahrenheit_temp - 32) * 5 / 9;
  return Math.round(celsius_temp * 10) / 10;
}

function convertToFahrenheit(celsius_temp) {
  let fahrenheit_temp = celsius_temp * 9 / 5 + 32;
  return Math.round(fahrenheit_temp * 10) / 10;
}

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
