-- Write your PostgreSQL query statement below
SELECT
  CASE
    WHEN MOD(id, 2) = 1 THEN
      COALESCE(LEAD(id) OVER w, id)
    ELSE
      LAG(id) OVER w
  END AS id,
  student
FROM Seat
WINDOW
  w AS (ORDER BY id)
ORDER BY id
