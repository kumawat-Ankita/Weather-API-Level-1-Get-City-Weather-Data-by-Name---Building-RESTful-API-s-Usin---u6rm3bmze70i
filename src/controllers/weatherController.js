const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getWeatherDataByName(cityName) {
  try {
    const cityData = await getDataFromDatabase();
    const cityWeather = cityData.find(city => city.city.toLowerCase() === cityName.toLowerCase());

    if (cityWeather) {
      return {
        status: 'success',
        message: 'Weather data retrieved',
        data: {
          city: cityWeather.city,
          temperature: cityWeather.temperature,
          humidity: cityWeather.humidity,
          windSpeed: cityWeather.windSpeed,
          conditions: cityWeather.conditions
        }
      };
    } else {
      return {
        status: 'error',
        message: 'Failed to retrieve weather data',
        error: 'City not found'
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to retrieve weather data',
      error: error.message
    };
  }
}


module.exports = {
  getWeatherDataByName
};
