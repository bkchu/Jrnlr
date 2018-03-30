SELECT u.name, p.* FROM post p
JOIN users u on p.userid = u.id
WHERE p.userid IN (
  SELECT u.id from users u
  WHERE u.authid IN (
    SELECT f.follows FROM users u
    JOIN follow f ON u.authid = f.userid
    WHERE u.id = $1
  )
)
ORDER BY date DESC;