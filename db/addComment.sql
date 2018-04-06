INSERT INTO comment (userid, postid, body, date)
VALUES ($1, $2, $3, now());
SELECT u.name, c.* FROM comment c
JOIN users u ON u.id = c.userid
WHERE c.postid = $2
ORDER BY c.date ASC;