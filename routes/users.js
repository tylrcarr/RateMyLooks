module.exports = function (server, db) {	
	const temp = require('short-unique-id');
	const UID = new temp();
	server.route({
		method: "GET",
		path: "/users",
		handler: function (req, h) {
			return db.user.findAll().then(users => { return users; });
		}
	});
	server.route({
		method: "POST",
		path: "/users",
		handler: function (req, h) {
			const uid = UID.randomUUID(18);
			console.log(uid);
			return db.user.create({
				id: uid,
				email: req.payload.email,
				race: req.payload.race,
				height: req.payload.height,
				gender: req.payload.gender,
				birthday: req.payload.birthday,
				preference: req.payload.preference
			}).then(users => {console.log(users); return users; }).catch(function (err) { console.log(err); return err;});
		}
	});

	server.route({
		method: "GET",
		path: "/users/{user}",
		handler: function (req, h) {
			return db.user.findOne({ where: {id: req.params.user}}).then(users => { return users; });
		}

	});

	server.route({
		method: "GET",
		path: "/users/next",
		handler: function (req, h) {//
			console.log(req.auth);
			return db.sql.query('select rateeUser.id from users as rateeUser inner join ratings on ratings.ratee != rateeUser.id AND ratings.rater != rateeUser.id AND ratings.rater = ? inner join users as raterUser on ratings.rater = raterUser.id AND IF(raterUser.preference != "mf", raterUser.preference = rateeUser.gender, rateeUser.gender = "m" OR rateeUser.gender = "f") order by RAND() limit 1', 
			{ replacements: [req.auth.credentials], type: db.sql.QueryTypes.SELECT }).then(user => { 
					console.log(user);
					return user[0].id; 
				});
		}

	});
}

