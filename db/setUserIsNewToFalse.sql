UPDATE users u
SET is_new = false
WHERE id = $1;