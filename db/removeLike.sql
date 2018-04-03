DELETE FROM likes
WHERE postid = $1
AND userid = $2;