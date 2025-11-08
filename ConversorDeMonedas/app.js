import axios from "axios";
import chalk from "chalk";

const API_KEY = "71046d2fdd86983e5d92b468";

function showChange(pais1, pais2, data, monto) {
  console.log(chalk.green.bold("\n💱 Conversor de Monedas CLI"));
  console.log(chalk.yellow(`\n${pais1} to ${pais2} :`));
  console.log(chalk.cyan("-----------------------"));
  console.log(chalk.cyan("Monto :"), monto, chalk.cyan(pais1));
  console.log(
    chalk.cyan("Cambio: "),
    monto * data.conversion_rate,
    chalk.cyan(pais2)
  );
}

function handleError(err) {
  console.log(chalk.red("Error : "), err.message);
  process.exit(1);
}

async function getCambio(pais1, pais2) {
  try {
    let endpoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${pais1}/${pais2}`;
    const response = await axios.get(endpoint);

    return response.data;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(
      `No es posible tener la informacion del monto de cambio (${pais1}/${pais2})`
    );
  }
}
function main() {
  let pais1 = process.argv[2],
    pais2 = process.argv[3],
    monto = parseFloat(process.argv[4]) || 100;

  if (!pais1 || !pais2 || !monto) {
    console.log(chalk.red("❌ Proporciona todos los datos solicitados"));
    console.log(
      chalk.red("Ejecuta el comando: node app.js [nombre pais1] [nombre pais2]")
    );
  }
  if (pais1.length !== 3 || pais2.length !== 3) {
    console.log(
      chalk.red("⚠️ Los códigos deben tener 3 letras (ej: USD, EUR)")
    );
    process.exit(1);
  }
  pais1 = pais1.toUpperCase();
  pais2 = pais2.toUpperCase();

  getCambio(pais1, pais2)
    .then((data) => showChange(pais1, pais2, data, monto))
    .catch(handleError);
}
main();

// function main() {
// getCambio("EUR", "GBP").then()
//   console.log("Resultado:", datos);
// }
// main();
