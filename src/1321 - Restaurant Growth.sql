-- Write your PostgreSQL query statement below

WITH
  total_per_date AS (
    SELECT
      visited_on,
      SUM(amount) AS amount
    FROM Customer
    GROUP BY visited_on
  ),

  amount_over_7_days AS (
    SELECT
      visited_on,
      (
        amount
        + LAG(amount, 1) OVER w
        + LAG(amount, 2) OVER w
        + LAG(amount, 3) OVER w
        + LAG(amount, 4) OVER w
        + LAG(amount, 5) OVER w
        + LAG(amount, 6) OVER w
      ) AS amount
    FROM total_per_date
    WINDOW w AS (ORDER BY visited_on)
  )

SELECT
  visited_on,
  amount,
  ROUND(amount / 7.0, 2) AS average_amount
FROM amount_over_7_days
WHERE amount IS NOT NULL
