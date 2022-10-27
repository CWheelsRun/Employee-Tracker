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
  inquirer
    .prompt({
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
    if (err) throw err;
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
    if (err) throw err;
    console.table(result);
    mainPrompt();
  });
};

viewEmployees = () => {
  const sql = `SELECT employee.id ID, 
              CONCAT(employee.first_name, ' ', employee.last_name) Name, 
              employee_role.title Role, 
              department.name AS 'Dept.',  
              CONCAT('$', FORMAT(employee_role.salary, 0)) Salary, 
              CONCAT(manager.first_name, ' ', manager.last_name) Manager 
              FROM employee
              LEFT JOIN employee_role ON employee.role_id = employee_role.id
              LEFT JOIN department ON department.id = employee_role.department_id 
              LEFT JOIN employee AS manager ON manager.id = employee.manager_id
              ORDER by employee.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    mainPrompt();
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter the department name!");
            return false;
          }
        },
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name) VALUES ('${data.name}')`,
        (err, result) => {
          if (err) throw err;
          console.log("\nDepartment Added!");
          mainPrompt();
        }
      );
    });
};

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter the role name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter the salary of the role!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for this role:",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter the department ID number!");
            return false;
          }
        },
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO employee_role (title, salary, department_id) VALUES (
          '${data.title}', ${parseInt(data.salary)}, ${parseInt(
          data.department_id
        )})`,
        (err, result) => {
          if (err) throw err;
          console.log("\nRole Added!");
          mainPrompt();
        }
      );
    });
};

mainPrompt();