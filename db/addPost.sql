INSERT INTO post (userid, title, body, imageobj, date, privacy)
VALUES ($1, $2, $3, $4, now(), $5);
SELECT * FROM post p
WHERE p.userid = $1
ORDER BY date DESC;