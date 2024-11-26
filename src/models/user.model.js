const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      sparse: true,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline", "busy"],
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    last_online: {
      type: Date,
      default: null,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
