const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
	content: { type: String },
	sender: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User',
	  required: true,
	},
	recipient: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User',
	},
	room: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Room',
	},
	attachment: {
	  fileUrl: { type: String },
	  fileType: { type: String }, // image, video, file
	},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
	deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
