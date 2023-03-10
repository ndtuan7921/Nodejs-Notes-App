class SiteController {
  // GET /dashboard
  about(req, res) {
    res.render("../views/about.hbs");
  }

  // GET /dashboard/add
  index(req, res) {
    res.render("../views/home.hbs");
  }
}

module.exports = new SiteController();
