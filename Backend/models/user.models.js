const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 1024,
      trim: true,
      default: "",
    },
    likes: {
      type: [String],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(validator, { message: "is already taken" });

module.exports = mongoose.model("User", UserSchema);
