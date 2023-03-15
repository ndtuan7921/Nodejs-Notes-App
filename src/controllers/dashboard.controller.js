const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
class DashboardController {
  // GET /dashboard
  index(req, res) {
    db.query("SELECT * FROM NOTES_APP.NOTE", (err, result) => {
      if (err) throw err;
      res.render("../views/dashboard/dashboard.hbs", { result });
    });
  }

  // GET /dashboard/add
  create(req, res) {
    res.render("../views/dashboard/add.hbs");
  }

  // POST /dashboard/store
  store(req, res) {
    const idnote = uuidv4();
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.query(
      `INSERT INTO note (idnote, title, content, createdAt) VALUES ('${idnote}','${req.body.title}', '${req.body.content}','${createdAt}')`,
      (err, result) => {
        if (err) throw err;
        res.redirect("/dashboard");
      }
    );
  }
}

module.exports = new DashboardController();
