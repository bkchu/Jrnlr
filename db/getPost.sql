SELECT u.name, p.* FROM post p
JOIN users u on u.id = p.userid
WHERE p.id = $1;