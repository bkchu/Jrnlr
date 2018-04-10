module.exports = {
  getPosts: (req, res, next) => {
    const db = req.app.get("db");
    db
      //TODO
      .getPosts([req.session.passport.user.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },
  getPostsByUserId: (req, res, next) => {
    const db = req.app.get("db");
    if (+req.params.userid === +req.session.passport.user.id) {
      db
        .getPostsByUserId([req.params.userid])
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => console.log(err));
    } else {
      db
        .getPostsByUserId([req.params.userid])
        .then(response => {
          let allPublicPostsById = response.filter(
            post => post.privacy === false
          );
          res.status(200).json(allPublicPostsById);
        })
        .catch(err => console.log(err));
    }
  },
  getPost: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getPost([req.params.id])
      .then(post => {
        db
          .getLikes([req.params.id])
          .then(likes => {
            let index = likes.findIndex(
              like => +like.userid === req.session.passport.user.id
            );
            post[0]["numLikes"] = likes.length;
            post[0]["likes"] = likes;
            post[0]["userLiked"] = index !== -1;
            res.status(200).json(post);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  addPost: (req, res, next) => {
    const db = req.app.get("db");
    db
      .addPost([
        req.session.passport.user.id,
        req.body.title,
        req.body.contentState,
        req.body.imgobj,
        req.body.privacy
      ])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
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
        req.body.contentState,
        req.body.imgobj,
        req.body.privacy
      ])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  }
};
