import { readFileSync, writeFileSync } from "fs"; //módulo nativo de Node.js que permite leer y escribir archivos.
import { createInterface } from "readline"; //módulo nativo para leer entradas del usuario en la consola.
import chalk from "chalk"; //librería externa que da color y estilo al texto mostrado en la terminal (opcional, solo estético).

const tasks = [];
const DB_FILE = "tasks.txt";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(chalk.bgWhite.bold("\n🐽🐽 To Do App 🐽🐽"));
  console.log("1. Agregar Tarea");
  console.log("2. Listar Tareas");
  console.log("3. Completar Tarea");
  console.log("4. Salir");
}

function loadTask() {
  try {
    const data = readFileSync(DB_FILE, "utf-8");
    const lines = data.split("\n"); //// Cada línea del archivo es una tarea
    tasks.length = 0; // Limpia el array antes de volver a llenarlo

    lines.forEach((line) => {
      if (line.trim() !== "") {
        const [task, completed] = line.split("|");
        tasks.push({ task, completed: completed === "true" });
      }
    });
    console.log(chalk.green.bold("Las tareas se han cargado desde la DB.\n"));
  } catch (error) {
    console.log(chalk.green.bold("No hay tareas por hacer 😊👌\n"));
  }
}

function saveTask() {
  const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
  writeFileSync(DB_FILE, data, "utf-8");
  console.log(chalk.green.bold("Tarea marcada en la DB con exito\n"));
}

function addTask() {
  rl.question("\nDime la tarea : ", (task) => {
    tasks.push({ task, completed: false });
    console.log(chalk.green.bold("La tarea se agrego!"));
    saveTask();
    displayMenu();
    chooseOption();
  });
}

function listsTask() {
  console.log(chalk.yellow.bold("\n 🐽🐽 Tareas 🐽🐽"));
  if (tasks.length === 0) {
    console.log(
      chalk.white.bgGreenBright.bold("No hay tareas por hacer 😊👌\n")
    );
  } else {
    tasks.forEach((task, index) => {
      let status = task.completed ? "✅" : "❌";
      if (task.completed) {
        console.log(
          chalk.bgGreenBright.bold(`${index + 1} : ${status} - ${task.task}`)
        );
      } else {
        console.log(
          chalk
            .bgHex("#dab6b6ff")
            .bold(`${index + 1} : ${status} - ${task.task}`)
        );
      }
    });
  }

  displayMenu();
  chooseOption();
}

function completTask() {
  rl.question("\nIngresa el index de la tarea completa : ", (indexTask) => {
    const index = parseInt(indexTask) - 1;
    if (index >= 0 && index <= tasks.length) {
      if (tasks[index].completed) {
        console.log(chalk.redBright("\nLa tarea ya esta resuelta Pndjo"));
      } else {
        tasks[index].completed = true;
        saveTask();
        console.log(chalk.green.bold("Tarea marcada con exito ✅\n"));
      }
    }
    displayMenu();
    chooseOption();
  });
}

function chooseOption() {
  rl.question("Escoge una opcion (1-4) : ", (choice) => {
    switch (choice) {
      case "1":
        addTask();
        break;

      case "2":
        listsTask();
        break;

      case "3":
        completTask();
        break;

      case "4":
        console.log(chalk.red.bold("Adios..."));
        rl.close(); //Cierra la comunicacion con la terminal
        break;

      default:
        console.log(chalk.red("Opcion invalida. Intenta nuevamente \n"));
        displayMenu();
        chooseOption();

        break;
    }
  });
}
loadTask();
displayMenu();
chooseOption();
