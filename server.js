const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3069,
    user: 'root',
    password: 'password',
    database: 'company_db',
  });

  connection.connect(err => {
    if (err) throw err;
    console.log("WElcome to the greated company ever created！ DaDaDa!");
    startMenu();
  });

  const startMenu = () => {
    inquirer.prompt({
        message: 'Good morning. Its 7 AM The weather in Malibu is 72 degrees with scattered clouds. The surf conditions are fair with waist to shoulder highlines, high tide will be at 10:52 a.m  What would you like to do today',
        name: 'menu',
        type: 'list',
        choices: [ 
          'View all departments',
          'View all jobs',
          'View all employees',
          'Add a department',
          'Add a job',
          'Add an employee',
          'Update employee job',
          'Exit',
        ],
      })

      .then(response => {
        switch (response.menu) {
        case 'View all departments':
          viewDepartment();
          break;
        case 'View all jobs':
          viewJobs();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a job':
          addJob();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update employee job':
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

const viewDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
      if (err) throw err;
      console.table(res);
      startMenu();
    });
  };

const viewJobs = () => {
    connection.query('SELECT * FROM job', function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
};
  