-- Write your PostgreSQL query statement below
WITH
    users_2019_orders_count AS (
        SELECT
            buyer_id AS user_id,
            COUNT(1) AS orders_in_2019
        FROM Orders
        WHERE
            order_date >= DATE '01-01-2019'
            AND order_date < DATE '01-01-2020'
        GROUP BY buyer_id
    )
SELECT
    user_id AS buyer_id,
    join_date,
    COALESCE(orders_in_2019, 0) AS orders_in_2019
FROM Users
LEFT JOIN users_2019_orders_count USING (user_id)
