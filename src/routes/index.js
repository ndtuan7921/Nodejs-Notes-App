const dashboardRouter = require("./dashboard.route");
const siteRouter = require("./site.route");
const noteRouter = require("./note.route");

function route(app) {
  app.use("/dashboard", dashboardRouter);
  app.use("/note", noteRouter);

  app.use("/", siteRouter);
}

module.exports = route;
