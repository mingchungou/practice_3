var express = require("express"),
	router = express.Router(),
	mysql = require("./dbController.js"),
	middlewares = require("./middlewares.js"),
	services = require("./services.js"),
	fs = require("fs"),
	path = require("path"),
	xml2js = require("xml2js");
	
router.use(middlewares.checkToken);

router.route("/activities/:type")
	.get(function(req, res) {
		var type = req.params.type.toLowerCase();
		
		if (type === "db") {
			mysql.getActivities().then(function(data) {
				res.status(200);
				res.json(data);
			}, function(err) {
				services.errorHandler(res, err);
			});
		} else if (type === "xml" || type === "json") {
			var file = type === "json" ? "todo.json" : "todo.xml";
	
			fs.readFile(path.join(__dirname, "../localData", file), "utf8", function(err, fileData) {
				if (err) {
					services.errorHandler(res, err);
				} else {
					if (type === "json") {
						res.status(200);
						res.json(JSON.parse(fileData).todo);
					} else {
						xml2js.parseString(fileData, function(err, result) {
							if (err) {
								services.errorHandler(res, err);
							} else {
								res.status(200);
								res.json(services.parseXMLData(result.activities.activity));
							}
						});
					}
				}
			});
		} else {
			services.errorHandler(res, "Type doesn't match to any option");
		}
	});

module.exports = router;
