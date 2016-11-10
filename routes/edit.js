// Get all of our friend data
var data = require('../data.json');
/*var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/members");*/
var models = require('../models');

exports.view = function(req, res){
	var side = req.query.side; /* info?info=relationship*/

	var relationship = req.query.relationship;
	var name = req.query.name;
	var id = req.query.id;
	models.member.findById(id, function (err, obj) {
		if(!err) {
			res.render('edit', obj);
		}
		else {
			console.log(err);
		}

	});
}
