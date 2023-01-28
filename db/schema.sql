DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  dept_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE job (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_in (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) 
  REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  job_id INT,
  manager_id INT
);