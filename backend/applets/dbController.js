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
	var request = "select * from user where email = ? and password = ?";

	return selectQuery(request, values);
};

module.exports.findUser = function(values) {
	var request = "select * from user where email = ?";

	return selectQuery(request, values);
};
	
module.exports.signup = function(values) {
	var request = "insert into user (name, email, password) values (?, ?, ?)";

	return selectQuery(request, values);
};

module.exports.getActivities = function() {
	var request = "select * from todo";

	return selectQuery(request, []);
};
