-- Write your PostgreSQL query statement below
WITH
  salary_categories AS (
    SELECT
      SUM(CASE WHEN income < 20000 THEN 1 ELSE 0 END) AS low_salary,
      SUM(CASE WHEN income >= 20000 AND income <= 50000 THEN 1 ELSE 0 END) AS average_salary,
      SUM(CASE WHEN income > 50000 THEN 1 ELSE 0 END) AS high_salary
    FROM Accounts
  )

SELECT
  *
FROM (
  SELECT 'Low Salary' as category, low_salary AS accounts_count FROM salary_categories
  UNION ALL
  SELECT 'Average Salary', average_salary AS accounts_count FROM salary_categories
  UNION ALL
  SELECT 'High Salary', high_salary AS accounts_count FROM salary_categories
)
ORDER BY accounts_count DESC
