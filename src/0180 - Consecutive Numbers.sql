-- Write your PostgreSQL query statement below
WITH
    num_leads AS (
        SELECT
            num,
            LEAD(num, 1) OVER w AS next,
            LEAD(num, 2) OVER w AS next_next
        FROM Logs
        WINDOW w AS (ORDER BY id)
    )
SELECT DISTINCT num AS "ConsecutiveNums"
FROM num_leads
WHERE num = next AND num = next_next;
