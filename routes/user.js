// Get all of our friend data
var data = require('../data.json');
var models = require('../models');
exports.newMember = function(req, res){
	var update = req.query.update;
	var oldname = req.query.oldname;
	var name = req.query.name;
		var relationship = req.query.relationship;
		var gender = req.query.gender;
		var age = req.query.age;
		var side = req.query.side;
		var height = req.query.height;
		var weight = req.query.weight;
		var allergy = req.query.allergy; 
		var sense = req.query.sense;
		var med = req.query.med;
		var heart = req.query.heart;
		var bprob =req.query.bprob;
		var eprob = req.query.eprob;
		var eye = req.query.eye;
	//update if request sent from edit 
	if(update=="1") {
		var id = req.query.id;
		if(req.query.side =="dad") {
			for(var x=0; x<data.dtree.length; x++) {
				if((data.dtree[x].relationship == relationship) &&(data.dtree[x].name == oldname)) {
					data.dtree[x].name = name;
				}
			}
		}
		else {

			for(var i=0; i<data.mtree.length; i++) {
						/*if((data.mtree[i].relationship == relationship) && (data.mtree[i].name == oldname)) {
							data.mtree[i].name = name;
						}*/
				console.log("AKJDSKFAFG");
				if(data.mtree[i].id == id) {
							data.mtree[i].name = name;
				}
			}
		}
		models.member.findById(id, function (err, obj){
			if(!err) {
				console.log("old name: "+oldname);
				console.log("new name: "+name);
				console.log("id: "+id);
				//modify json
				
				obj.name = name;
				obj.relationship = relationship;
				obj.gender = gender;
				obj.age = age;
				obj.side = side;
				obj.height = height;
				obj.weight = weight;
				obj.allergy = allergy;
				obj.sensitivity = sense;
				obj.heart = heart;
				obj.bprob = bprob;
				obj.eprob = eprob;
				obj.eye = eye;
				//save new info
				obj.save(function(err) {
					if(err) throw err;
					console.log("successfully saved new info!");
				});
				console.log('modified object '+obj);
				console.log(data);
				res.render('user', data);
			
			}
			else {
				console.log(err);
			}
		});


		/*models.member.findByIdAndUpdate(id, {'name': name }, {'relationship': relationship}, 
		{'gender': gender},  {'age': age }, {'height': height}, {'weight': weight},
		{'allergy': allergy}, {'sensitivity': sense}, {'med': med},{'bprob': bprob},
		{'eprob': eprob },{'eye': eye }, function (err, obj) {
			if(!err) {
				console.log(obj);
				res.render('user', data);
			}
			else {
				console.log(err);
			}

		});*/

	} 
	else {
		if (typeof(req.query.relationship) != "undefined") {
		

			// add person's info to db
			var newMember = new models.member({
				"name": name, 
				"relationship" : relationship,
				"gender": gender,
				"side": side,
				"age": age,
				"height": height,
				"weight": weight, 
				"allergy": allergy,
				"sensitivity": sense,
				"heart": req.query.heart,
				"med": med,
				"bprob": bprob,
				"eprob": eprob,
				"eye": eye
			});
			newMember.save(function(err) {
				if (err) throw err;
				console.log("new member added: "+ newMember);
				console.log('Member added!');
			});

			// creating person to be added to appropriate list to show in the tree
			var person = JSON.parse('{"side": "'+req.query.side+'", "relationship": "'+req.query.relationship+'", "name": "'+req.query.name+'"}');
			person['id'] = newMember._id;
			// add person to corresponding tree list
			if(req.query.side == "mom") {
				data.mtree.push(person);
				// console.log(data.mtree[0].name);
				// data.mtree[0].name = "New Name";
			}
			else {
				data.dtree.push(person);

			}
			//data[req.query.relationship] = JSON.parse('{"name": "'+req.query.name+'", "relationship": "'+req.query.relationship+'", "side": "'+req.query.side+'", "gender": "'+req.query.gender+'", "age": "'+req.query.age+'", "height": "'+req.query.height+'", "weight": "'+req.query.weight+'", "allergies": "'+req.query.allergy+'", "sensitivities": "'+req.query.sense+'", "heart_conditions": "'+req.query.heart+'", "medications": "'+req.query.med+'", "behavioral_problems": "'+req.query.bprob+'", "emotional_problems": "'+req.query.eprob+'", "eye_conditions": "'+req.query.eye+'"}');
		}
		console.log(data);
		res.render('user', data);
	}
	
};