-- Write your PostgreSQL query statement below
SELECT  Product.product_name AS "product_name"
       ,Sales.year           AS "year"
       ,Sales.price          AS "price"
FROM Sales
JOIN Product
ON Product.product_id = Sales.product_id
;

