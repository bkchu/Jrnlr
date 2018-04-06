DELETE FROM comment
WHERE id = $1;
SELECT u.name, c.* FROM comment c
JOIN users u ON u.id = c.userid
WHERE c.postid = $1
ORDER BY c.date ASC;