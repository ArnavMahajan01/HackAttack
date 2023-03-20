const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const searchController = require("../controller/searchController");

router.post("/search/:name", auth, searchController.searchName);

module.exports = router;
