var jwt = require("jsonwebtoken"),
	moment = require("moment"),
	TOKEN_SECRET = process.env.TOKEN_SECRET || "ultrasecrettoken";

module.exports.createToken = function(user) {
	var payload = {
		sub: user.email
	};
	
	return jwt.sign(payload, TOKEN_SECRET);
};

module.exports.errorHandler = function(res, err) {
	res.status(500);
	res.json({
		message: err
	});
};
