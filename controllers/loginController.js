const jwt = require('jsonwebtoken')
const { User } = require('../model/index');

const loginController = (req, res, next) => {
	res.render('login')
}

const loginPostHandeler = (req, res) => {
	const token = jwt.sign(req.data, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});

	// set cookie
	res.cookie(process.env.COOKIE_NAME, token, {
		maxAge: process.env.JWT_EXPIRY,
		httpOnly: true,
		signed: true,
	});
	
	res.json({
		success: {
			message: 'login successful!',
			loggedInUser: req.data
		}
	})
}


module.exports = {
	loginController,
	loginPostHandeler
}