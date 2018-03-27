INSERT INTO post (userid, title, body, imageobj, date)
VALUES ($1, $2, $3, $4, now());
SELECT * FROM post p
WHERE p.userid = $1;