WITH
  ProductIds AS (
    SELECT DISTINCT product_id FROM Prices
  ),

  UnitsSoldWithAverage AS (
    SELECT
      product_id,
      ROUND(SUM(price * units * 1.0) / SUM(units), 2) AS average_price
    FROM UnitsSold
    JOIN Prices USING(product_id)
    WHERE
      purchase_date >= start_date
      AND purchase_date <= end_date
    GROUP BY product_id
  )

SELECT
  product_id,
  COALESCE(average_price, 0) AS average_price
FROM ProductIds
LEFT JOIN UnitsSoldWithAverage USING (product_id)

