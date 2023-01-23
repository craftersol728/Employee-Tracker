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
        message: 'Good morning. Its 7 AM The weather in Malibu is 72 degrees with scattered clouds. The surf conditions are fair with waist to shoulder highlines, high tide will be at 10:52 a.m  Jarvis At your service,',
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
  

const viewEmployees = () => {
    connection.query(
      'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);',
      function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
      }
    );
  };
  

const addDepartment = () => {
    inquirer.prompt([
        {
          name: 'department',
          type: 'input',
          message: 'How many ounces a day of this gobbledygook am I supposed to drink? What is the department name?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO department (dept_name) VALUES (?)',
          [answer.department],
          function (err, res) {
            if (err) throw err;
            console.log('Sir, the more you struggle, the more this is going to hurt. Department added');
            startMenu();
          }
        );
      });
  };

  const addJob = () => {
    inquirer.prompt([
        {
          name: 'jobTitle',
          type: 'input',
          message: 'Oh, hello sir.What is the job title?',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'The armor is now at 92% What is the salary for this job?',
        },
        {
          name: 'deptId',
          type: 'input',
          message: 'Uh, say J.A.R.V.I.S., is it that time? What is the department ID number?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)',
          [answer.jobTitle, answer.salary, answer.deptId],
          function (err, res) {
            if (err) throw err;
            console.log('Job added!');
            startMenu();
          }
        );
      });
  };

  const addEmployee = () => {
    inquirer.prompt([
        {
          name: 'nameFirst',
          type: 'input',
          message: "I'm sorry, I was asleep. Or... I was a dream? What is the employee's first name?",
        },
        {
          name: 'nameLast',
          type: 'input',
          message: "Reboot. Legionnaire 06's got a buggy suit. What is the employee's last name?",
        },
        {
          name: 'jobId',
          type: 'input',
          message: "Wouldn't've been my first call. But, down in the real world, we're faced with ugly choices What is the employee's job id?",
        },
        {
          name: 'managerId',
          type: 'input',
          message: 'Im not Ultron. Im not J.A.R.V.I.S.. I am... I am... What is the manager Id?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)',
          [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
          function (err, res) {
            if (err) throw err;
            console.log('Employee added!');
            startMenu();
          }
        );
      });
  };
  
  const updateEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'Ill continue to run variations on the interface, but you should probably prepare for your guests. Ill notify you if there are any developments. Enter employee id',
        },
        {
          name: 'jobId',
          type: 'input',
          message: 'I am a program. I am without form. Enter new job id',
        },
      ])
      .then(answer => {
        connection.query(
          'UPDATE employee SET job_id=? WHERE id=?',
          [answer.jobId, answer.id],
          function (err, res) {
            if (err) throw err;
            console.log('Its too much...making me... Oh. No. Employee updated!');
            startMenu();
          }
        );
      });
  };