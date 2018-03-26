UPDATE users
SET email_verified = $2
WHERE email = $1;
SELECT * FROM users
WHERE email = $1;