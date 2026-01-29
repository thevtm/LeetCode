-- Write your PostgreSQL query statement below
WITH
  unique_salaries_by_department AS (
    SELECT DISTINCT ON (departmentId, salary)
      departmentId,
      salary
    FROM Employee
  ),
  top_salaries AS (
    SELECT
      DISTINCT departmentId,
      NTH_VALUE(salary, 1) OVER w AS first_salary,
      NTH_VALUE(salary, 2) OVER w AS second_salary,
      NTH_VALUE(salary, 3) OVER w AS third_salary
    FROM unique_salaries_by_department
    WINDOW w AS (
      PARTITION BY departmentId
      ORDER BY salary DESC
      RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    )
  )
SELECT
  Department.name AS "Department",
  Employee.name AS "Employee",
  salary AS "Salary"
FROM Employee
JOIN Department ON Department.id = Employee.departmentId
JOIN top_salaries USING (departmentId)
WHERE
  salary IN (first_salary, second_salary, third_salary)
