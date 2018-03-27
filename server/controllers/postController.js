const moment = require("moment");

module.exports = {
  getPosts: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getPosts([req.session.passport.user.id])
      // .getPosts([14])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => console.log(error));
  },
  getPost: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getPost([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => console.log(error));
  },
  addPost: (req, res, next) => {
    const db = req.app.get("db");
    db
      .addPost([
        req.session.passport.user.id,
        req.body.title,
        req.body.body,
        JSON.stringify(req.body.imgobj)
      ])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => console.log(error));
  },
  deletePost: (req, res, next) => {
    const db = req.app.get("db");

    db
      .deletePost([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  updatePost: (req, res, next) => {
    const db = req.app.get("db");
    db
      .updatePost([
        req.session.passport.user.id,
        req.params.id,
        req.body.title,
        req.body.body,
        JSON.stringify(req.body.imgobj)
      ])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  }
};
