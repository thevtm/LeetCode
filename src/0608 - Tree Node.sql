-- Write your PostgreSQL query statement below
SELECT
  id,
  CASE
    WHEN t.p_id IS NULL THEN 'Root'
    WHEN EXISTS (SELECT 1 FROM Tree x WHERE t.id = x.p_id) THEN 'Inner'
    ELSE 'Leaf'
  END
  AS "type"
FROM Tree t
