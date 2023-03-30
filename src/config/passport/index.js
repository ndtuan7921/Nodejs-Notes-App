const LocalStrategy = require("passport-local").Strategy;
function initialize(passport) {
  passport.use(
    new LocalStrategy(function verify(email, password, cb) {
      db.query(
        `SELECT * FROM notes_app.users WHERE email = '${email}'`,
        async (err, result) => {
          if (err) return cb(err);
          if (!result) {
            return cb(null, false, { message: "Email doesn't exit" });
          } else {
            const validPassword = await bcrypt.compare(
              password,
              result[0].password
            );
            if (!validPassword) {
              return cb(null, false, { message: "Incorrect password." });
            }
            const accessToken = jwt.sign(
              { id: result[0].userID },
              "privateKey",
              {
                expiresIn: "1d",
              }
            );
            res.cookie("access_token", accessToken, {
              httpOnly: true,
              // secure: process.env.NODE_ENV === "production",
            });
            return cb(null, { result, accessToken });
          }
        }
      );
    })
  );
}

module.exports = initialize;
