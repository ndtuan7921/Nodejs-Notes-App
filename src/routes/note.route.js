const express = require("express");
const router = express.Router();
const note = require("../controllers/note.controller");

router.post("/store", note.store);
router.get("/:id/edit", note.edit);
router.put("/:id", note.update);

module.exports = router;
