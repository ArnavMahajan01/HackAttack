const Post = require("../models/Post");

exports.filterDate = async (req, res) => {
  const fromDate = req.query.from;
  const toDate = req.query.to;

  try {
    const postFilterByDate = await Post.find()
      .where("date")
      .gt(fromDate)
      .lt(toDate);

    res.status(200).json({ msg: postFilterByDate });
  } catch (err) {
    res.status(400).json({ msg: "Error in filter" });
  }
};

exports.filterGender = async (req, res) => {
  const gender = req.query.gender;

  try {
    const postFilterByGender = await Post.find().where("gender").equals(gender);

    res.status(200).json({ msg: postFilterByGender });
  } catch (err) {
    res.status(400).json({ msg: "Error in filter" });
  }
};

exports.filterAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await Post.find()
      .where("orgdata.maxpeople - orgdata.peoplejoined")
      .gt(0);

    res.status(200).json({ msg: availableSlots });
  } catch (err) {
    res.status(400).json({ msg: "Error in filter" });
  }
};
