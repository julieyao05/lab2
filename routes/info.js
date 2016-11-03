// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	var arg = req.query; /* arg = {'user': ' dad'}*/
	var person = arg['info'];
	/*arg["user"] --> "dad"*/
	console.log(data);
	res.render('info', data[person]); 
};