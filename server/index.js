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
    (accessToken, refreshToken, extraParas, profile, done) => {
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .addUserByAuthId([
                profile.id,
                profile.emails[0].value,
                profile.nickname
              ])
              .then(response => done(null, response[0]));
          } else {
            return done(null, response[0]);
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

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth",
    failureFlash: true,
    connection: "google-oauth2"
  })
);

// user endpoints
app.get("/api/user", userCtrl.getUser);
app.get("/api/logout", userCtrl.logoutUser);

app.get("/api/test", (req, res, next) => {
  res.send("Connected.");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
