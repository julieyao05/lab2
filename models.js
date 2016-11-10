var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var memberSchema = new mongoose.Schema({
		'name': String, 
		'relationship': String,
		'side': String,
		'gender': String,
		'age': Number,
		'height': Number,
		'weight': Number, 
		'allergy': String,
		'sensitivity': String,
		'heart': String,
		'med': String,
		'bprob': String,
		'eprob': String,
		'eye': String,
});
exports.member = mongoose.model('member', memberSchema);

