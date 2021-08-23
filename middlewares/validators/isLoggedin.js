const jwt = require('jsonwebtoken');

const isLoggedin = async (req, res, next) => {
	let cookies =
		Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

	if (cookies) {
		try {
			let token = cookies[process.env.COOKIE_NAME];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			
			res.locals.loggedInUser = decoded;
			next();
		} catch (err) {
			res.redirect("/signup");
		}
	} else {
		res.redirect("/signup");
	}
};

const redirectLoggedIn = function(req, res, next) {
	let cookies =
		Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

	if (!cookies) {
		next();
	} else {
		res.redirect("/post");
	}
}

module.exports = {
	isLoggedin,
	redirectLoggedIn
}