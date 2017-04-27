var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	cors = require("cors"),
	services = require("./applets/services.js"),
	mysql = require("./applets/dbController.js"),
	dataHandler = require("./applets/dataHandler.js");
require("body-parser-xml")(bodyParser);

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(cors());

app.use("/data", dataHandler);

app.post("/login", function(req, res) {
	var values = [req.body.email, req.body.password];
	
	mysql.login(values).then(function(data) {
		if (data.length === 0) {
			services.errorHandler(res, "User doesn't exist");
		} else {
			res.status(200);
			res.json({
				token: services.createToken(data[0]),
				message: "User found"
			});
		}
	}, function(err) {
		services.errorHandler(res, err);
	});
});

app.post("/signup", function(req, res) {
	var values = [req.body.email];
	
	mysql.findUser(values).then(function(data) {
		if (data.length > 0) {
			services.errorHandler(res, "User already exists");
		} else {
			values = [req.body.name, req.body.email, req.body.password];
			
			mysql.signup(values).then(function(data) {
				res.status(200);
				res.json({
					token: services.createToken(req.body),
					message: "User added successfully"
				});
			}, function(err) {
				services.errorHandler(res, err);
			});
		}
	}, function(err) {
		services.errorHandler(res, err);
	});
});

app.listen(8080, function() {
	console.log("App listening on port 8080");
});
