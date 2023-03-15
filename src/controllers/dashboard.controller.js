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
}

module.exports = new DashboardController();
