const express = require("express");
const router = express.Router();
const note = require("../controllers/note.controller");

router.get("/:slug", note.show);

module.exports = router;
