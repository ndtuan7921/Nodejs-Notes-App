const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller");

router.get("/create", dashboard.create_get);
router.post("/create", dashboard.create_post);
// router.post("/search", dashboard.search);
router.get("/", dashboard.index);

module.exports = router;
