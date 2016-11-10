// Get all of our friend data
var data = require('../data.json');
/*var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/members");*/
var models = require('../models');

exports.view = function(req, res){
	var side = req.query.side; /* info?info=relationship*/
	var relationship = req.query.relationship;
	var name = req.query.name;

	models.member.find({'side': side}, function (err, obj) {
		if(!err) {
			for(var i = 0; i < obj.length; i++) {
				if((obj[i].relationship == relationship) && (obj[i].name == name)) {
					res.render('edit', obj[i]);
				}
			}
		}
		else {
			console.log(err);
		}

	});
	/*arg['info'] --> "dad"*/
	//res.render('info', data[person]); 
}
