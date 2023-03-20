const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

const SpecialUserSchema = new mongoose.Schema({
  profileurl: { type: String, trim: true, required: true },
  dateofcreation: Date,
  orgtype: String,
  dob: { type: Date },
  gender: String,
  typeOfWork: String,
});

const LocationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    name: stringValue,
    email: stringValue,
    password: stringValue,
    phone: stringValue,
    data: SpecialUserSchema,
    location: LocationSchema,
    interests: [{ type: String, trim: true }],
    interaction: {
      type: String,
      required: false,
      enum: ["phone", "chat", "video"],
      default: "phone",
    },
    interactiontime: {
      type: String,
      required: false,
      enum: ["morning", "afternoon", "evening"],
    },
    type: {
      type: String,
      required: false,
      enum: ["volunteer", "organization", "beneficiary"],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
/* Exporting schema with collection as User */
const User = mongoose.model("User", UserSchema);

module.exports = User;
