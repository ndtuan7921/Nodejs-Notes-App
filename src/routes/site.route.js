const express = require("express");
const router = express.Router();
const site = require("../controllers/site.controller");

router.get("/about", site.about);
router.get("/404", site.notFound);
router.get("/", site.index);

module.exports = router;
