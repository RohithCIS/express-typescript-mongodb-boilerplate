import createError from 'http-errors';
import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import customENV = require('custom-env');

customENV.env(true);


const cors = (req: any, res: any, next: any) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	// intercept OPTIONS method
	if ('OPTIONS' === req.method) {
		res.sendStatus(200);
	}
	else {
		next();
	}
};

const app = express();
const server = http.createServer(app);

// controller imports
import sharedController from './controllers/shared';
import userController from './controllers/user';
import productController from './controllers/product';
// db setup
mongoose.connect(
	process.env.MONGODB_URI,
	{
		promiseLibrary: require('bluebird'),
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('\x1b[32m%s\x1b[0m', '✔ Connection to DB Succesful'))
	.catch((err) => console.error(err));

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// controller middleware injections
app.use('/users', userController);
app.use('/products', productController);
app.use('/shared', sharedController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'staging' ? err : {};

	res.status(err.status || 500);
	res.json(err);
});

server.listen((process.env.PORT || 3001), function () {
	console.log('\x1b[34m%s\x1b[0m', `🚀 API Running on port ${(process.env.PORT || 3001)}`);
});