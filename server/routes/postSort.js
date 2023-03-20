const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const postSortController = require("../controller/postSortController");

router.get("/sortDate", auth, postSortController.sortDate);
router.get("/sortMaxAvaliable", auth, postSortController.sortMaxAvaliable);

module.exports = router;
