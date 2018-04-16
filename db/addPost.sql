INSERT INTO post (userid, title, subtitle, body, imageobj, date, privacy)
VALUES ($1, $2, $3, $4, $5, now(), $6);