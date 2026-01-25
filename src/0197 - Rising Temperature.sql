-- Write your PostgreSQL query statement below

SELECT
  today.id AS id
FROM
  Weather AS today
  JOIN Weather AS yesterday ON today.recordDate = yesterday.recordDate + INTERVAL '1 day'
WHERE
  today.temperature > yesterday.temperature;

-- Didn't work because it must consider only the previous day
--
-- SELECT
--   id
-- FROM
--   (
--     SELECT
--       id,
--       temperature,
--       LAG(temperature) OVER (
--         ORDER BY
--           recordDate ASC
--       ) AS previousTemperature
--     FROM
--       Weather
--   ) AS query
-- WHERE
--   temperature > previousTemperature;
