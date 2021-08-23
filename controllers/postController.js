const jwt = require('jsonwebtoken')

const postController = (req, res, next) => {
	res.render('post');
}

const logout = (req, res) => {
	let cookies =
		Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
	
	if (cookies) {
		try {
			let token = cookies[process.env.COOKIE_NAME];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			
			if (decoded) {
				res.clearCookie(process.env.COOKIE_NAME);
				res.status(200).json({
					success: {
						message: 'logout successful!'
					}
				})
			} else {
				res.status(500).json({
					error: {
						message: 'logout failed!',
					}
				})
			}
			
			
		} catch (err) {
			res.status(500).json({
				error: {
					message: 'logout failed!',
				}
			})
		}
	} else {
		res.status(500).json({
			error: {
				message: 'logout failed!',
			}
		})
	}
}

module.exports = {
	postController,
	logout
}