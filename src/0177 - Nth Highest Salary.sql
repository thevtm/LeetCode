CREATE OR REPLACE FUNCTION NthHighestSalary(N INT) RETURNS TABLE (Salary INT) AS $$
BEGIN
  RETURN QUERY (
    -- Write your PostgreSQL query statement below.
    WITH
        selected_salary AS (SELECT DISTINCT Employee.salary FROM Employee ORDER BY Employee.salary DESC LIMIT 1 OFFSET N - 1)
    SELECT
        CASE
            WHEN N < 1 THEN NULL
            ELSE (SELECT * FROM selected_salary)
        END
  );
END;
$$ LANGUAGE plpgsql;
