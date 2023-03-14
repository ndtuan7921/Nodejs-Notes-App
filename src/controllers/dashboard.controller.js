const db = require("../config/db");
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
    db.query(
      `INSERT INTO note (title, content) VALUES ('${req.body.title}', '${req.body.content}')`,
      (err, result) => {
        if (err) throw err;
        res.redirect("/dashboard");
      }
    );
  }
}

module.exports = new DashboardController();
