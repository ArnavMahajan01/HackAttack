const Post = require("../models/Post");

exports.sortDate = async (req, res) => {
  try {
    const postSortByDate = await Post.find().sort({ date: 1 });

    res.status(200).json({ msg: postSortByDate });
  } catch (err) {
    res.status(400).json({ msg: "Error in sort" });
  }
};

exports.sortMaxAvaliable = async (req, res) => {
  try {
    const postSortMaxAvaliable = await Post.find().sort({ date: 1 });

    res.status(200).json({ msg: postSortMaxAvaliable });
  } catch (err) {
    res.status(400).json({ msg: "Error in sort" });
  }
};
