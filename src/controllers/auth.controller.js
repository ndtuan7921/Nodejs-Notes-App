require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validatePassword,
  validateConfirm,
} = require("../helpers/validation");
const { createUser, getUserByEmail } = require("../database/user");
class AuthController {
  // // POST /auth/loginUser
  // loginUser(req, res) {
  //   const { email, password } = req.body;
  //   db.query(
  //     `SELECT * FROM notes_app.users WHERE email = '${email}'`,
  //     async (err, result) => {
  //       if (err) throw err;
  //       if (result.length == 0) {
  //         res.render("../views/auth/login.hbs", {
  //           message: "Email doesn't exit",
  //         });
  //       } else {
  //         const validPassword = await bcrypt.compare(
  //           password,
  //           result[0].password
  //         );
  //         if (!validPassword) {
  //           res.render("../views/auth/login.hbs", {
  //             message: "Wrong password",
  //           });
  //         }
  //         const accessToken = jwt.sign({ id: result[0].userID }, "privateKey", {
  //           expiresIn: "1d",
  //         });
  //         res.cookie("access_token", accessToken, {
  //           httpOnly: true,
  //           // secure: process.env.NODE_ENV === "production",
  //         });
  //         return res.redirect("back");
  //         // res.json({ username: result[0].username, accessToken });
  //       }
  //     }
  //   );
  // }
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
  login_post(req, res) {
    res.send("hello from register");
  }
}

module.exports = new AuthController();
