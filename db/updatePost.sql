UPDATE post 
SET title = $3,
    body = $4,
    imageobj = $5,
    privacy = $6
WHERE id = $2;
SELECT * FROM post p
WHERE p.userid = $1
ORDER BY date DESC;