module.exports = {
  addFollow: (req, res, next) => {
    const db = req.app.get("db");
    db
      .addFollow([req.session.passport.user.authid, req.params.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  getFollows: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getFollows([req.session.passport.user.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  removeFollow: (req, res, next) => {
    const db = req.app.get("db");
    db
      .removeFollow([req.session.passport.user.authid, req.params.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  }
};
