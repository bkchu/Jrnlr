DELETE FROM post
WHERE id = $1;
SELECT * FROM post p
WHERE p.userid = $1
ORDER BY date DESC;