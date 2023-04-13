const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./config/database");
const routes = require("../src/routes");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(cookieParser());

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
    defaultLayout: "guest",
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
