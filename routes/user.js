// Get all of our friend data
var data = require('../data.json');
var models = require('../models');
exports.view = function(req, res) {
	data['homepage2'] = true;
	var user = req.query.user;

	var remove = req.query.remove;
	var name = req.query.name;
	var relationship = req.query.relationship;
	var side = req.query.side;
	var id = req.query.id;

	var gender = req.query.gender;
	var age = req.query.age;
	
	var height = req.query.height;
	var weight = req.query.weight;
	var allergy = req.query.allergy; 
	var sense = req.query.sense;
	var med = req.query.med;
	var heart = req.query.heart;
	var bprob =req.query.bprob;
	var eprob = req.query.eprob;
	var eye = req.query.eye;
	//update fake json for user
	console.log("JSON IS: "+data["jane"]);
	if(user=="me") {
		console.log("YOOOOOOO");
		// get json entry
		var person = data["jane"];
		person['name'] = name;
		person['gender'] = gender;
		person['age'] = age;
		person['height'] = height;
		person['weight'] = weight;
		person['allergies'] = allergy; 
		person['sensitivities'] = sense;
		person['medications'] = med;
		person['heart_conditions'] = heart;
		person['behavioral_problems'] = bprob;
		person['emotional_problems'] = eprob;
		person['eye_conditions'] = eye;
		console.log(person);
	}
	if(remove=="1") {
		//modify json

			if(req.query.side =="dad") {
				for(var x=0; x<data.dtree.length; x++) {
					console.log("at member: "+data.dtree[x]+" and x is "+x);
					if(data.dtree[x].id == id) {					
						data.dtree.splice(x, 1);
					}
				}
				
			}
			else if(req.query.side=="mom") {

				for(var i=0; i<data.mtree.length; i++) {
					if(data.mtree[i].id == id) {
						data.mtree.splice(i, 1);
					}
				}
				
			}
		
			
		//remove from db
		models.member.findById(id, function (err, toRemove) {
			if (err) throw err;

			//delete
			toRemove.remove(function(err) {
				if(err) throw err;
				console.log(data);
				console.log("length of json:"+data.dtree.length);
				console.log("Member deleted!");
			});
		});
		res.render('user2', data);
	}
	else {


	var update = req.query.update;
	var oldname = req.query.oldname;
	
	//update if request sent from edit 
	if(update=="1") {
		console.log("side is: "+side);
		
		if(side =="dad") {
			for(var x=0; x<data.dtree.length; x++) {
				if(data.dtree[x].id == id) {
					data.dtree[x].name = name;
					data.dtree[x].relationship = relationship;
					data.dtree[x].side = side;
					//data.dtree[x].id = id;
				}
			}
		}
		else if(side=="mom"){
			for(var i=0; i<data.mtree.length; i++) {
						
				if(data.mtree[i].id == id) {
					data.mtree[i].name = name;
					data.mtree[i].relationship = relationship;
					data.mtree[i].side = side;
					//data.mtree[i].id = id;
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
				res.render('user2', data);
			
			}
			else {
				console.log(err);
			}
		});

	} 
	else {
		if (typeof(req.query.relationship) != "undefined") {
		
			console.log(height)

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
		res.render('user2', data);
	}
	}		
};



exports.memberFunctions = function(req, res){
	data['homepage2'] = false;

	var user = req.query.user;

	var remove = req.query.remove;
	var name = req.query.name;
	var relationship = req.query.relationship;
	var side = req.query.side;
	var id = req.query.id;

	var gender = req.query.gender;
	var age = req.query.age;
	
	var height = req.query.height;
	var weight = req.query.weight;
	var allergy = req.query.allergy; 
	var sense = req.query.sense;
	var med = req.query.med;
	var heart = req.query.heart;
	var bprob =req.query.bprob;
	var eprob = req.query.eprob;
	var eye = req.query.eye;
	//update fake json for user
	console.log("JSON IS: "+data["jane"]);
	if(user=="me") {
		console.log("YOOOOOOO");
		// get json entry
		var person = data["jane"];
		person['name'] = name;
		person['gender'] = gender;
		person['age'] = age;
		person['height'] = height;
		person['weight'] = weight;
		person['allergies'] = allergy; 
		person['sensitivities'] = sense;
		person['medications'] = med;
		person['heart_conditions'] = heart;
		person['behavioral_problems'] = bprob;
		person['emotional_problems'] = eprob;
		person['eye_conditions'] = eye;
		console.log(person);
	}
	if(remove=="1") {
		//modify json

			if(req.query.side =="dad") {
				for(var x=0; x<data.dtree.length; x++) {
					console.log("at member: "+data.dtree[x]+" and x is "+x);
					if(data.dtree[x].id == id) {					
						data.dtree.splice(x, 1);
					}
				}
				
			}
			else if(req.query.side=="mom") {

				for(var i=0; i<data.mtree.length; i++) {
					if(data.mtree[i].id == id) {
						data.mtree.splice(i, 1);
					}
				}
				
			}
		
			
		//remove from db
		models.member.findById(id, function (err, toRemove) {
			if (err) throw err;

			//delete
			toRemove.remove(function(err) {
				if(err) throw err;
				console.log(data);
				console.log("length of json:"+data.dtree.length);
				console.log("Member deleted!");
			});
		});
		res.render('user', data);
	}
	else {


	var update = req.query.update;
	var oldname = req.query.oldname;
	
	//update if request sent from edit 
	if(update=="1") {
		console.log("side is: "+side);
		
		if(side =="dad") {
			for(var x=0; x<data.dtree.length; x++) {
				if(data.dtree[x].id == id) {
					data.dtree[x].name = name;
					data.dtree[x].relationship = relationship;
					data.dtree[x].side = side;
					//data.dtree[x].id = id;
				}
			}
		}
		else if(side=="mom"){
			for(var i=0; i<data.mtree.length; i++) {
						
				if(data.mtree[i].id == id) {
					data.mtree[i].name = name;
					data.mtree[i].relationship = relationship;
					data.mtree[i].side = side;
					//data.mtree[i].id = id;
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

	} 
	else {
		if (typeof(req.query.relationship) != "undefined") {
		
			console.log(height)

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
	}
};

