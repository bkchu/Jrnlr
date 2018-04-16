module.exports = {
  getComments: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getComments([req.params.id])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  addComment: (req, res, next) => {
    const db = req.app.get("db");
    db
      .addComment([req.session.passport.user.id, req.params.id, req.body.text])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  updateComment: (req, res, next) => {
    const db = req.app.get("db");
    db
      .updateComment([req.params.id, req.body.text])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  deleteComment: (req, res, next) => {
    const db = req.app.get("db");
    db
      .deleteComment([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  }
};
