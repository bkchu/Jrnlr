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
  getUserProfile: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getUserProfile([req.params.userid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  addProfile: (req, res, next) => {
    const db = req.app.get("db");
    let { photo, fullName, about } = req.body;
    db
      .addProfile([req.session.passport.user.id, fullName, photo, about])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  updateProfile: (req, res, next) => {
    const db = req.app.get("db");
    let { photo, about } = req.body;
    db
      .updateProfile([req.session.passport.user.id, photo, about])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  setUserIsNewToFalse: (req, res, next) => {
    const db = req.app.get("db");
    db
      .setUserIsNewToFalse([req.session.passport.user.id])
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
