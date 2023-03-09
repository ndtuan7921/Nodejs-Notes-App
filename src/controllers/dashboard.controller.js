class DashboardController {
  // GET /dashboard
  index(req, res) {
    res.render("../views/dashboard/dashboard.hbs");
  }

  // GET /dashboard/add
  create(req, res) {
    res.render("../views/dashboard/add.hbs");
  }
}

module.exports = new DashboardController();
