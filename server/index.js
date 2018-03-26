require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");

const userCtrl = require("./controllers/userController");
const postCtrl = require("./controllers/postController");

const app = express();

// app.use(express.static(path.join(__dirname, '../build')));

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth",
      scope: "openid email profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      console.log(profile);
      app
        .get("db")
        .getUserByEmail([profile.emails[0].value])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .addUser([
                profile.id,
                profile.emails[0].value,
                profile.nickname,
                profile._json.email_verified
              ])
              .then(response => done(null, response[0]))
              .catch(err => console.log(err));
          } else {
            app
              .get("db")
              .updateVerificationStatus([
                profile.emails[0].value,
                profile._json.email_verified
              ])
              .then(res => {
                return done(null, response[0]);
              })
              .catch(err => console.log(err));
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// check if authenticated - request-level middleware

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth",
    failureFlash: true
  })
);

// user endpoints
app.get("/api/user", userCtrl.getUser);
app.get("/api/logout", userCtrl.logoutUser);

//posts endpoints
app.get("/api/posts", authenticated, postCtrl.getPosts);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

function authenticated(req, res, next) {
  if (req.user && req.user.email_verified) {
    next();
  } else if (!req.user) {
    res.status(403).json({ error: "Please log in." });
  } else {
    res.status(401).json({ error: "Please verify your email and try again." });
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
