// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	data['homepage2'] = false;
	console.log(data);
	res.render('index');
};
exports.view2 = function(req, res){
	data['homepage2'] = true;
	res.render('index');
};