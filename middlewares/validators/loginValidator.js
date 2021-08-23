const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const { User } = require('../../model/index');

const userValidator = [
	check('email')
		.isEmail()
		.withMessage('email must be validated')
		.trim(),
	check('password')
		.isLength({ min: 5, max: 15 })
		.withMessage('password must be minimum 5 and maximum 15 length')
		.trim(),
];

const userValidatorHander = (req, res, next) => {
	const errors = validationResult(req);
	const mappedErrors = errors.mapped();
	if (Object.keys(mappedErrors).length === 0) {
		next();
	} else {
		res.status(500).json({
			error: {
				message: 'authentication falied!'
			}
		})
	}
}

const haveUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user && user._id) {
			const isValidPassword = await bcryptjs.compare(req.body.password, user.password);

			if (isValidPassword) {
				req.data = {
					id: user._id,
					email: user.email,
					username: user.username,
				}
				next();
			} else {
				res.status(500).json({
					error: {
						message: 'authentication falide!'
					}
				})
			}

		} else {
			res.status(500).json({
				error: {
					message: 'authentication falide!'
				}
			})
		}

	} catch (e) {

	}
}

module.exports = {
	userValidator,
	userValidatorHander,
	haveUser
}