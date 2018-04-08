module.exports = {
  getUser: (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ message: "Not Logged In" });
    }
  },
  getUsers: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getUsers([`${req.query.query}%`, req.session.passport.user.email])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  getUsersFollows: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getUsersFollows([req.session.passport.user.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  logoutUser: (req, res, next) => {
    req.logout();
    req.session.destroy(() => {
      res.redirect(process.env.CLIENT_HOST);
    });
  }
};
