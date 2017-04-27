var express = require("express"),
	router = express.Router(),
	mysql = require("./dbController.js"),
	middlewares = require("./middlewares.js"),
	services = require("./services.js"),
	xml2js = require("xml2js");
	
router.use(middlewares.checkToken);

router.route("/activities")
	.get(function(req, res) {
		mysql.getActivities().then(function(data) {
			res.status(200);
			res.json(data);
		}, function(err) {
			services.errorHandler(res, err);
		});
	});

module.exports = router;
