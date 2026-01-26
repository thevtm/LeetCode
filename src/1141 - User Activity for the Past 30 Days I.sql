-- Write your PostgreSQL query statement below
SELECT
    activity_date AS day,
    COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE
    activity_date <= DATE '2019-07-27'
    AND activity_date > DATE '2019-07-27' - INTERVAL '30 days'
GROUP BY activity_date
ORDER BY day ASC;
