const { check, validationResult } = require('express-validator');

const { User } = require('../../model/index');

const addUserValidator = [
	check('email')
		.isEmail()
		.withMessage('email must be validated')
		.trim(),
	check('username')
		.isLength({ min: 1 })
		.withMessage("Name is required")
		.trim(),
	check('password')
		.isLength({ min: 5, max: 15 })
		.withMessage('password must be minimum 5 and maximum 15 length')
		.trim(),
];

const addUserValidationHandler = function(req, res, next) {
	const errors = validationResult(req);
	const mappedErrors = errors.mapped();
	if (Object.keys(mappedErrors).length === 0) {
		next();
	} else {
		res.status(500).json({
			error: {
				message: 'Authorization falied!'
			}
		})
	}
};

const haveAsLikeUser = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (user && user._id) {
		res.status(500).json({
			error: {
				message: 'Authorization falied'
			}
		})
	} else {
		next()
	}

}

module.exports = {
	addUserValidator,
	addUserValidationHandler,
	haveAsLikeUser,
}