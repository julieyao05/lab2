// Get all of our friend data
var data = require('../data.json');
/*var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/members");*/
var models = require('../models');

exports.view = function(req, res){
	var side = req.query.side; /* info?info=relationship*/
	console.log("side is "+side);
	var relationship = req.query.relationship;
	var name = req.query.name;
	var id = req.query.id;
	models.member.findById(id, function (err, obj) {

		if(!err) {

			res.render('info', obj);
				/*for(var i = 0; i < obj.length; i++) {
					if((obj[i].relationship == relationship) && (obj[i].name == name)) {
						console.log(obj[i]);
						res.render('info', obj[i]);
					}
				}*/
		}
		else {
			console.log(err);
		}

	});
	/*arg['info'] --> "dad"*/
	//res.render('info', data[person]); 
}
