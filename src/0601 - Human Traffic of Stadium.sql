-- Write your PostgreSQL query statement below
SELECT
  id,
  visit_date,
  people
FROM (
  SELECT
      *,
      people >= 100
        AND (
          (LEAD(people >= 100, 1) OVER w AND LAG(people >= 100, 1) OVER w) -- next + prev
          OR
          (LEAD(people >= 100, 1) OVER w AND LEAD(people >= 100, 2) OVER w) -- next + next
          OR
          (LAG(people >= 100, 1) OVER w AND LAG(people >= 100, 2) OVER w) -- prev + prev
        )
      AS condition
  FROM Stadium
  WINDOW w AS (ORDER BY id)
)
WHERE condition IS TRUE
