const express = require('express');
const { postController, logout } = require('../controllers/postController');
const { getTitle } = require('../middlewares/common/getTitle');
const { isLoggedin } = require('../middlewares/validators/isLoggedin');

const postPage = express.Router();

postPage.get('/', isLoggedin, getTitle('post'), postController);
postPage.delete('/', logout);

module.exports = postPage;