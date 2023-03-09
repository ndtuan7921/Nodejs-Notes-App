const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const morgan = require("morgan");

const app = express();
const port = 7921;

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

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
