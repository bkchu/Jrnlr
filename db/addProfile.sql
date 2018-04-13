INSERT INTO profile (userid, name, profile_photo, about)
VALUES ($1, $2, $3, $4);
UPDATE users
SET is_new = false
WHERE id = $1;