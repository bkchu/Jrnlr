INSERT INTO users (authid, email, name, email_verified)
VALUES ($1, $2, $3, $4);
SELECT * FROM users
WHERE authid = $1;