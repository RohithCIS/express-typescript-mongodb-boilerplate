import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: String,
	phone: String,
	password: String,
	role: { type: String, default: 'user' },
	_createdAt: { type: Date, default: Date.now() },
});

export const _users = mongoose.model('User', userSchema);