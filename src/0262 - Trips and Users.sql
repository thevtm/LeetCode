-- Write your PostgreSQL query statement below
WITH
  banned_users AS (
    SELECT users_id FROM Users WHERE banned = 'Yes'
  )
SELECT
  request_at AS "Day",
  ROUND(AVG(CASE WHEN status = 'completed' THEN 0 ELSE 1 END), 2) AS "Cancellation Rate"
FROM Trips
WHERE
  DATE(request_at) >= DATE '2013-10-01'
  AND DATE(request_at) <= DATE '2013-10-03'
  AND NOT EXISTS (SELECT 1 FROM banned_users WHERE Trips.client_id = banned_users.users_id)
  AND NOT EXISTS (SELECT 1 FROM banned_users WHERE Trips.driver_id = banned_users.users_id)
GROUP BY request_at
