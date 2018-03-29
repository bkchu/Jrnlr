DELETE FROM follow
WHERE userid = $1
AND follows = $2;
SELECT * FROM follow f
WHERE f.userid = $1;