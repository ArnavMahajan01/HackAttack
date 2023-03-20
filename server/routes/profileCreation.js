const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const profileCreationController = require("../controller/profileCreationController");

router.post("/profileCreation", auth, profileCreationController.pageOne);

module.exports = router;
