const express = require("express");
const router = express.Router();
const note = require("../controllers/note.controller");

router.post("/store", note.store);
router.get("/delete/:id", note.delete);
router.delete("/delete/:id", note.delete);
router.get("/:id/edit", note.edit);
router.put("/:id", note.update);

module.exports = router;
