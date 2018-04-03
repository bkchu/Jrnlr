module.exports = {
  getPosts: (req, res, next) => {
    const db = req.app.get("db");
    db
      //TODO
      .getPosts([req.session.passport.user.id])
      // .getPosts([14])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => console.log(error));
  },
  getPostsByUserId: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getPostsByUserId([req.params.userid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => console.log(error));
  },
  getPost: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getPost([req.params.id])
      .then(response1 => {
        console.log("response1: ", response1);
        db
          .getLikes([req.params.id])
          .then(response2 => {
            response1[0]["numLikes"] = response2[0].count;
            res.status(200).json(response1);
          })
          .catch(err => console.log(err));
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
        req.body.imgobj
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
        req.body.imgobj
      ])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  }
};
