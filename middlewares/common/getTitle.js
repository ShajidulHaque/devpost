function getTitle(setTitle) {
	const title = (req, res, next) => {
		res.locals.title = `devpost - ${setTitle}`;
		next();
	}
	
	return title;
}

module.exports = {
	getTitle,
}