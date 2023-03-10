const dashboardRouter = require("./dashboard.route");
const siteRouter = require("./site.route");

function route(app) {
  app.use("/dashboard", dashboardRouter);
  app.use("/", siteRouter);
}

module.exports = route;
