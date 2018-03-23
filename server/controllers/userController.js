module.exports = {
  getUser: (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ message: "Not Logged In" });
    }
  },
  logoutUser: (req, res, next) => {
    req.logout();
    req.session.destroy(() => {
      res.redirect("http://localhost:3000/");
    });
  }
};
