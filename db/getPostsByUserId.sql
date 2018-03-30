SELECT u.name, p.* FROM post p
JOIN users u on p.userid = u.id
WHERE userid = $1
ORDER BY date DESC;