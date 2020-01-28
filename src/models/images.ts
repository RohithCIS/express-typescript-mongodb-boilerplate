import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const imageSchema = new Schema({
	url: String,
	name: String,
	_createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const _images = mongoose.model('Image', imageSchema);