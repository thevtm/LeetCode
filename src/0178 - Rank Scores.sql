-- Write your PostgreSQL query statement below
WITH
    scores_unique AS (SELECT DISTINCT score FROM Scores ORDER BY score DESC),
    scores_rank AS (SELECT score, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank FROM scores_unique)
SELECT score, rank FROM scores JOIN scores_rank USING (score) ORDER BY score DESC;
