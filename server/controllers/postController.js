module.exports = {
  getPosts: (req, res, next) => {
    console.log("req.session.passport: ", req.session.passport);
    const db = req.app.get("db");
    db
      .getPosts([req.session.passport.user.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => console.log(error));
  }
};
