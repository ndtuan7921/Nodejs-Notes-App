const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const db = require("../src/config/db");
const routes = require("../src/routes");
const app = express();
const port = 7921;

// override with POST having ?_method=PUT
app.use(methodOverride("_method"));

// Body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    // defaultLayout: "base",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: [
      //  path to your partials
      path.join(__dirname, "./views/partials"),
    ],
  })
);
app.set("view engine", ".hbs");

app.set("views", path.join(__dirname, "./views"));

// Routes init
routes(app);

db.connect(function (err) {
  if (err) throw err;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  console.log("Connected!!!");
});
