INSERT INTO department (dept_name)
VALUES 
('Front end'),
('Back end'),
('Data Analyst'),
('Full stack');


INSERT INTO job (title, salary, department_id)
VALUES 
('Junior Javascript Dev', 75000, 1),
('Junior Python Dev', 75000, 2),
('Junior C++ dev', 75000, 3),
('Senior Javascript Dev', 175000, 1),
('Senior Python Dev', 175000, 2),
('Senior C++ dev', 118000, 3),

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('Pa', 'Lee', 1, NULL),
('Ryu', 'What', 2, 1),
('Jeff', 'Where', 3, 2),
('Pig', 'asd', 4, 3),
('Scoogi', 'Who', 5, 4),
('Rei', 'Rei', 6, NULL),
('Babe', 'When', 7, NULL);