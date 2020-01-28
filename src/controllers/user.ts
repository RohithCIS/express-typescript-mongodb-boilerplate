import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import customENV = require('custom-env');
import { _users } from '../models/users';

customENV.env(true, './');
const saltRounds = 14;
const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		try {
			const users = await _users.find().select('-password');
			res.json(users);
		} catch (error) {
			console.log(error);
		}
	});

router.route('/:id')
	.get(async (req, res) => {
		try {
			const data = await _users.findById(req.params.id).select('-password');
			return res.json(data);
		} catch (e) {
			console.log(e);
		}
	})
	.put(async (req, res) => {
		try {
			const data = await _users.findByIdAndUpdate(req.params.id, req.body).select('-password');
			return res.json(data);
		} catch (e) {
			console.log(e);
		}
	})
	.delete(async (req, res) => {
		try {
			const data = await _users.findByIdAndDelete(req.params.id).select('-password');
			return res.json(data);
		} catch (e) {
			console.log(e);
		}
	});

router.route('/signup')
	.post(async (req, res) => {
		try {
			const users = await _users.find({ phone: req.body.phone });
			if (users.length > 0) { res.json({ message: 'Account with that Phone Number already exists!' }); }
			else {
				const body = req.body;
				const hash = await bcrypt.hash(body.password, saltRounds);
				body.password = hash;
				const newUser = await _users.create(body);
				res.json(newUser);
			}
		} catch (e) {
			console.log(e);
		}
	});

router.route('/login')
	.post(async (req, res) => {
		try {
			const user = await _users.findOne({ phone: req.body.phone });
			if (!user) { res.json({ message: 'Account Not Found for the Phone Number' }); }
			else {
				const check = await bcrypt.compare(req.body.password, user.get('password'));
				if (check === true) {
					const token = jwt.sign({ id: user._id, role: user.get('role') }, process.env.HASH_SECRET);
					res.json({ message: 'ok', token: token, id: user._id, role: user.get('role') });
				} else { res.json({ message: 'Wrong Password!' }); }
			}
		} catch (e) {
			console.log(e);
		}
	});

export default router;