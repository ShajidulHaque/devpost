// externsl imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

// intrnal imports
const { notFoundHandler, commonErrorHandler } = require('./middlewares/common/errorHandler');
const homePage = require('./routers/homePage');
const loginPage = require('./routers/loginPage');
const signupPage = require('./routers/signupPage');
const postPage = require('./routers/postPage');

// check project status
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// app object
const app = express();

// database connection
mongoose
	.connect(process.env.MONGO_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connection successful!"))
	.catch((err) => console.log(err));


// body parser
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// cookie parser
app.use(cookieParser(process.env.SIGNED_COOKIE));

// set view engine
app.set('view engine', 'ejs');

// routers
app.use('/', homePage);
app.use('/login', loginPage);
app.use('/signup', signupPage);
app.use('/post', postPage);


// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(commonErrorHandler);

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
})