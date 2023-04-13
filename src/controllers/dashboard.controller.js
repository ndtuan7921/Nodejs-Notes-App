const db = require("../config/database");
const {
  getNotesByUserId,
  createNote,
  searchNoteByTitle,
} = require("../database/note");

class DashboardController {
  // GET /dashboard
  async index(req, res) {
    try {
      const userID = req.userID;
      const notes = await getNotesByUserId(userID);
      if (notes.length > 0) {
        res.render("../views/dashboard/dashboard.hbs", {
          result: notes,
          layout: "main",
        });
      } else {
        res.render("../views/dashboard/dashboard.hbs", {
          message: "You haven't created any notes yet!",
          layout: "main",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }

  // POST /dashboard/search
  async search(req, res) {
    try {
      const query = req.body.searchTerm;
      const userID = req.userID;
      const notes = await searchNoteByTitle(query, userID);
      if (notes.length > 0) {
        res.render("../views/dashboard/dashboard.hbs", {
          result: notes,
          layout: "main",
        });
      } else {
        res.render("../views/dashboard/dashboard.hbs", {
          message: "No results found",
          layout: "main",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }

  // GET
  create_get(req, res) {
    res.render("../views/dashboard/create.hbs", { layout: "main" });
  }

  create_post(req, res) {
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
