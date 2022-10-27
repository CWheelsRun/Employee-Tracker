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
          '${data.title}', ${parseInt(data.salary)}, ${parseInt(data.department_id)})`,
        (err, result) => {
          if (err) throw err;
          console.log("\nRole Added!");
          mainPrompt();
        }
      );
    });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: `What is the employee's first name?`,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter the employee's first  name!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last",
        message: `What is the employee's last name?`,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter the employee's last name!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "role",
        message: `What is the employee's role ID?`,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter the employee's role ID number!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "manager",
        message: `What is the employee's manager ID?`,
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log(`Please enter the employee's manager ID number!`);
            return false;
          }
        },
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (
          '${data.first}', '${data.last}', ${parseInt(data.role)}, ${parseInt(data.manager)})`,
        (err, result) => {
          if (err) throw err;
          console.log("\nEmployee Added!");
          mainPrompt();
        }
      );
    });
};

async function updateEmployee() {
  let role_ids = [];
  let roles = [];
  let employee_ids = [];
  let employees = [];

  let sql = `SELECT * FROM employee_role ORDER BY title`;
  let result = await db.promise().query(sql);

  result[0].forEach((obj) => {
    role_ids.push(obj.id);
    roles.push(obj.title);
  });

  sql = `SELECT * FROM employee`;
  result = await db.promise().query(sql);

  result[0].forEach((obj) => {
    employee_ids.push(obj.id);
    employees.push(obj.first_name + " " + obj.last_name);
  });

  return inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Which employee's role would you like to update?\n`,
        choices: employees,
      },
      {
        type: "list",
        name: "role",
        message: `What role should this employee belong to?\n`,
        choices: roles,
      },
    ])
    .then((data) => {
      let employee_id;
      for (let a = 0; a < employees.length; a++) {
        if (employees[a] === data.employee) {
          employee_id = employee_ids[a];
          break;
        }
      }

      let role_id;
      for (let a = 0; a < roles.length; a++) {
        if (roles[a] === data.role) {
          role_id = role_ids[a];
          break;
        }
      }

      let sql = `UPDATE employee 
        SET role_id = ${parseInt(role_id)} 
        WHERE id = ${parseInt(employee_id)}`;

      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("\nEmployee Role Updated!");
        mainPrompt();
      });
    });
}

mainPrompt();