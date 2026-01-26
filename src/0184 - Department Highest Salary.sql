-- Write your PostgreSQL query statement below
WITH
    highest_salary_per_department AS (
      SELECT
        DISTINCT ON (departmentId) departmentId,
        salary AS highest_salary
      FROM Employee ORDER BY departmentId, salary DESC
    )
SELECT
    d.name AS "Department",
    e.name AS "Employee",
    e.salary AS "Salary"
FROM Employee AS e
JOIN Department AS d ON d.id = e.departmentId
JOIN highest_salary_per_department AS hspd USING (departmentId)
WHERE e.salary = hspd.highest_salary
ORDER BY d.name, e.salary DESC;
