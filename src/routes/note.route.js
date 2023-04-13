const express = require("express");
const router = express.Router();
const note = require("../controllers/note.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.delete("/:id/delete", authMiddleware.authorize, note.delete);
router.get("/:id/edit", authMiddleware.authorize, note.edit_get);
router.put("/:id/edit", authMiddleware.authorize, note.edit_put);

module.exports = router;
