const db = require("../config/database");
const { getNotesByUserId, createNote } = require("../database/note");

class DashboardController {
  // GET /dashboard
  async index(req, res) {
    // console.log(req);
    try {
      const userID = req.userID;
      const notes = await getNotesByUserId(userID);
      // console.log(notes);
      if (notes.length > 0) {
        res.render("../views/dashboard/dashboard.hbs", { result: notes });
      } else {
        res.render("../views/dashboard/dashboard.hbs", {
          message: "You haven't created any notes yet!",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }

  // // POST /dashboard/search
  // search(req, res) {
  //   // console.log(req);
  //   const query = req.body.searchTerm;
  //   db.query(
  //     `SELECT * FROM NOTES_APP.NOTE WHERE title LIKE '%${query}%'`,
  //     (err, result) => {
  //       if (err) throw err;
  //       // console.log(result);
  //       res.render("../views/dashboard/dashboard.hbs", { result });
  //     }
  //   );
  // }

  // GET
  create_get(req, res) {
    res.render("../views/dashboard/create.hbs");
  }

  create_post(req, res) {
    // console.log(req);
    try {
      const { title, text } = req.body;
      const newNode = {
        userID: req.userID,
        title,
        text,
      };
      createNote(newNode).then((result) => {
        res.redirect("/dashboard");
      });
    } catch (error) {
      res.render("../views/dashboard/create.hbs", {
        message: "An error occurred during login, please try again.",
      });
    }
  }
}

module.exports = new DashboardController();
