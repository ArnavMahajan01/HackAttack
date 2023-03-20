const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const postController = require("../controller/postController");

router.post("/post/create", postController.createPost);
router.post("/post/add", postController.joinPost);
router.post("/post/remove", postController.leavePost);
router.get("/post", postController.listPost)
//router.post('/', auth, postController)

module.exports = router;
