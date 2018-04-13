SELECT r.profile_photo, u.name, p.* FROM post p
JOIN users u on u.id = p.userid
JOIN profile r on r.userid = u.id
WHERE p.id = $1;