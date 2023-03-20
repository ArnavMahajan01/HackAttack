const express = require("express");
const router = express.Router();

const postController = require("../controller/postController");

router.post("/post/create", postController.createPost);
router.post("/post/add", postController.joinPost);
//router.post('/', auth, postController)

module.exports = router;
