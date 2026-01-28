-- Write your PostgreSQL query statement below
SELECT
    ROUND(AVG(immediate_delivery) * 100, 2) AS immediate_percentage
FROM (
    SELECT DISTINCT ON (customer_id)
        CASE WHEN (order_date = customer_pref_delivery_date) THEN 1 ELSE 0 END immediate_delivery
    FROM Delivery
    ORDER BY customer_id, order_date
)
