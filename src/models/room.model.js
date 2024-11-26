const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Đảm bảo room phải được tạo bởi một user
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    deleted_at: { type: Date, default: null }, // Trường soft delete
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

RoomSchema.methods.isDeleted = function () {
  return this.deleted_at !== null;
};

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
