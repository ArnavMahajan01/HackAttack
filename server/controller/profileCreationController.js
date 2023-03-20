const User = require("../models/User");

exports.pageOne = async (req, res) => {
  const { type } = req.body;
  try {
    const user = User.updateOne(
      { email: req.user.email },
      { $set: { type: type } }
    );
    user.save();
    res.status(201).json({ msg: user + " updated" });
  } catch (err) {
    res.status(404).json({ msg: "No input given" + req.user });
  }

  res.send(req.user);
};
