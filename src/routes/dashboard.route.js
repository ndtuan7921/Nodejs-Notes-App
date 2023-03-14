const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller");

router.get("/add", dashboard.create);
router.post("/store", dashboard.store);
router.get("/", dashboard.index);

module.exports = router;
