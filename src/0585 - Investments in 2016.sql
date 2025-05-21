SELECT ROUND(CAST(SUM(tiv_2016) AS numeric), 2) AS tiv_2016
FROM Insurance x
WHERE
    tiv_2015 IN (SELECT tiv_2015 FROM Insurance y WHERE x.pid != y.pid)
    AND
    (lat, lon) NOT IN (SELECT lat, lon FROM Insurance y WHERE x.pid != y.pid);
