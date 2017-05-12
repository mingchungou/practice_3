var mysql = require("mysql"),
	connection;

var init = function() {
	connection = mysql.createConnection({
		host: "127.0.0.1",
		user: "root",
		password: "admin",
		database: "mydb"
	});
};

var start = function() {
	connection.connect(function(err) {
		if (err) {
			console.log(err);
		}
	});
};

var stop = function() {
	connection.end(function(err) {
		if (err) {
			console.log(err);
		}
	});
};

var selectQuery = function(request, values) {
	return new Promise(function(resolve, reject) {
		init();
		start();
		connection.query(request, values, function(err, rows, fields) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
		stop();
	});
};

module.exports.login = function(values) {
	var request = "select * from user where name = ? and password = ?";

	return selectQuery(request, values);
};

module.exports.findUser = function(value) {
	var request = "select * from user where name = ?";

	return selectQuery(request, value);
};

module.exports.getUsers = function() {
	var request = "select * from user";

	return selectQuery(request, []);
};

module.exports.signup = function(values) {
	var request = "insert into user (name, password) values (?, ?)";

	return selectQuery(request, values);
};

module.exports.getActivities = function() {
	var request = "select * from todo";

	return selectQuery(request, []);
};
