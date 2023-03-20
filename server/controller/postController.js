const Post = require("../models/Post");
const PostJoin = require("../models/PostJoin");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  const { userId, title, desc, date, typeofuser, orgdata } = req.body;

  try {
    const user = User.findOne({ _id: userId });
    if (!user) {
      throw "User doesn't exists";
    }
    if (typeofuser === "organization" && !orgdata) {
      throw "organization data not given for post";
    }
    let orginfo = {};
    if (orgdata && typeofuser === "organization") {
      orginfo.orgdata = orgdata;
      orginfo.orgdata.peoplejoined = 0;
    }
    const post = new Post({
      userId: userId,
      title: title,
      desc: desc,
      date: date,
      typeofuser: typeofuser,
      ...orginfo,
    });
    await post.save();
    res.status(201).json({
      msg: "Successfully created post",
      data: post.toJSON(),
    });
  } catch (error) {
    res.status(400).json({
      msg: "There was an error",
      error: error,
    });
  }
};

exports.joinPost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const joinDoc = await PostJoin.findOne({
      userId: userId,
      postId: postId,
    });

    if (joinDoc) {
      throw "User already joined";
    }
    const post = await Post.findOne({ _id: postId });
    if (post.typeofuser != "organization") {
      throw "Wrong type of post";
    }
    if (post.orgdata.maxpeople == post.orgdata.peoplejoined) {
      throw "Max amount of people joined";
    }

    const newJoinDoc = new PostJoin({
      userId: userId,
      postId: postId,
    });
    post.peoplejoined++;
    await newJoinDoc.save();
    await post.save();

    res.status(200).json({
      msg: "Added user",
    });
  } catch (error) {
    res.status(400).json({
      msg: "There was an error",
      error: error,
    });
  }
};

exports.leavePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    if (!(await PostJoin.findOne({ userId: userId, postId: postId })))
      throw "User not joined";
    if (!(await User.findOne({ _id: userId }))) throw "User doesn't exists";
    const post = await Post.findOne({ _id: postId });
    if (!post) throw "Post doesn't exists";

    await PostJoin.create({
      userId: userId,
      postId: postId,
    });

    post.orgdata.peoplejoined--;
    await post.save();

    res.status(200).json({
      msg: "User left",
    });
  } catch (error) {
    res.status(400).json({
      msg: "There was an error",
      error: error,
    });
  }
};
