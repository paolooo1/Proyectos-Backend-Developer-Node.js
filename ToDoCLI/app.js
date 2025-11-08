import { createInterface } from "readline";
import chalk from "chalk"; //Libreria para ponerle color a la terminal

const tasks = [];

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

function addTask() {
  rl.question("\nDime la tarea : ", (task) => {
    tasks.push({ task, completed: false });
    console.log(chalk.green.bold("La tarea se agrego!"));
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
      tasks[index].completed
        ? console.log(chalk.redBright("\nLa tarea ya esta resuelta Pndjo"))
        : (tasks[i].completed = true);
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
displayMenu();
chooseOption();
