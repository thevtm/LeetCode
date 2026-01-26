-- Write your PostgreSQL query statement below

WITH player_first_activity AS (
    SELECT
        DISTINCT ON (player_id, first_activity, second_activity)
        player_id,
        first_activity,
        second_activity
    FROM (
        SELECT
            player_id,
            FIRST_VALUE(event_date) OVER w AS first_activity,
            NTH_VALUE(event_date, 2) OVER w AS second_activity
        FROM Activity
        WINDOW w AS (
            PARTITION BY player_id
            ORDER BY event_date ASC
            RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
        )
    )
)
SELECT
    ROUND(
        AVG(CASE WHEN first_activity + interval '1 day' = second_activity THEN 1 ELSE 0 END),
        2
    ) AS fraction
FROM player_first_activity;

-- Ambiguous description lead me to do the wrong query
-- WITH
--     activity_lead AS (
--         SELECT
--             player_id,
--             event_date,
--             LEAD(event_date) OVER (PARTITION BY player_id ORDER BY event_date ASC) AS next_event_date
--         FROM Activity
--     ),
--     dates_when_players_logged_in_next_day AS (
--         SELECT
--             player_id,
--             event_date,
--             CASE WHEN (event_date = next_event_date - interval '1 day') THEN 1 ELSE 0 END AS logged_in_next_day
--         FROM activity_lead
--     ),
--     players_that_logged_in_next_day AS (
--         SELECT
--             player_id,
--             MAX(logged_in_next_day) AS player_logged_in_next_day
--         FROM dates_when_players_logged_in_next_day
--         GROUP BY player_id
--     )
-- SELECT
--     ROUND(AVG(player_logged_in_next_day), 2) AS "fraction"
-- FROM players_that_logged_in_next_day;
