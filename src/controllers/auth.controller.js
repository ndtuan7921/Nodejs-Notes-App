const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  validateConfirm,
} = require("../helpers/validation");
class AuthController {
  // GET /auth/register
  register(req, res) {
    res.render("../views/auth/register.hbs");
  }

  // GET /auth/login
  login(req, res) {
    res.render("../views/auth/login.hbs");
  }

  // POST /auth/create
  async create(req, res) {
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
    if (
      !validation.email.isError &&
      !validation.password.isError &&
      !validation.confirm.isError
    ) {
      const userID = uuidv4();
      const username = email.substring(0, email.indexOf("@"));
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      db.query(
        `INSERT INTO users (userID, email, username, password) VALUES ('${userID}','${email}','${username}','${hashedPassword}')`,
        (err, result) => {
          if (err) throw err;
          res.render("../views/dashboard/dashboard.hbs", { username });
          return;
        }
      );
    } else {
      res.render("../views/auth/register.hbs", validation);
      return;
    }
  }

  // POST /auth/loginUser
  loginUser(req, res) {
    const { email, password } = req.body;
    db.query(
      `SELECT * FROM notes_app.users WHERE email = '${email}'`,
      async (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
          res.render("../views/auth/login.hbs", {
            message: "Email doesn't exit",
          });
        } else {
          const validPassword = await bcrypt.compare(
            result[0].password,
            password
          );
          if (!validPassword) {
            res.render("../views/auth/login.hbs", {
              message: "Wrong password",
            });
          }
          res.render("../views/dashboard/dashboard.hbs", {
            username: result[0].username,
          });
        }
      }
    );
  }
}

module.exports = new AuthController();
