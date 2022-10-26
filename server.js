require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the Employee Database!`)
);

mainPrompt = () => {
  inquirer.prompt({
      type: "list",
      name: "menu",
      message: "\nWhat would you like to do?\n",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "Exit Application",
      ],
    })
    .then((choice) => {
      switch (choice.menu) {
        case "View all Departments":
          viewDepartments();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "Exit Application":
          process.exit();
      }
    });
};

viewDepartments = () => {
  const sql = `SELECT department.id AS 'ID',
              department.name AS 'Dept. Name' FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      throw error;
    }
    console.table(result);
    mainPrompt();
  });
};

viewRoles = () => {
  const sql = `SELECT employee_role.id AS 'ID', 
              employee_role.title AS 'Title', 
              department.name AS 'Dept. Name', 
              CONCAT('$', FORMAT(employee_role.salary, 0)) AS 'Salary' 
              FROM employee_role
              JOIN department ON employee_role.department_id = department.id
              ORDER BY employee_role.id`;
  db.query(sql, (err, result) => {
    if (err) {
      throw error;
    }
    console.table(result);
    mainPrompt();
  });
};

mainPrompt();