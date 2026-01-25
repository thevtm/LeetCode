-- Write your PostgreSQL query statement below
SELECT  Customers.name AS "Customers"
FROM Customers
LEFT JOIN Orders
ON Orders.customerId = Customers.id
WHERE Orders.id IS NULL;
