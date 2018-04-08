SELECT * FROM users
WHERE authid IN (SELECT f.follows FROM follow f
JOIN users u ON u.authid = f.userid
WHERE u.id = $1)
AND id != $1
ORDER BY email ASC;