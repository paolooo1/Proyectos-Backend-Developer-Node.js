import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";

const tasks = [];
const DB_FILE = "tasks.json";
let contador = 0;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(chalk.yellow(`\nGestor de Notas`));
  console.log(chalk.cyan("-----------------------"));
  console.log(chalk.cyan("1. Agregar notas"));
  console.log(chalk.cyan("2. Listar notas"));
  console.log(chalk.cyan("3. Actualizar notas"));
  console.log(chalk.cyan("4. Completar notas"));
  console.log(chalk.cyan("5. Eliminar notas"));
  console.log(chalk.cyan("6. Salir"));
}

function loadTask() {
  try {
    const data = readFileSync(DB_FILE, "utf-8");
    const json = JSON.parse(data);
    tasks.length = 0; // Limpia el array antes de volver a llenarlo

    json.forEach(({ id, task, completed }) => {
      tasks.push({ id, task, completed });
    });
    console.log(chalk.green.bold("Las tareas se han cargado desde la DB.\n"));
  } catch (error) {
    console.log(chalk.green.bold("No hay tareas por hacer 😊👌\n"));
  }
}

function chooseOption() {
  rl.question("Escoge una opcion (1-5) : ", (choice) => {
    switch (choice) {
      case "1":
        addTask();
        break;

      case "2":
        listTask();
        break;

      case "3":
        updateTask();
        break;

      case "4":
        completTask();
        break;

      case "5":
        deleteTask();
        break;

      case "6":
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

function addTask() {
  rl.question("Indica tu tarea : ", (task) => {
    tasks.push({ id: contador, task, completed: false });
    console.log(chalk.green.bold("La tarea se agrego!"));
    saveTask();
    displayMenu();
    chooseOption();
    contador++;
  });
}

function saveTask() {
  // const data = tasks
  //   .map((task) => `${task.id} : ${task.task} : ${task.completed}`)
  //   .join("\n");
  writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2), "utf-8");
  console.log(chalk.green.bold("Tarea marcada en la DB con exito\n"));
}

function listTask() {
  //verificar si el array task no este vacio
  if (tasks.length == 0) {
    console.log("No hay tareas pdjo");
  } else {
    tasks.forEach((task) => {
      let status = task.completed ? "✅" : "❌";
      if (task.completed) {
        console.log(
          chalk.bgGreenBright.bold(`${task.id + 1} : ${task.task} : ${status}`)
        );
      } else {
        console.log(
          chalk
            .bgHex("#dab6b6ff")
            .bold(`${task.id + 1} : ${task.task} : ${status}`)
        );
      }
    });
  }
  displayMenu();
  chooseOption();
}

function updateTask() {
  rl.question("\nIngrese el Id de la tarea a actualizar : ", (index) => {
    const id = parseInt(index) - 1;
    rl.question("Indica la nueva tarea a realizar : ", (answer) => {
      tasks[id].task = answer;
      console.log(chalk.green.bold("\nLa tarea se actualizo!"));
      saveTask();
      displayMenu();
      chooseOption();
    });
  });
}

function deleteTask() {
  console.log(chalk.yellow.bold("\n 🐽🐽 Delete Tareas 🐽🐽"));
  rl.question("\nIngrese el Id de la tarea a eliminar : ", (index) => {
    const id = parseInt(index) - 1;
    tasks.splice(id, 1);
    console.log(chalk.green.bold("\nLa tarea se ha eliminada!"));
    saveTask();
    displayMenu();
    chooseOption();
  });
}

function resetDB() {
  writeFileSync(DB_FILE, "", "utf-8");
  console.log(chalk.red.bold("📁 Base de datos limpiada al iniciar\n"));
}

resetDB();
loadTask();
displayMenu();
chooseOption();
