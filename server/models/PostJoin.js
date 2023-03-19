const mongoose = require("mongoose");

const PostJoinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "User ID is required",
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Post ID is required",
    ref: "Post",
  },
});

mongoose.pluralize(null);

const PostJoin = mongoose.model("PostJoin", PostJoinSchema);

module.exports = PostJoin;
