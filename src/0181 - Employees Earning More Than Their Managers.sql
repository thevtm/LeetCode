SELECT  e.name AS "Employee"
FROM Employee AS e, Employee AS m
WHERE e.managerId = m.id
AND e.managerId IS NOT NULL
AND e.salary > m.salary;
