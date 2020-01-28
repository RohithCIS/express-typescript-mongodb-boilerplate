/** Express router providing shared routes
 * @module routers/shared
 * @requires express
 */

import express from 'express';
import { upload } from '../middleware/multer';
import { _images } from '../models/images';

/**
 * Express router to mount shared functions on.
 * @const
 * @namespace sharedController
 */
const router = express.Router();

/**
 * @name function/createImageObjects
 * @param {Object[]} files Array of uploaded files' meta from multer response
 */
async function createImageObjects(files: any) {
	const response: string[] = [];
	for (const el of files) {
		const img = await _images.create({ name: el.key, url: el.location });
		response.push(img._id);
	}
	return response;
}

/**
 * Get All Image Objects
 * @memberof module:routers/shared~sharedController
 * @name GET-/images
 * @function
 * @inner
 * @param {string} path - [/images] Express path
 * @param {callback} middleware - Express Middleware 
 */
router.get('/images', async (req, res) => {
	try {
		const images = await _images.find();
		res.json(images);
	} catch (e) {
		console.log(e);
	}
});

/**
 * Delete Image By Id
 * @memberof module:routers/shared~sharedController
 * @name DELETE-/images/:id
 * @function
 * @inner
 * @param {urlParam} id - The mongodb _id of the imge object to be deleted
 * @param {string} path - [/images/:id] Express path
 * @param {callback} middleware - Express Middleware 
 */
router.delete('/images/:id', async (req, res) => {
	try {
		const image = await _images.findById(req.params.id);
		res.json(image);
	} catch (e) {
		console.log(e);
	}
});

router.post('/images/get', async (req, res) => {
	try {
		const image = await _images.find({ _id: { $in: req.body } });
		res.json(image);
	} catch (e) {
		console.log(e);
	}
});

/**
 * Upload Images to S3 and insert into DB
 * @memberof module:routers/shared~sharedController
 * @name POST-/upload/image
 * @function
 * @inner
 * @param {string} path - [/upload/image] Express path
 * @param {middleware} multer - Multer S3 middleware
 * @param {callback} middleware - Express Middleware 
 * @param {FormData} files FileList - Image Filess to upload
 */
router.post('/upload/image', upload.array('image', 10), async (req, res) => {
	const files: any = req.files;
	const response = await createImageObjects(files);
	res.json(response);
});

export default router;