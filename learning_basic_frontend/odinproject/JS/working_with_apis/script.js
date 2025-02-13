class WeatherGetter {
  static #urlPrefix =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  #apiKey;

  constructor(apiKey) {
    this.#apiKey = apiKey;
  }

  buildUrl(location) {
    const today = new Date().toISOString().split("T")[0];
    const url =
      WeatherGetter.#urlPrefix +
      "/" +
      location +
      "/" +
      today.toString() +
      "?key=" +
      this.#apiKey;
    return url;
  }

  async getWeatherData(location) {
    try {
      const url = this.buildUrl(location);
      let response = await fetch(url);
      let jsonResponse = await response.json();
      return jsonResponse;
    } catch (e) {
      console.log(e);
    }
  }
}

class Weather {
  static #address = document.getElementById("address");
  static #conditions = document.getElementById("conditions");
  static #cloudcover = document.getElementById("cloudcover");
  static #temp = document.getElementById("tempC");

  static displayWeather(resolvedAddress, conditions, cloudcover, temp) {
    Weather.#address.textContent = resolvedAddress;
    Weather.#conditions.textContent = conditions;
    Weather.#cloudcover.textContent = "Humidity: " + cloudcover + "%";
    Weather.#temp.textContent =
      "Temperature: " + (((temp - 32) * 5) / 9).toFixed(2) + "°C";
  }
}

async function getAndDisplayData(apiKey, location) {
  try {
    const weatherGetter = new WeatherGetter(apiKey);
    const wData = await weatherGetter.getWeatherData(location);
    Weather.displayWeather(
      wData.resolvedAddress,
      wData.days[0].conditions,
      wData.days[0].cloudcover,
      wData.days[0].temp
    );
  } catch (e) {
    console.log(e);
  }
}

window.apiKey = "";
const form = document.getElementById("locationForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.getElementById("location").value;
  getAndDisplayData(window.apiKey, location);
});
