var jwt = require("jsonwebtoken"),
	TOKEN_SECRET = process.env.TOKEN_SECRET || "ultrasecrettoken",
	mysql = require("./dbController.js"),
	services = require("./services.js");

module.exports.checkToken = function(req, res, next) {
	if (!req.headers.authorization) {
		services.errorHandler(res, "User unauthorized");
	} else {
		jwt.verify(req.headers.authorization, TOKEN_SECRET, function(err, decoded) {
			if (err) {
				services.errorHandler(res, err);
			} else {
				mysql.findUser(decoded.sub).then(function(data) {
					if (data.length === 0) {
						services.errorHandler(res, "User unauthorized");
					} else {
						next();
					}
				}, function(err) {
					services.errorHandler(res, err);
				});
			}
		});
	}
};
