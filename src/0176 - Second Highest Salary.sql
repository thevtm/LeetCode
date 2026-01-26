-- Write your PostgreSQL query statement below
WITH
    second_salary AS (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1)
SELECT
    CASE
        WHEN EXISTS (SELECT 1 FROM second_salary)
        THEN (SELECT * FROM second_salary)
        ELSE NULL
    END AS SecondHighestSalary;
