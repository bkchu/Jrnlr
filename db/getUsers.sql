SELECT * FROM users
WHERE email LIKE CONCAT($1, '%');