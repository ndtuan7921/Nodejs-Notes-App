class SiteController {
  about(req, res) {
    if (req.cookies.access_token) {
      res.render("../views/about.hbs", { layout: "main" });
    } else res.render("../views/about.hbs");
  }

  notFound(req, res) {
    if (req.cookies.access_token) {
      res.render("../views/404.hbs", { layout: "main" });
    } else res.render("../views/404.hbs");
  }

  index(req, res) {
    if (req.cookies.access_token) {
      res.render("../views/home.hbs", { layout: "main" });
    } else res.render("../views/home.hbs");
  }
}

module.exports = new SiteController();
