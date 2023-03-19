const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

const SpecialUserSchema = new mongoose.Schema({
  profileurl: {type: String, require: true},
  dateofcreation: Date,
  type: String,
  dob: Date, 
  gender: String
})

const LocationSchema = new mongoose.Schema({
  latitude: {type: Number, required: true},
  longitude: {type: Number, required: true}
})

const UserSchema = new mongoose.Schema(
  {
    name: stringValue,
    email: stringValue,
    password: stringValue,
    phone: stringValue,
    data: SpecialUserSchema,
    location: LocationSchema,
    interaction: {
      type: String,
      required: true,
      enum: ["phone", "chat", "video"],
      default: "phone"
    },
    interactiontime: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening"],
    }, 
    type: {
      type: String,
      required: true,
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
