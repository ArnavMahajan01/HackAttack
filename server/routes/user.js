const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.post("/signup", userController.register);
router.post("/signin", userController.login);

/* Logout router  */
router.get("/logout", userController.logout);

module.exports = router;
