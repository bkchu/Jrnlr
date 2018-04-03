module.exports = {
  addLike: (req, res, next) => {
    const db = req.app.get("db");
    db
      .addLike([req.params.postid, req.session.passport.user.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  getLikes: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getLikes([req.params.postid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  }
};
