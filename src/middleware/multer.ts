import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

AWS.config.update({
	secretAccessKey: process.env.AWS_ACCESSKEY_SECRET,
	accessKeyId: process.env.AWS_ACCESSKEY_ID,
	region: 'ap-south-1',
});

const S3 = new AWS.S3();

const storage = multerS3({
	s3: S3,
	bucket: process.env.AWS_BUCKET_NAME,
	key: (req, file, cb) => {
		cb(null, `${Date.now()}${file.originalname}`);
	},
});

export const upload = multer({ storage: storage });
