const mongoose = require('mongoose')
const RoomSchema = new mongoose.Schema({
	name: { type: String },
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	admins: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	deleted_at: {type: Date, default: null}
})

const Room = mongoose.model('rooms', RoomSchema)
module.exports = Room
