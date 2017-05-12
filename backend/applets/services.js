var jwt = require("jsonwebtoken"),
	moment = require("moment"),
	TOKEN_SECRET = process.env.TOKEN_SECRET || "ultrasecrettoken";

module.exports.createToken = function(user) {
	var payload = {
		sub: user.name
	};

	return jwt.sign(payload, TOKEN_SECRET);
};

module.exports.errorHandler = function(res, err) {
	res.status(500);
	res.json({
		message: err
	});
};

module.exports.parseXMLData = function(data) {
	for (var i = 0; i < data.length; i++) {
        data[i].id = parseInt(data[i].id[0]);
        data[i].activity = data[i].activity[0];
        data[i].priority = data[i].priority[0];
        data[i].fromX = data[i].fromX[0];
        data[i].created = data[i].created[0];
        data[i].updated = data[i].updated[0];
        data[i].status = parseInt(data[i].status[0]);
    }

    return data;
};
