var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	cors = require("cors"),
	services = require("./applets/services.js"),
	mysql = require("./applets/dbController.js"),
	dataHandler = require("./applets/dataHandler.js"),
	bcrypt = require("bcrypt-nodejs");
require("body-parser-xml")(bodyParser);

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(cors());

app.use("/data", dataHandler);

app.post("/login", function(req, res) {
	mysql.getUsers().then(function(data) {
		var isExist;

		for (var i = 0; i < data.length; i++) {
			if (bcrypt.compareSync(req.body.password, data[i].password)) {
				isExist = data[i];
				break;
			}
		}

		if (isExist) {
			res.status(200);
			res.json({
				token: services.createToken(isExist),
				message: "User found"
			});
		} else {
			services.errorHandler(res, "User doesn't exist");
		}
	}, function(err) {
		services.errorHandler(res, err);
	});
});

app.post("/signup", function(req, res) {
	var values = [req.body.name];

	mysql.findUser(values).then(function(data) {
		if (data.length > 0) {
			services.errorHandler(res, "User already exists");
		} else {
			bcrypt.hash(req.body.password, null, null, function(err, hash) {
				values = [req.body.name, hash];

				mysql.signup(values).then(function(data) {
					res.status(200);
					res.json({
						token: services.createToken(req.body),
						message: "User added successfully"
					});
				}, function(err) {
					services.errorHandler(res, err);
				});
			});
		}
	}, function(err) {
		services.errorHandler(res, err);
	});
});

app.listen(8080, function() {
	console.log("App listening on port 8080");
});
