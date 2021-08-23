const express = require('express');
const { signupController, signupPostHandeler } = require('../controllers/signupController');
const { getTitle } = require('../middlewares/common/getTitle');
const {
	addUserValidator,
	addUserValidationHandler,
	haveAsLikeUser
} = require('../middlewares/validators/signupValidator');
const { redirectLoggedIn } = require('../middlewares/validators/isLoggedin');


const signupPage = express.Router();

signupPage.get('/', redirectLoggedIn, getTitle('sign up'), signupController);

signupPage.post('/',
	addUserValidator,
	addUserValidationHandler,
	haveAsLikeUser,
	signupPostHandeler
);

module.exports = signupPage;