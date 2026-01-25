-- Write your PostgreSQL query statement below
SELECT
  Employee.name AS name,
  Bonus.bonus AS bonus
FROM
  Employee
  LEFT JOIN Bonus USING (empId)
WHERE
  Bonus.bonus < 1000
  OR Bonus.bonus IS NULL;
