const Post = require("../models/Post");

exports.searchName = async (req, res) => {
  var regex = new RegExp(req.params.name, "i");

  try {
    const searchValue = await Post.find({ title: regex });
    res.status(200).json(searchValue);
  } catch (err) {
    res.status(400).json(err);
  }
};
