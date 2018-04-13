SELECT u.authid, p.* FROM profile p
JOIN users u ON u.id = p.userid
WHERE p.userid = $1;