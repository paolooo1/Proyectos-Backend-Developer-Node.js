import axios from "axios";
import chalk from "chalk";

const API_KEY = "f587769b914841f2bbbe7f9fc1818a34";

function displayWeather(city, weatherData) {
  console.log(chalk.yellow(`\nInformación del clima: ${city}`));
  console.log(chalk.cyan("-----------------------"));
  console.log(chalk.cyan("Descripcion: "), weatherData.weather[0].description);
  console.log(chalk.cyan("Temperatura: "), `${weatherData.main.temp} °C`);
  console.log(chalk.cyan("Humedad: "), `${weatherData.main.humidity}%`);
  console.log(
    chalk.cyan("Velocidad del Viento: "),
    `${weatherData.wind.speed} m/s`
  );
  console.log(chalk.cyan("-----------------------"));
}

function handleError(err) {
  console.log(chalk.red("Error: "), err.message);
  process.exit(1);
}

async function getwheter(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(endpoint, {
      // ? Ver video de AXIOS de JHON MIRCHA
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(`No es posible tener la informacion de la ciudad: ${city}`);
  }
}

function initApp() {
  let city = process.argv[2]; //guarda el segundo parametro del comando de inicio de la app (node app.js Lima) => El segundo argumento es Lima
  if (!city) {
    console.log(chalk.red("Proporciona un nombre de ciudad"));
    console.log(chalk.red("Ejecuta el comando: node app.js [nombre ciudad]"));
  }
  getwheter(city)
    .then((weatherData) => displayWeather(city, weatherData))
    .catch(handleError); //puede ser asi => (err) => handleError(err) pero es mas ordenado solo pasar el nombre de la funcion sin parentesis
}

initApp();
