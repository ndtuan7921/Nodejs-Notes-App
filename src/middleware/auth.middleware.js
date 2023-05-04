const jwt = require("jsonwebtoken");
const { getNotesByUserId } = require("../database/note");
require("dotenv").config();

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;

    try {
      // data: {id, iat, exp}
      jwt.verify(
        token,
        process.env.JWT_ACCESS_KEY,
        (error, { id, iat, exp }) => {
          console.log({ id, iat, exp });
          if (error) {
            // Token is invalid or expired
            return res.sendStatus(403);
          }

          req.userID = id;

          // Check if the token is about to expire
          const currentTime = Math.floor(Date.now() / 1000);
          const tokenExpiration = exp;
          const expirationThreshold = 300; // 5min

          if (tokenExpiration - currentTime <= expirationThreshold) {
            // Generate a new access token
            const newAccessToken = jwt.sign(
              { id },
              process.env.JWT_ACCESS_KEY,
              {
                expiresIn: "30m",
              }
            );

            // Send the new access token in the response headers
            res.cookie("access_token", newAccessToken, {
              httpOnly: true,
            });
          }
          next();
        }
      );
    } catch (error) {
      res.clearCookie("access_token");
      return res.redirect("/login");
    }
  },

  authorize: async (req, res, next) => {
    const token = req.cookies.access_token;
    const userID = req.userID;
    const noteID = req.params.id;
    const notes = await getNotesByUserId(userID);
    if (!token) {
      res.redirect("/login");
    }
    const check = notes.filter((note) => note.noteID === noteID);
    if (check.length > 0) next();
    else
      res
        .status(403)
        .send(
          '<h1 class="error">You are not allowed to access this note</h1><hr><a href="/dashboard">Back to your dashboard</a>'
        );
  },
};

module.exports = authMiddleware;
