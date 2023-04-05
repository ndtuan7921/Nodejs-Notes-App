const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller");

// router.get("/add", dashboard.create);
// router.post("/search", dashboard.search);
router.get("/", dashboard.index);

module.exports = router;
