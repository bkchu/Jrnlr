INSERT INTO likes (postid, userid)
VALUES ($1, $2);
SELECT * FROM likes
WHERE postid = $1;