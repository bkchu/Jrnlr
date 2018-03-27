UPDATE post 
SET title = $3,
    body = $4,
    imageobj = $5
WHERE id = $2;
SELECT * FROM post p
WHERE p.userid = $1;