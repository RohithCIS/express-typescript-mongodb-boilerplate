import express from 'express';
import { _products } from '../models/products';
import jwt from '../middleware/auth';
const router = express.Router();

router.route('/')
	.get(async (req: any, res) => {
		try {
			let products = await _products.find().populate('images')
				.sort({ _createdAt: -1, name: 1 });
			res.json(products);
		} catch (e) {
			console.log(e);
		}
	})
	.post(jwt, async (req: any, res) => {
		try {
			if (req.user.role === 'admin') {
				let product = await _products.create(req.body);
				res.json(product);
			} else {
				res.status(401).send({ message: 'Not Authorised', code: 401, status: 'error' });
			}
		} catch (e) {
			console.log(e);
		}
	});

router.route('/:id')
	.get(async (req, res) => {
		try {
			let product = await _products.findById(req.params.id)
			res.json(product);
		} catch (e) {
			console.log(e);
		}
	})
	.post(async (req, res) => {
		try {
			const product = await _products.findByIdAndUpdate(req.params.id, req.body);
			res.json(product);
		} catch (e) {
			console.log(e);
		}
	})
	.delete(async (req, res) => {
		try {
			const product = await _products.findByIdAndDelete(req.params.id);
			res.json(product);
		} catch (e) {
			console.log(e);
		}
	});

export default router;