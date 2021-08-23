const express = require('express');
const { homeController } = require('../controllers/homeController');
const { getTitle } = require('../middlewares/common/getTitle');

const homePage = express.Router();

homePage.get('/', getTitle('home'), homeController);

module.exports = homePage;