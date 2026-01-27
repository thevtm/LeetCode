-- Write your PostgreSQL query statement below
SELECT
    product_id,
    product_name
FROM Sales
JOIN Product USING (product_id)
GROUP BY product_id, product_name
HAVING
    MIN(sale_date) >= DATE '2019-01-01'
    AND MAX(sale_date) <= DATE '2019-03-31';
