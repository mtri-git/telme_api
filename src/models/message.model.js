const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
		required: true,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	content: {
		type: String,
		required: function () {
			return (
				!this.attach_files ||
				(this.attach_files && this.attach_files.length === 0)
			)
		},
	},
	reply_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message',
		default: null,
	},
	seen_by: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	type: { type: String, default: 'message' }, // text, image, video, file
	attach_files: [
		{
			type: String
		},
	],
	created_at: {
		type: Date,
		default: Date.now,
	},
	deleted_at: { type: Date, default: null },
})


const Message = mongoose.model('messages', MessageSchema)
module.exports = Message
