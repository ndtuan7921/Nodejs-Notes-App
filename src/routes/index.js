const dashboardRouter = require("./dashboard.route");
const siteRouter = require("./site.route");
const noteRouter = require("./note.route");
const authRouter = require("./auth.route");

function route(app) {
  app.use("/dashboard", dashboardRouter);
  app.use("/note", noteRouter);
  app.use("/auth", authRouter);

  app.use("/", siteRouter);
}

module.exports = route;
