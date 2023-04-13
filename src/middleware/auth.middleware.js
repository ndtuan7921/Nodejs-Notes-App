const jwt = require("jsonwebtoken");
const { getNotesByUserId } = require("../database/note");
require("dotenv").config();

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;

    try {
      const data = jwt.verify(token, process.env.PRIVATE_KEY); // data: {id, iat, exp}
      req.userID = data.id;
      next();
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
