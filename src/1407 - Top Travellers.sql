-- Write your PostgreSQL query statement below

WITH
  users_travelled_distance AS (
    SELECT user_id, SUM(distance) AS travelled_distance FROM Rides GROUP BY user_id
  )

SELECT
  name,
  COALESCE(travelled_distance, 0) AS travelled_distance
FROM Users
LEFT JOIN users_travelled_distance ON users_travelled_distance.user_id = Users.id
ORDER BY
  travelled_distance DESC,
  name ASC

