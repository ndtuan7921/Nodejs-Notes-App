const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    // console.log(req);
    const token = req.cookies.access_token;
    if (token) {
      //   console.log(accessToken);
      jwt.verify(token, "privateKey", (err, user) => {
        if (err) {
          res.json("Invalid token!!!");
        }
        // console.log(user);
        req.userID = user.id;
        next();
      });
    } else {
      res.redirect("/auth/login");

      //   res.json("You're not authenticated!!!");
    }
  },
};

module.exports = authMiddleware;
