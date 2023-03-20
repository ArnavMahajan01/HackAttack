const express = require("express");
const router = express.Router();

router.use("/", require("./user"));
router.use("/", require("./post"));
router.use("/", require("./profileCreation"));
router.use("/", require("./postFilter"));
router.use("/", require("./postSort"));
router.use("/", require("./search"));

module.exports = router;
