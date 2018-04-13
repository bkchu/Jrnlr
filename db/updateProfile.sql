UPDATE profile
SET profile_photo = $2, 
    about = $3
WHERE userid = $1
RETURNING *;