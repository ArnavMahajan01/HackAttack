const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

const UserSchema = new mongoose.Schema(
  {
    name: stringValue,
    email: stringValue,
    password: stringValue,
    phone: stringValue,
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
/* Exporting schema with collection as User */
const User = mongoose.model("User", UserSchema);

module.exports = User;
