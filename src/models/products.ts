import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: String,
	description: String,
	askPrice: Number,
	images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
	bids: [{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		bid: Number,
	}],
	status: { type: String, default: 'open' },
	winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	paid: { type: Boolean, default: false },
	razorPay: String,
	_endsAt: Date,
	_createdAt: { type: Date, default: Date.now() },
});

export const _products = mongoose.model('Product', productSchema);