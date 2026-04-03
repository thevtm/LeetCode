(
  SELECT
    name AS results
  FROM MovieRating
  JOIN Users USING (user_id)
  GROUP BY
    user_id,
    name
  ORDER BY
    COUNT(1) DESC,
    name ASC
  LIMIT 1
)
UNION ALL
(
  SELECT
    title AS results
  FROM MovieRating
  JOIN Movies USING (movie_id)
  WHERE
    EXTRACT(YEAR FROM created_at) = 2020
    AND EXTRACT(MONTH FROM created_at) = 2
  GROUP BY
    movie_id,
    title
  ORDER BY
    AVG(rating) DESC,
    title ASC
  LIMIT 1
)
