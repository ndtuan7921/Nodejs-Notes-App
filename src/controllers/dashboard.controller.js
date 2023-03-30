const db = require("../config/database");

class DashboardController {
  // GET /dashboard
  index(req, res) {
    db.query("SELECT * FROM NOTES_APP.NOTE", (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render("../views/dashboard/dashboard.hbs", { result });
    });
  }

  // POST /dashboard/search
  search(req, res) {
    // console.log(req);
    const query = req.body.searchTerm;
    db.query(
      `SELECT * FROM NOTES_APP.NOTE WHERE title LIKE '%${query}%'`,
      (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.render("../views/dashboard/dashboard.hbs", { result });
      }
    );
  }

  // GET /dashboard/add
  create(req, res) {
    res.render("../views/dashboard/add.hbs");
  }
}

module.exports = new DashboardController();
