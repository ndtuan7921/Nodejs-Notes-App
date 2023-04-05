const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;

    try {
      const data = jwt.verify(token, process.env.PRIVATE_KEY); // data: {id, iat, exp}
      // console.log(data);
      req.userID = data.id;
      next();
    } catch (error) {
      res.clearCookie("access_token");
      return res.redirect("/login");
    }
  },
};

module.exports = authMiddleware;
