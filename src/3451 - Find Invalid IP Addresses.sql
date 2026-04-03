SELECT
  ip,
  count AS invalid_count
FROM
  (
    SELECT
      ip,
      COUNT(1) AS count,
      ip ~ '^\d+\.\d+\.\d+\.\d+$' AS valid_octets,
      0 <= ALL(regexp_match(ip, '(\d+)\.(\d+)\.(\d+)\.(\d+)')::numeric[]) AS above_min,
      256 > ALL(regexp_match(ip, '(\d+)\.(\d+)\.(\d+)\.(\d+)')::numeric[]) AS below_max,
      1 <= ALL(regexp_match(ip, '(\d+)\.(\d+)\.(\d+)\.(\d+)')::numeric[]) AS above_one,
      (SELECT BOOL_OR(x ~ '^0') FROM unnest(regexp_match(ip, '(\d+)\.(\d+)\.(\d+)\.(\d+)')) as x) AS leading_zero
    FROM logs
    GROUP BY ip
  )
WHERE
  valid_octets IS FALSE
  OR above_min IS FALSE
  OR below_max IS FALSE
  OR (above_one IS TRUE AND leading_zero IS TRUE)
ORDER BY
  invalid_count DESC,
  ip DESC
