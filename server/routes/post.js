const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const postController = require("../controller/postController");

router.post("/createPost", auth, postController.createPost);
router.post("/joinPost", auth, postController.joinPost);

module.exports = router;
