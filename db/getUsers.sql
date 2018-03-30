SELECT * FROM users u
WHERE u.email LIKE $1 
AND u.email != $2;