const bcryptjs = require('bcryptjs');

const { User } = require('../model/index');

const signupController = (req, res, next) => {
	res.render('signup');
}

const signupPostHandeler = async (req, res, next) => {
	try {
		const email = req.body.email;
		const username = req.body.username;
		const password = req.body.password;

		const hashPassword = await bcryptjs.hash(password, 10)
		const data = {
			email,
			username,
			password: hashPassword,
			date: Date.now()
		}

		const newUser = new User(data);
		newUser.save((err) => {
			if (err) {
				res.status(500).json({
					error: {
						message: 'Authorization falied'
					}
				})
			} else {
				res.status(200).json({
					success: {
						message: 'signup successful!'
					}
				})
			}
		});

	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	signupController,
	signupPostHandeler
}