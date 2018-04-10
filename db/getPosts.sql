SELECT u.name, p.* FROM post p
JOIN users u on p.userid = u.id
WHERE p.userid IN (
  -- list of userid's that correspond to the list of follows
  SELECT u.id from users u
  WHERE u.authid IN (
    -- list of follows
    SELECT f.follows FROM users u
    JOIN follow f ON u.authid = f.userid
    WHERE u.id = $1
  )
)
AND p.privacy = false
ORDER BY date DESC;