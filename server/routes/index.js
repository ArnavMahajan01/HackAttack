const express = require("express");
const router = express.Router();

router.use("/", require("./user"));
router.use("/", require("./post"));
router.use("/", require("./profileCreation"));
router.use("/", require("./postFilter"));

module.exports = router;
