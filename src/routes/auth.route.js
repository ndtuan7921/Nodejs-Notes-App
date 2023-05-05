const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.get("/register", auth.register_get);
router.post("/register", auth.register_post);

router.get("/login", auth.login_get);
router.post("/login", auth.login_post);

router.post("/logout", auth.logout_post);

module.exports = router;
