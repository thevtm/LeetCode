-- Write your PostgreSQL query statement below
WITH
    products_first_year AS (
        SELECT
            DISTINCT ON (product_id) product_id,
            year AS first_year
        FROM Sales
        ORDER BY product_id, year
    )
SELECT product_id, first_year, quantity, price
FROM Sales
JOIN products_first_year USING (product_id)
WHERE year = first_year;
