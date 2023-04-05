require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  validateConfirm,
} = require("../helpers/validation");
const { createUser, getUserByEmail } = require("../database/user");
class AuthController {
  register_get(req, res) {
    res.render("../views/auth/register.hbs");
  }
  async register_post(req, res) {
    try {
      const { email, password, confirm } = req.body;

      const emailValidate = await validateEmail(email);
      const passwordValidate = validatePassword(password);
      const confirmValidate = validateConfirm(password, confirm);

      const validation = {
        email: {
          isError: emailValidate != "",
          message: emailValidate,
        },
        password: {
          isError: passwordValidate != "",
          message: passwordValidate,
        },
        confirm: {
          isError: confirmValidate != "",
          message: confirmValidate,
        },
      };
      const hasError = Object.values(validation).find(
        (field) => field.isError === true
      );
      if (hasError) {
        res.render("../views/auth/register.hbs", validation);
        return;
      }

      createUser(email, password)
        .then((result) => {
          console.log(result);
          return jwt.sign({ id: result.userID }, process.env.PRIVATE_KEY, {
            expiresIn: "1h",
          });
        })
        .then((accessToken) => {
          res
            .cookie("access_token", accessToken, {
              httpOnly: true,
            })
            .redirect("/dashboard");
        });
    } catch (error) {
      res.send(error);
    }
  }
  login_get(req, res) {
    res.render("../views/auth/login.hbs");
  }
  async login_post(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const checkUser = await getUserByEmail(email);
      if (checkUser.length == 0) {
        return res.render("../views/auth/login.hbs", {
          message: "Email doesn't exit",
        });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(
        password,
        checkUser[0].password
      );
      if (!passwordMatch) {
        return res.render("../views/auth/login.hbs", {
          message: "Wrong password",
        });
      }
      // Generate JWT token
      const accessToken = jwt.sign(
        { id: checkUser[0].userID },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "1h",
        }
      );

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        })
        .redirect("/dashboard");
    } catch (error) {
      // Display an error message to the user
      res.render("../views/auth/login.hbs", {
        message: "An error occurred during login, please try again.",
      });
    }
  }
}

module.exports = new AuthController();
