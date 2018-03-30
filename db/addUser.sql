INSERT INTO users (authid, email, name, email_verified)
VALUES ($1, $2, $3, $4);
INSERT INTO follow (userid, follows)
VALUES ($1, $1);
SELECT * FROM users
WHERE authid = $1;