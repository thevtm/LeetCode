-- Write your PostgreSQL query statement below
WITH      meetings_with_week AS (
          SELECT    employee_id,
                    duration_hours,
                    EXTRACT('isoyear' FROM meeting_date) AS YEAR,
                    EXTRACT('week' FROM meeting_date) AS week
          FROM      meetings
          ),
          meetings_week_aggregate AS (
          SELECT    employee_id,
                    year,
                    week,
                    SUM(meetings_with_week.duration_hours) AS hours_in_meetings
          FROM      meetings_with_week
          GROUP BY  employee_id,
                    year,
                    week
          ORDER BY  employee_id ASC
          ),
          heavy_meetings_aggregate AS (
          SELECT    employee_id,
                    COUNT(1) AS meeting_heavy_weeks
          FROM      meetings_week_aggregate
          WHERE     hours_in_meetings > 20
          GROUP BY  employee_id
          )
SELECT    *
FROM      employees
JOIN      heavy_meetings_aggregate USING (employee_id)
WHERE     meeting_heavy_weeks >= 2
ORDER BY  meeting_heavy_weeks DESC,
          employee_name ASC;
