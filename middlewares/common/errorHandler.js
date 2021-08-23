function notFoundHandler(req, res, next) {
	next(new Error('Your requested contents was not found!'));
}

function commonErrorHandler(err, req, res, next) {
	res.status(500).json({
		error: {
			message: err.message,
			status: err.status
		},
	})
}

module.exports = {
	notFoundHandler,
	commonErrorHandler
}