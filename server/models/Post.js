const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

const OrganizationSchema = new mongoose.Schema({
  time: String,
  gender: String,
  worktype: String,
  maxpeople: Number,
  peoplejoined: Number,
});

const PostSchema = new mongoose.Schema({
  userId: {type:mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  title: stringValue,
  desc: stringValue,
  date: { type: Date, required: true },
  typeofuser: {
    type: String,
    required: true,
    enum: ["volunteer", "organization", "beneficiary"],
  },
  orgdata: OrganizationSchema,
});

mongoose.pluralize(null);
/* Exporting schema with collection as User */
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
