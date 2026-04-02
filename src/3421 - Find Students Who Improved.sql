SELECT
  *
FROM (
  SELECT DISTINCT ON (student_id, subject)
    student_id,
    subject,
    FIRST_VALUE(score) OVER w AS first_score,
    LAST_VALUE(score) OVER w AS latest_score
  FROM Scores
  WINDOW w AS (
    PARTITION BY student_id, subject
    ORDER BY exam_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )
)
WHERE
  latest_score > first_score
