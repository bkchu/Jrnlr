INSERT INTO users (authid, email, name)
VALUES ($1, $2, $3);
SELECT * FROM users
WHERE authid = $1;