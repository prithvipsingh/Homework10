const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// create employee  object array which hold all employess

const employees = [];
// create  array of object employee questions

const employeeQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is name of employee ?",
  },
  {
    type: "number",
    name: "id",
    message: "What is the id of employee ?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the email of employee ?",
  },
];
// object for Manager Question
const managerQuestion = {
  type: "number",
  name: "officeNumber",
  message: "What is office number ?",
};
// object for employee  Question
const employeeTypeQuestion = {
  type: "list",
  name: "option",
  message: "What do you want to do ?",
  choices: ["Add a new Engineer", "Add a new Intern", "Exit"],
};
// object for engineer question
const engineerQuestion = {
  type: "input",
  name: "github",
  message: "What is your gitHub profile ?",
};
// object for intern question
const internQuestion = {
  type: "input",
  name: "school",
  message: "What is name of school ?",
};
// creating a function for manager data
function init() {
  inquirer.prompt([...employeeQuestions, managerQuestion]).then((answers) => {
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    employees.push(manager);
    createEmployees();
  });
}
// function for create employees 
function createEmployees() {
  inquirer.prompt(employeeTypeQuestion).then((answer) => {
    switch (answer.option) {
      case "Add a new Engineer":
        createEngineer();
        break;
      case "Add a new Intern":
        createIntern();
        break;
      default:
        generateHtml(employees);
    }
  });
}
// create function for generatr HTML file 
function generateHtml(employees) {
  const html = render(employees);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(outputPath, html, "utf-8");
}
// function for create Engineer 
function createEngineer() {
  inquirer.prompt([...employeeQuestions, engineerQuestion]).then((answers) => {
    const engineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    employees.push(engineer);
    createEmployees();
  });
}
// function for create Intern 
function createIntern() {
  inquirer.prompt([...employeeQuestions, internQuestion]).then((answers) => {
    const intern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    employees.push(intern);
    createEmployees();
  });
}
// calling init function
init();
