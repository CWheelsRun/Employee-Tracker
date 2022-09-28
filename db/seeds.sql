INSERT INTO department (id, name)
VALUES (01, "General Management"),
       (02, "Engineering"),
       (03, "Marketing & Sales"),
       (04, "Legal & HR"),
       (05, "Finance & Accounting"),
       (06, "QA & Customer Support");

SELECT * FROM department;

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Chief Executive Officer", "200000", 01),
       (002, "Chief Financial Officer", "175000", 01),
       (003, "General Manager", "150000", 01),
       (004, "Product Manager", "125000", 02),
       (005, "Principle Engineer", "110000", 02),
       (006, "Senior Engineer", "95000", 02),
       (007, "Junior Engineer", "80000", 02),
       (008, "Head of Marketing", "100000", 03),
       (009, "Marketing Specialist", "80000", 03),
       (010, "Sales Manager", "90000", 03),
       (011, "Sales Associate", "70000", 03),
       (012, "General Counsel", "150000", 04),
       (013, "Paralegal", "80000", 04),
       (014, "HR Lead", "90000", 04),
       (015, "HR Assistant", "70000", 04),
       (016, "Finance Analyst", "100000", 05),
       (017, "Accounting Manager", "120000", 05),
       (018, "Accountant", "70000", 05),
       (019, "QA Lead", "90000", 06),
       (020, "QA Tester", "60000", 06),
       (021, "Support Lead", "90000", 06),
       (022, "Customer Support Representative", "60000", 06),

SELECT * FROM role;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (101, "Peter", "Pan", 001, NULL),
        (102, "John", "Darling", 002, NULL),
        (201, "James", "Slightly", 004, 101),
        (202, "Pentiss", "Tootles", 005, 201),
        (203, "Marmaduke", "Twin", 006, 202)
        (204, "Binky", "Twin", 006, 202)
        (301, "Michael", "Darling", 008, 102),
        (303, "Theodore", "Cubby", 010, 301),
        (401, "Wendy", "Darling", 012, NULL),
        (502, "Thomas", "Nibs", 017, 102),
        (603, "Tinker", "Bell", 021, 101);

SELECT * FROM employee;