const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.get("/register", auth.register);
router.get("/login", auth.login);
router.post("/loginUser", auth.loginUser);
router.post("/create", auth.create);

module.exports = router;
