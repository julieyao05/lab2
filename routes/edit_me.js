var data = require('../data.json');
exports.view = function(req, res){
	//retreive fake user info
	var user = data['jane'];

	res.render('edit_me', user);

}