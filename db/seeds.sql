INSERT INTO department (name)
VALUES ("General Management"),
       ("Engineering"),
       ("Marketing & Sales"),
       ("Legal & HR"),
       ("Finance & Accounting"),
       ("QA & Customer Support");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Chief Executive Officer", "200000", 1),
       ("Chief Financial Officer", "175000", 1),
       ("General Manager", "150000", 1),
       ("Product Manager", "125000", 2),
       ("Principle Engineer", "110000", 2),
       ("Senior Engineer", "95000", 2),
       ("Junior Engineer", "80000", 2),
       ("Head of Marketing", "100000", 3),
       ("Marketing Specialist", "80000", 3),
       ("Sales Manager", "90000", 3),
       ("Sales Associate", "70000", 3),
       ("General Counsel", "150000", 4),
       ("Paralegal", "80000", 4),
       ("HR Lead", "90000", 4),
       ("HR Assistant", "70000", 4),
       ("Finance Analyst", "100000", 5),
       ("Accounting Manager", "120000", 5),
       ("Accountant", "70000", 5),
       ("QA Lead", "90000", 6),
       ("QA Tester", "60000", 6),
       ("Support Lead", "90000", 6),
       ("Customer Support Representative", "60000", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Peter", "Pan", 001, NULL),
        ("John", "Darling", 002, NULL),
        ("James", "Slightly", 004, 1),
        ("Pentiss", "Tootles", 005, 3),
        ("Marmaduke", "Twin", 006, 4),
        ("Binky", "Twin", 006, 4),
        ("Michael", "Darling", 008, 2),
        ("Theodore", "Cubby", 010, 7),
        ("Wendy", "Darling", 012, NULL),
        ("Thomas", "Nibs", 017, 2),
        ("Tinker", "Bell", 021, 1);