-- Write your PostgreSQL query statement below
SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(1) DESC
LIMIT 1;

-- WITH
--     customer_orders_count AS (
--         SELECT
--             customer_number,
--             COUNT(1) AS order_count
--         FROM Orders
--         GROUP BY customer_number
--     )
-- SELECT
--     customer_number
-- FROM customer_orders_count
-- ORDER BY order_count DESC
-- LIMIT 1;
