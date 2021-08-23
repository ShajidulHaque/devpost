const express = require('express');
const { loginController, loginPostHandeler } = require('../controllers/loginController');
const { getTitle } = require('../middlewares/common/getTitle');
const { userValidator, userValidatorHander, haveUser } = require('../middlewares/validators/loginValidator');
const { redirectLoggedIn } = require('../middlewares/validators/isLoggedin');

const loginPage = express.Router();

loginPage.get('/', redirectLoggedIn, getTitle('sign in'), loginController);
loginPage.post('/', userValidator, userValidatorHander, haveUser, loginPostHandeler);

module.exports = loginPage;