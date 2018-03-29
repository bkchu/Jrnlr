INSERT INTO follow (userid, follows)
VALUES ($1, $2);
SELECT * FROM follow f
WHERE f.userid = $1;