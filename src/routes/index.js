const dashboardRouter = require("./dashboard.route");
const siteRouter = require("./site.route");
const noteRouter = require("./note.route");
const authRouter = require("./auth.route");
const authMiddleware = require("../middleware/auth.middleware");

function route(app) {
  app.use("/dashboard", authMiddleware.verifyToken, dashboardRouter);
  app.use("/note", authMiddleware.verifyToken, noteRouter);
  // app.use("/auth", authRouter);
  app.use(authRouter);
  app.use("/", siteRouter);
}

module.exports = route;
