SELECT COUNT(*) FROM post p
JOIN users u on p.userid = u.id
WHERE userid = $1 AND p.privacy = false;