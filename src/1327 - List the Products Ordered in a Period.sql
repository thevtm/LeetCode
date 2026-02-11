-- Write your PostgreSQL query statement below

SELECT
  product_name,
  SUM(unit) AS unit
FROM Orders
JOIN Products USING (product_id)
WHERE
  order_date >= DATE '2020-02-01'
  AND order_date < DATE '2020-03-01'
GROUP BY product_name
HAVING SUM(unit) >= 100
