const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const path = require("path");
// const session = require('express-session');
const massive = require("massive");
require("dotenv").config();

const app = express();

// app.use(express.static(path.join(__dirname, '../build')));

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUnitialized: true,
//   cookie: {
//     maxAge: 2 * 7 * 24 * 60 * 60 * 1000
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//   new Auth0Strategy(
//     {
//       domain: process.env.DOMAIN,
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "/auth",
//       scope: "openid email profile"
//     },
//     (accessToken, refreshToken, extraParams, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.get(
//   "/auth",
//   passport.authenticate("auth0", {
//     successRedirect: "/students",
//     failureRedirect: "/auth",
//     connection: "github"
//   })
// );

// CONTROLLERS
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
