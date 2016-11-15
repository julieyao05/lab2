var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var memberSchema = new mongoose.Schema({
		'name': String, 
		'relationship': String,
		'side': String,
		'gender': String,
		'age': Number,
		'height': String,
		'weight': String, 
		'allergy': String,
		'sensitivity': String,
		'heart': String,
		'med': String,
		'bprob': String,
		'eprob': String,
		'eye': String,
}, {
	collection: "members"
});
exports.member = mongoose.model('members', memberSchema);

