const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const {
  validateEmail,
  validatePassword,
  validateConfirm,
} = require("../helpers");
class AuthController {
  // GET /auth/register
  register(req, res) {
    res.render("../views/auth/register.hbs");
  }

  // POST /auth/create
  create(req, res) {
    const { email, password, confirm } = req.body;
    const validation = {
      email: {
        isError: validateEmail(email) != "",
        message: validateEmail(email),
      },
      password: {
        isError: validatePassword(password) != "",
        message: validatePassword(password),
      },
      confirm: {
        isError: validateConfirm(password, confirm) != "",
        message: validateConfirm(password, confirm),
      },
    };

    // let count = 0;
    // Object.entries(validation).map((item) => {
    //   item[1].isError && count++;
    // });

    // if (count > 0) {
    //   res.render("../views/auth/register.hbs", validation);
    // } else {
    //   const userID = uuidv4();
    //   const username = email.substring(0, email.indexOf("@"));
    //   db.query(
    //     `INSERT INTO users (userID, email, password) VALUES ('${userID}','${email}','${password}')`,
    //     (err, result) => {
    //       if (err) throw err;
    //       res.render("../views/dashboard/dashboard.hbs", { username });
    //     }
    //   );
    // }
  }
}

module.exports = new AuthController();
