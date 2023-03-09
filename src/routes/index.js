const dashboardRouter = require("./dashboard.route");
function route(app) {
  app.use("/dashboard", dashboardRouter);

  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });
}

module.exports = route;
